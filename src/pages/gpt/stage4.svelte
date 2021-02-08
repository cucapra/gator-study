<script>
  import Tutorial from './_tutorial.svelte';
</script>

<Tutorial prev="stage3" next="stage5">
<span slot="text">
A diffuse model  assumes the light rays reflect off the surface equally in all directions. When a light ray is perpendicular to a surface, the intensity is the brightest, as all light rays are reflected off the surface. When the intensity is the lowest, the light ray is parallel to the object’s surface, as no rays are hitting the plane.
As the light ray moves from shining perpendicular to parallel to the surface, the proportion of reflected rays scales gradually from 1 to 0. We want this diffuse component to linearly scale down to zero. To do this we take the dot product of the normal at the point of the surface, and the normalized vector from the point to light source. 

We need this to return 1 if they are perpendicular, and 0 if they are parallel. Then we multiply this by our ambient light color.

The `gl_fragColor` is then set to the diffuse component, which is `vec4(lambertian * diffuseColor, 1.0);`.

Play around and change the diffuse color or Lambertian value to see how this affects the model.
</span>

<span slot="code">
# TODO
</span>
</Tutorial>
