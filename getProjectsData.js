import { join } from 'path';
import { readdir, stat, readFile } from 'fs/promises';

const exists = async (path) => !!(await stat(path).catch(() => false));

const getRandomColor = () => Math.floor(Math.random() * 5) + 1;

const projectsDir = join(process.cwd(), 'src', 'projects');

const getProjectsData = async () => {
  const projectIds = await readdir(projectsDir);

  // Filter out hidden files like .DS_Store
  const filteredProjectIds = projectIds.filter((projectId) => !projectId.startsWith('.'));

  const projects = (
    await Promise.all(
      filteredProjectIds.map(async (projectId) => {
        const projectPath = join(projectsDir, projectId);

        try {
          const meta = JSON.parse(await readFile(join(projectPath, `meta.json`), 'utf-8'));
          const thumbLocalPath = join(projectPath, `${projectId}.jpeg`);
          const thumbPublicPath = `/src/projects/${projectId}/${projectId}.jpeg`;
          const imgsPath = join(projectPath, `imgs`);
          const hasThumb = await exists(thumbLocalPath);
          const images = await readdir(imgsPath)
            .then((paths) => paths.map((path) => `/src/projects/${projectId}/imgs/${path}`))
            .catch(() => [])

          return {
            ...meta,
            color: getRandomColor(),
            thumbPath: thumbPublicPath,
            hasThumb,
            path: projectPath,
            images,
          };
        } catch (e) {
          console.error(e);
          return null;
        }
      })
    )
  ).filter(Boolean);

  const projectsByCategory = projects.reduce((acc, project) => {
    if (!acc[project.category]) acc[project.category] = [];
    acc[project.category].push({
      ...project,
      index: acc[project.category].length + 1,
    });

    return acc;
  }, {});

  return projectsByCategory;
};

export default getProjectsData;
