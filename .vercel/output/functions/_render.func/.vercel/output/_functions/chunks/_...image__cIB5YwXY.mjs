import { promises } from 'fs';
import { join } from 'path';

// src/pages/api/image/[...image].js

async function get({ params }) {
  const { image } = params;
  const imagePath = join(process.cwd(), 'src', 'projects', ...image);

  console.log('Requested image path:', imagePath);  // Add this line for debugging

  try {
    const file = await promises.readFile(imagePath);
    const fileExtension = imagePath.split('.').pop().toLowerCase();

    let contentType;
    switch (fileExtension) {
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'png':
        contentType = 'image/png';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      default:
        contentType = 'application/octet-stream';
    }

    return new Response(file, {
      headers: { 'Content-Type': contentType },
    });
  } catch (e) {
    console.error('Error reading file:', e);  // Add this line for debugging
    return new Response('Not Found', { status: 404 });
  }
}

export { get };
