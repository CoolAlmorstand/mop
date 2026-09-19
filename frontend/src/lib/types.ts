import type { Texture } from "pixi.js";
import type { ITilesId } from "@mop/shared-types"

export type TileOrientation =
  | "empty"
  | "se"
  | "sw"
  | "sw_se"
  | "ne"
  | "ne_se"
  | "ne_sw"
  | "ne_sw_se"
  | "nw"
  | "nw_se"
  | "nw_sw"
  | "nw_sw_se"
  | "nw_ne"
  | "nw_ne_se"
  | "nw_ne_sw"
  | "nw_ne_sw_se";

export type ITilesTexturemap = Partial<
  Record<ITilesId, Partial<Record<TileOrientation, Texture>>>
>;

// Kept for existing consumers while the correctly spelled name is adopted.
export type tileOrientation = TileOrientation;
export type ITilesTexureMap = ITilesTexturemap;
