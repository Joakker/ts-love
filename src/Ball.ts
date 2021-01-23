import { GameObject } from "./gameobj";
import { WINDOW } from "./conf";
import { Vector } from "./Vector";

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
      math.random(10, 50),
      math.random(10, 50)
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
      if (colpt <= 0) {
        this.velocity.y *= -1;
        this.pos.y = this.radius;
      }
    } else {
      const colpt = this.pos.y + this.radius;
      if (colpt >= WINDOW.H) {
        this.velocity.y *= -1;
        this.pos.y = WINDOW.H - this.radius;
      }
    }
    if (this.pos.x <= 0 || this.pos.x >= WINDOW.W) {
      love.load!([]);
    }
  }

  reset(): void {
    this.color = [1, 0, 0];
    this.pos.x = WINDOW.CW;
    this.pos.y = WINDOW.CH;
    this.velocity = new Vector(
      math.random(10, 50),
      math.random(10, 50)
    ).normalize();
    this.speed = 300;
  }
}

export const ball = new Ball();
