import monster from "../jsons/monster.json";
import { canvasProps, r50, r50h, rem } from "../main";
import { Enemy, EnemyKind, EnemySpec, EnemySpecies, EnemySrc } from "./enemy";
import { Path } from "./path";

type WaveInit = {
  initWave: number;
  baseWave: number;
  time100: boolean;
  path: Path;
  enemys: Enemy[];
  waveAlt: () => void;
  timeAlt: (num: number) => void;
};

export class Wave {
  base: number = 6;
  count: number;
  second: number = 0;
  turns: EnemySpec[];
  dists: number[] = [];

  turnsLabel: HTMLDivElement;

  constructor() {
    this.turns = [
      EnemySpecies[0],
      EnemySpecies[1],
      EnemySpecies[2],
      EnemySpecies[3],
      EnemySpecies[4],
    ];

    EnemySpecies.forEach(() => {
      this.dists.push(0);
    });

    this.turns.forEach((_, index) => {
      this.dists[index]++;
    });

    this.count = 0;

    this.turnsLabel = document.querySelector<HTMLDivElement>("#turn-monster")!;
    this.turnsLabel.style.top = `${r50 * 2 + r50h}px`;
    this.turnsLabel.style.left = `${canvasProps.offWidth}px`;
    this.turnsLabel.style.width = `${canvasProps.fullWidth - 2 * rem}px`;
    this.turnsLabel.style.height = `${r50}px`;
  }

  clear() {
    this.turns = [
      EnemySpecies[0],
      EnemySpecies[1],
      EnemySpecies[2],
      EnemySpecies[3],
      EnemySpecies[4],
    ];

    EnemySpecies.forEach(() => {
      this.dists.push(0);
    });

    this.turns.forEach((_, index) => {
      this.dists[index]++;
    });

    this.count = 0;
    this.second = 0;
  }

  copy(wave: Wave) {
    this.base = wave.base;
    this.count = wave.count;
    this.second = wave.second;
    this.turns = wave.turns;
    this.dists = wave.dists;
    this.turnsLabel = wave.turnsLabel;
  }

  init({
    initWave,
    baseWave,
    time100,
    path,
    enemys,
    waveAlt,
    timeAlt,
  }: WaveInit) {
    const waveCount = this.count == 0 ? initWave : baseWave;

    if (time100) {
      this.second += 100 / 1000;

      const time = waveCount - this.second;
      timeAlt(Number.parseInt(time.toFixed(0)));
    }

    if (waveCount - this.second <= 0) {
      this.second = 0;
      this.random();
      this.turnShow();

      waveAlt();

      const turn = this.turns[0];
      const type = this.count % 10 != 0 ? "normal" : "boss";
      const {
        type: kind,
        [type]: { size, gold },
      } = monster[turn];

      const kindType = kind as EnemyKind;
      for (let index = 0; index < size; index++) {
        const enemy = new Enemy({ turn: this.count, gold, species: turn });

        if (kindType == "ground") {
          const state = path.startPos[kindType].alt;
          const valid = path.startPos[kindType].pos;

          if (!state) {
            enemy.altPos({
              x: valid[0].x,
              y: valid[0].y - index * r50,
            });
          } else {
            enemy.altPos({
              x: valid[1].x,
              y: valid[1].y - index * r50,
            });
          }

          enemy.path = structuredClone(path.resultPath);
        } else {
          const pytaless = (r50 * Math.SQRT2) / 2;

          enemy.altPos({
            x: path.startPos[kindType].x - index * pytaless,
            y: path.startPos[kindType].y - index * pytaless,
          });

          enemy.path.push(path.endPos.air);
        }

        enemy.boss = type == "boss" ? true : false;
        enemys.push(enemy);
      }
    }
  }

  random() {
    this.count++;

    const nWave = this.dists.length - 1;
    for (let index = 0; index < nWave; index++) {
      if (this.dists[index] > 1) {
        this.dists[index]++;
      }

      if (this.dists[index] == this.base) {
        this.dists[index] = 0;
      }
    }

    if (this.count > 1) {
      const result = this.turns.shift()!;
      this.dists[EnemySpecies.indexOf(result)]++;

      const indexes = this.dists.reduce((acc: number[], item, index) => {
        return item == 0 ? [...acc, index] : acc;
      }, []);

      const index = indexes[Math.floor(Math.random() * indexes.length)];

      this.dists[index]++;
      this.turns.push(EnemySpecies[index]);
    }
  }

  turnShow() {
    const baseTurnNum = this.turns.length;
    this.turnsLabel.replaceChildren();

    const valid = this.count == 0 ? -1 : 0;
    for (let index = valid; index < baseTurnNum + valid; index++) {
      const div = document.createElement("div");
      if (index == 1 + valid) {
        const hrVertical = document.createElement("div");
        hrVertical.className = "ver-line";
        this.turnsLabel.appendChild(hrVertical);
      }

      const image = new Image();

      if (index > -1) {
        image.src = EnemySrc[this.turns[index]];
        div.style.backgroundImage = `url(${image.src})`;
      }

      div.style.width = `${r50 - 1}px`;
      div.style.height = `${r50}px`;
      this.turnsLabel.appendChild(div);
    }
  }
}
