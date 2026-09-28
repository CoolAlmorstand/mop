import { EventEmitter } from "eventemitter3";
import type { IGame } from "../interfaces/game.js";
import { ENTITIES_BASE_STATS } from "@mop/shared-types";
import type {
  IDirectionVector,
  IEntity,
  IEntityDirection,
  IGameEvents,
  IPlayerEntity,
} from "@mop/shared-types";

const TICK_INTERVAL_MS = 1000 / 60;

export class Game implements IGame {
  id: string;
  event: EventEmitter<IGameEvents>;

  private entities: IEntity[] = [];
  private players: Record<string, IPlayerEntity> = {};
  private timeInterval?: ReturnType<typeof setInterval>;

  constructor(id: string) {
    this.id = id;
    this.event = new EventEmitter();
  }

  start(): void {
    if (this.timeInterval) return;
    this.timeInterval = setInterval(() => this.tick(), TICK_INTERVAL_MS);
  }

  pause(): void {
    if (!this.timeInterval) return;
    clearInterval(this.timeInterval);
    this.timeInterval = undefined;
  }

  spawnNewPlayer(userId: string, username: string): void {
    if (this.players[userId]) return;

    const stats = ENTITIES_BASE_STATS.player;
    const player: IPlayerEntity = {
      id: userId,
      username,
      x: 0,
      y: 0,
      hitboxtSize: { width: stats.hitboxWidth, height: stats.hitboxHeight },
      health: stats.health,
      speed: stats.speed,
      attack: stats.attack,
      type: "player",
      direction: "s",
      currentAction: "idle",
      inventory: [],
    };

    this.players[userId] = player;
    this.entities.push(player);
    this.event.emit("createPlayer", userId);
  }

  playerMove(entityId: string, direction: IDirectionVector): void {
    const player = this.players[entityId];
    if (!player) return;

    const isMoving = direction.x !== 0 || direction.y !== 0;
    player.currentAction = isMoving ? "running" : "idle";
    if (!isMoving) return;

    player.direction = this.getDirectionFromVector(direction);
    player.x += direction.x * player.speed;
    player.y += direction.y * player.speed;
    this.event.emit("entitiesMove", [player]);
  }

  private tick(): void {
    this.event.emit("gameTick");
  }

  private getDirectionFromVector(direction: IDirectionVector): IEntityDirection {
    const angle = Math.atan2(direction.y, direction.x) * (180 / Math.PI);

    if (angle >= -22.5 && angle < 22.5) return "e";
    if (angle >= 22.5 && angle < 67.5) return "se";
    if (angle >= 67.5 && angle < 112.5) return "s";
    if (angle >= 112.5 && angle < 157.5) return "sw";
    if (angle >= 157.5 || angle < -157.5) return "w";
    if (angle >= -157.5 && angle < -112.5) return "nw";
    if (angle >= -112.5 && angle < -67.5) return "n";
    return "ne";
  }
}
