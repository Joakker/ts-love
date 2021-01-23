import { Vector } from "./Vector";

type Color = [number, number, number];

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
