import type { Texture } from "pixi.js";
import type { ITilesId } from "@mop/shared-types"


export type ITileOrientation =
  | "empty"
  | "sw"
  | "se"
  | "se_sw"
  | "ne"
  | "ne_sw"
  | "ne_se"
  | "ne_se_sw"
  | "nw"
  | "nw_sw"
  | "nw_se"
  | "nw_se_sw"
  | "nw_ne"
  | "nw_ne_sw"
  | "nw_ne_se"
  | "nw_ne_se_sw";

export type ITilesTexturemap = Partial<
  Record<ITilesId, Partial<Record<ITileOrientation, Texture>>>
>;

// Kept for existing consumers while the correctly spelled name is adopted.
export type tileOrientation = ITileOrientation;
export type ITilesTexureMap = ITilesTexturemap;
