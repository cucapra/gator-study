import { writable } from 'svelte/store';

// This is a Svelte store, which is sort of like synchronized global variable
// that can be accessed from multiple components. I'm using it here to
// communicate shader data with the editor and visualizer components.
export const shaderTexts = writable({ vert: '', frag: ''});

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// Takes a gator string, gets the glsl version of it from the server, throws if recieves
// an error code
export async function gatorToGLSL(name: string, code: string, report: boolean, part_id: string): Promise<string> {
  let response;
  if (report && name != 'VERTEX') {
    response = await fetch(`http://${window.location.host}/compile_report`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ part_id, code }),
    });
  } else {
    response = await fetch(`http://${window.location.host}/compile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: code,
    });
  }
  const result = await response.text();
  if (response.status === 404) {
    throw `there's some sort of issue with the express server, might want to check that out`;
  } else if (response.status === 202) {
    throw `${name} COMPILATION ERROR: ${result}`;
  } else {
    return result;
  }
}

