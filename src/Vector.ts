export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  normalize(): Vector {
    let m = this.magnitude();
    if (m != 0) {
      this.div(m);
    }
    return this;
  }

  div(n: number) {
    n = math.abs(n);
    this.x /= n;
    this.y /= n;
  }

  readonly magnitude = () => math.sqrt(this.x ** 2 + this.y ** 2);
}
