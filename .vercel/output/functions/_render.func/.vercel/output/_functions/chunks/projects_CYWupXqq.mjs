import { k as createComponent, l as renderTemplate, m as maybeRenderHead, n as addAttribute, o as createAstro, p as renderComponent } from './astro/server_DAcnmFJu.mjs';
import 'kleur/colors';
import 'html-escaper';
import { join } from 'path';
import { readdir, readFile, stat } from 'fs/promises';
import 'clsx';

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
          const thumbLocalPath = join(projectPath, `${projectId}.jpg`);
          const thumbPublicPath = `/api/image/${projectId}/${projectId}.jpg`;
          const imgsPath = join(projectPath, `imgs`);
          const hasThumb = await exists(thumbLocalPath);
          const images = await readdir(imgsPath)
            .then((paths) => paths.map((path) => `/api/image/${projectId}/imgs/${path}`))
            .catch(() => []);

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

const $$Astro = createAstro();
const $$ProjectItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectItem;
  const { project } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`
    project__item
    project--color-${project.color}
    animation--${project.index || 0}
    ${!project.hasThumb ? "-no-thumb" : ""}
  `, "class")}> <a${addAttribute(`#projects/${project.id}`, "href")} class="project__link"> <div class="project__link-wrapper"> ${project.hasThumb && renderTemplate`<img${addAttribute(project.thumbPath, "src")}${addAttribute(project.name, "alt")}>`} <div${addAttribute(`project__base project__base--color-${project.color}`, "class")}> <h4 class="project__base-title">${project.name}</h4> </div> </div> </a> <div class="project__complete"> <div class="project__complete-wrapper clear--after"> ${project.images?.length > 0 && renderTemplate`<div class="project__slides"> <div class="project__slides-wrapper"> ${project.images.map((imgPath) => renderTemplate`<div class="project__slide"> <img${addAttribute(`${imgPath}`, "data-lazyload")}> </div>`)} </div> </div>`} <div class="project__infos"> <h4 class="project__title">${project.name}</h4> <div class="project__desc"> ${project.desc?.en?.map(($paragraph) => renderTemplate`<p>${$paragraph}</p>`)} ${project.area && renderTemplate`<p> <strong>Area:</strong>: ${project.area} </p>`} </div> ${project.url && project.url.length > 4 && renderTemplate`<div class="project__address"> <a${addAttribute(project.url, "href")} target="_blank"> <span>Go to project website</span> </a> </div>`} </div> </div> </div> </div>`;
}, "/Users/steven/Desktop/my-portfolio-astro/MY-PORTFOLIO-ASTRO/src/components/ProjectItem.astro", void 0);

const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const projectsByCategory = await getProjectsData();
  const langs = (await import('./langs_DGTvUKs3.mjs')).default;
  const dict = langs;
  return renderTemplate`${maybeRenderHead()}<div class="project-wrapper"> <h2 class="page-title title--padded-mobile">Projects</h2> ${Object.entries(projectsByCategory).map(
    ([catId, projects]) => {
      const categoryName = dict[catId]?.en || "Unknown Category";
      return renderTemplate`<div class="project__list"${addAttribute(catId, "data-key")}> <h3 class="structure--animatable animation--1">${categoryName}</h3> <div class="project__grid clear--after"> ${projects.map((project) => renderTemplate`${renderComponent($$result, "ProjectItem", $$ProjectItem, { "project": project, "key": project.path })}`)} </div> </div>`;
    }
  )} </div>`;
}, "/Users/steven/Desktop/my-portfolio-astro/MY-PORTFOLIO-ASTRO/src/pages/projects.astro", void 0);

const $$file = "/Users/steven/Desktop/my-portfolio-astro/MY-PORTFOLIO-ASTRO/src/pages/projects.astro";
const $$url = "/projects";

export { $$Projects as default, $$file as file, $$url as url };
