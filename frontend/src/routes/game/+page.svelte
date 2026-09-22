<script lang="ts">
  import { createPixiApp } from "$lib/pixi-js/init";
  import { PixiRenderer } from "$lib/renderer/renderer";
  import { PixiMapRenderer } from "$lib/renderer/map-renderer/map-renderer";
  import { RenderEntity } from "$lib/renderer/entity-renderer/render-entity";
  import { MopGame } from "$lib/game/game"
  import { PixiEnitityRenderer } from "$lib/renderer/entity-renderer/entity-render";
  import { Controls } from "$lib/controls/controls";

  import { getTileTextureMap } from "$lib/utils/get-tile-texturemap";
  import { loadEntitySpritesheets } from "$lib/utils/load-entiry-spritesheets";


  import { onMount } from "svelte";

  let divContainer: HTMLDivElement;

  onMount(async() => {
    const app = await createPixiApp(divContainer.clientWidth, divContainer.clientHeight, divContainer)
    const game = new MopGame()

    const tilesTextureMap = await getTileTextureMap()
    const entitySpriteSheets = await loadEntitySpritesheets()

    const mapRenderer = new PixiMapRenderer(tilesTextureMap)
    const entityRenderer = new PixiEnitityRenderer(entitySpriteSheets)

    const renderer = new PixiRenderer(app, mapRenderer, entityRenderer, game)
    const controls = new Controls(game, app.screen.width, app.screen.height)
    renderer.mountContainer(2, controls.container)

    game.initGame()
    renderer.renderTest()
    game.startGame()
  })
  
</script>


<div bind:this={divContainer} class="h-[100dvh] w-[100-dvw]">

</div>
