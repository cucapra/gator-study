<script>
  import Markdown from '../components/Markdown.svelte';

  let id = '';

  let expr = 0;
  let glsl: boolean;
  let gator: boolean;

  async function makeUser() {
    const response = await fetch(`http://${window.location.host}/makeuser`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ expr, glsl }),
    });
    const result = await response.json();
    id = result.part_id;
    gator = result.gator;
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('gator', JSON.stringify(gator));
  }
</script>

<style>
  main {
    padding: 0 0.5rem;
    max-width: 60rem;
    margin: 2rem auto;

    h1 {
      margin: 0.3em 0;
    }

    form {
      input {
        display: block;
      }
    }

    a {
      display: inline;
    }
    fieldset { 
      border: none;
      pointer-events: none;
      margin: 0;
      padding: 0;
      input {
        display: none;
      } 
      label { 
        pointer-events: auto;
        color: #ddd; 
        margin-right: 0.8rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-color: white;
        content: "";
        border-radius: 50%;
      }
      &:hover {
        label {
          background-color: $orange;
        }
      }
      &:not(:checked) {
        label:hover ~ label { /* hover previous stars in list */
          background-color: white;
        }
      }
      .up {
        background-color: $orange;
      }
    }


  }
</style>

<main>
  <h1>Consent form</h1>
  <Markdown>
    Some info about that
  </Markdown>
  <form method="post" on:submit|once|preventDefault={makeUser}>
    <label for="signature">Please sign your name</label>
    <input name="signature" required />
    <label for="date">Date</label>
    <input type="date" name="date" required />
    <label for="glsl">Have you used GLSL before</label>
    <input type="checkbox" name="glsl" bind:checked={glsl} />
    <p>How experienced of a programmer do you consider yourself?</p>
    <fieldset>
      {#each Array(10) as _, i}
        <label class:up={expr >= i + 1} >
          <input type="radio" bind:group={expr} value={i + 1} />
        </label>
      {/each}
  </fieldset>
    <input type="submit" value="Continue">
  </form>
  {#if id}
    <p>Your id is <b>{id}</b>. If you would like to continue your session at another time, or on another computer, note it down and then later use it to log in.</p>
    {#if gator}
      <p>For this tutorial, you will be using our shading language, <b>Gator</b>.</p>
    {:else}
      <p>For this tutorial, you will be using <b>GLSL</b>, the standard shading language.</p>
    {/if}
    <a class="clickable" href="/gpt/stage0">Go to tutorial start</a>
  {/if}
</main>

