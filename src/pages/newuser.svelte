<script>
  import Markdown from '../components/Markdown.svelte';

  let id = '';

  async function makeUser() {
    const response = await fetch(`http://${window.location.host}/makeuser`);
    console.log(response);
    const result = await response.json();
    id = result.part_id;
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
    <input type="submit" value="Continue">
  </form>
  {#if id}
    <p>Your id is {id}. If you would like to continue your session at another time, or on another computer, note it down and then later use it to log in.</p>
    <a class="clickable" href="/gpt/stage0">Go to tutorial start</a>
  {/if}
</main>

