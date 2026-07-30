"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VIEW_W = 960;
const VIEW_H = 540;
const PLAYER_W = 30;
const PLAYER_H = 44;
const STEP = 1 / 120;

type Rect = { x: number; y: number; w: number; h: number };
type Platform = Rect & {
  oneWay?: boolean;
  moving?: boolean;
  axis?: "x" | "y";
  distance?: number;
  speed?: number;
  startX?: number;
  startY?: number;
  direction?: number;
  dx?: number;
  dy?: number;
};
type Coin = { x: number; y: number; big?: boolean; collected?: boolean };
type Enemy = {
  x: number;
  y: number;
  w: number;
  h: number;
  type: "patrol" | "jumper";
  minX: number;
  maxX: number;
  vx: number;
  vy: number;
  baseY: number;
  timer: number;
  dead?: boolean;
};
type Level = {
  name: string;
  subtitle: string;
  width: number;
  timeTarget: number;
  palette: {
    skyTop: string;
    skyBottom: string;
    far: string;
    near: string;
    ground: string;
    groundTop: string;
    accent: string;
  };
  solids: Rect[];
  platforms: Platform[];
  spikes: Rect[];
  coins: Coin[];
  enemies: Enemy[];
  checkpoint: { x: number; y: number };
  goal: Rect;
  start: { x: number; y: number };
  hint: string;
};

type Player = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  grounded: boolean;
  coyote: number;
  jumpBuffer: number;
  invincible: number;
  facing: number;
  standingPlatform: Platform | null;
};

type Phase = "start" | "playing" | "paused" | "complete" | "gameover" | "victory";

type Runtime = {
  levelIndex: number;
  level: Level;
  player: Player;
  lives: number;
  score: number;
  levelStartScore: number;
  coins: Coin[];
  enemies: Enemy[];
  platforms: Platform[];
  checkpoint: { x: number; y: number; active: boolean };
  cameraX: number;
  elapsed: number;
  deaths: number;
  defeated: number;
  collected: number;
  phase: Phase;
};

const rect = (x: number, y: number, w: number, h: number): Rect => ({ x, y, w, h });
const coin = (x: number, y: number, big = false): Coin => ({ x, y, big });
const patrol = (x: number, y: number, minX: number, maxX: number): Enemy => ({
  x,
  y,
  w: 34,
  h: 30,
  type: "patrol",
  minX,
  maxX,
  vx: 62,
  vy: 0,
  baseY: y,
  timer: 0,
});
const jumper = (x: number, y: number, minX: number, maxX: number): Enemy => ({
  x,
  y,
  w: 32,
  h: 34,
  type: "jumper",
  minX,
  maxX,
  vx: 28,
  vy: 0,
  baseY: y,
  timer: 0.8,
});

const LEVELS: Level[] = [
  {
    name: "青草启程",
    subtitle: "风吹过软绵绵的云",
    width: 3180,
    timeTarget: 150,
    palette: {
      skyTop: "#68d9ff",
      skyBottom: "#d9fbff",
      far: "#a5e77f",
      near: "#55b86b",
      ground: "#83502f",
      groundTop: "#4ed05d",
      accent: "#ffcf45",
    },
    solids: [
      rect(0, 460, 860, 100),
      rect(1010, 460, 760, 100),
      rect(1910, 460, 620, 100),
      rect(2640, 460, 540, 100),
      rect(620, 388, 120, 72),
      rect(1450, 370, 120, 90),
      rect(2170, 355, 150, 105),
    ],
    platforms: [
      { ...rect(880, 405, 110, 18), oneWay: true },
      { ...rect(1778, 398, 110, 18), oneWay: true },
      { ...rect(2538, 398, 86, 18), oneWay: true },
    ],
    spikes: [rect(1255, 438, 64, 22), rect(2335, 438, 72, 22)],
    coins: [
      coin(250, 405),
      coin(320, 380),
      coin(390, 405),
      coin(655, 340),
      coin(915, 350, true),
      coin(1110, 405),
      coin(1190, 385),
      coin(1270, 365),
      coin(1500, 318),
      coin(1660, 402),
      coin(1830, 345, true),
      coin(2025, 395),
      coin(2100, 370),
      coin(2240, 302),
      coin(2450, 395),
      coin(2580, 345),
      coin(2740, 405),
      coin(2820, 380),
      coin(2900, 405),
    ],
    enemies: [
      patrol(500, 430, 430, 600),
      patrol(1130, 430, 1050, 1370),
      patrol(2030, 430, 1960, 2140),
      patrol(2750, 430, 2690, 2920),
    ],
    checkpoint: { x: 1590, y: 412 },
    goal: rect(3040, 330, 34, 130),
    start: { x: 110, y: 416 },
    hint: "A / D 移动 · 空格跳跃 · 从上方踩扁巡逻怪",
  },
  {
    name: "暮色峡谷",
    subtitle: "尖刺在晚霞里闪光",
    width: 3500,
    timeTarget: 170,
    palette: {
      skyTop: "#7c5fc9",
      skyBottom: "#ffb277",
      far: "#754a84",
      near: "#473964",
      ground: "#5d3d4e",
      groundTop: "#e98362",
      accent: "#ffd35b",
    },
    solids: [
      rect(0, 460, 650, 100),
      rect(790, 460, 500, 100),
      rect(1460, 460, 510, 100),
      rect(2140, 460, 430, 100),
      rect(2730, 460, 770, 100),
      rect(430, 360, 110, 100),
      rect(1020, 340, 120, 120),
      rect(1710, 350, 120, 110),
      rect(2360, 330, 110, 130),
      rect(3060, 350, 140, 110),
    ],
    platforms: [
      { ...rect(665, 410, 110, 18), oneWay: true },
      { ...rect(1310, 390, 125, 18), oneWay: true },
      { ...rect(1990, 410, 125, 18), oneWay: true },
      { ...rect(2590, 392, 120, 18), oneWay: true },
      { ...rect(2840, 330, 110, 18), oneWay: true },
    ],
    spikes: [
      rect(560, 438, 70, 22),
      rect(900, 438, 92, 22),
      rect(1550, 438, 100, 22),
      rect(2190, 438, 86, 22),
      rect(2890, 438, 96, 22),
      rect(3260, 438, 96, 22),
    ],
    coins: [
      coin(220, 405),
      coin(300, 380),
      coin(475, 310),
      coin(710, 355, true),
      coin(850, 405),
      coin(1070, 290),
      coin(1200, 395),
      coin(1365, 335),
      coin(1530, 390),
      coin(1765, 300, true),
      coin(1900, 395),
      coin(2050, 350),
      coin(2225, 385),
      coin(2415, 280),
      coin(2645, 338, true),
      coin(2800, 398),
      coin(2895, 278),
      coin(3130, 300),
      coin(3370, 395),
    ],
    enemies: [
      jumper(330, 426, 250, 390),
      patrol(830, 430, 810, 1010),
      jumper(1180, 426, 1150, 1250),
      jumper(1520, 426, 1480, 1690),
      patrol(2200, 430, 2170, 2340),
      jumper(2780, 426, 2750, 2880),
      patrol(3200, 430, 3210, 3410),
    ],
    checkpoint: { x: 1780, y: 410 },
    goal: rect(3385, 330, 34, 130),
    start: { x: 100, y: 416 },
    hint: "长按跳得更高 · 橙色跳跳怪落地后会再次起跳",
  },
  {
    name: "星辉遗迹",
    subtitle: "最后一枚金币正在等你",
    width: 3860,
    timeTarget: 190,
    palette: {
      skyTop: "#141b4d",
      skyBottom: "#3d548b",
      far: "#263368",
      near: "#192649",
      ground: "#34435c",
      groundTop: "#6bd5c5",
      accent: "#ffe07a",
    },
    solids: [
      rect(0, 460, 560, 100),
      rect(900, 460, 510, 100),
      rect(1650, 460, 440, 100),
      rect(2370, 460, 510, 100),
      rect(3210, 460, 650, 100),
      rect(340, 350, 120, 110),
      rect(1110, 340, 125, 120),
      rect(1790, 330, 125, 130),
      rect(2580, 340, 130, 120),
      rect(3410, 330, 140, 130),
    ],
    platforms: [
      {
        ...rect(590, 390, 120, 18),
        oneWay: true,
        moving: true,
        axis: "x",
        distance: 150,
        speed: 70,
      },
      { ...rect(760, 330, 110, 18), oneWay: true },
      {
        ...rect(1430, 390, 120, 18),
        oneWay: true,
        moving: true,
        axis: "y",
        distance: 100,
        speed: 58,
      },
      { ...rect(1530, 300, 100, 18), oneWay: true },
      {
        ...rect(2110, 390, 120, 18),
        oneWay: true,
        moving: true,
        axis: "x",
        distance: 130,
        speed: 76,
      },
      { ...rect(2260, 315, 90, 18), oneWay: true },
      {
        ...rect(2900, 390, 120, 18),
        oneWay: true,
        moving: true,
        axis: "y",
        distance: 90,
        speed: 62,
      },
      { ...rect(3060, 320, 120, 18), oneWay: true },
    ],
    spikes: [
      rect(470, 438, 70, 22),
      rect(1010, 438, 80, 22),
      rect(1675, 438, 90, 22),
      rect(2400, 438, 90, 22),
      rect(2740, 438, 90, 22),
      rect(3260, 438, 80, 22),
    ],
    coins: [
      coin(190, 405),
      coin(390, 298),
      coin(635, 335),
      coin(810, 278, true),
      coin(980, 395),
      coin(1170, 288),
      coin(1330, 395),
      coin(1485, 330),
      coin(1575, 248, true),
      coin(1730, 395),
      coin(1845, 278),
      coin(2030, 395),
      coin(2160, 335),
      coin(2300, 263, true),
      coin(2470, 395),
      coin(2645, 288),
      coin(2820, 395),
      coin(2955, 330),
      coin(3120, 268, true),
      coin(3330, 395),
      coin(3480, 278),
      coin(3700, 395),
    ],
    enemies: [
      patrol(210, 430, 150, 320),
      jumper(940, 426, 930, 1080),
      patrol(1260, 430, 1240, 1370),
      jumper(1690, 426, 1680, 1780),
      patrol(2470, 430, 2460, 2560),
      jumper(2720, 426, 2720, 2840),
      patrol(3300, 430, 3240, 3400),
      jumper(3600, 426, 3570, 3740),
    ],
    checkpoint: { x: 1880, y: 410 },
    goal: rect(3735, 310, 38, 150),
    start: { x: 100, y: 416 },
    hint: "移动平台会托住你 · 看准节奏，冲向最后的星门",
  },
];

function overlap(a: Rect, b: Rect) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function cloneLevel(index: number, score = 0, lives = 3): Runtime {
  const level = LEVELS[index];
  return {
    levelIndex: index,
    level,
    player: {
      x: level.start.x,
      y: level.start.y,
      vx: 0,
      vy: 0,
      grounded: false,
      coyote: 0,
      jumpBuffer: 0,
      invincible: 0,
      facing: 1,
      standingPlatform: null,
    },
    lives,
    score,
    levelStartScore: score,
    coins: level.coins.map((item) => ({ ...item })),
    enemies: level.enemies.map((item) => ({ ...item })),
    platforms: level.platforms.map((item) => ({
      ...item,
      startX: item.x,
      startY: item.y,
      direction: 1,
      dx: 0,
      dy: 0,
    })),
    checkpoint: { ...level.checkpoint, active: false },
    cameraX: 0,
    elapsed: 0,
    deaths: 0,
    defeated: 0,
    collected: 0,
    phase: "playing",
  };
}

function pixelText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number,
  color: string,
  align: CanvasTextAlign = "left",
) {
  ctx.font = `800 ${size}px "Trebuchet MS", "Microsoft YaHei", sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.lineWidth = Math.max(2, size / 8);
  ctx.strokeStyle = "rgba(20, 23, 51, .65)";
  ctx.strokeText(text, x, y);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function makeAudio() {
  let context: AudioContext | null = null;
  const tone = (frequency: number, duration: number, type: OscillatorType, volume = 0.045) => {
    if (typeof window === "undefined") return;
    context ??= new AudioContext();
    if (context.state === "suspended") void context.resume();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  };
  return {
    jump: () => tone(420, 0.12, "square", 0.035),
    coin: (big = false) => {
      tone(big ? 820 : 680, 0.12, "triangle", 0.04);
      window.setTimeout(() => tone(big ? 1040 : 880, 0.09, "triangle", 0.03), 55);
    },
    stomp: () => tone(170, 0.12, "square", 0.04),
    hurt: () => tone(105, 0.28, "sawtooth", 0.045),
    checkpoint: () => {
      tone(520, 0.12, "triangle");
      window.setTimeout(() => tone(720, 0.16, "triangle"), 90);
    },
    finish: () => {
      [523, 659, 784, 1046].forEach((f, i) =>
        window.setTimeout(() => tone(f, 0.25, "triangle", 0.045), i * 110),
      );
    },
  };
}

const audio = makeAudio();

function drawBackground(ctx: CanvasRenderingContext2D, runtime: Runtime, now: number) {
  const { palette } = runtime.level;
  const gradient = ctx.createLinearGradient(0, 0, 0, VIEW_H);
  gradient.addColorStop(0, palette.skyTop);
  gradient.addColorStop(1, palette.skyBottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);

  if (runtime.levelIndex === 2) {
    for (let i = 0; i < 46; i++) {
      const x = ((i * 197 - runtime.cameraX * 0.05) % 1100 + 1100) % 1100;
      const y = 32 + ((i * 83) % 260);
      const blink = 0.45 + Math.sin(now * 0.003 + i) * 0.3;
      ctx.globalAlpha = blink;
      ctx.fillStyle = i % 5 === 0 ? "#ffe88a" : "#dce8ff";
      ctx.fillRect(Math.round(x), y, i % 5 === 0 ? 3 : 2, i % 5 === 0 ? 3 : 2);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fff0b2";
    ctx.beginPath();
    ctx.arc(780, 104, 54, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = palette.skyTop;
    ctx.beginPath();
    ctx.arc(755, 88, 53, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = "rgba(255,255,255,.82)";
    for (let i = 0; i < 7; i++) {
      const x = ((i * 220 - runtime.cameraX * 0.08) % 1250 + 1250) % 1250 - 120;
      const y = 66 + (i % 3) * 58;
      ctx.fillRect(x, y, 82, 18);
      ctx.fillRect(x + 18, y - 15, 42, 20);
      ctx.fillRect(x + 47, y - 8, 58, 20);
    }
  }

  const farOffset = -(runtime.cameraX * 0.16) % 360;
  ctx.fillStyle = palette.far;
  for (let i = -1; i < 5; i++) {
    const x = farOffset + i * 360;
    ctx.beginPath();
    ctx.moveTo(x - 50, 430);
    ctx.quadraticCurveTo(x + 80, 180, x + 210, 430);
    ctx.quadraticCurveTo(x + 290, 250, x + 430, 430);
    ctx.closePath();
    ctx.fill();
  }
  const nearOffset = -(runtime.cameraX * 0.3) % 290;
  ctx.fillStyle = palette.near;
  for (let i = -1; i < 6; i++) {
    const x = nearOffset + i * 290;
    ctx.beginPath();
    ctx.moveTo(x - 60, 470);
    ctx.quadraticCurveTo(x + 55, 290, x + 165, 470);
    ctx.quadraticCurveTo(x + 230, 350, x + 340, 470);
    ctx.closePath();
    ctx.fill();
  }
}

function drawGround(ctx: CanvasRenderingContext2D, item: Rect, palette: Level["palette"], cameraX: number) {
  const x = Math.round(item.x - cameraX);
  if (x + item.w < 0 || x > VIEW_W) return;
  ctx.fillStyle = palette.ground;
  ctx.fillRect(x, item.y, item.w, item.h);
  ctx.fillStyle = palette.groundTop;
  ctx.fillRect(x, item.y, item.w, 11);
  ctx.fillStyle = "rgba(255,255,255,.18)";
  ctx.fillRect(x, item.y + 11, item.w, 4);
  ctx.fillStyle = "rgba(20,25,45,.12)";
  for (let px = x + 18; px < x + item.w; px += 48) {
    ctx.fillRect(px, item.y + 30 + ((px / 12) % 3) * 15, 12, 7);
  }
}

function drawPlatform(ctx: CanvasRenderingContext2D, item: Platform, runtime: Runtime) {
  const x = Math.round(item.x - runtime.cameraX);
  if (x + item.w < 0 || x > VIEW_W) return;
  ctx.fillStyle = item.moving ? "#8af1dc" : runtime.level.palette.groundTop;
  ctx.fillRect(x, item.y, item.w, item.h);
  ctx.fillStyle = item.moving ? "#326f84" : runtime.level.palette.ground;
  ctx.fillRect(x + 5, item.y + 8, item.w - 10, item.h + 5);
  if (item.moving) {
    ctx.fillStyle = "#f8fdff";
    ctx.fillRect(x + item.w / 2 - 13, item.y + 5, 26, 4);
  }
}

function drawSpike(ctx: CanvasRenderingContext2D, item: Rect, cameraX: number) {
  const x = item.x - cameraX;
  ctx.fillStyle = "#e74363";
  const count = Math.max(1, Math.floor(item.w / 18));
  const width = item.w / count;
  for (let i = 0; i < count; i++) {
    ctx.beginPath();
    ctx.moveTo(x + i * width, item.y + item.h);
    ctx.lineTo(x + i * width + width / 2, item.y);
    ctx.lineTo(x + (i + 1) * width, item.y + item.h);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = "#862d52";
  ctx.fillRect(x, item.y + item.h - 4, item.w, 4);
}

function drawCoin(ctx: CanvasRenderingContext2D, item: Coin, runtime: Runtime, now: number) {
  if (item.collected) return;
  const x = item.x - runtime.cameraX;
  if (x < -30 || x > VIEW_W + 30) return;
  const radius = item.big ? 18 : 12;
  const squash = 0.38 + Math.abs(Math.sin(now * 0.004 + item.x)) * 0.62;
  const bob = Math.sin(now * 0.003 + item.x * 0.02) * 3;
  ctx.save();
  ctx.translate(x, item.y + bob);
  ctx.scale(squash, 1);
  ctx.fillStyle = "#fff2a4";
  ctx.beginPath();
  ctx.arc(0, 0, radius + 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = item.big ? "#ff9f1c" : "#ffc928";
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff09a";
  ctx.fillRect(-3, -radius + 4, 5, radius * 1.1);
  ctx.restore();
  if (item.big) {
    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.6 + Math.sin(now * 0.006) * 0.3;
    ctx.fillRect(x - 2, item.y - 26 + bob, 4, 4);
    ctx.fillRect(x + 22, item.y - 4 + bob, 3, 3);
    ctx.globalAlpha = 1;
  }
}

function drawEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy, runtime: Runtime, now: number) {
  if (enemy.dead) return;
  const x = Math.round(enemy.x - runtime.cameraX);
  if (x + enemy.w < 0 || x > VIEW_W) return;
  const bounce = Math.sin(now * 0.012 + enemy.x) * 1.5;
  if (enemy.type === "patrol") {
    ctx.fillStyle = "#7d4bc7";
    ctx.fillRect(x + 3, enemy.y + 5 + bounce, enemy.w - 6, enemy.h - 5);
    ctx.fillStyle = "#b98bf7";
    ctx.fillRect(x + 8, enemy.y + bounce, enemy.w - 16, 9);
    ctx.fillStyle = "#f7fbff";
    ctx.fillRect(x + 7, enemy.y + 10 + bounce, 7, 8);
    ctx.fillRect(x + 20, enemy.y + 10 + bounce, 7, 8);
    ctx.fillStyle = "#24234a";
    ctx.fillRect(x + 10, enemy.y + 13 + bounce, 3, 4);
    ctx.fillRect(x + 20, enemy.y + 13 + bounce, 3, 4);
    ctx.fillStyle = "#402766";
    ctx.fillRect(x, enemy.y + enemy.h - 5, 10, 5);
    ctx.fillRect(x + enemy.w - 10, enemy.y + enemy.h - 5, 10, 5);
  } else {
    const stretch = enemy.y < enemy.baseY - 3 ? 3 : 0;
    ctx.fillStyle = "#ed704c";
    ctx.fillRect(x + 4, enemy.y + stretch, enemy.w - 8, enemy.h - stretch);
    ctx.fillStyle = "#ffb14a";
    ctx.fillRect(x + 9, enemy.y + 3 + stretch, enemy.w - 18, 9);
    ctx.fillStyle = "#fff";
    ctx.fillRect(x + 8, enemy.y + 13 + stretch, 6, 7);
    ctx.fillRect(x + 19, enemy.y + 13 + stretch, 6, 7);
    ctx.fillStyle = "#2f2844";
    ctx.fillRect(x + 10, enemy.y + 15 + stretch, 3, 4);
    ctx.fillRect(x + 19, enemy.y + 15 + stretch, 3, 4);
    ctx.fillStyle = "#ad3f3f";
    ctx.fillRect(x, enemy.y + enemy.h - 5, 11, 5);
    ctx.fillRect(x + enemy.w - 11, enemy.y + enemy.h - 5, 11, 5);
  }
}

function drawCheckpoint(ctx: CanvasRenderingContext2D, runtime: Runtime, now: number) {
  const item = runtime.checkpoint;
  const x = item.x - runtime.cameraX;
  ctx.fillStyle = "#edf8ff";
  ctx.fillRect(x, item.y - 70, 6, 70);
  ctx.fillStyle = item.active ? "#72efb5" : "#a9b1c6";
  const wave = Math.sin(now * 0.008) * 5;
  ctx.beginPath();
  ctx.moveTo(x + 6, item.y - 67);
  ctx.lineTo(x + 46 + wave, item.y - 54);
  ctx.lineTo(x + 6, item.y - 40);
  ctx.closePath();
  ctx.fill();
}

function drawGoal(ctx: CanvasRenderingContext2D, runtime: Runtime, now: number) {
  const item = runtime.level.goal;
  const x = item.x - runtime.cameraX;
  const pulse = 0.75 + Math.sin(now * 0.006) * 0.18;
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = runtime.level.palette.accent;
  ctx.fillRect(x - 14, item.y - 10, item.w + 28, item.h + 20);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#f6fbff";
  ctx.fillRect(x, item.y, 8, item.h);
  ctx.fillStyle = runtime.level.palette.accent;
  ctx.fillRect(x + 8, item.y + 6, item.w - 8, 28);
  ctx.fillStyle = "#fff8d0";
  ctx.beginPath();
  ctx.arc(x + item.w / 2 + 2, item.y + 20, 7 * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#eaf6ff";
  ctx.fillRect(x - 12, item.y + item.h - 8, 32, 8);
  ctx.restore();
}

function drawPlayer(ctx: CanvasRenderingContext2D, player: Player, cameraX: number, now: number) {
  if (player.invincible > 0 && Math.floor(now / 70) % 2 === 0) return;
  const x = Math.round(player.x - cameraX);
  const y = Math.round(player.y);
  const run = player.grounded && Math.abs(player.vx) > 20 ? Math.sin(now * 0.02) * 3 : 0;
  ctx.save();
  ctx.translate(x + PLAYER_W / 2, y);
  ctx.scale(player.facing, 1);
  ctx.translate(-PLAYER_W / 2, 0);
  ctx.fillStyle = "#293b66";
  ctx.fillRect(4, PLAYER_H - 8 + run, 10, 8);
  ctx.fillRect(18, PLAYER_H - 8 - run, 10, 8);
  ctx.fillStyle = "#3e68df";
  ctx.fillRect(4, 18, 24, 21);
  ctx.fillStyle = "#62a2ff";
  ctx.fillRect(8, 22, 16, 8);
  ctx.fillStyle = "#f3b46c";
  ctx.fillRect(7, 7, 20, 14);
  ctx.fillStyle = "#ffdb8d";
  ctx.fillRect(12, 10, 12, 8);
  ctx.fillStyle = "#e85b58";
  ctx.fillRect(4, 3, 24, 8);
  ctx.fillRect(3, 9, 9, 5);
  ctx.fillStyle = "#fff";
  ctx.fillRect(18, 10, 6, 6);
  ctx.fillStyle = "#222b48";
  ctx.fillRect(22, 12, 3, 4);
  ctx.fillStyle = "#f5f8ff";
  ctx.fillRect(0, 22, 7, 9);
  ctx.restore();
}

function draw(runtime: Runtime, ctx: CanvasRenderingContext2D, now: number) {
  ctx.imageSmoothingEnabled = false;
  drawBackground(ctx, runtime, now);
  runtime.level.solids.forEach((item) =>
    drawGround(ctx, item, runtime.level.palette, runtime.cameraX),
  );
  runtime.platforms.forEach((item) => drawPlatform(ctx, item, runtime));
  runtime.level.spikes.forEach((item) => drawSpike(ctx, item, runtime.cameraX));
  runtime.coins.forEach((item) => drawCoin(ctx, item, runtime, now));
  drawCheckpoint(ctx, runtime, now);
  drawGoal(ctx, runtime, now);
  runtime.enemies.forEach((item) => drawEnemy(ctx, item, runtime, now));
  drawPlayer(ctx, runtime.player, runtime.cameraX, now);

  if (runtime.phase === "playing" && runtime.elapsed < 5) {
    const alpha = Math.min(1, (5 - runtime.elapsed) / 1.2);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(21, 27, 60, .82)";
    ctx.fillRect(190, 465, 580, 45);
    pixelText(ctx, runtime.level.hint, 480, 488, 18, "#ffffff", "center");
    ctx.globalAlpha = 1;
  }
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<Runtime>(cloneLevel(0));
  const keysRef = useRef(new Set<string>());
  const jumpHeldRef = useRef(false);
  const [phase, setPhase] = useState<Phase>("start");
  const [hud, setHud] = useState({
    level: 1,
    lives: 3,
    score: 0,
    coins: 0,
    totalCoins: LEVELS[0].coins.length,
    elapsed: 0,
  });
  const [result, setResult] = useState({
    title: "",
    detail: "",
    score: 0,
    highScore: 0,
  });
  const [soundOn, setSoundOn] = useState(true);
  const soundOnRef = useRef(true);
  const lastHudRef = useRef(0);

  const playSound = useCallback((name: keyof typeof audio, arg?: boolean) => {
    if (!soundOnRef.current) return;
    const fn = audio[name] as ((value?: boolean) => void) | undefined;
    fn?.(arg);
  }, []);

  const syncHud = useCallback((runtime: Runtime) => {
    setHud({
      level: runtime.levelIndex + 1,
      lives: runtime.lives,
      score: runtime.score,
      coins: runtime.collected,
      totalCoins: runtime.coins.length,
      elapsed: runtime.elapsed,
    });
  }, []);

  const saveProgress = useCallback((runtime: Runtime) => {
    try {
      const high = Math.max(Number(localStorage.getItem("coinQuestHighScore") || 0), runtime.score);
      localStorage.setItem("coinQuestHighScore", String(high));
      localStorage.setItem(
        "coinQuestUnlocked",
        String(Math.min(LEVELS.length, runtime.levelIndex + 2)),
      );
      return high;
    } catch {
      return runtime.score;
    }
  }, []);

  const startLevel = useCallback(
    (index: number, score = 0) => {
      const runtime = cloneLevel(index, score, 3);
      runtimeRef.current = runtime;
      setPhase("playing");
      syncHud(runtime);
      keysRef.current.clear();
      canvasRef.current?.focus();
    },
    [syncHud],
  );

  const restartLevel = useCallback(() => {
    const current = runtimeRef.current;
    startLevel(current.levelIndex, current.levelStartScore);
  }, [startLevel]);

  const startGame = useCallback(() => startLevel(0, 0), [startLevel]);

  const nextLevel = useCallback(() => {
    const current = runtimeRef.current;
    if (current.levelIndex < LEVELS.length - 1) {
      startLevel(current.levelIndex + 1, current.score);
    } else {
      startGame();
    }
  }, [startGame, startLevel]);

  const togglePause = useCallback(() => {
    const runtime = runtimeRef.current;
    if (runtime.phase === "playing") {
      runtime.phase = "paused";
      setPhase("paused");
      keysRef.current.clear();
    } else if (runtime.phase === "paused") {
      runtime.phase = "playing";
      setPhase("playing");
      canvasRef.current?.focus();
    }
  }, []);

  const damage = useCallback(
    (runtime: Runtime) => {
      if (runtime.player.invincible > 0 || runtime.phase !== "playing") return;
      playSound("hurt");
      runtime.lives -= 1;
      runtime.deaths += 1;
      if (runtime.lives <= 0) {
        runtime.phase = "gameover";
        const high = saveProgress(runtime);
        setResult({
          title: "再试一次！",
          detail: `你抵达了第 ${runtime.levelIndex + 1} 关，已经非常接近终点。`,
          score: runtime.score,
          highScore: high,
        });
        setPhase("gameover");
      } else {
        runtime.player.x = runtime.checkpoint.active
          ? runtime.checkpoint.x + 18
          : runtime.level.start.x;
        runtime.player.y = runtime.checkpoint.active
          ? runtime.checkpoint.y - PLAYER_H
          : runtime.level.start.y;
        runtime.player.vx = 0;
        runtime.player.vy = 0;
        runtime.player.invincible = 1.6;
        runtime.cameraX = Math.max(0, runtime.player.x - 220);
      }
      syncHud(runtime);
    },
    [playSound, saveProgress, syncHud],
  );

  const finishLevel = useCallback(
    (runtime: Runtime) => {
      if (runtime.phase !== "playing") return;
      const timeBonus = Math.max(0, Math.round((runtime.level.timeTarget - runtime.elapsed) * 10));
      runtime.score += 1000 + timeBonus;
      runtime.phase = runtime.levelIndex === LEVELS.length - 1 ? "victory" : "complete";
      const high = saveProgress(runtime);
      playSound("finish");
      setResult({
        title: runtime.phase === "victory" ? "星门已点亮！" : `${runtime.level.name} 完成`,
        detail:
          runtime.phase === "victory"
            ? "三片大陆的金币重新闪耀，远征圆满完成。"
            : `用时 ${runtime.elapsed.toFixed(1)} 秒 · 击败 ${runtime.defeated} 个敌人`,
        score: runtime.score,
        highScore: high,
      });
      setPhase(runtime.phase);
      syncHud(runtime);
    },
    [playSound, saveProgress, syncHud],
  );

  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", " ", "a", "d", "w"].includes(key)) {
        event.preventDefault();
      }
      if (event.repeat && ["p", "escape", "r"].includes(key)) return;
      if (key === "p" || key === "escape") {
        togglePause();
        return;
      }
      if (key === "r") {
        restartLevel();
        return;
      }
      if (
        (key === "enter" || key === " ") &&
        ["start", "complete", "gameover", "victory"].includes(runtimeRef.current.phase)
      ) {
        if (phase === "start" || phase === "gameover" || phase === "victory") startGame();
        else nextLevel();
        return;
      }
      keysRef.current.add(key);
      if (key === " " || key === "w" || key === "arrowup") {
        if (!jumpHeldRef.current) runtimeRef.current.player.jumpBuffer = 0.12;
        jumpHeldRef.current = true;
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      keysRef.current.delete(key);
      if (key === " " || key === "w" || key === "arrowup") {
        jumpHeldRef.current = false;
        if (runtimeRef.current.player.vy < -230) runtimeRef.current.player.vy = -230;
      }
    };
    const onBlur = () => {
      keysRef.current.clear();
      jumpHeldRef.current = false;
      if (runtimeRef.current.phase === "playing") togglePause();
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [nextLevel, phase, restartLevel, startGame, togglePause]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let last = performance.now();
    let accumulator = 0;

    const update = (runtime: Runtime, dt: number) => {
      if (runtime.phase !== "playing") return;
      runtime.elapsed += dt;
      const player = runtime.player;
      const keys = keysRef.current;
      const left = keys.has("a") || keys.has("arrowleft") || keys.has("touch-left");
      const right = keys.has("d") || keys.has("arrowright") || keys.has("touch-right");
      const jumpHeld =
        jumpHeldRef.current || keys.has("touch-jump") || keys.has("w") || keys.has("arrowup");

      if (player.invincible > 0) player.invincible -= dt;
      player.coyote = player.grounded ? 0.1 : Math.max(0, player.coyote - dt);
      player.jumpBuffer = Math.max(0, player.jumpBuffer - dt);

      if (left !== right) {
        const direction = left ? -1 : 1;
        const acceleration = player.grounded ? 1500 : 1050;
        player.vx += direction * acceleration * dt;
        player.vx = Math.max(-220, Math.min(220, player.vx));
        player.facing = direction;
      } else {
        const drag = player.grounded ? 2000 : 350;
        if (Math.abs(player.vx) <= drag * dt) player.vx = 0;
        else player.vx -= Math.sign(player.vx) * drag * dt;
      }

      if (player.jumpBuffer > 0 && player.coyote > 0) {
        player.vy = -540;
        player.grounded = false;
        player.coyote = 0;
        player.jumpBuffer = 0;
        playSound("jump");
      }

      runtime.platforms.forEach((platform) => {
        platform.dx = 0;
        platform.dy = 0;
        if (!platform.moving) return;
        const previousX = platform.x;
        const previousY = platform.y;
        const axis = platform.axis ?? "x";
        const origin = axis === "x" ? platform.startX! : platform.startY!;
        const current = axis === "x" ? platform.x : platform.y;
        const direction = platform.direction ?? 1;
        const next = current + direction * (platform.speed ?? 60) * dt;
        if (Math.abs(next - origin) > (platform.distance ?? 100)) {
          platform.direction = -direction;
        } else if ((next - origin) * direction < 0 && direction < 0) {
          platform.direction = 1;
        }
        if (axis === "x") platform.x += (platform.direction ?? 1) * (platform.speed ?? 60) * dt;
        else platform.y += (platform.direction ?? 1) * (platform.speed ?? 60) * dt;
        const min = origin;
        const max = origin + (platform.distance ?? 100);
        if (axis === "x") platform.x = Math.max(min, Math.min(max, platform.x));
        else platform.y = Math.max(min, Math.min(max, platform.y));
        platform.dx = platform.x - previousX;
        platform.dy = platform.y - previousY;
      });

      if (player.grounded && player.standingPlatform?.moving) {
        player.x += player.standingPlatform.dx ?? 0;
        player.y += player.standingPlatform.dy ?? 0;
      }

      const allSolids: Platform[] = [
        ...runtime.level.solids.map((item) => ({ ...item })),
        ...runtime.platforms,
      ];
      player.x += player.vx * dt;
      player.x = Math.max(0, Math.min(runtime.level.width - PLAYER_W, player.x));
      for (const solid of allSolids) {
        if (solid.oneWay) continue;
        if (!overlap({ x: player.x, y: player.y, w: PLAYER_W, h: PLAYER_H }, solid)) continue;
        if (player.vx > 0) player.x = solid.x - PLAYER_W;
        else if (player.vx < 0) player.x = solid.x + solid.w;
        player.vx = 0;
      }

      const previousBottom = player.y + PLAYER_H;
      const gravity = player.vy > 0 || !jumpHeld ? 1750 : 1350;
      player.vy = Math.min(920, player.vy + gravity * dt);
      player.y += player.vy * dt;
      player.grounded = false;
      player.standingPlatform = null;
      for (const solid of allSolids) {
        const body = { x: player.x, y: player.y, w: PLAYER_W, h: PLAYER_H };
        if (!overlap(body, solid)) continue;
        if (solid.oneWay) {
          if (player.vy >= 0 && previousBottom <= solid.y + 6) {
            player.y = solid.y - PLAYER_H;
            player.vy = 0;
            player.grounded = true;
            player.standingPlatform = solid;
          }
          continue;
        }
        if (player.vy > 0 && previousBottom <= solid.y + 10) {
          player.y = solid.y - PLAYER_H;
          player.vy = 0;
          player.grounded = true;
          player.standingPlatform = solid;
        } else if (player.vy < 0) {
          player.y = solid.y + solid.h;
          player.vy = 0;
        }
      }

      runtime.enemies.forEach((enemy) => {
        if (enemy.dead) return;
        if (enemy.type === "patrol") {
          enemy.x += enemy.vx * dt;
          if (enemy.x <= enemy.minX || enemy.x + enemy.w >= enemy.maxX) {
            enemy.vx *= -1;
            enemy.x = Math.max(enemy.minX, Math.min(enemy.maxX - enemy.w, enemy.x));
          }
        } else {
          enemy.timer -= dt;
          enemy.vy += 1450 * dt;
          enemy.y += enemy.vy * dt;
          if (enemy.y >= enemy.baseY) {
            enemy.y = enemy.baseY;
            enemy.vy = 0;
            if (enemy.timer <= 0) {
              enemy.vy = -470;
              enemy.timer = 1.25;
              const direction = player.x < enemy.x ? -1 : 1;
              enemy.vx = direction * 32;
            }
          } else {
            enemy.x += enemy.vx * dt;
            enemy.x = Math.max(enemy.minX, Math.min(enemy.maxX, enemy.x));
          }
        }
        const enemyRect = { x: enemy.x, y: enemy.y, w: enemy.w, h: enemy.h };
        const body = { x: player.x, y: player.y, w: PLAYER_W, h: PLAYER_H };
        if (!overlap(body, enemyRect) || player.invincible > 0) return;
        if (player.vy > 80 && previousBottom <= enemy.y + 13) {
          enemy.dead = true;
          player.vy = -330;
          runtime.score += 200;
          runtime.defeated += 1;
          playSound("stomp");
        } else {
          damage(runtime);
        }
      });

      const body = { x: player.x, y: player.y, w: PLAYER_W, h: PLAYER_H };
      for (const item of runtime.level.spikes) {
        const hitbox = { x: item.x + 4, y: item.y + 5, w: item.w - 8, h: item.h - 5 };
        if (overlap(body, hitbox)) damage(runtime);
      }
      if (player.y > VIEW_H + 100) damage(runtime);

      runtime.coins.forEach((item) => {
        if (item.collected) return;
        const radius = item.big ? 18 : 12;
        if (
          overlap(body, {
            x: item.x - radius,
            y: item.y - radius,
            w: radius * 2,
            h: radius * 2,
          })
        ) {
          item.collected = true;
          runtime.collected += 1;
          runtime.score += item.big ? 500 : 100;
          playSound("coin", item.big);
        }
      });

      if (!runtime.checkpoint.active && player.x > runtime.checkpoint.x - 10) {
        runtime.checkpoint.active = true;
        runtime.score += 250;
        playSound("checkpoint");
      }

      if (overlap(body, runtime.level.goal)) finishLevel(runtime);

      const cameraTarget = Math.max(
        0,
        Math.min(runtime.level.width - VIEW_W, player.x - VIEW_W * 0.36),
      );
      runtime.cameraX += (cameraTarget - runtime.cameraX) * Math.min(1, dt * 7);
    };

    const loop = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      accumulator += delta;
      while (accumulator >= STEP) {
        update(runtimeRef.current, STEP);
        accumulator -= STEP;
      }
      draw(runtimeRef.current, ctx, now);
      if (now - lastHudRef.current > 120) {
        lastHudRef.current = now;
        syncHud(runtimeRef.current);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [damage, finishLevel, playSound, syncHud]);

  const setTouch = (key: string, pressed: boolean) => {
    if (pressed) keysRef.current.add(key);
    else keysRef.current.delete(key);
    if (key === "touch-jump") {
      if (pressed && !jumpHeldRef.current) {
        runtimeRef.current.player.jumpBuffer = 0.12;
      }
      jumpHeldRef.current = pressed;
      if (!pressed && runtimeRef.current.player.vy < -230) runtimeRef.current.player.vy = -230;
    }
    canvasRef.current?.focus();
  };

  const touchProps = (key: string) => ({
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      setTouch(key, true);
    },
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setTouch(key, false);
    },
    onPointerCancel: () => setTouch(key, false),
    onLostPointerCapture: () => setTouch(key, false),
  });

  return (
    <main className="game-page">
      <section className="topbar" aria-label="游戏标题和设置">
        <div className="brand">
          <span className="brand-coin" aria-hidden="true" />
          <div>
            <p>PIXEL TRAIL · 01</p>
            <h1>金币远征</h1>
          </div>
        </div>
        <div className="top-actions">
          <button
            className="icon-button"
            onClick={() => setSoundOn((value) => !value)}
            aria-label={soundOn ? "关闭声音" : "开启声音"}
            title={soundOn ? "关闭声音" : "开启声音"}
          >
            {soundOn ? "♪" : "×"}
          </button>
          <button className="icon-button pause-button" onClick={togglePause} aria-label="暂停游戏">
            {phase === "paused" ? "▶" : "Ⅱ"}
          </button>
        </div>
      </section>

      <section className="game-card">
        <div className="hud" aria-live="polite">
          <div className="hud-level">
            <span className="eyebrow">WORLD</span>
            <strong>0{hud.level}</strong>
            <span>{LEVELS[hud.level - 1].name}</span>
          </div>
          <div className="hud-stats">
            <div>
              <span className="heart" aria-hidden="true">♥</span>
              <strong>{hud.lives}</strong>
              <small>生命</small>
            </div>
            <div>
              <span className="mini-coin" aria-hidden="true" />
              <strong>{hud.coins}/{hud.totalCoins}</strong>
              <small>金币</small>
            </div>
            <div>
              <span className="timer-icon" aria-hidden="true">◷</span>
              <strong>{hud.elapsed.toFixed(1)}</strong>
              <small>秒</small>
            </div>
            <div>
              <span className="spark" aria-hidden="true">✦</span>
              <strong>{hud.score.toLocaleString("zh-CN")}</strong>
              <small>得分</small>
            </div>
          </div>
        </div>

        <div className="canvas-wrap">
          <canvas
            ref={canvasRef}
            width={VIEW_W}
            height={VIEW_H}
            tabIndex={0}
            aria-label="金币远征游戏画面。使用 A、D 或左右方向键移动，空格键跳跃。"
          />

          {phase === "start" && (
            <div className="overlay start-overlay">
              <div className="overlay-card intro-card">
                <span className="chapter">CHAPTER ONE</span>
                <div className="hero-coin" aria-hidden="true">
                  <i />
                </div>
                <h2>踏上金币远征</h2>
                <p>穿越青草、暮色与星辉遗迹。踩扁挡路的怪物，把散落的金币带回星门。</p>
                <button className="primary-button" onClick={startGame}>
                  开始远征 <span>→</span>
                </button>
                <div className="control-hints">
                  <span><kbd>A</kbd><kbd>D</kbd> 移动</span>
                  <span><kbd>SPACE</kbd> 跳跃</span>
                  <span><kbd>P</kbd> 暂停</span>
                </div>
              </div>
            </div>
          )}

          {phase === "paused" && (
            <div className="overlay">
              <div className="overlay-card small-card">
                <span className="chapter">REST A WHILE</span>
                <h2>远征暂停</h2>
                <p>风还在吹，金币会在这里等你。</p>
                <button className="primary-button" onClick={togglePause}>继续游戏</button>
                <button className="text-button" onClick={restartLevel}>重新开始本关</button>
              </div>
            </div>
          )}

          {(phase === "complete" || phase === "gameover" || phase === "victory") && (
            <div className="overlay">
              <div className="overlay-card result-card">
                <span className="chapter">
                  {phase === "complete" ? "TRAIL CLEARED" : phase === "victory" ? "QUEST COMPLETE" : "ONE MORE TRY"}
                </span>
                <div className={`result-emblem ${phase}`} aria-hidden="true">
                  {phase === "gameover" ? "↻" : "★"}
                </div>
                <h2>{result.title}</h2>
                <p>{result.detail}</p>
                <div className="score-panel">
                  <span>当前得分<strong>{result.score.toLocaleString("zh-CN")}</strong></span>
                  <span>最高纪录<strong>{result.highScore.toLocaleString("zh-CN")}</strong></span>
                </div>
                <button
                  className="primary-button"
                  onClick={phase === "complete" ? nextLevel : phase === "gameover" ? restartLevel : startGame}
                >
                  {phase === "complete" ? "前往下一关" : phase === "gameover" ? "重新挑战" : "再次远征"}
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          <div className="touch-controls" aria-label="触屏控制">
            <div className="touch-direction">
              <button {...touchProps("touch-left")} aria-label="向左移动">←</button>
              <button {...touchProps("touch-right")} aria-label="向右移动">→</button>
            </div>
            <button className="touch-jump" {...touchProps("touch-jump")} aria-label="跳跃">
              <span>↑</span>
              JUMP
            </button>
          </div>
        </div>

        <div className="progress-strip">
          {LEVELS.map((level, index) => (
            <div className={index < hud.level ? "done" : index === hud.level - 1 ? "active" : ""} key={level.name}>
              <span>0{index + 1}</span>
              <i />
              <small>{level.name}</small>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>键盘与触屏均可游玩 · 进度保存在当前浏览器</p>
        <p className="footer-mark">ORIGINAL CANVAS ADVENTURE</p>
      </footer>
    </main>
  );
}
