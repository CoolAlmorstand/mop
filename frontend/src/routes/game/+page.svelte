<script lang="ts">
  import { createPixiApp } from "$lib/pixi-js/init";
  import { PixiRenderer } from "$lib/renderer/renderer";
  import { PixiMapRenderer } from "$lib/renderer/map-renderer/map-renderer";
  import { GameClient } from "$lib/game-client/game-client";
  import { SimulationCore } from "@mop/simulation-core/src/index.ts"
  import { PixiEnitityRenderer } from "$lib/renderer/entity-renderer/entity-render";
  import { GameSocket } from "$lib/sockets/game";
  import { Controls } from "$lib/controls/controls";

  import { getTileTextureMap } from "$lib/utils/get-tile-texturemap";
  import { loadEntitySpritesheets } from "$lib/utils/load-entiry-spritesheets";


  import { onMount } from "svelte";

  let divContainer: HTMLDivElement;

  onMount(async() => {
    const app = await createPixiApp(divContainer.clientWidth, divContainer.clientHeight, divContainer)
    const simulation = new SimulationCore()
    const gameClient = new GameClient(simulation)
    const gameSocket = new GameSocket(gameClient)

    const tilesTextureMap = await getTileTextureMap()
    const entitySpriteSheets = await loadEntitySpritesheets()

    const mapRenderer = new PixiMapRenderer(tilesTextureMap)
    const entityRenderer = new PixiEnitityRenderer(entitySpriteSheets)

    const renderer = new PixiRenderer(app, mapRenderer, entityRenderer, gameClient)

    await gameClient.initializeGame()

    const controls = new Controls(gameClient, renderer, app.screen.width, app.screen.height)

    renderer.renderTest()
  })
  
</script>


<div bind:this={divContainer} class="h-[100dvh] w-[100-dvw]">

</div>
