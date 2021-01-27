import { writable } from 'svelte/store';

// This is a Svelte store, which is sort of like synchronized global variable
// that can be accessed from multiple components. I'm using it here to
// communicate shader data with the editor and visualizer components.
export const shaderTexts = writable({ vert: '', frag: ''});

export const user = writable({ id: '', gator: false});

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// Takes a gator string, gets the glsl version of it from the server, throws if recieves
// an error code
export async function gatorToGLSL(name: string, shader: string): Promise<string> {
  const response = await fetch(`http://${window.location.host}/compile`, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'text/plain'
    },
    referrerPolicy: 'no-referrer',
    body: shader,
  });
  const result = await response.text();
  if (response.status === 404) {
    throw `there's some sort of issue with the express server, might want to check that out`;
  } else if (response.status === 202) {
    throw `${name} COMPILATION ERROR: ${result}`;
  } else {
    return result;
  }
}

export function sendData(userid: string, image: Blob, code: string) {
  let formData = new FormData();
  
  formData.append("userid", userid);
  formData.append("code", code);
  formData.append("image", image);
  fetch(`http://${window.location.host}/update`, {
    method: 'PUT',
    body: formData,
  });
}

// https://stackoverflow.com/questions/7193238/wait-until-a-condition-is-true/52652681#52652681
export function waitFor(conditionFunction) {
  const poll = resolve => {
    if(conditionFunction()) resolve();
    else setTimeout(_ => poll(resolve), 30);
  }
  return new Promise(poll);
}

