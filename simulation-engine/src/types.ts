export type ITilesId = "grass" | "sand"
export type IEntityType = "player" | "sheep" | "cat"
export type IEntityDirection = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw"
export type IEntityAction = "running" | "idle"

export interface IGameEvents {
  entitiesMove: (entities: IEntity[]) => void;

  //returns entityId player entity
  createPlayer: (entityId: string) => void;
  gameTick: () => void;

}

export type IEntity = {
  x: number;
  y: number;
  hitboxtSize: {width: number, height: number};
  health: number;
  speed: number;
  attack: number;
  id: string;
  type: IEntityType;
  direction: IEntityDirection;
  currentAction: IEntityAction;
}


export type IITemTypes = "weapon" | "tool"

export type IItem = {
  displayName: string;
  id: string;
  isStackable: boolean;
  type: IITemTypes;
}

export type IPlayerEntity = IEntity & {
  username: string;
  inventory: IItem[];
}

export type IDirectionVector = {
  x: number;
  y: number;
}

export type IGameTickData = {
  entities: IEntity[]
}
