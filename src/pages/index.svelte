<script>
  import { fly } from 'svelte/transition';
  import { goto } from '@roxi/routify';

  let existing: boolean;
  let userid: string;
  let error = '';

  async function goToCurrent() {
    const response = await fetch(`http://${window.location.host}/get_stage`, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain'
      },
      referrerPolicy: 'no-referrer',
      body: userid,
    });
    const result = await response.text();
    if (result === 'notfound') {
      error = `That's not an ID I know!`;
    } else {
      $goto(`/gpt/stage${result}`);
    }
  }
</script>

<style>
  main {
    padding: 0 0.5rem;
    max-width: 80rem;
    margin: 0 auto;

    .center {
      max-width: 20rem;
      margin: 0 auto;
    }

    label, a {
      padding: 1rem;
      margin-top: 2rem;
      width: 100%;
    }
    .existing {
      label {
        display: block;
      }
      .input { 
        display: flex;
        background-color: white;
        margin-top: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.3rem;
        box-shadow: 0px 2px 10px -2px rgba(0,0,0,0.6);
        input {
          flex-grow: 2;
          border: none;
          width: 100%;
          box-sizing: border-box;
        }
      }
      input[type=checkbox] {
        display: none;
      }
      div {
        position: relative;
        z-index: -1;
      }
    }
  }
  .error {
    color: red;
    text-align: center;
  }
  
  h1 {
    text-align: center;
    font-size: 62px;
  }
</style>

<main>
  <h1>Graphics Programming Tutorial</h1>

  <div class="center">
    <a class="clickable" href="/newuser">New User</a>
    <div class="existing">
      <label class="clickable">
        <input type=checkbox bind:checked={existing} />
        Existing User
      </label>
      {#if existing}
        <div class="input" transition:fly|local={{y: -50, duration: 300}}>
          <input bind:value={userid} placeholder="Your ID"/>
          <button on:click={goToCurrent}>Go</button>
        </div>
        <p class="error">{error}</p>
      {/if}
    </div>
  </div>
</main>
