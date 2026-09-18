<script lang="ts">
  import { createPixiApp } from "$lib/pixi-js/init";
  import { onMount } from "svelte";

  let divContainer: HTMLDivElement;

  onMount(async() => {
    const app = await createPixiApp(divContainer.clientWidth, divContainer.clientHeight, divContainer)
  })
  
</script>


<div bind:this={divContainer} class="h-[100dvh] w-[100-dvw]">

</div>
