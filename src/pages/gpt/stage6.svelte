<script>
  import Tutorial from './_tutorial.svelte';
</script>

<Tutorial prev="stage4">
<span slot="text">
The Phong lighting model is a more realistic lighting model which combines ambient, diffuse, and specular components. 

**Ambient** = Uniform on all points of surface, disregards light source, usually low intensity. Set to any color.

**Diffuse** = Ray assumed to deflect off surface equally in all directions, so camera position is irrelevant full intensity when ray is perpendicular to surface. Falls off to zero when parallel to surface.

**Specular** = Ray deflected off surface at inverse angle, so camera position matters; This creates bright highlights. 

**Phong** = **Ambient** + **Diffuse** + **Specular**

You have already created the ambient and diffuse components in the last two parts of this tutorial. Now create the specular and combine it with the ambient and diffuse.

Most surfaces have an amount of specular reflection. This means that some part of the incoming light will reflect in the reflected direction. If the viewer is looking from that direction, the area of the surface will seem lighter than the rest of the surface.

To calculate the specular angle, you take the dot product of the normalized vector of light reflected off the surface and the normalized vector from point to camera. Then put this value to the power of a constant exponent which determines the highlight size. 
Any value greater than 1 works as this constant exponent! Feel free to play around with the exponent to find a highlight size which you think looks most realistic.

**R** = normalized vector of light reflected off the surface

**C** = normalized vector from point to camera

**K** = constant exponent

Specular component = `exp(max(dot(R,C), 0), k) * lightcolor`.
</span>

<span slot="code">
# TODO
</span>
</Tutorial>
