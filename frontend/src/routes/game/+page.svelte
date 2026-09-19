<script lang="ts">
  import { createPixiApp } from "$lib/pixi-js/init";
  import { PixiRenderer } from "$lib/renderer/renderer";
  import { PixiMapRenderer } from "$lib/renderer/map-renderer/map-renderer";
  import { onMount } from "svelte";

  let divContainer: HTMLDivElement;

  onMount(async() => {
    const app = await createPixiApp(divContainer.clientWidth, divContainer.clientHeight, divContainer)
    const mapRenderer = new PixiMapRenderer()
    const renderer = new PixiRenderer(app, mapRenderer)

    // renderer.renderTest()
  })
  
</script>


<div bind:this={divContainer} class="h-[100dvh] w-[100-dvw]">

</div>
