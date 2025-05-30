import Phaser from "phaser";
import GameScene from "./scenes/GameScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: GameScene,
};

new Phaser.Game(config);
