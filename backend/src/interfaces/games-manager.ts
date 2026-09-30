



import type { ISimulationEngine } from "@mop/simulation-engine"


export interface IGamesManager {
 
  //            gameId
  games: Record<string, ISimulationEngine>

  startGame(gameId: string): void;
  terminateGame(gameId: string): void;
}
