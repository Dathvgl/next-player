import tower from "../jsons/turret.json";
import { capitalize, ctx, r50, r50h, sizeTile } from "../main";
import { Pos } from "../types";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";

export const TowerSpecies = [
  "normal",
  "fire",
  "light",
  "ice",
  "poison",
  "energy",
] as const;

export const TowerAffects = ["slow", "toxic"] as const;
export const TowerDurations = [1000, 5000] as const;

export const TowerSrc = {
  normal: `/tower-defense/images/turret/${TowerSpecies[0]}.png`,
  fire: `/tower-defense/images/turret/${TowerSpecies[1]}.png`,
  light: `/tower-defense/images/turret/${TowerSpecies[2]}.png`,
  ice: `/tower-defense/images/turret/${TowerSpecies[3]}.png`,
  poison: `/tower-defense/images/turret/${TowerSpecies[4]}.png`,
  energy: `/tower-defense/images/turret/${TowerSpecies[5]}.png`,
};

type NumNull = number | null;
export type TowerSpec = (typeof TowerSpecies)[number];
export type TowerAffect = (typeof TowerAffects)[number] | null;
export type TowerDuration = (typeof TowerDurations)[number] | null;

type TowerProps = {
  index: number;
  species: TowerSpec;
};

export class Turret {
  border: number;
  species: TowerSpec;

  pos: Pos;
  width: number;
  height: number;

  index: number;
  center: Pos;
  description: string;

  level: number = 1;
  shoot: string[] | null;
  srcBullet: string;
  affect: TowerAffect;
  power: number;
  powered: number;
  speed: number;
  speeded: number;
  spread: NumNull;
  effect: NumNull;
  radius: number;
  buy: number;
  sell: number;
  upgrade: NumNull;

  delay: number = 100;
  click: boolean;
  bullet: Bullet[] = [];
  target: Enemy | null = null;

  constructor(props: TowerProps) {
    const { index, species } = props;

    const remainder = index % sizeTile;
    const x = Math.floor((index - 1) / sizeTile);
    const y = (remainder == 0 ? sizeTile : remainder) - 1;

    this.border = r50 + r50h;
    this.species = species;

    this.pos = { x: r50 + x * r50, y: r50 + y * r50 };
    this.width = r50;
    this.height = r50;
    this.index = index;
    this.click = false;

    this.center = {
      x: this.pos.x + this.width / 2,
      y: this.pos.y + this.height / 2,
    };

    const {
      affect,
      info: { shoot, srcBullet, description },
    } = tower[this.species];
    const { power, speed, spread, effect, radius, buy, sell, upgrade } =
      tower[this.species].level[this.level - 1];

    this.description = description;

    this.shoot = shoot;
    this.srcBullet = srcBullet;
    this.affect = affect as TowerAffect;
    this.power = power;
    this.powered = power;
    this.speed = speed;
    this.speeded = speed;
    this.spread = spread;
    this.effect = effect;
    this.radius = radius * r50;
    this.buy = buy;
    this.sell = sell;
    this.upgrade = upgrade;
  }

  async draw() {
    // Max level special
    if (!this.upgrade) {
      ctx.fillStyle = "hsla(242,50%,75%,0.7)";
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    // Turret
    const { x, y } = this.pos;
    const towerImage = new Image();
    towerImage.src = TowerSrc[this.species];
    ctx.drawImage(towerImage, x, y);

    // Range
    if (this.click) {
      ctx.beginPath();
      ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,255,0.3)";
      ctx.fill();
    }
  }

  update() {
    this.draw();

    const baseFrame = 10;
    const baseMilli = 1000;

    // 0.6 speed ~ 2.5s => 0.1 = 15s
    // 0.1 * 15s / speed = limit
    const limit = ((0.1 * 10) / this.speed) * baseMilli;

    if (this.shoot) {
      if (this.target) {
        if (this.delay >= limit) {
          this.delay = 0;
          const bullet = new Bullet({
            enemy: this.target,
            species: this.species,
            info: {
              power: this.power,
              spread: this.spread,
              effect: this.effect,
              affect: this.affect,
            },
          });
          bullet.src = this.srcBullet;
          bullet.pos = structuredClone(this.center);
          this.bullet.push(bullet);
        } else {
          this.delay += baseFrame;
        }
      } else {
        this.delay = limit;
      }
    }
  }

  message(html: HTMLDivElement) {
    const divPowered = document.createElement("div");
    divPowered.innerHTML = `Power: ${this.powered}`;

    const divPower = document.createElement("div");
    divPower.innerHTML = `+${(this.power - this.powered).toFixed(2)}`;

    const divSpeeded = document.createElement("div");
    divSpeeded.innerHTML = `Speed: ${this.speeded}`;

    const divSpeed = document.createElement("div");
    divSpeed.innerHTML = `+${(this.speed - this.speeded).toFixed(2)}`;

    const divSpread = document.createElement("div");
    divSpread.innerHTML = `Spread: ${this.spread}`;

    const divEffect = document.createElement("div");
    divEffect.innerHTML = `Effect: ${this.effect}${
      this.affect
        ? ` ${TowerDurations[TowerAffects.indexOf(this.affect)] / 1000}s`
        : ""
    }`;

    const divRadius = document.createElement("div");
    divRadius.innerHTML = `Radius: ${this.radius}`;

    const divSell = document.createElement("div");
    divSell.innerHTML = `Sell: ${this.sell}`;

    const divUpgrade = document.createElement("div");
    divUpgrade.innerHTML = `Upgrade: ${this.upgrade}`;

    const divName = document.createElement("div");
    divName.innerHTML = `${capitalize(this.species)} tower`;

    const divLevel = document.createElement("div");
    divLevel.innerHTML = `Level: ${this.level}`;

    const divInfo = document.createElement("div");
    divInfo.style.display = "grid";
    divInfo.style.gridTemplateColumns = "auto auto";

    divInfo.appendChild(divName);
    divInfo.appendChild(divLevel);
    divInfo.appendChild(divPowered);
    divInfo.appendChild(divPower);
    divInfo.appendChild(divSpeeded);
    divInfo.appendChild(divSpeed);
    divInfo.appendChild(divRadius);
    divInfo.appendChild(divSpread);
    divInfo.appendChild(divSell);
    divInfo.appendChild(divUpgrade);

    html.appendChild(divInfo);
    html.appendChild(divEffect);
  }

  hover(html: HTMLDivElement) {
    const divPowered = document.createElement("div");
    divPowered.innerHTML = `Power: ${this.powered}`;

    const divSpeeded = document.createElement("div");
    divSpeeded.innerHTML = `Speed: ${this.speeded}`;

    const divSpread = document.createElement("div");
    divSpread.innerHTML = `Spread: ${this.spread}`;

    const divRadius = document.createElement("div");
    divRadius.innerHTML = `Radius: ${this.radius}`;

    const divBuy = document.createElement("div");
    divBuy.innerHTML = `Buy: ${this.buy}`;

    const divName = document.createElement("div");
    divName.innerHTML = `${capitalize(this.species)} tower`;

    const divDescription = document.createElement("div");
    divDescription.innerHTML = `${capitalize(this.description)}`;

    const divInfo = document.createElement("div");
    divInfo.style.display = "grid";
    divInfo.style.gridTemplateColumns = "auto auto";

    divInfo.appendChild(divName);
    divInfo.appendChild(divBuy);
    divInfo.appendChild(divPowered);
    divInfo.appendChild(divSpeeded);
    divInfo.appendChild(divRadius);
    divInfo.appendChild(divSpread);

    html.appendChild(divInfo);
    html.appendChild(divDescription);
  }

  levelUp() {
    this.level++;

    const { power, speed, spread, effect, radius, buy, sell, upgrade } =
      tower[this.species].level[this.level - 1];

    this.power = power;
    this.powered = power;
    this.speed = speed;
    this.speeded = speed;
    this.spread = spread;
    this.effect = effect;
    this.radius = radius * r50;
    this.buy = buy;
    this.sell = sell;
    this.upgrade = upgrade;
  }
}
