<script>
  // CodeMirror and GLSL highlighting
  import CodeMirror from 'codemirror';
  import 'codemirror/mode/clike/clike.js';
  // Svelte function that runs on component mount
  import { onMount } from 'svelte';

  // These are props that can be passed to the component,
  // they also have default values if left unspecified
  export let onUpdate: any = () => {};

  // This is set in the HTML, and is defined after mounting,
  let cmContainer: HTMLElement;
  let wrapper: HTMLElement;

  // So we use onMount
  onMount(() => {
    // Init CM with theme, mode, 
    // and default value passed to the component
    let cm = CodeMirror(cmContainer, {
      lineNumbers: true,
      mode: 'x-shader/x-fragment',
      theme: 'material-darker',
      lineWrapping: true,
      value: wrapper.textContent.trim(),
    });
    // Run the onUpdate trigger once at start
    onUpdate(cm);
    // Then set event listener to run it whenever the CM changes
    cm.on("change", onUpdate)
  });
</script>


<style global>
  /* Just the CSS taken from CodeMirror repo */
  .cm-container {
    height: 100%;
  }
  .CodeMirror {
      font-family: monospace;
      height: 100%;
      color: black;
      direction: ltr;
      position: relative;
      overflow: hidden;
      background: white;
      pre.CodeMirror-line {
          padding: 0 4px;
          -moz-border-radius: 0;
          -webkit-border-radius: 0;
          border-radius: 0;
          border-width: 0;
          background: transparent;
          font-family: inherit;
          font-size: inherit;
          margin: 0;
          white-space: pre;
          word-wrap: normal;
          line-height: inherit;
          color: inherit;
          z-index: 2;
          position: relative;
          overflow: visible;
          -webkit-tap-highlight-color: transparent;
          -webkit-font-variant-ligatures: contextual;
          font-variant-ligatures: contextual;
      }
      pre.CodeMirror-line-like {
          padding: 0 4px;
          -moz-border-radius: 0;
          -webkit-border-radius: 0;
          border-radius: 0;
          border-width: 0;
          background: transparent;
          font-family: inherit;
          font-size: inherit;
          margin: 0;
          white-space: pre;
          word-wrap: normal;
          line-height: inherit;
          color: inherit;
          z-index: 2;
          position: relative;
          overflow: visible;
          -webkit-tap-highlight-color: transparent;
          -webkit-font-variant-ligatures: contextual;
          font-variant-ligatures: contextual;
      }
      div.CodeMirror-secondarycursor {
          border-left: 1px solid silver;
      }
  }
  .CodeMirror-lines {
      padding: 4px 0;
      cursor: text;
      min-height: 1px;
  }
  .CodeMirror-scrollbar-filler {
      background-color: transparent;
      position: absolute;
      z-index: 6;
      display: none;
      outline: none;
      right: 0;
      bottom: 0;
  }
  .CodeMirror-gutter-filler {
      background-color: transparent;
      position: absolute;
      z-index: 6;
      display: none;
      outline: none;
      left: 0;
      bottom: 0;
  }
  .CodeMirror-gutters {
      border-right: 1px solid #ddd;
      background-color: #f7f7f7;
      white-space: nowrap;
      position: absolute;
      left: 0;
      top: 0;
      min-height: 100%;
      z-index: 3;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
  }
  .CodeMirror-linenumber {
      padding: 0 3px 0 5px;
      min-width: 20px;
      text-align: right;
      color: #999;
      white-space: nowrap;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
  }
  .CodeMirror-guttermarker {
      color: black;
  }
  .CodeMirror-guttermarker-subtle {
      color: #999;
  }
  .CodeMirror-cursor {
      border-left: 1px solid black;
      border-right: none;
      width: 0;
      position: absolute;
      pointer-events: none;
  }
  .cm-fat-cursor {
      .CodeMirror-cursor {
          width: auto;
          border: 0 !important;
          background: #7e7;
      }
      div.CodeMirror-cursors {
          z-index: 1;
      }
  }
  .cm-fat-cursor-mark {
      background-color: rgba(20, 255, 20, 0.5);
      -webkit-animation: blink 1.06s steps(1) infinite;
      -moz-animation: blink 1.06s steps(1) infinite;
      animation: blink 1.06s steps(1) infinite;
  }
  .cm-animate-fat-cursor {
      width: auto;
      border: 0;
      -webkit-animation: blink 1.06s steps(1) infinite;
      -moz-animation: blink 1.06s steps(1) infinite;
      animation: blink 1.06s steps(1) infinite;
      background-color: #7e7;
  }
  .cm-tab {
      display: inline-block;
      text-decoration: inherit;
  }
  .CodeMirror-rulers {
      position: absolute;
      left: 0;
      right: 0;
      top: -50px;
      bottom: 0;
      overflow: hidden;
  }
  .CodeMirror-ruler {
      border-left: 1px solid #ccc;
      top: 0;
      bottom: 0;
      position: absolute;
  }
  .cm-s-default {
      .cm-header {
          color: blue;
      }
      .cm-quote {
          color: #090;
      }
      .cm-keyword {
          color: #708;
      }
      .cm-atom {
          color: #219;
      }
      .cm-number {
          color: #164;
      }
      .cm-def {
          color: #00f;
      }
      .cm-variable-2 {
          color: #05a;
      }
      .cm-variable-3 {
          color: #085;
      }
      .cm-type {
          color: #085;
      }
      .cm-comment {
          color: #a50;
      }
      .cm-string {
          color: #a11;
      }
      .cm-string-2 {
          color: #f50;
      }
      .cm-meta {
          color: #555;
      }
      .cm-qualifier {
          color: #555;
      }
      .cm-builtin {
          color: #30a;
      }
      .cm-bracket {
          color: #997;
      }
      .cm-tag {
          color: #170;
      }
      .cm-attribute {
          color: #00c;
      }
      .cm-hr {
          color: #999;
      }
      .cm-link {
          color: #00c;
      }
      .cm-error {
          color: #f00;
      }
  }
  .cm-negative {
      color: #d44;
  }
  .cm-positive {
      color: #292;
  }
  .cm-header {
      font-weight: bold;
  }
  .cm-strong {
      font-weight: bold;
  }
  .cm-em {
      font-style: italic;
  }
  .cm-link {
      text-decoration: underline;
  }
  .cm-strikethrough {
      text-decoration: line-through;
  }
  .cm-invalidchar {
      color: #f00;
  }
  .CodeMirror-composing {
      border-bottom: 2px solid;
  }
  div.CodeMirror {
      span.CodeMirror-matchingbracket {
          color: #0b0;
      }
      span.CodeMirror-nonmatchingbracket {
          color: #a22;
      }
  }
  .CodeMirror-matchingtag {
      background: rgba(255, 150, 0, .3);
  }
  .CodeMirror-activeline-background {
      background: #e8f2ff;
  }
  .CodeMirror-scroll {
      overflow: scroll !important;
      margin-bottom: -50px;
      margin-right: -50px;
      padding-bottom: 50px;
      height: 100%;
      outline: none;
      position: relative;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
  }
  .CodeMirror-sizer {
      position: relative;
      border-right: 50px solid transparent;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
  }
  .CodeMirror-vscrollbar {
      position: absolute;
      z-index: 6;
      display: none;
      outline: none;
      right: 0;
      top: 0;
      overflow-x: hidden;
      overflow-y: scroll;
  }
  .CodeMirror-hscrollbar {
      position: absolute;
      z-index: 6;
      display: none;
      outline: none;
      bottom: 0;
      left: 0;
      overflow-y: hidden;
      overflow-x: scroll;
  }
  .CodeMirror-gutter {
      white-space: normal;
      height: 100%;
      display: inline-block;
      vertical-align: top;
      margin-bottom: -50px;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
  }
  .CodeMirror-gutter-wrapper {
      position: absolute;
      z-index: 4;
      background: none !important;
      border: none !important;
      &::selection {
          background-color: transparent;
      }
      &::-moz-selection {
          background-color: transparent;
      }
  }
  .CodeMirror-gutter-background {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 4;
  }
  .CodeMirror-gutter-elt {
      position: absolute;
      cursor: default;
      z-index: 4;
  }
  .CodeMirror-wrap {
      pre.CodeMirror-line {
          word-wrap: break-word;
          white-space: pre-wrap;
          word-break: normal;
      }
      pre.CodeMirror-line-like {
          word-wrap: break-word;
          white-space: pre-wrap;
          word-break: normal;
      }
  }
  .CodeMirror-linebackground {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;
  }
  .CodeMirror-linewidget {
      position: relative;
      z-index: 2;
      padding: 0.1px;
  }
  .CodeMirror-rtl {
      pre {
          direction: rtl;
      }
  }
  .CodeMirror-code {
      outline: none;
  }
  .CodeMirror-measure {
      position: absolute;
      width: 100%;
      height: 0;
      overflow: hidden;
      visibility: hidden;
      pre {
          position: static;
      }
  }
  div.CodeMirror-cursors {
      visibility: hidden;
      position: relative;
      z-index: 3;
  }
  div.CodeMirror-dragcursors {
      visibility: visible;
  }
  .CodeMirror-focused {
      div.CodeMirror-cursors {
          visibility: visible;
      }
      .CodeMirror-selected {
          background: #d7d4f0;
      }
  }
  .CodeMirror-selected {
      background: #d9d9d9;
  }
  .CodeMirror-crosshair {
      cursor: crosshair;
  }
  .CodeMirror-line {
      &::selection {
          background: #d7d4f0;
      }
      >span {
          &::selection {
              background: #d7d4f0;
          }
          >span {
              &::selection {
                  background: #d7d4f0;
              }
              &::-moz-selection {
                  background: #d7d4f0;
              }
          }
          &::-moz-selection {
              background: #d7d4f0;
          }
      }
      &::-moz-selection {
          background: #d7d4f0;
      }
  }
  .cm-searching {
      background-color: #ffa;
      background-color: rgba(255, 255, 0, .4);
  }
  .cm-force-border {
      padding-right: .1px;
  }
  .cm-tab-wrap-hack {
      &:after {
          content: '';
      }
  }
  span.CodeMirror-selectedtext {
      background: none;
  }

  .cm-s-material-darker.CodeMirror {
      background-color: #212121;
      color: #EEFFFF;
  }
  .cm-s-material-darker {
      .CodeMirror-gutters {
          background: #212121;
          color: #545454;
          border: none;
      }
      .CodeMirror-guttermarker {
          color: #545454;
      }
      .CodeMirror-guttermarker-subtle {
          color: #545454;
      }
      .CodeMirror-linenumber {
          color: #545454;
      }
      .CodeMirror-cursor {
          border-left: 1px solid #FFCC00;
      }
      div.CodeMirror-selected {
          background: rgba(97, 97, 97, 0.2);
      }
      .CodeMirror-line {
          &::selection {
              background: rgba(128, 203, 196, 0.2);
          }
          >span {
              &::selection {
                  background: rgba(128, 203, 196, 0.2);
              }
              >span {
                  &::selection {
                      background: rgba(128, 203, 196, 0.2);
                  }
                  &::-moz-selection {
                      background: rgba(128, 203, 196, 0.2);
                  }
              }
              &::-moz-selection {
                  background: rgba(128, 203, 196, 0.2);
              }
          }
          &::-moz-selection {
              background: rgba(128, 203, 196, 0.2);
          }
      }
      .CodeMirror-activeline-background {
          background: rgba(0, 0, 0, 0.5);
      }
      .cm-keyword {
          color: #C792EA;
      }
      .cm-operator {
          color: #89DDFF;
      }
      .cm-variable-2 {
          color: #EEFFFF;
      }
      .cm-variable-3 {
          color: #f07178;
          color: #DECB6B;
      }
      .cm-type {
          color: #f07178;
          color: #DECB6B;
      }
      .cm-builtin {
          color: #FFCB6B;
      }
      .cm-atom {
          color: #F78C6C;
      }
      .cm-number {
          color: #FF5370;
      }
      .cm-def {
          color: #82AAFF;
      }
      .cm-string {
          color: #C3E88D;
      }
      .cm-string-2 {
          color: #f07178;
      }
      .cm-comment {
          color: #545454;
      }
      .cm-variable {
          color: #f07178;
      }
      .cm-tag {
          color: #FF5370;
      }
      .cm-meta {
          color: #FFCB6B;
      }
      .cm-attribute {
          color: #C792EA;
      }
      .cm-property {
          color: #C792EA;
      }
      .cm-qualifier {
          color: #DECB6B;
      }
      .cm-error {
          color: rgba(255, 255, 255, 1.0);
          background-color: #FF5370;
      }
      .CodeMirror-matchingbracket {
          text-decoration: underline;
          color: white !important;
      }
  }
  .cm-s-material-darker.CodeMirror-focused {
      div.CodeMirror-selected {
          background: rgba(97, 97, 97, 0.2);
      }
  }
</style>

<span bind:this={wrapper} hidden><slot /></span>

<div class="cm-container" bind:this={cmContainer}>
</div>

