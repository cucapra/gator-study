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
    max-width: 45rem;
    margin: 2rem auto;

    form {
      input {
        display: block;
      }
      div {
        margin: 1rem 0;
      }
    }

    input[type=checkbox], a {
      display: inline;
    }

    input[type=text], input[type=date] {
      font-family: sans-serif;
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid grey;
      padding: 0.5em 0;
      color: white;
      &:focus {
        outline: none;
        border-bottom: 1px solid $orange;
      }
      &:-moz-ui-invalid {
        box-shadow: none;
        border-bottom: 1px solid red;
      }
    }
    fieldset { 
      border: none;
      pointer-events: none;
      margin: 0;
      padding: 0;
      p {
        display: inline;
        vertical-align: middle;
        margin-right: 0.8rem;
      }
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
        &:hover {
          cursor: pointer;
        }
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
  <Markdown>
# Consent to Participate in Study on Graphics Programming
We are asking you to participate in a research study titled “Gator Study”. We will describe this study to you and answer any of your questions.

### Who we are
This study is being led by Adrian Sampson, an assistant professor of computer science at Cornell University. He is assisted by Dietrich Geisler, a computer science PHD student, and Kimberly Baum, an undergraduate information science student. This research is taking place within the Capra research group at Cornell University.

### What the study is about 
The purpose of this research is to compare the learnability of two different graphics programming languages. We will be looking at how quickly, and how accurately a participant learns a given language. We hope to understand a  participant’s experience by evaluating their interactions with a given language.
 
### What we will ask you to do
We will ask you to follow a graphics programming tutorial under observation by Andrei Shpilenok through zoom. We will not video or audio record you during this study. The tutorial will focus on introducing fragment shaders, introducing geometry and reference frames, and constructing lighting models. We will then ask you to complete a few programming tasks based on what was taught in the tutorial. The tutorial and tasks will take a maximum of 50 minutes to complete. After completion, we will ask you to take a post study survey.

### Risks and discomforts
We do not anticipate any risks from participating in this research. You may skip any question if feel uncomfortable answering it.
 
### Benefits
We expect that the information from this study may benefit other people now or in the future in developing or improving graphics programming languages, making them more intuitive, accessible, and robust. We hope this study will provide valuable information about the learnability of graphics concepts. Participation in this study may provide the participant with an understanding of graphics programming concepts.
 
### Compensation for participation
The participant will receive financial compensation ($20.00 gift card) for completing this study. 

### Privacy/Confidentiality/Data Security
We do not plan to collect any identifying information. All data and surveys will be anonymous. Data will be stored in secure Cornell data centers. Data can and will only be accessed by members of the research team.

### Sharing De-identified Data Collected in this Research
De-identified data from this study may be shared with the research community at large to advance science and health. We will remove or code any personal information that could identify you before files are shared with other researchers to ensure that, by current scientific standards and known methods, no one will be able to identify you from the information we share. Despite these measures, we cannot guarantee anonymity of your personal data.

Please note that email communication is neither private nor secure. Though we are taking precautions to protect your privacy, you should be aware that information sent through email could be read by a third party.


### Taking part is voluntary
Your involvement in this study is voluntary, and you may refuse to participate before the study begins, discontinue at any time, or skip any questions/procedures that may make you feel uncomfortable with no penalty to your academic standing, record, or relationship with the university or other organization or service that may be involved with the research.

However, if you do not complete the study you will not receive compensation. You must meet the minimal requirement of completing the pre and post study surveys and attempting each task, or spending at least 60 minutes on the given tasks to be rewarded compensation. You may choose not to participate if you are uncomfortable with these conditions. 


### If you have questions:
The main researcher conducting this study is Adrian Sampson, a professor at Cornell University. Please ask any questions you have now. If you have questions later, you may contact Adrian Sampson at [asampson@cornell.edu](mailto:asampson@cornell.edu). If you have any questions or concerns regarding your rights as a subject in this study, you may contact the Institutional Review Board (IRB) for Human Participants at [607-255-5138](tel:6072555138) or access their website at [http://www.irb.cornell.edu](http://www.irb.cornell.edu). You may also report your concerns or complaints anonymously through Ethicspoint online at [https://www.hotline.cornell.edu](https://www.hotline.cornell.edu) or by calling toll free at [1-866-293-3077](tel:8662933077). Ethicspoint is an independent organization that serves as a liaison between the University and the person bringing the complaint so that anonymity can be ensured.

  </Markdown>
  <form method="post" on:submit|once|preventDefault={makeUser}>
    <div>
      <label for="signature">Please type your name in the box below if you have read the above information and consent to take part in the study:</label>
      <input type="text" name="signature" required placeholder="Your name" />
    </div>
    <div>
      <label for="date">Enter today's date:</label>
      <input type="date" name="date" required />
    </div>
    <div>
      <label for="glsl">Have you used GLSL before?</label>
      <input type="checkbox" name="glsl" bind:checked={glsl} />
    </div>
    <p>How experienced of a programmer do you consider yourself?</p>
    <fieldset>
      <p>1</p>
      {#each Array(10) as _, i}
        <label class:up={expr >= i + 1} >
          <input type="radio" bind:group={expr} value={i + 1} />
        </label>
      {/each}
      <p>10</p>
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

