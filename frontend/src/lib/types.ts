import type { Texture } from "pixi.js";
import type { ITilesId } from "@mop/shared-types"


export type tileOrientation = "NW" | "SE"

export type ITilesTexureMap = Record<ITilesId, Record<tileOrientation, Texture>>

