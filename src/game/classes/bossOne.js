import { GameObjects } from "phaser";

export class BossOne extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, "bossOne")
        this.scene = scene
    }

    spawnEnemy() {
        this.container = this.scene.add.container()
        this.container.setPosition(this.scene.scale.width/2, this.width/2 + 6)
        this.container.add(this.hp)
        this.hp.setPosition(this.getBottomCenter().x, this.getBottomCenter().y + 12)
        this.container.add(this)
    }
}