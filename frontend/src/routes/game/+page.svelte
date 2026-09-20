<script lang="ts">
  import { createPixiApp } from "$lib/pixi-js/init";
  import { PixiRenderer } from "$lib/renderer/renderer";
  import { PixiMapRenderer } from "$lib/renderer/map-renderer/map-renderer";
  import { getTileTextureMap } from "$lib/utils/get-tile-texturemap";

  import { onMount } from "svelte";

  let divContainer: HTMLDivElement;

  onMount(async() => {
    const app = await createPixiApp(divContainer.clientWidth, divContainer.clientHeight, divContainer)

    const tilesTextureMap = await getTileTextureMap()

    console.log(tilesTextureMap)

    const mapRenderer = new PixiMapRenderer(tilesTextureMap)
    const renderer = new PixiRenderer(app, mapRenderer)

    renderer.renderTest()
  })
  
</script>


<div bind:this={divContainer} class="h-[100dvh] w-[100-dvw]">

</div>
