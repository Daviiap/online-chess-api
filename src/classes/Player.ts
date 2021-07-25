export class Player {
  private id: string;
  private name: string;
  private X: number;
  private Y: number;
  private score: number;

  public constructor(x: number, y: number, name: string, id: string) {
    this.X = x;
    this.Y = y;
    this.name = name;
    this.id = id;
    this.score = 0;
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

  public getName(): string {
    return this.name;
  }

  public getScore(): number {
    return this.score;
  }

  public incrementScore(): void {
    this.score++;
  }

  public move(direction: "left" | "right" | "up" | "down"): void {
    if (direction === "left") {
      this.X--;
    } else if (direction === "right") {
      this.X++;
    } else if (direction === "up") {
      this.Y--;
    } else if (direction === "down") {
      this.Y++;
    }
  }
}
