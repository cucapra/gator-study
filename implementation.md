## Introduction

This document outlines the software structure that should be implemented for a Gator user study. In this, we will outline the study website structure, detail some ideas for how things should be implemented, and detail data collection. This document does _not_ provide a discussion on the [user study goals](https://github.com/cucapra/gator-study/blob/master/outline.md) or [the tutorial attached to the website](https://github.com/cucapra/gator-study/blob/master/tutorial.md); see each of the hyperlinked documents for further details on those topics.

## Website Structure

The Gator user study will be built around a website accessible by the study group (initially privately accessible and later publicly accessible once the website has been refined). Users should first see a series of agreements and descriptions to setup the information needed for the study. After these have been resolved, the main website should consist of three panels: a tutorial, a window for writing Gator and GLSL, and a window for displaying the result. For reference, this main website will probably look something like a mix between Microsoft's [rise4fun tutorials (such as z3)](https://rise4fun.com/Z3/tutorial/guide) and Capra's [braid dingus](https://capra.cs.cornell.edu/braid/dingus/). Finally, the user will be shown a survey and debrief after completing the tutorial, with the option to continue trying out GLSL/Gator if interested.

Since the bulk of the website programming work will be in making the main interactive website, the rest of this section will focus on detailing each of the three windows and what will be required to program each.

### Tutorial

The tutorial is the most straightforward window, only including markdown text with an option to go forward and backward in the tutorial. Each section of the tutorial will have an associated example code and image that gets pulled up when accessed. It might also be nice to have the functionality of hyperlinks or menus within the tutorial pull up different examples (such as a link that pulls up a flat color teapot vs a flat color bunny), though this might ultimately be unnecessary.

Some sections of the tutorial should have the user try and get code working in some way.  As with other sections, these should load in a code skeleton to help the user get started with whatever task we're having them do.  These sections should not be modifiable after the user has progressed (to capture that learning-experience feel), so it would be nice to have some sort of confirmation before the user proceeds.

### Interactive Code

Our interactive code window will provide code 
