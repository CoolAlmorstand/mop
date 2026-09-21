

export type ITilesId = "grass" | "sand"
export type IEntityType = "player" | "sheep"


export type IEntity = {
  x: number;
  y: number;
  hitboxtSize: {width: number, height: number};
  health: number;
  speed: number;
  attack: number;
  id: string;
}



export interface IGameEvents {
  entitiesMove: (entities: IEntity[]) => void;
}


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

