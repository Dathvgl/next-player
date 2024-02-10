import { ctx, r50h } from "../main";
import { Pos } from "../types";
import { Enemy } from "./enemy";
import { TowerAffect, TowerSpec } from "./turret";

type NumNull = number | null;

type BulletProps = {
  enemy: Enemy;
  species: TowerSpec;
  info: BulletAttribute;
};

type BulletAttribute = {
  power: number;
  spread: NumNull;
  effect: NumNull;
  affect: TowerAffect;
};

export class Bullet implements BulletProps {
  pos: Pos;
  vel: Pos;
  species: TowerSpec;

  info: BulletAttribute;

  radius: number;
  enemy: Enemy;
  src: string = "white";

  constructor(props: BulletProps) {
    const { enemy, species, info } = props;

    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };

    this.radius = r50h / 3;

    this.info = info;
    this.enemy = enemy;
    this.species = species;
  }

  draw() {
    const { x, y } = this.pos;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.src;
    ctx.fill();
  }

  update() {
    this.draw();

    const y = this.enemy.center.y - this.pos.y;
    const x = this.enemy.center.x - this.pos.x;
    const angle = Math.atan2(y, x);

    const speed = 3;
    this.vel.x = Math.cos(angle) * speed;
    this.vel.y = Math.sin(angle) * speed;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}
