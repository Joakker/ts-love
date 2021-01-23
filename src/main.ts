import { Ball, Paddle, PaddleSide } from "./gameobj";

const ball = new Ball();
const l = new Paddle(PaddleSide.LF);
const r = new Paddle(PaddleSide.RT);

love.load = () => {
  l.color = [0, 1, 0];
  r.color = [0, 0, 1];
};

love.draw = () => {
  ball.draw();
  l.draw();
  r.draw();
};

love.update = (dt) => {
  l.updt(dt);
  r.updt(dt);
  ball.updt(dt);
};
