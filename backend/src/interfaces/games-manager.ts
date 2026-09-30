



import type { ISimulationEngine } from "@mop/simulation-engine"


export interface IGamesManager {
 
  //            gameId
  games: Record<string, ISimulationEngine>

  startGame(gameId: string): Promise<void>;
  terminateGame(gameId: string): Promise<void>;
  joinGame(playerId: string, username: string, gameId: string): Promise<void>;
}
