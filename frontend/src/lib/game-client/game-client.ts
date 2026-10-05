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
    if(this.playerId) {
      this.simulation.movePlayer(input, this.playerId) 
      this.gameSocket.movePlayer(input)
    }
  }

  async initializeGame(): Promise<void> {

    //connect to server
    //
    //get from server from initial socket connection
    const { playerId, username } = await this.gameSocket.joinGame("20")

    console.log(playerId, username)

    this.simulation.spawnNewPlayer(playerId, username)
    this.simulation.start()
    this.playerId = playerId
  }
}






