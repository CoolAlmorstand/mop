
import type { IEntityType } from "./index.d"

type entityStats = {
  speed: number,
  health: number,
  attack: number,
  hitboxWidth:number,
  hitboxHeight: number
}

export const ENTITIES_BASE_STATS: Record<IEntityType, entityStats> = {
  player: {
    speed: 2,
    health: 20,
    attack: 5,
    hitboxWidth:32,
    hitboxHeight: 48
  },
  sheep: {
    speed: 2,
    health: 20,
    attack: 5,
    hitboxWidth:32,
    hitboxHeight: 48
  }
}
