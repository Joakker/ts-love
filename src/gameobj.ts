import { KeyConstant } from "love.keyboard";
import { WINDOW, PADDLE } from "./conf";
import { Vector } from "./vector";

type Color = [number, number, number];

export enum PaddleSide {
  LF,
  RT,
}

const Controls: { [P in PaddleSide]: { up: KeyConstant; dn: KeyConstant } } = {
  [PaddleSide.LF]: { up: "w", dn: "s" },
  [PaddleSide.RT]: { up: "up", dn: "down" },
};

/**
 * Base class for every object in the game
 */
export abstract class GameObject {
  pos: Vector;
  color: Color = [1, 1, 1];

  constructor(x: number, y: number) {
    this.pos = new Vector(x, y);
  }

  abstract draw(dt: number): void;
  abstract updt(dt: number): void;
}

/**
 * Represents the ball.
 */
export class Ball extends GameObject {
  readonly radius: number;
  speed: number;
  velocity: Vector;

  constructor() {
    super(WINDOW.CW, WINDOW.CH);
    this.radius = 20;
    this.color = [1, 0, 0];
    this.velocity = new Vector(
      math.random(0, 100) - 50,
      math.random(0, 90) - 50
    ).normalize();
    this.speed = 300;
  }

  draw() {
    love.graphics.setColor(...this.color);
    love.graphics.circle("fill", this.pos.x, this.pos.y, this.radius);
  }

  updt(dt: number) {
    this.collides();
    this.pos.x += this.velocity.x * this.speed * dt;
    this.pos.y += this.velocity.y * this.speed * dt;
  }

  collides(): void {
    if (this.pos.y < WINDOW.CH) {
      const colpt = this.pos.y - this.radius;
      if (colpt <= 0) this.velocity.y *= -1;
    } else {
      const colpt = this.pos.y + this.radius;
      if (colpt >= WINDOW.H) this.velocity.y *= -1;
    }
    if (this.pos.x < WINDOW.CW) {
      const colpt = this.pos.x - this.radius;
      if (colpt <= 0) this.velocity.x *= -1;
    } else {
      const colpt = this.pos.x + this.radius;
      if (colpt >= WINDOW.W) this.velocity.x *= -1;
    }
  }
}

/**
 * Represents each paddle
 */
export class Paddle extends GameObject {
  side: PaddleSide;
  readonly SPEED = 300;

  constructor(side: PaddleSide) {
    super(side == PaddleSide.LF ? 10 : WINDOW.W - PADDLE.W - 10, 10);
    this.side = side;
  }

  draw() {
    love.graphics.setColor(...this.color);
    love.graphics.rectangle("fill", this.pos.x, this.pos.y, PADDLE.W, PADDLE.H);
  }

  updt(dt: number) {
    if (this.isUp() && this.pos.y > 10) {
      this.pos.y -= this.SPEED * dt;
    } else if (this.isDn() && this.pos.y < WINDOW.H - PADDLE.H - 10) {
      this.pos.y += this.SPEED * dt;
    }
  }

  readonly isUp = () => love.keyboard.isDown(Controls[this.side].up);
  readonly isDn = () => love.keyboard.isDown(Controls[this.side].dn);
}
