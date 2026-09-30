

import type { IMovementInput, IEntityDirection } from "../types.ts";



export function getEntityDirectionFromMovementInput(input: IMovementInput): IEntityDirection  {
  if (input.x === 0 && input.y === 0) {
    return "s"
  }

  const directions: IEntityDirection[] = ["n", "ne", "e", "se", "s", "sw", "w", "nw"]
  const angle = Math.atan2(input.x, -input.y)
  const directionIndex = Math.floor((angle + Math.PI / 8 + Math.PI * 2) % (Math.PI * 2) / (Math.PI / 4))

  return directions[directionIndex]
}
