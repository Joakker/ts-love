import { ball } from "./Ball";
import { Paddle, PaddleSide } from "./Paddle";

let l: Paddle;
let r: Paddle;

love.load = () => {
  ball.reset();
  l = new Paddle(PaddleSide.LF);
  r = new Paddle(PaddleSide.RT);
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
