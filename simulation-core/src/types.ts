export type ITilesId = "grass" | "sand"
export type IEntityType = "player" | "sheep" | "cat"
export type IEntityDirection = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw"
export type IEntityAction = "running" | "idle"
import type { Box, System } from "check2d"

export interface IGameEvents {
  entitiesMove: (entities: IEntity[]) => void;

  //returns entityId player entity
  createPlayer: (entityId: string) => void;
  gameTick: (data: IGameTickData) => void;

}


export type ICollision = {
  pushOutVector: {x: number, y: number, scale: number};
  //id of the entity you colided with
  collidedWithId: string;
}

export interface ISumaltionCore {
  entities: Record<string, IEntity>;
  entitiesArray: IEntity[];
  collisionContainer: System;
  collisionBodies: Record<string, Box>;

  tryMovePlayer(playerId: string, movementInput: IMovementInput): { targetX: number; targetY: number, collisions: ICollision[]};
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
  name: string | null;
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
  inventory: IItem[];
}

export type IDirectionVector = {
  x: number;
  y: number;
}

export type IIMpulse = {
  x: number;
  y: number;
  scale: number;
}


export type IMovementInput = {
  x: number;
  y: number;
  scale: number;
}

export type IGameTickEvents = {
  eventType: "playerSpawn"
  username: string;
  entityId: string;
  x: number;
  y: number;
} | {
  eventType: "entitySpawn";
  entityType: IEntityType;
  name?: string;
  entityId: string;
  x: number;
  y: number;

} | {
  eventType: "entityDie";
  entityType: IEntityType;
  entityId: string;
  x: number;
  y: number;
} | {
  eventType: "entityMove";
  entityType: string;
  entityId: string;
  prevX: number;
  prevY: number;
  targetX: number;
  targetY: number;
}


export type ITiles = {
  type: ITilesId;
  x: number;
  y: number;
}

export type IChunk = ITiles[][];


export type IGameState = {
  entities: Record<string, IEntity>;  
  entitiesArray: IEntity[];
  currentTick: number;
  loadedChunks: [];
}

export type IGameTickData = {
  entities: Record<string, IEntity>;
  entitiesArray: IEntity[];
  gameTickEvents: IGameTickEvents[];
}






