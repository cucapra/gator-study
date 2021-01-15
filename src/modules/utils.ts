import { writable } from 'svelte/store';

// This is a Svelte store, which is sort of like synchronized global variable
// that can be accessed from multiple components. I'm using it here to
// communicate shader data with the editor and visualizer components.
export const shaderTexts = writable({ vert: '', frag: ''});

interface Shaders {
  frag: string;
  vert: string;
}
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
export async function gatorToGLSL(data: Shaders): Promise<Shaders>  {
  const response = await fetch(`http://${window.location.host}/compile`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  const result = await response.json();
  let errors = [];
  if (!result.vert.success) {
    errors.push(`VERTEX COMPILATION ERROR: ${result.vert.content}`);
  }
  if (!result.frag.success) {
    errors.push(`FRAGMENT COMPILATION ERROR: ${result.frag.content}`);
  }
  if (errors.length) {
    throw errors.join('\n');
  }
  return { frag: result.frag.content, vert: result.vert.content }
}
