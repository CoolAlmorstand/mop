import type { IDirectionVector } from "@mop/shared-types";
import type { IMopControls } from "$lib/interfaces/controls";
import type { IGame } from "$lib/interfaces/game";
import { Container, Sprite, Text, Texture, Rectangle, type FederatedPointerEvent } from "pixi.js";



export class Controls implements IMopControls {
  container: Container = new Container();

  private controlSurface: Container = new Container();

  //contains all the control sprites for visueal only
  private controlsContainer: Container = new Container();

  private game: IGame;
  private screenWidth: number;
  private screenHeight: number;
  
  private joystickPointerId: number | null = null

  private buttonDefinitions: Record<string, {
    x: number;
    y: number;
    width: number
    height: number
  }> = {};
  
  constructor(game: IGame, screenWidth: number, screenHeight: number) {
    this.game = game;
    this.screenWidth = screenWidth 
    this.screenHeight = screenHeight

    this.setupButtonDefinitions()
    this.createActionButtons()
    this.createJoystick()

    this.controlsContainer.eventMode = "none"
    this.container.addChild(this.controlsContainer)

    //must be added last inorder to on top of all other elements
    this.container.addChild(this.controlSurface)
    this.setupControlSurfaceEvents()
  }

  private getHitButton(x: number, y: number): string | void {

    const globalPos = this.controlSurface.toGlobal({
      x,
      y
    })

    const localPoint = this.controlsContainer.toLocal(globalPos)

    for(const [buttonId, definition] of Object.entries(this.buttonDefinitions)) {
      if(buttonId == "joystickKnob") {
        continue
      }
      if(localPoint.x < definition.x || localPoint.x > definition.x + definition.width) {
        continue
      }
      if(localPoint.y < definition.y || localPoint.y > definition.y + definition.height) {
        continue
      }
      return buttonId
    }
  }

  private setupControlSurfaceEvents() {

    this.controlSurface.eventMode = "static"
    this.controlSurface.hitArea = new Rectangle(
      0,
      0,
      this.screenWidth,
      this.screenHeight
    )

    this.controlSurface.on("pointerdown", (event) => {
      const hitButton = this.getHitButton(event.x, event.y)
      if(hitButton == "joystick") {
        this.joystickPointerId = event.pointerId
      }
    })

    this.controlSurface.on("pointertap", (event) => {
      console.log(event.x, event.y)
      const hitButton = this.getHitButton(event.x, event.y)
      console.log(hitButton)
    })
  }

  private setupButtonDefinitions() {

    const actionButtonsSize = 55
    const actionButtonCornerPadding = 20
    const joystickPadding = {x: 20, y: 40}
    const joystickRadius = 40
    const joystickKnobSize = 40

    this.buttonDefinitions["actionButtonA"] = {
      x: this.screenWidth - actionButtonCornerPadding - ( actionButtonsSize * 2 ) - 8,
      y: this.screenHeight - actionButtonCornerPadding - ( actionButtonsSize * 2 ) - 8,
      width: actionButtonsSize,
      height: actionButtonsSize,
    }

    this.buttonDefinitions["actionButtonB"] = {
      x: this.screenWidth - actionButtonCornerPadding - actionButtonsSize,
      y: this.screenHeight - actionButtonCornerPadding - ( actionButtonsSize * 2 ) - 8,
      width: actionButtonsSize,
      height: actionButtonsSize,
    }

    this.buttonDefinitions["actionButtonC"] = {
      x: this.screenWidth - actionButtonCornerPadding - ( actionButtonsSize * 2 ) - 8,
      y: this.screenHeight - actionButtonCornerPadding - actionButtonsSize,
      width: actionButtonsSize,
      height: actionButtonsSize,
    }

    this.buttonDefinitions["actionButtonD"] = {
      x: this.screenWidth - actionButtonCornerPadding - actionButtonsSize,
      y: this.screenHeight - actionButtonCornerPadding - actionButtonsSize,
      width: actionButtonsSize,
      height: actionButtonsSize,
    }

    this.buttonDefinitions["joystick"] = {
      x: joystickPadding.x,
      y: this.screenHeight - ( joystickRadius * 2 ) - joystickPadding.y,
      width: joystickRadius * 2,
      height: joystickRadius * 2
    }

    this.buttonDefinitions["joystickKnob"] = {
      x: joystickPadding.x + joystickRadius - ( joystickKnobSize / 2 ),
      y: this.screenHeight - joystickPadding.y - ( joystickRadius * 2 ) + joystickRadius - ( joystickKnobSize / 2 ),
      width: joystickKnobSize,
      height: joystickKnobSize
    }
  }

  private createRectangle(width: number, height: number, alpha: number) {

    const rect = new Sprite(Texture.WHITE)
    rect.width = width
    rect.height =  height
    rect.alpha = alpha

    return rect
  }

  private createJoystick() {

    const joystickDefinition = this.buttonDefinitions["joystick"]
    const joystickKnobDefinition = this.buttonDefinitions["joystickKnob"]

    const joystick = this.createRectangle(joystickDefinition.width, joystickDefinition.height, 0.5)
    const joystickKnob = this.createRectangle(joystickKnobDefinition.width, joystickKnobDefinition.height, 0.9 )

    joystick.position.set(
      joystickDefinition.x,
      joystickDefinition.y
    )

    joystickKnob.position.set(
      joystickKnobDefinition.x,
      joystickKnobDefinition.y
    )

    this.controlsContainer.addChild(joystick)
    this.controlsContainer.addChild(joystickKnob)
  }

  private createActionButtons() {

    const actionButtons = ["A", "B", "C", "D"]

    actionButtons.forEach((label) => {
      const buttonDefinition = this.buttonDefinitions[`actionButton${label}`]

      const buttonContainer = new Container();

      const text = new Text({
        text: label,
        style: {
          fill: "red",
          fontSize: 26,
        } 
      })

      text.position.set(
        buttonDefinition.x + ( buttonDefinition.width / 2 ),
        buttonDefinition.y + ( buttonDefinition.height / 2 )
      )

      text.anchor.set(0.5, 0.5)

      const button = this.createRectangle(buttonDefinition.width, buttonDefinition.height, 0.8)

      button.position.set(
        buttonDefinition.x,
        buttonDefinition.y
      )

      buttonContainer.addChild(button)
      buttonContainer.addChild(text)
      this.controlsContainer.addChild(buttonContainer)
    })
  }
}

