
import type { IGameEvents } from "@mop/shared-types"
import type EventEmmitter from "eventemitter3"


export interface IGame {
  event: EventEmmitter<IGameEvents>;
}


















