<svelte:head>
	<title>MOP — Main Menu</title>
	<meta name="description" content="MOP main menu" />
</svelte:head>

<script lang="ts">
  import { goto } from "$app/navigation";


</script>


<main
	class="grid min-h-screen place-items-center bg-[#f4f0e7] bg-[radial-gradient(#b7b0a1_0.7px,transparent_0.7px)] bg-[size:5px_5px] p-5 font-mono text-[#191716] sm:p-7"
>
	<section
		class="relative w-full max-w-[520px] border-[3px] border-[#191716] bg-[#fffefa] px-7 pb-7 pt-11 shadow-[9px_9px_0_#191716] sm:px-14 sm:pt-[68px]"
		aria-label="Main menu"
	>
		<div class="absolute left-2.5 top-2.5 size-3 border-l-2 border-t-2 border-[#191716]" aria-hidden="true"></div>
		<div class="absolute right-2.5 top-2.5 size-3 border-r-2 border-t-2 border-[#191716]" aria-hidden="true"></div>
		<div class="absolute bottom-2.5 left-2.5 size-3 border-b-2 border-l-2 border-[#191716]" aria-hidden="true"></div>
		<div class="absolute bottom-2.5 right-2.5 size-3 border-b-2 border-r-2 border-[#191716]" aria-hidden="true"></div>

		<header class="text-center">
			<p class="mb-2 text-[0.66rem] font-bold tracking-[0.13em]">EST. 1987 · ONLINE ARCADE</p>
			<h1 class="-translate-x-[0.05em] font-serif text-[clamp(4.7rem,18vw,7.4rem)] font-bold leading-[0.77] tracking-[-0.11em]">MOP</h1>
			<div class="my-[25px] mb-[13px] flex items-center gap-2.5" aria-hidden="true">
				<span class="h-0.5 flex-1 bg-[#191716]"></span>
				<span class="text-sm">✦</span>
				<span class="h-0.5 flex-1 bg-[#191716]"></span>
			</div>
			<p class="text-[0.66rem] font-bold tracking-[0.13em]">MAKE · PLAY · REPEAT</p>
		</header>

		<nav class="mt-[41px]" aria-label="Main navigation">
			<ul class="space-y-3">
				<li>
					<button onclick={() => goto("/games")} class="grid w-full grid-cols-[28px_1fr_auto] items-center gap-2 border-2 border-[#191716] bg-[#191716] px-[15px] py-4 text-left font-mono text-[0.95rem] font-bold tracking-[0.09em] text-[#fffefa] transition hover:-translate-x-[3px] hover:-translate-y-[3px] hover:bg-[#31302d] hover:shadow-[4px_4px_0_#191716] focus-visible:-translate-x-[3px] focus-visible:-translate-y-[3px] focus-visible:bg-[#31302d] focus-visible:shadow-[4px_4px_0_#191716] focus-visible:outline-none" type="button">
						<span aria-hidden="true">▶</span><span>PLAY</span><span class="text-[0.65rem] opacity-70" aria-hidden="true">01</span>
					</button>
				</li>
				<li>
					<button class="grid w-full grid-cols-[28px_1fr_auto] items-center gap-2 border-2 border-[#191716] bg-transparent px-[15px] py-4 text-left font-mono text-[0.95rem] font-bold tracking-[0.09em] transition hover:-translate-x-[3px] hover:-translate-y-[3px] hover:bg-[#f1eadb] hover:shadow-[4px_4px_0_#191716] focus-visible:-translate-x-[3px] focus-visible:-translate-y-[3px] focus-visible:bg-[#f1eadb] focus-visible:shadow-[4px_4px_0_#191716] focus-visible:outline-none" type="button">
						<span aria-hidden="true">✦</span><span>SETTINGS</span><span class="text-[0.65rem] opacity-70" aria-hidden="true">02</span>
					</button>
				</li>
				<li>
					<button class="grid w-full grid-cols-[28px_1fr_auto] items-center gap-2 border-2 border-[#191716] bg-transparent px-[15px] py-4 text-left font-mono text-[0.95rem] font-bold tracking-[0.09em] transition hover:-translate-x-[3px] hover:-translate-y-[3px] hover:bg-[#f1eadb] hover:shadow-[4px_4px_0_#191716] focus-visible:-translate-x-[3px] focus-visible:-translate-y-[3px] focus-visible:bg-[#f1eadb] focus-visible:shadow-[4px_4px_0_#191716] focus-visible:outline-none" type="button">
						<span aria-hidden="true">♣</span><span>FRIENDS</span><span class="text-[0.65rem] opacity-70" aria-hidden="true">03</span>
					</button>
				</li>
			</ul>
		</nav>

		<footer class="mt-[35px] flex justify-between border-t-2 border-[#191716] pt-[15px] text-[0.6rem] font-bold tracking-[0.13em]">
			<span>SELECT A MODE</span>
			<span class="flex items-center gap-1.5"><i class="size-[7px] rounded-full bg-[#191716]"></i> SYSTEM READY</span>
		</footer>
	</section>
</main>
