const sveltePreprocess = require('svelte-preprocess');
const postcssImport = require('postcss-import');

const isNollup = !!process.env.NOLLUP;
const production = !process.env.ROLLUP_WATCH;

module.exports = {
  dev: !production, // run-time checks
  // Extract component CSS — better performance
  css: css => css.write(`bundle.css`),
  hot: isNollup,
  preprocess: [
      sveltePreprocess({
          postcss: {
            plugins: [postcssImport()]
          },
          defaults: {
            style: 'scss',
            script: 'typescript',
          },
          scss: {
            prependData: "@import 'assets/styles/variables.scss';",
          }
      })
  ]
};

