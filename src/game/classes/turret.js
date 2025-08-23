export class Turret extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, "turret")
        this.scene = scene
    }
    spawnTurret() {
        this.setPosition(this.scene.player.x, this.scene.player.y)
        this.setActive(true)
        this.setVisible(true)
    }
}