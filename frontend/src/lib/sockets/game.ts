import { io } from "socket.io-client"
import type { Socket } from "socket.io-client"

import type { IGameSocket } from "$lib/interfaces/game-socket";
import type { ISimulationEngine } from "@mop/simulation-engine";

const serverUrl = import.meta.env.VITE_SERVER_URL


export class GameSocket implements IGameSocket {

  private simulation: ISimulationEngine;
  private io: Socket;

  constructor(simulation: ISimulationEngine) {
    this.simulation = simulation
    this.io = io(`${serverUrl}/game`)
  }
}
