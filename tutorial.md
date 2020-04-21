## Introduction

This docuement outlines a structure that could be used for a Gator tutorial attached to the Gator user study. This tutorial will be attached to the [website implementation](https://github.com/cucapra/gator-study/blob/master/implementation.md). All writing here is highly preliminary and is just a potential structure for what the tutorial will eventually look like.

## Information Overview

The goal of this tutorial is to write a simple fragment shader. As such, the user should be taught the basics of the geometry needed to calculate light angles and keep track of reference frames, but should not include details about the graphics pipeline, TypeScript model, or vertex shader beyond what is needed. It may be worthwhile and user-friendly to include an extended tutorial with such details, but that will be certainly omitted from the study itself.

To understand what the fragment shader does, I find it intuitive to explain that it takes in a pixel as input and outputs the color for that pixel, which is repeated for each pixel on the model. Examples using flat colors, positions, and normals all help refine this idea, while also introducing the notion of each of these variables.

We will introduce the diffuse lighting, specular lighting, spot lighting, and multiple light sources (all of which test geometry pretty intensively). To support these, we need to provide and introduce variables such as position, normals, and transformation matrices.  We will demonstrate diffuse lighting in code directly, and then have verbal instructions on how specular and spot lighting work to allow the user to program each themselves.

## Tutorial Structure

The tutorial will focus on first introducing fragment shaders, then introducing the idea of geometry and reference frames, and finally conclude with constructing lighting models.

### Fragment Shaders

At a high level, this section should introduce the idea of fragment shaders and give the user a chance to try editing a basic shader. We should likely focus on the notion that fragment shaders operate over each pixel separately to calculate the color of each and storing the result in `gl_FragColor`. As an example, we can color by `position` to show how the result varies over every pixel in the model. 

This also gives a chance to introduce the standard variables `position` and `normal` and have the user try using each of them. For the Gator people, we should mention here to ignore the type for now, since that will be introduced in the next section.

### Geometry

The geometry section has to essentially explain the three parts of the geometry type: coordinate schemes, frames, and objects. It is worth noting that these components do also need to be explained for GLSL lighting models, though they will be explained without the context of a type (so possibly explained after the initial lighting model setup). 

The core reason for all this work is to explain how transformations between reference frames work, since transformations must be in homogeneous coordinates and positions/normals work differently.  However, this can be operationally simplified in Gator to be `position in world` or whatever, so the understanding will have to be there less (something to note / consider).  In fact, I think `in` expressions should be introduced after having the user write a simple lighting model to help with this potential understanding difference between Gator and GLSL.

### Lighting Models

The ultimate goal of these explanations is to have the user writing simple lighting models.  As noted above, we should start by demonstrating the basic diffuse color lighting model, which has the dual benefit of showing off what the user can hope to look for (saving a lot of time) and giving some skeleton code to help with pattern-matching for the specular lighting model.  Also, the user should get the chance here to play with the lighting model a bit; changing the color and intensity / variables to see what happens.  Here also is a chance to see if people are frusterated by Gator types; if there are lots of failed compilation attempts while playing around, it might be that users are wanting to try things but Gator types are restricting that.

After giving this introduction, the user should have enough context to update the diffuse lighting model to support specular lighting (which requires computation in camera/view space).  After introducing specular lighting, the user should work with spotlighting to test an understanding of the lighting details (angle calculations) and multiple light sources to test an understanding of spaces by transforming each light into the correct space for calculations.