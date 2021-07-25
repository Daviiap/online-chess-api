export class Fruit {
  private X: number;
  private Y: number;
  private id: string;

  public constructor(x: number, y: number, id: string) {
    this.id = id;
    this.X = x;
    this.Y = y;
  }

  public getX(): number {
    return this.X;
  }

  public getY(): number {
    return this.Y;
  }

  public getId(): string {
    return this.id;
  }
}
