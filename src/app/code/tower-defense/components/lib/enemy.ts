import monster from "../jsons/monster.json";
import { capitalize, ctx, r50, r50h, sizeTile } from "../main";
import { KindPath, MapPath, Pos } from "../types";
import { Path } from "./path";
import { TowerAffect } from "./turret";

export const EnemySpecies = [
  "acid ooze",
  "humongous ettin",
  "wretched fomorian",
  "werewolf stalker",
  "swamp troll",
  "ocular watcher",
  "intellect devourer",
  "red cap",
  "clawing harpy",
] as const;

export const EnemySrc = {
  "acid ooze": `/tower-defense/images/enemy/${EnemySpecies[0]}.png`,
  "humongous ettin": `/tower-defense/images/enemy/${EnemySpecies[1]}.png`,
  "wretched fomorian": `/tower-defense/images/enemy/${EnemySpecies[2]}.png`,
  "werewolf stalker": `/tower-defense/images/enemy/${EnemySpecies[3]}.png`,
  "swamp troll": `/tower-defense/images/enemy/${EnemySpecies[4]}.png`,
  "ocular watcher": `/tower-defense/images/enemy/${EnemySpecies[5]}.png`,
  "intellect devourer": `/tower-defense/images/enemy/${EnemySpecies[6]}.png`,
  "red cap": `/tower-defense/images/enemy/${EnemySpecies[7]}.png`,
  "clawing harpy": `/tower-defense/images/enemy/${EnemySpecies[8]}.png`,
};

const EnemyKinds = ["ground", "air"] as const;

type NumNull = number | null;
export type EnemySpec = (typeof EnemySpecies)[number];
export type EnemyKind = (typeof EnemyKinds)[number];

type EnemyProps = {
  gold: number;
  turn: number;
  species: EnemySpec;
};

type EnemyResist = {
  normal: NumNull;
  fire: NumNull;
  light: NumNull;
  ice: NumNull;
  poison: NumNull;
  energy: NumNull;
};

type EnemyEffect = {
  affect: TowerAffect;
  effect: number;
  duration: number;
};

type EnemyFrames = {
  max: number;
  current: number;
  elapsed: number;
  hold: number;
};

export class Enemy {
  pos: Pos = { x: 0, y: 0 };
  vel: Pos = { x: 0, y: 0 };
  center: Pos = { x: 0, y: 0 };

  gold: number;
  species: EnemySpec;

  width: number;
  height: number;
  radius: number;

  index: number = 0;
  boss: boolean = false;
  hidden: boolean = false;

  name: string;
  type: EnemyKind;
  hp: number;
  health: number;
  speed: number;
  sprint: number;
  resist: EnemyResist;

  frames: EnemyFrames = {
    max: 4,
    current: 0,
    elapsed: 0,
    hold: 10,
  };

  path: Pos[] = [];
  effects: EnemyEffect[] = [];

  constructor(props: EnemyProps) {
    const { species, gold, turn } = props;

    this.width = r50;
    this.height = r50;
    this.radius = r50h;

    this.gold = gold;
    this.species = species;

    const {
      type,
      info: { name, hp, speed, resist },
    } = monster[this.species];

    this.name = name;
    this.type = type as EnemyKind;

    // Turn^2 * 2 / hp.length * hp
    const hpLen = hp < 50 ? 10 : 100;
    const hpReal = turn < 10 ? hp : (turn ** 2 / hpLen) * hp;
    this.hp = hpReal;
    this.health = hpReal;

    this.speed = speed;
    this.sprint = speed;
    this.resist = resist;
  }

  draw() {
    // Enemy
    const enemyImage = new Image();
    enemyImage.src = EnemySrc[this.species];

    const cropWidth = enemyImage.width / this.frames.max;
    const crop = {
      pos: { x: cropWidth * this.frames.current, y: 0 },
      width: cropWidth,
      height: enemyImage.height,
    };

    ctx.drawImage(
      enemyImage,
      crop.pos.x,
      crop.pos.y,
      crop.width,
      crop.height,
      this.pos.x,
      this.pos.y,
      crop.width,
      crop.height
    );

    // Deplay sprite
    this.frames.elapsed++;
    if (this.frames.elapsed % this.frames.hold == 0) {
      this.frames.current++;
      if (this.frames.current >= this.frames.max - 1) {
        this.frames.current = 0;
      }
    }

    // Health
    const less = r50h / 2;
    const high = (less * 5) / 6;

    ctx.fillStyle = this.boss ? "rgba(0,0,255,0.3)" : "hsla(0,100%,50%,0.5)";
    ctx.fillRect(this.pos.x, this.pos.y - less, this.width, high);

    ctx.fillStyle = this.boss
      ? "rgba(255,0,255,0.3)"
      : "hsla(120,100%,50%,0.5)";
    ctx.fillRect(
      this.pos.x,
      this.pos.y - less,
      this.width * (this.hp / this.health),
      high
    );
  }

  update() {
    this.draw();

    if (this.hidden) {
      return;
    }

    const point = this.path[this.index];
    const y = point.y - this.center.y;
    const x = point.x - this.center.x;
    const angle = Math.atan2(y, x);

    this.vel.x = Math.cos(angle) * this.speed;
    this.vel.y = Math.sin(angle) * this.speed;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.center = {
      x: this.pos.x + this.width / 2,
      y: this.pos.y + this.height / 2,
    };

    const cd =
      Math.abs(Math.round(this.center.x) - Math.round(point.x)) <
      Math.abs(this.vel.x);
    const cr =
      Math.abs(Math.round(this.center.y) - Math.round(point.y)) <
      Math.abs(this.vel.y);
    const cn = this.index < this.path.length - 1;

    if (cd && cr && cn) {
      this.index++;
    }
  }

  message(html: HTMLDivElement) {
    const divHp = document.createElement("div");
    divHp.innerHTML = `HP: ${this.hp.toFixed(0)}`;

    const divHealth = document.createElement("div");
    divHealth.innerHTML = `Total: ${this.health}`;

    const divSpeed = document.createElement("div");
    divSpeed.innerHTML = `Speed: ${this.speed}`;

    const divName = document.createElement("div");
    divName.innerHTML = `Name: ${capitalize(this.species)}`;

    html.appendChild(divHp);
    html.appendChild(divHealth);
    html.appendChild(divSpeed);
    html.appendChild(divName);
  }

  altPos(pos: Pos) {
    this.pos = pos;
    this.center = {
      x: this.pos.x + this.width / 2,
      y: this.pos.y + this.height / 2,
    };
  }

  altPath(resultPath: Pos[], mapPath: MapPath[], endPos: KindPath) {
    this.hidden = false;
    const loldPath = this.path.length;
    const lnewPath = resultPath.length;

    if (loldPath == lnewPath) {
      const compare = JSON.stringify(this.path) == JSON.stringify(resultPath);
      if (!compare) {
        this.altPathSame(resultPath, mapPath, endPos);
      }
    } else {
      this.altPathSame(resultPath, mapPath, endPos);
    }
  }

  altPathSame(resultPath: Pos[], mapPath: MapPath[], endPos: KindPath) {
    const path = new Path();
    path.mapPath = structuredClone(mapPath);
    path.endPos = structuredClone(endPos);

    const x = Math.floor((this.center.x - r50) / r50);
    const y = Math.floor((this.center.y - r50) / r50);
    const index = (x == 0 ? x : x * sizeTile) + y;

    const border = r50 + r50h;
    const position: Pos = {
      x: border + x * r50,
      y: border + y * r50,
    };

    if (y >= 0) {
      path.startPos.ground.pos[0] = {
        index,
        x: position.x,
        y: position.y,
      };

      path.altMap();

      this.index = 0;

      if (path.resultPath.length == 1 && path.hidden) {
        this.hidden = true;
      } else {
        this.path = path.resultPath;
      }
    } else {
      this.path = structuredClone(resultPath);
    }
  }

  disadvantage(time100: boolean, base100: number) {
    const baseTime = 1000;
    const nEffects = this.effects.length - 1;
    for (let index = nEffects; index >= 0; index--) {
      const { affect, effect, duration } = this.effects[index];

      switch (affect) {
        case "slow":
          if (duration % baseTime == 0) {
            const speed = this.sprint - (this.sprint * effect) / 100;
            if (this.speed > speed) {
              this.speed = speed;
            }
          }
          break;
        case "toxic":
          if ((duration % baseTime == 0 || duration == 0) && time100) {
            this.hp -= (this.hp * effect) / 100;
          }
          break;
      }

      if (time100) {
        this.effects[index].duration = duration - base100;
      }

      if (this.effects[index].duration < 0) {
        this.effects.splice(index, 1);
      }
    }
  }
}
