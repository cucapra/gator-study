# gator-study
Building a user study for Gator

I would recommend starting with [the website implementation document](https://github.com/cucapra/gator-study/blob/master/documentation/implementation.md) to get a sense of what we're building on the outline to get a sense of why we're building it.  Let [me](https://github.com/Checkmate50) know if you have any questions!

## Codebase

This uses the [Svelte](https://svelte.dev/) framework for the frontend, with the [Routify](https://routify.dev/) scaffolding for it. It uses [Express](https://expressjs.com/) for the backend. 

First: `npm i`.

To start the server, you probably want to do `npm run dev:server`, which compiles the
Svelte components to static files, and starts the Express server. This does not have automatic
reloading for client JS, but does for server-side JS.

Alternatives are `npm run dev`, which has instant reloads and is good for frontend/layout stuff.
Also `npm run dev:ssr`, which has slower reloads but actually reports TypeScript errors properly in
Svelte components, and has SSR, if anyone needs that. 

### Selected files
```
.
├── api                       --- This is where the server-side things live
│  ├── gatorc                   --- The gator executable
│  └── server.ts                --- Express server file, handles POST compilation requests
├── assets                    --- Static assets
├── documentation             --- The other things you should read
├── README.md                 <-- You are here
├── src                       --- Client-side code
│  ├── App.svelte               --- Entry point
│  ├── components               --- Svelte components
│  ├── globals.d.ts             --- Typescript globals (maybe there's a better place?)
│  ├── main.ts                  --- Main TS file
│  ├── modules                  --- TS modules
│  │  ├── glHelpers.ts            --- Random stateless WebGL API helpers
│  │  ├── renderer.ts             --- WebGL API class wrapper
│  │  └── utils.ts                --- Random utils
│  ├── pages                    --- Files in here have a 1-to-1 correspondence with routes
│  │  └── playground.svelte       --- A Gator playground
├── rollup.config.js          --- Rollup config file
├── svelte.config.js          --- Svelte config file
└── tsconfig.json             --- Typescript config file
```

## build js files from ocaml

If you edit the gator executable and need to rebuild the js file, in your gator submodule, enter these commands:

` dune build bin/gatorc.bc.js ` and then 
` node _build/default/bin/gatorc.bc.js `

Then place the created gator.bc.js file into the `/l` directory

