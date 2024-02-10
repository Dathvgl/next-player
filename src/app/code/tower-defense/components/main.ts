"use client";

import { Enemy } from "./lib/enemy";
import { Path } from "./lib/path";
import {
  TowerAffects,
  TowerDurations,
  TowerSpec,
  TowerSpecies,
  TowerSrc,
  Turret,
} from "./lib/turret";
import { Wave } from "./lib/wave";
import { Mouse, Player } from "./types";

// Components
const infoLabel = document.querySelector<HTMLDivElement>("#info")!;
const baseInfoLabel = document.querySelector<HTMLDivElement>("#infomation")!;
const hoverInfoLabel = document.querySelector<HTMLDivElement>("#info-hover")!;

const heartsLabel = document.querySelector<HTMLDivElement>("#hearts")!;
const goldsLabel = document.querySelector<HTMLDivElement>("#golds")!;
const wavesLabel = document.querySelector<HTMLDivElement>("#waves")!;
const timesLabel = document.querySelector<HTMLDivElement>("#times")!;

const basePlaceLabel = document.querySelector<HTMLDivElement>("#basePlace")!;
const turretLabel = document.querySelector<HTMLDivElement>("#turrets")!;
const buttonsLabel = document.querySelectorAll<HTMLButtonElement>(
  "#buttons .btnFunction"
)!;

const skillsLabel = document.querySelectorAll<HTMLElement>("#skills svg");

const tPosLabel = document.querySelector<HTMLDivElement>("#turret-upgrade")!;

const tUpgradeLabel = document.querySelector<HTMLDivElement>(
  "#turret-upgrade > .svg-upgrade"
)!;

const tRemoveLabel = document.querySelector<HTMLDivElement>(
  "#turret-upgrade > .svg-remove"
)!;

// Main
const canvas = document.querySelector("canvas")!;
export const ctx = canvas.getContext("2d")!;

export const init = () => {
  const { width, height } = canvas;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
};

// 1088 * 0.78125 = 850
export const r50 = 50;
export const r50h = r50 / 2;
export const sizeTile = 15;
export const rem = 16;

export const canvasProps = {
  width: canvas.width,
  height: canvas.height,
  offWidth: canvas.height + rem,
  fullWidth: canvas.width - canvas.height - rem * 2,
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const player: Player = {
  heart: 10,
  gold: 5000,
  wave: 0,
  frame: 0,
  played: false,
};

const mouse: Mouse = {
  x: -1,
  y: -1,
  enemy: false,
  turret: -1,
  turretFeat: false,
};

const path = new Path();
const wave = new Wave();
const enemys: Enemy[] = [];
const turrets: Turret[] = [];

for (const item of TowerSpecies) {
  const image = document.createElement("img");
  image.src = TowerSrc[item];
  image.width = 75;
  image.onclick = () => towerClick(item);

  image.onmouseenter = () => {
    const tower = new Turret({ index: -1, species: item });
    tower.hover(hoverInfoLabel);
    hoverInfoLabel.style.display = "block";
  };

  image.onmouseleave = () => {
    hoverInfoLabel.replaceChildren();
    hoverInfoLabel.style.display = "none";
  };

  turretLabel.appendChild(image);
}

const field = new Image();
field.src = "/tower-defense/images/field.png";

field.onload = () => {
  infoLabel.style.width = `${canvasProps.fullWidth}px`;
  heartsLabel.innerText = player.heart.toString();

  basePlaceLabel.style.top = `${r50 * 4 + r50h}px`;
  basePlaceLabel.style.left = `${canvasProps.offWidth}px`;
  basePlaceLabel.style.width = `${canvas.width - canvasProps.offWidth - rem}px`;

  tUpgradeLabel.style.width = `${r50h}px`;
  tUpgradeLabel.style.height = `${r50h}px`;
  tRemoveLabel.style.width = `${r50h}px`;
  tRemoveLabel.style.height = `${r50h}px`;

  tUpgradeLabel.onclick = () => {};
  tRemoveLabel.onclick = () => {};

  baseInfoLabel.style.width = `${canvasProps.fullWidth}px`;

  hoverInfoLabel.style.top = `${r50 * 9 + rem}px`;
  hoverInfoLabel.style.right = `${rem}px`;
  hoverInfoLabel.style.padding = `${rem}px`;
  hoverInfoLabel.style.width = `${canvasProps.fullWidth - rem * 2}px`;

  skillInit();
  buttonInit();

  // Draw field
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(field, 0, 0);

  wave.turnShow();
  coinAlt(0);
  waveAlt();
  // animate(0);
};

function skillInit() {}

function buttonInit() {
  buttonsLabel[0].onclick = () => {
    player.played = !player.played;
    buttonPlayed();
  };

  buttonsLabel[1].onclick = () => {
    buttonClear();

    const result = document.querySelector<HTMLDivElement>(".result")!;
    result.style.display = "none";

    waveAlt();
    coinAlt(0);

    buttonPlayed();

    timesLabel.innerText = "";
    buttonsLabel[0].innerText = "Play";
    heartsLabel.innerText = player.heart.toString();

    // Draw field
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(field, 0, 0);
  };

  buttonsLabel[2].onclick = () => {
    localStorage.setItem(
      "tdwts",
      JSON.stringify({
        wave,
        path,
        player,
        enemys,
        turrets,
      })
    );
  };

  buttonsLabel[3].onclick = () => {
    const json = localStorage.getItem("tdwts");
    if (json) {
      buttonClear();
      const data = JSON.parse(json);

      enemys.push(...data["enemys"]);
      turrets.push(...data["turrets"]);

      const playerData = data["player"] as Player;
      player.heart = playerData.heart;
      player.gold = playerData.gold;
      player.wave = playerData.wave;
      player.frame = playerData.frame;
      player.played = playerData.played;

      const waveData = data["wave"] as Wave;
      const pathData = data["path"] as Path;

      wave.copy(waveData);
      path.copy(pathData);
    }
  };
}

function buttonPlayed() {
  if (buttonsLabel[0].innerText != "End") {
    if (player.played && player.heart > 0) {
      buttonsLabel[0].innerText = "Pause";
      requestAnimationFrame(animate);
    } else {
      if (player.animateId) {
        buttonsLabel[0].innerText = "Play";
        cancelAnimationFrame(player.animateId);
      }
    }
  }
}

function buttonClear() {
  player.heart = 10;
  player.gold = 35;
  player.wave = 0;
  player.frame = 0;
  player.played = false;

  mouse.x = -1;
  mouse.y = -1;
  mouse.enemy = false;
  mouse.turret = -1;
  mouse.turretFeat = false;

  path.clear();
  wave.clear();

  enemys.length = 0;
  turrets.length = 0;
}

function coinAlt(num: number) {
  player.gold += num;
  goldsLabel.innerText = player.gold.toString();
}

function waveAlt() {
  wavesLabel.innerText = wave.count.toString();
}

function timeAlt(num: number) {
  timesLabel.innerText = `${num}s`;
}

function towerClear() {
  const clear = turrets.findIndex(({ index }) => index == mouse.turret);
  if (turrets[clear]) {
    turrets[clear].click = false;

    towerFeat(0, true);
    mouse.turretFeat = false;
  }
}

function towerFeat(index: number, hidden: boolean = false) {
  if (hidden) {
    tPosLabel.style.display = "none";
    tUpgradeLabel.onclick = () => {};
    tRemoveLabel.onclick = () => {};
    return;
  }

  const turret = turrets[index];

  tPosLabel.style.display = "block";
  tPosLabel.style.top = `${turret.pos.y}px`;
  tPosLabel.style.left = `${turret.pos.x + r50}px`;

  const { upgrade } = turret;
  if (upgrade) {
    tUpgradeLabel.style.backgroundColor = "aquamarine";
    tUpgradeLabel.onclick = () => {
      mouse.turretFeat = true;
      if (player.gold >= upgrade) {
        turret.levelUp();

        coinAlt(-upgrade);
        mouse.turret = -1;

        tPosLabel.style.display = "none";
        tUpgradeLabel.onclick = () => {};
        tRemoveLabel.onclick = () => {};
      }
    };
  } else {
    tUpgradeLabel.style.backgroundColor = "darkgrey";
    tUpgradeLabel.onclick = () => {
      mouse.turretFeat = true;
    };
  }

  tRemoveLabel.onclick = () => {
    const { sell } = turret;

    mouse.turret = -1;
    mouse.turretFeat = true;

    coinAlt(sell);
    turrets.splice(index, 1);

    tPosLabel.style.display = "none";
    tUpgradeLabel.onclick = () => {};
    tRemoveLabel.onclick = () => {};
  };
}

function towerClick(tower: TowerSpec) {
  mouse.hold = tower;
}

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  mouse.hold = undefined;

  towerClear();

  mouse.turret = -1;
  mouse.turretFeat = false;

  // Clear infomation
  baseInfoLabel.replaceChildren();
});

window.addEventListener("click", (event) => {
  const { clientX, clientY } = event;
  const place = path.placeClick({ x: clientX, y: clientY });

  // Clear infomation
  baseInfoLabel.replaceChildren();

  mouse.enemy = false;

  // Look for enemy click
  for (const enemy of enemys) {
    const { x, y } = enemy.center;
    const dis = Math.hypot(clientX - x, clientY - y);
    const hit = dis <= enemy.radius;

    if (hit) {
      mouse.enemy = true;
      enemy.message(baseInfoLabel);
      break;
    }
  }

  if (place.state) {
    // Place turret
    if (!path.mapPath[place.index].state && mouse.hold) {
      if (path.altPoint(place.index)) {
        const turret = new Turret({
          index: place.index + 1,
          species: mouse.hold,
        });

        if (player.gold >= turret.buy) {
          coinAlt(-turret.buy);
          path.altPath(place.index, true);
          turrets.push(turret);

          enemys.forEach((enemy) => {
            if (enemy.type == "ground") {
              enemy.altPath(path.resultPath, path.mapPath, path.endPos);
            }
          });
        }
      }
    } else if (mouse.enemy) {
      towerClear();
      mouse.turret = -1;
    } else {
      // Show range turret
      towerClear();

      const index = turrets.findIndex(({ index }) => index == place.index + 1);

      if (index != -1 && !mouse.turretFeat) {
        turrets[index].message(baseInfoLabel);
        turrets[index].click = true;
        mouse.turret = place.index + 1;

        // Show feat turret
        towerFeat(index);
      }
    }
  }

  mouse.turretFeat = false;
});

const baseFrame = 8;
const baseMilli = 1000;

const base100 = 100;
let save100 = base100;

const initWave = 5;
const baseWave = 10;

function animate() {
  const animateId = requestAnimationFrame(animate);
  player.animateId = animateId;

  player.frame += baseFrame;

  // Need 100 millisecond
  const mod100 = player.frame % base100;
  const time100 = mod100 <= save100;
  if (time100) {
    save100 = mod100;
  } else if (mod100 + save100 >= base100 || save100 == 0) {
    save100 = base100;
  }

  // Random new turn
  wave.init({
    initWave,
    baseWave,
    time100,
    path,
    enemys,
    waveAlt,
    timeAlt,
  });

  if (player.frame >= baseMilli) {
    player.frame -= baseMilli;
  }

  // Clear and draw image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(field, 0, 0);

  // Turret call
  turrets.forEach((turret) => {
    turret.update();
    turret.target = null;

    if (turret.shoot) {
      // Enemy in turret range and can shoot it
      const valid = enemys.filter((enemy) => {
        const { x, y } = enemy.center;
        const dis = Math.hypot(turret.center.x - x, turret.center.y - y);
        return (
          dis <= enemy.radius + turret.radius &&
          turret.shoot!.includes(enemy.type)
        );
      });

      // Valid enemy
      turret.target = valid[0];
      const nBullet = turret.bullet.length - 1;
      for (let index = nBullet; index >= 0; index--) {
        const bullet = turret.bullet[index];
        bullet.update();

        const insEnes = enemys.findIndex((enemy) => {
          return enemy == bullet.enemy;
        });

        if (insEnes == -1) {
          turret.bullet.splice(index, 1);
          continue;
        }

        const { x, y } = bullet.enemy.center;
        const dis = Math.hypot(bullet.pos.x - x, bullet.pos.y - y);

        // Bullet hit Enemy
        if (dis <= bullet.radius) {
          // Hp and resist
          const resist = bullet.enemy.resist[bullet.species];
          if (resist) {
            bullet.enemy.hp -= (bullet.info.power * resist) / 100;

            // Spread bullet damage
            if (bullet.info.spread) {
              const spread = bullet.info.spread;
              enemys.forEach((enemy) => {
                // Different type from hit Enemy
                if (bullet.enemy == enemy && bullet.enemy.type != enemy.type) {
                  return;
                }

                const { x, y } = enemy.center;
                const dis = Math.hypot(
                  bullet.enemy.center.x - x,
                  bullet.enemy.center.y - y
                );

                const hit = dis <= enemy.radius + spread * r50;

                if (hit) {
                  enemy.hp -= (bullet.info.power * resist) / 100;

                  // Spread bullet effect
                  if (bullet.info.affect && bullet.info.effect) {
                    const affect = bullet.info.affect;
                    const effect = bullet.info.effect;
                    const duration =
                      TowerDurations[TowerAffects.indexOf(affect)];

                    enemy.effects.push({
                      affect,
                      effect,
                      duration,
                    });
                  }
                }
              });
            }

            // Effect bullet
            if (bullet.info.affect && bullet.info.effect) {
              const affect = bullet.info.affect;
              const effect = bullet.info.effect;
              const duration = TowerDurations[TowerAffects.indexOf(affect)];

              bullet.enemy.effects.push({
                affect,
                effect,
                duration,
              });
            }
          }

          turret.bullet.splice(index, 1);

          if (bullet.enemy.hp <= 0) {
            const indexEnes = enemys.findIndex((enemy) => {
              return enemy == bullet.enemy;
            });

            if (indexEnes > -1) {
              coinAlt(20);
              enemys.splice(indexEnes, 1);
            }
          }
        }
      }
    }

    // Turn off energy
    turret.power = turret.powered;
    turret.speed = turret.speeded;

    // Energy boots
    if (turret.species == "energy") {
      turrets.forEach((item) => {
        if (turret != item) {
          const { x, y } = item.center;
          const dis = Math.hypot(turret.center.x - x, turret.center.y - y);
          const hit = dis <= turret.radius + item.radius;

          if (hit) {
            item.power += (item.powered * turret.power) / 100;
            item.speed += (item.speeded * turret.speed) / 100;
          }
        }
      });
    }
  });

  // Enemy call
  const nEnemys = enemys.length - 1;
  for (let index = nEnemys; index >= 0; index--) {
    const enemy = enemys[index];
    enemy.update();
    enemy.disadvantage(time100, base100);

    if (enemy.hp <= 0) {
      coinAlt(enemy.gold);
      enemys.splice(index, 1);
    }

    // Enemy passed
    if (enemy.center.y > canvas.height) {
      player.heart -= 1;
      heartsLabel.innerText = player.heart.toString();

      enemys.splice(index, 1);

      // Player die
      if (player.heart <= 0) {
        cancelAnimationFrame(animateId);
        buttonsLabel[0].innerText = "End";

        const result = document.querySelector<HTMLDivElement>(".result")!;
        result.style.display = "flex";
      }
    }
  }

  // Pick turret color call
  if (mouse.hold) {
    path.update(mouse);
  }
}
