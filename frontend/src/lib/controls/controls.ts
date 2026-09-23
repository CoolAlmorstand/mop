import type { IDirectionVector } from "@mop/shared-types";
import type { IMopControls } from "$lib/interfaces/controls";
import type { IGame } from "$lib/interfaces/game";
import { Container, Sprite, Text, Texture, type FederatedPointerEvent } from "pixi.js";

const CONTROL_SIZE = 50;
const JOYSTICK_RADIUS = 30;

type DirectionName = "up" | "down" | "left" | "right";

const DIRECTIONS: Record<DirectionName, IDirectionVector> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

/** Collects keyboard and touch movement input for the local player. */
export class Controls implements IMopControls {
  container = new Container();

  private activeDirections = new Set<DirectionName>();
  private joystickDirection: IDirectionVector = { x: 0, y: 0 };
  private joystickCenter = { x: 0, y: 0 };
  private joystickKnob: Sprite;

  constructor(private game: IGame, width: number, height: number) {
    // The world is rendered at 4x, but the HUD uses screen pixels.
    this.container.scale.set(0.5);
    this.container.eventMode = "static";

    this.joystickKnob = this.createJoystick();
    this.createButtons(width, height);
    this.layout(width, height);
    this.setupKeyboardInput();

    this.game.event.on("gameTick", this.sendMovementInput)
  }

  private createControlSprite(size: number, tint: number, alpha = 1): Sprite {
    const sprite = new Sprite(Texture.WHITE);
    sprite.anchor.set(0.5);
    sprite.width = size;
    sprite.height = size;
    sprite.tint = tint;
    sprite.alpha = alpha;
    return sprite;
  }

  private createJoystick(): Sprite {
    const base = this.createControlSprite(JOYSTICK_RADIUS * 2, 0x1f2937, 0.55);
    base.eventMode = "static";
    base.cursor = "pointer";
    base.on("pointerdown", (event) => this.updateJoystick(event));
    base.on("pointermove", (event) => {
      if (event.buttons > 0) {
        this.updateJoystick(event);
      }
    });
    base.on("pointerup", this.releaseJoystick);
    base.on("pointerupoutside", this.releaseJoystick);
    this.container.addChild(base);

    const knob = this.createControlSprite(38, 0xffffff, 0.8);
    this.container.addChild(knob);
    return knob;
  }

  private createButtons(width: number, height: number): void {
    const labels = ["A", "B", "C", "D"];
    const startX = width - 126;
    const startY = height - 126;

    labels.forEach((label, index) => {
      const buttonContainer = new Container()
      const text = new Text({
        text: label,
        style: {
          fill: "#ffffff",
          fontSize: 16
        }
      })
      const button = this.createControlSprite(CONTROL_SIZE, 0x374151, 0.8);
      button.position.set(
        startX + (index % 2) * CONTROL_SIZE + ( (index % 2) * 10) ,
        startY + Math.floor(index / 2) * CONTROL_SIZE + ( Math.floor(index / 2) * 10) 
      );
      
      text.position.set(
        startX + (index % 2) * CONTROL_SIZE + ( (index % 2) * 10) ,
        startY + Math.floor(index / 2) * CONTROL_SIZE + ( Math.floor(index / 2) * 10)
      )
      text.anchor.set(0.5, 0.5)

      buttonContainer.addChild(button);
      buttonContainer.addChild(text)
      this.container.addChild(buttonContainer)
    });
  }

  private layout(width: number, height: number): void {
    this.joystickCenter = { x: 96, y: height - 96 };
    const joystickBase = this.container.children[0];
    joystickBase.position.set(this.joystickCenter.x, this.joystickCenter.y);
    this.joystickKnob.position.set(this.joystickCenter.x, this.joystickCenter.y);
  }

  private setupKeyboardInput(): void {
    const keyToDirection: Record<string, DirectionName> = {
      w: "up",
      a: "left",
      s: "down",
      d: "right"
    };

    window.addEventListener("keydown", (event) => {
      const direction = keyToDirection[event.key.toLowerCase()];
      if (direction) {
        event.preventDefault();
        this.activeDirections.add(direction);
      }
    });
    window.addEventListener("keyup", (event) => {
      const direction = keyToDirection[event.key.toLowerCase()];
      if (direction) {
        this.activeDirections.delete(direction);
      }
    });
    window.addEventListener("pointerup", this.releaseJoystick);
    window.addEventListener("pointercancel", this.releaseJoystick);
  }

  private updateJoystick(event: FederatedPointerEvent): void {
    const point = this.container.toLocal(event.global);
    const deltaX = point.x - this.joystickCenter.x;
    const deltaY = point.y - this.joystickCenter.y;
    const distance = Math.hypot(deltaX, deltaY);
    const scale = distance > JOYSTICK_RADIUS ? JOYSTICK_RADIUS / distance : 1;

    this.joystickKnob.position.set(
      this.joystickCenter.x + deltaX * scale,
      this.joystickCenter.y + deltaY * scale
    );
    this.joystickDirection = distance === 0
      ? { x: 0, y: 0 }
      : { x: deltaX / distance, y: deltaY / distance };
  }

  private releaseJoystick = (): void => {
    this.joystickDirection = { x: 0, y: 0 };
    this.joystickKnob.position.set(this.joystickCenter.x, this.joystickCenter.y);
  };

  private sendMovementInput = (): void => {
    let x = this.joystickDirection.x;
    let y = this.joystickDirection.y;
    this.activeDirections.forEach((direction) => {
      x += DIRECTIONS[direction].x;
      y += DIRECTIONS[direction].y;
    });

    const length = Math.hypot(x, y);
    this.game.movePlayer(length > 0
      ? { x: x / length, y: y / length }
      : { x: 0, y: 0 });
  };
}
