
export default class EnemyHP extends Phaser.GameObjects.Rectangle {
    constructor(scene, value) {
        super(scene, 500, 500, 50, 10, 0x5536)
        this.scene = scene
        this.value = value
        this.currentValue = value
        this.setOrigin(.5)
    }
    //max value = 10
    //current = 5
    updateHealthBar() {
        let newSize = (this.currentValue/this.value) * 50
        this.width = newSize
        this.setOrigin(.5)
    }
    updateHealth(dmg) {
        this.currentValue -= dmg
        this.updateHealthBar()
    }
}