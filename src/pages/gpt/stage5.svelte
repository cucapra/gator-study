<script>
  import Tutorial from './_tutorial.svelte';
</script>

<Tutorial prev="stage4" next="stage6">
<span slot="text">
This is a good approximation for a light; however, in real life light does not tend to reflect off equally in all directions. Diffuse surfaces have the property to diffuse reflected light around. Light will enter the surface, bounce around there and then exit in a random direction. Or you can think that an atom will absorb the photon and after some time emits another photon to a different direction. Because of the diffusion of light, it does not matter at which angle we look at the material. All that matters is on which angle the light actually reaches the material.

Thus to create an accurate lighting model, we need to consider the idea of reference frames. A **reference frame** is a coordinate system in which we use to represent our objects in. This allows us to have one coordinate system for the model in the space, and a separate coordinate system for the camera moving around the object. Thus, the lighting will change based on the viewer’s relation to the object, giving us a much more accurate representation.
</span>

<span slot="code">
# TODO
</span>
</Tutorial>
