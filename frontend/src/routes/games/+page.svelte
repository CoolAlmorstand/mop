<svelte:head>
	<title>Games — MOP</title>
	<meta name="description" content="Choose a game to play" />
</svelte:head>

<script lang="ts">
	const games = [
		{ title: 'Neon Drift', genre: 'RACING', players: '1–4 PLAYERS', art: 'ND', color: 'bg-[#ef6b4a]' },
		{ title: 'Starfall', genre: 'ARCADE SHOOTER', players: '1–2 PLAYERS', art: 'SF', color: 'bg-[#5b6fce]' },
		{ title: 'Tiny Tactics', genre: 'STRATEGY', players: '2–6 PLAYERS', art: 'TT', color: 'bg-[#7f9d58]' },
		{ title: 'Moon Match', genre: 'PUZZLE', players: '1–2 PLAYERS', art: 'MM', color: 'bg-[#c373a5]' }
	];
</script>

<main class="min-h-screen bg-[#f4f0e7] bg-[radial-gradient(#b7b0a1_0.7px,transparent_0.7px)] bg-[size:5px_5px] px-5 py-8 font-mono text-[#191716] sm:px-8 sm:py-12">
	<div class="mx-auto max-w-4xl">
		<header class="border-b-[3px] border-[#191716] pb-6 sm:flex sm:items-end sm:justify-between">
			<div>
				<p class="mb-2 text-[0.68rem] font-bold tracking-[0.16em]">MOP ARCADE · GAME LIBRARY</p>
				<h1 class="font-serif text-5xl font-bold leading-none tracking-[-0.07em] sm:text-6xl">CHOOSE A GAME</h1>
			</div>
			<button class="mt-5 inline-flex items-center gap-2 border-2 border-[#191716] bg-[#fffefa] px-4 py-3 text-xs font-bold tracking-[0.12em] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#191716] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191716] sm:mt-0" type="button">
				<span aria-hidden="true">↻</span> REFRESH LIST
			</button>
		</header>

		<div class="mt-5 flex items-center justify-between text-[0.66rem] font-bold tracking-[0.12em]">
			<span>4 GAMES AVAILABLE</span>
			<button class="border-b-2 border-[#191716] pb-0.5 transition hover:text-[#ef6b4a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191716]" type="button">↻ REFRESH</button>
		</div>

		<ul class="mt-5 grid gap-4 md:grid-cols-2">
			{#each games as game, index}
				<li class="group border-2 border-[#191716] bg-[#fffefa] p-3 shadow-[5px_5px_0_#191716] transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_#191716]">
					<div class={`grid aspect-[16/8] place-items-center border-2 border-[#191716] ${game.color}`}>
						<span class="font-serif text-6xl font-bold tracking-[-0.12em] text-[#fffefa] drop-shadow-[2px_2px_0_#191716]">{game.art}</span>
					</div>
					<div class="pt-4">
						<div class="flex items-start justify-between gap-3">
							<div>
								<p class="text-[0.63rem] font-bold tracking-[0.14em]">GAME 0{index + 1} · {game.genre}</p>
								<h2 class="mt-1 font-serif text-3xl font-bold leading-none tracking-[-0.05em]">{game.title}</h2>
							</div>
							<span class="border border-[#191716] px-1.5 py-1 text-[0.58rem] font-bold">READY</span>
						</div>
						<div class="mt-4 flex items-center justify-between border-t-2 border-[#191716] pt-3">
							<span class="text-[0.62rem] font-bold tracking-[0.1em]">{game.players}</span>
							<button class="border-2 border-[#191716] bg-[#191716] px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#fffefa] transition hover:bg-[#ef6b4a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191716]" type="button">PLAY →</button>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</main>
