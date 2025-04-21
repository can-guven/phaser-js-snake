import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.snake = [];
    this.food = null;
    this.direction = "right";
    this.moveInterval = 100;
    this.lastMoveTime = 0;
  }

  create() {
    this.snake = [];
    const startX = 400;
    const startY = 300;

    for (let i = 0; i < 3; i++) {
      const segment = this.add.rectangle(
        startX - i * 20,
        startY,
        20,
        20,
        0x00ff00
      );
      this.snake.push(segment);
    }

    this.food = this.add.rectangle(0, 0, 20, 20, 0xff0000);
    this.repositionFood();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time) {
    if (time > this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.moveSnake();
    }

    if (this.cursors.left.isDown && this.direction !== "right") {
      this.direction = "left";
    } else if (this.cursors.right.isDown && this.direction !== "left") {
      this.direction = "right";
    } else if (this.cursors.up.isDown && this.direction !== "down") {
      this.direction = "up";
    } else if (this.cursors.down.isDown && this.direction !== "up") {
      this.direction = "down";
    }
  }

  moveSnake() {
    const head = this.snake[0];
    let newX = head.x;
    let newY = head.y;

    switch (this.direction) {
      case "left":
        newX -= 20;
        break;
      case "right":
        newX += 20;
        break;
      case "up":
        newY -= 20;
        break;
      case "down":
        newY += 20;
        break;
    }

    if (newX === this.food.x && newY === this.food.y) {
      this.growSnake();
      this.repositionFood();
    } else {
      for (let i = this.snake.length - 1; i > 0; i--) {
        this.snake[i].x = this.snake[i - 1].x;
        this.snake[i].y = this.snake[i - 1].y;
      }
    }

    head.x = newX;
    head.y = newY;
    this.checkGameOver();
  }

  growSnake() {
    const lastSegment = this.snake[this.snake.length - 1];
    const newSegment = this.add.rectangle(
      lastSegment.x,
      lastSegment.y,
      20,
      20,
      0x00ff00
    );
    this.snake.push(newSegment);
  }

  repositionFood() {
    const gridSize = 20;
    const x = Math.floor(Math.random() * (800 / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (600 / gridSize)) * gridSize;
    this.food.x = x;
    this.food.y = y;
  }

  checkGameOver() {
    const head = this.snake[0];

    if (head.x < 0 || head.x >= 800 || head.y < 0 || head.y >= 600) {
      this.scene.restart();
      return;
    }

    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        this.scene.restart();
        return;
      }
    }
  }
}
