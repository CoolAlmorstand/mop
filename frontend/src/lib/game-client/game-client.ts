import type { IGameClient } from "$lib/interfaces/game-client";
import type { IGameSocket } from "$lib/interfaces/game-socket";
import type { IMovementInput, ISimulationEngine } from "@mop/simulation-engine";


export class GameClient implements IGameClient {

  private simulation: ISimulationEngine;
  private gameSocket: IGameSocket;
  private playerId!: string;

  constructor(simulation: ISimulationEngine, gameSocket: IGameSocket) {
    this.simulation = simulation
    this.gameSocket = gameSocket
  }

  movePlayer(input: IMovementInput): void {
    console.log(input)
    if(this.playerId) {
      this.simulation.movePlayer(input, this.playerId) 
    }
  }

  async initializeGame(): Promise<void> {

    //connect to server
    //
    //get from server from initial socket connection
    const playerId = "12345" 
    const username = "aoifeaj"

    this.simulation.spawnNewPlayer(playerId, username)
    this.simulation.start()
    this.playerId = playerId

  }
}






