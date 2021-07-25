import { Fruit } from "./Fruit";
import { Player } from "./Player";

export class Map {
  private width: number;
  private height: number;
  private players: Record<string, Player>;
  private fruits: Record<string, Fruit>;

  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.players = {};
    this.fruits = {};
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getPlayers(): Record<string, Player> {
    return this.players;
  }

  public getFruits(): Record<string, Fruit> {
    return this.fruits;
  }

  public removeFruit(fruitId: string): void {
    this.fruits[fruitId] && delete this.fruits[fruitId];
  }

  public removePlayer(playerId: string): void {
    this.players[playerId] && delete this.players[playerId];
  }

  public addFruit(fruit: Fruit) {
    const fruitId = fruit.getId();
    if (!this.fruits[fruitId]) {
      this.fruits[fruitId] = fruit;
    }
  }

  public addPlayer(player: Player) {
    const playerId = player.getId();
    if (!this.players[playerId]) {
      this.players[playerId] = player;
    }
  }

  public movePlayer(
    playerId: string,
    direction: "left" | "right" | "up" | "down"
  ) {
    const player = this.players[playerId];
    if (player) {
      if (direction === "up" && player.getY() > 0) {
        player.move(direction);
      } else if (direction === "down" && player.getY() < this.height - 1) {
        player.move(direction);
      } else if (direction === "left" && player.getX() > 0) {
        player.move(direction);
      } else if (direction === "right" && player.getX() < this.width - 1) {
        player.move(direction);
      }

      Object.values(this.fruits).forEach((fruit) => {
        if (fruit.getX() === player.getX() && fruit.getY() === player.getY()) {
          this.removeFruit(fruit.getId());
        }
      });
    }
  }
}
