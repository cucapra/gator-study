# gator-study
Building a user study for Gator

I would recommend starting with [the website implementation document](https://github.com/cucapra/gator-study/blob/master/documentation/implementation.md) to get a sense of what we're building on the outline to get a sense of why we're building it.  Let [me](https://github.com/Checkmate50) know if you have any questions!


## serving

Try typing `npm start` to start the [Parcel][] server.

[parcel]: https://parceljs.org

## build js files from ocaml

If you edit the gator executable and need to rebuild the js file, in your gator submodule, enter these commands:

` dune build bin/gatorc.bc.js ` and then 
` node _build/default/bin/gatorc.bc.js `

Then place the created gator.bc.js file into the `/l` directory
