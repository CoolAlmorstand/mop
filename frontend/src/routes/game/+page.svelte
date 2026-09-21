<script lang="ts">
  import { createPixiApp } from "$lib/pixi-js/init";
  import { PixiRenderer } from "$lib/renderer/renderer";
  import { PixiMapRenderer } from "$lib/renderer/map-renderer/map-renderer";
  import { RenderEntity } from "$lib/renderer/entity-renderer/render-entity";
  import { PixiEnitityRenderer } from "$lib/renderer/entity-renderer/entity-render";

  import { getTileTextureMap } from "$lib/utils/get-tile-texturemap";
  import { loadEntitySpritesheets } from "$lib/utils/load-entiry-spritesheets";


  import { onMount } from "svelte";

  let divContainer: HTMLDivElement;

  onMount(async() => {
    const app = await createPixiApp(divContainer.clientWidth, divContainer.clientHeight, divContainer)

    const tilesTextureMap = await getTileTextureMap()
    const entitySpriteSheets = await loadEntitySpritesheets()

    const mapRenderer = new PixiMapRenderer(tilesTextureMap)
    const entityRenderer = new PixiEnitityRenderer()

    const renderer = new PixiRenderer(app, mapRenderer, entityRenderer)

    const player = new RenderEntity(entitySpriteSheets["player"], "1", "player")

    entityRenderer.test(player)

    renderer.renderTest()
  })
  
</script>


<div bind:this={divContainer} class="h-[100dvh] w-[100-dvw]">

</div>
