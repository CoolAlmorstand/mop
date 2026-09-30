



import type { ISimulationEngine } from "@mop/simulation-engine";
import type { IGamesManager } from "../interfaces/games-manager.js";

import { SimulationEngine } from "@mop/simulation-engine"


export class GamesManager implements IGamesManager {
  
  games: Record<string, ISimulationEngine> = {};

  constructor() {

  }

  async startGame(gameId: string): Promise<void> {
    this.games[gameId] = new SimulationEngine()
    this.games[gameId].start()
  }

  async terminateGame(gameId: string): Promise<void> {
     
  }

  async joinGame(playerId: string, username: string, gameId: string): Promise<void> {
    //todo later
    //check if offline storgae containers game

    if(!this.games[gameId]) {
      await this.startGame(gameId)
    }
    this.games[gameId].spawnNewPlayer(playerId, username)
  }
}
