## Introduction

This document outlines the software structure that should be implemented for a Gator user study. In this, we will outline the study website structure, detail some ideas for how things should be implemented, and detail data collection. This document does _not_ provide a discussion on the [user study goals](https://github.com/cucapra/gator-study/blob/master/outline.md) or [the tutorial attached to the website](https://github.com/cucapra/gator-study/blob/master/tutorial.md); see each of the hyperlinked documents for further details on those topics.

## Website Structure

The goal is to build an interactive Gator environment that serves two goals:

1. Let users write Gator code in a browser and immediately see the rendered output. This way, people can learn and experiment with Gator in a totally self-directed way without installing anything. The use case is similar to Capra's [Braid dingus][].
2. Building on the self-directed environment, provide guidance in the form of tutorials that teach the user about *graphics programming* by teaching them the Gator language (or GLSL, depending on the experimental group). This will work by showing a mixture of tutorial text, pre-written code examples that can be loaded into the Gator execution environment, and prompts for exercises that encourage the learner to write Gator code themselves. The use case resembles [the Z3 tutorial in rise4fun][z3tut] and its code listings with "load in editor" buttons.

The core component is an interface with three panels: a tutorial, a window for writing Gator and GLSL, and a window for displaying the result. (In self-directed mode, the tutorial pane will be hidden.)

Building on this core interactive component, we will build the flow for the study itself. Users should first see a series of agreements and descriptions to setup the information needed for the study; then they should see the core interactive interface; then, finally, we will display an "exit survey" and debrief after completing the tutorial, with the option to continue trying out GLSL/Gator if interested.

Since the bulk of the website programming work will be in making the main interactive website, the rest of this section will focus on detailing each of the three windows and what will be required to program each.

[Braid dingus]: https://capra.cs.cornell.edu/braid/dingus/
[z3tut]: https://rise4fun.com/Z3/tutorial/guide

### Tutorial

The tutorial is the most straightforward window, only including rendered Markdown text with an option to go forward and backward in the tutorial. Each section of the tutorial will have an associated example code and image that gets pulled up when accessed. We should be able to write the main text for the tutorial in plain Markdown text files checked in to the git repository, and then compile the whole system to include the text. We will also need to build some front-end JavaScript to find all the loadable code samples in the rendered Markdown and add buttons to load them into the editor.

It might also be nice to have the functionality of hyperlinks or menus within the tutorial pull up different examples (such as a link that pulls up a flat color teapot vs a flat color bunny), though this might ultimately be unnecessary.

Some sections of the tutorial should have the user try and get code working in some way. As with other sections, these should load in a code skeleton to help the user get started with whatever task we are having them do. These sections should not be modifiable after the user has progressed (to capture that learning-experience feel), so it would be nice to have some sort of confirmation before the user proceeds.

(Adrian wonders if there's any possible way we can automatically check whether an exercise solution is correct. Probably not? We may need to judge that ourself manually for the study, unless we want to insist of pixel-perfect rendering. We could let users view a "golden" output and decide for themselves whether their output matches.)

### Interactive Code

Our interactive code window will provide an environment to write fragment shader code in either Gator or GLSL (depending on which the user was assigned).  All the backing TypeScript and vertex shader code should be pre-written, and provide several standard variables as needed. Initial proposed variables include position, normals, lightPosition, uModel, uView, uLight, and uProjection; in Gator, I expect these variables will all be pre-typed within example and skeleton code.

Compiling raw GLSL should be straightforward since it can be compiled directly in the browser at runtime.  Gator will be the real challenge here, as we will need to have the code run locally without requiring the user to install Gator.  Adrian proposed the use of [js_of_ocaml](https://github.com/ocsigen/js_of_ocaml), which seems like a reasonable choice to let the Gator compiler run in the browser (and avoid communication with a compiler on the server).

Updates to the code will update the image only when the user presses a `compile` button.  This design should help with data collection (see the later data collection section), and should help avoid user confusion of losing the image every time a small update is made.

### Reference Image

The reference image should be updated real-time and slowly rotate to show several angles.  It will be possible to rotate and pan the camera with the usual mouse controls. Several models should be available for reference (teapot, bunny, and dragon probably; plus, a gator if we can find a freeware gator or we can make one).  The model to view should be selectable from a menu. Only one model at a time should be sufficient for this study, though it is worth keeping the code flexible in case we end up wanting several models.

## Data Collection

The purpose of this user study is to collect data about how users interact with Gator vs GLSL, so data will be collected both at intervals as the user writes code and when the user marks the code as finished  In particular, we will collect the current state of the program whenever the user compiles the program and whenever the user submits the result.  

Whenever the program is captured, we will specifically capture the time since last compilation / start, the state of the code, and a snapshot of the current 3D model being displayed on the screen.  This must be done automatically and stored in a secure manner. We were advised to organize some sort of storage service; something Cornell-owned would probably be ideal. (We can request a Cornell-hosted virtual machine from CIT to deploy the system whenever we need it.) This data will later be evaluated by hand to evaluate both the accuracy of the code and the number of "invisible" bugs not captured by the type system.  For example, GLSL may have invisible geometry bugs not immediately obvious when the model is viewed, but that may become apparent as state changes.

### User Identification

With permission, we can collect the user's IP, which seems important to track users across sessions.  This is low priority since our first study will be in a session-based setting rather than freely online, but it is worth considering with design and general data collection.

(Adrian also thinks we could consider collecting a randomly-generated opaque ID instead of an IP address, which might be preferable because it will prevent us from discovering users' location, etc.)
