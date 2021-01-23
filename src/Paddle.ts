import { KeyConstant } from "love.keyboard";
import { ball } from "./Ball";
import { PADDLE, WINDOW } from "./conf";
import { GameObject } from "./gameobj";

export enum PaddleSide {
  LF = -1,
  RT = +1,
}

export const Controls: {
  [P in PaddleSide]: { up: KeyConstant; dn: KeyConstant };
} = {
  [PaddleSide.LF]: { up: "w", dn: "s" },
  [PaddleSide.RT]: { up: "up", dn: "down" },
};

/**
 * Represents each paddle
 */
export class Paddle extends GameObject {
  side: PaddleSide;
  coldist: number;
  readonly SPEED = 300;

  constructor(side: PaddleSide) {
    super(
      side == PaddleSide.LF ? 10 : WINDOW.W - PADDLE.W - 10,
      WINDOW.CH - PADDLE.H / 2
    );
    this.side = side;
    this.coldist = side == PaddleSide.LF ? this.pos.x + PADDLE.W : this.pos.x;
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
    switch (this.side) {
      case PaddleSide.LF: {
        const colpt = ball.pos.x - ball.radius;
        if (
          colpt <= this.coldist &&
          this.pos.y <= ball.pos.y &&
          ball.pos.y <= this.pos.y + PADDLE.H
        )
          ball.velocity.x *= -1;
        break;
      }
      case PaddleSide.RT: {
        const colpt = ball.pos.x + ball.radius;
        if (
          colpt >= this.coldist &&
          this.pos.y <= ball.pos.y &&
          ball.pos.y <= this.pos.y + PADDLE.H
        )
          ball.velocity.x *= -1;
        break;
      }
    }
  }

  readonly isUp = () => love.keyboard.isDown(Controls[this.side].up);
  readonly isDn = () => love.keyboard.isDown(Controls[this.side].dn);
}
