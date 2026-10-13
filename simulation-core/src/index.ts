

import type { IEntityType, IGameState, IMovementInput, IEntity, ISumaltionCore, ICollision, IEntityAction } from "./types.ts"
import { Box, System } from "check2d"
export * from "./types.ts"

type entityStats = {
  speed: number,
  health: number,
  attack: number,
  hitboxWidth:number,
  hitboxHeight: number
}

export const ENTITIES_BASE_STATS: Record<IEntityType, entityStats> = {
  player: {
    speed: 5,
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
  },
  cat: {
    speed: 2,
    health: 20,
    attack: 5,
    hitboxWidth:32,
    hitboxHeight: 48
  }
}



export class SimulationCore implements ISumaltionCore {
  entities: Record<string, IEntity> = {};
  entitiesArray: IEntity[] = [];
  collisionContainer: System = new System();
  collisionBodies: Record<string, Box> = {};
  
  constructor() {

  }

  tryMovePlayer(playerId: string, movementInput: IMovementInput): { targetX: number; targetY: number; collisions: ICollision[] } {
    const player = this.entities[playerId]
    const playerBody = this.collisionBodies[playerId]
    const targetX = player.x + movementInput.x * movementInput.scale * player.speed
    const targetY = player.y + movementInput.y * movementInput.scale * player.speed
    const collisions: ICollision[] = []
    const bodyIds = new Map(Object.entries(this.collisionBodies).map(([id, body]) => [body, id]))

    playerBody.setPosition(targetX, targetY)
    this.collisionContainer.checkOne(playerBody, (response) => {
      collisions.push({
        pushOutVector: {
          x: -response.overlapN.x,
          y: -response.overlapN.y,
          scale: response.overlap
        },
        collidedWithId: bodyIds.get(response.b)!
      })

      return false
    })
    playerBody.setPosition(player.x, player.y)

    collisions.sort((first, second) => {
      const firstEntity = this.entities[first.collidedWithId]
      const secondEntity = this.entities[second.collidedWithId]
      return Math.hypot(firstEntity.x - player.x, firstEntity.y - player.y) -
        Math.hypot(secondEntity.x - player.x, secondEntity.y - player.y)
    })

    return { targetX, targetY, collisions }
  }

  moveEntity(entityId: string, x: number, y: number): void {
    const player = this.entities[entityId]
    const deltaX = x - player.x
    const deltaY = y - player.y

    if (deltaX !== 0 || deltaY !== 0) {
      const directions = ["n", "ne", "e", "se", "s", "sw", "w", "nw"] as const
      const angle = Math.atan2(deltaX, -deltaY)
      const directionIndex = Math.floor((angle + Math.PI / 8 + Math.PI * 2) % (Math.PI * 2) / (Math.PI / 4))
      player.direction = directions[directionIndex]
    }

    player.x = x
    player.y = y

    this.collisionBodies[entityId].x = x
    this.collisionBodies[entityId].y = y
  }

  updateEntityCurrentAction(entityId: string, enitityType: string, newAction: IEntityAction): void {
    this.entities[entityId].currentAction = newAction
  }

  spawnPlayer(name: string, playerId: string, x: number, y: number) {
    const player: IEntity = {
      type: "player",
      x: x ? x : 20,
      y: y ? y : 20,
      hitboxtSize: {
        width: ENTITIES_BASE_STATS.player.hitboxWidth,
        height: ENTITIES_BASE_STATS.player.hitboxHeight
      },
      health: ENTITIES_BASE_STATS.player.health,
      speed: ENTITIES_BASE_STATS.player.speed,
      id: playerId,
      attack: ENTITIES_BASE_STATS.player.attack,
      currentAction: "idle",
      direction: "s",
      name
    }

    this.entities[playerId] = player
    this.entitiesArray.push(player)

    const box = this.collisionContainer.createBox(
      {x, y},
      player.hitboxtSize.width,
      player.hitboxtSize.height
    )

    this.collisionBodies[playerId] = box
  } 
}
