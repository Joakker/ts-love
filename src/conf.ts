export const WINDOW = {
  W: 640,
  H: 480,
  CW: 640 / 2,
  CH: 480 / 2,
};

export const PADDLE = {
  W: 20,
  H: 80,
};

love.conf = (t) => {
  t.window.width = WINDOW.W;
  t.window.height = WINDOW.H;
  t.window.title = "Pong!";
  math.randomseed(os.time());
};
