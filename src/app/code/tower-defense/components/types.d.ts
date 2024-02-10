export type Pos = {
  x: number;
  y: number;
};

export type Player = {
  heart: number;
  gold: number;
  wave: number;
  played: boolean;
  frame: number;
  animateId?: number;
};

export type Mouse = Pos & {
  hold?: TowerSpec;
  enemy: boolean;
  turret: number;
  turretFeat: boolean;
};

export type MapPath = {
  state: boolean;
  edges: number[];
};

export type GroundPath = {
  alt: boolean;
  pos: DetailPath[];
};

export type DetailPath = Pos & {
  index: number;
};

export type KindPath = {
  air: Pos;
  ground: GroundPath;
};
