
export default class Player extends Phaser.GameObjects.Image {
    constructor (scene) {
        super(scene, 0, 0, "player")
        this.scene = scene
    }
    pointer;
    speed;
    dimCooldown = 0
    spawnPlayer() {
        this.setActive(true)
        this.setVisible(true)
        this.setPosition(300, 400)
        this.speed = Phaser.Math.GetSpeed(250, 1)
        this.wKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    updatePlayerRotation() {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, this.pointer.x, this.pointer.y)
        this.setRotation(angle)
    }

    dimPlayer () {
        this.setTint(0xFF0000)
        this.dimCooldown = 200
    }

    update(delta) {
        if(this.dimCooldown > 0) {
            if(this.dimCooldown - delta <= 0) {
                this.clearTint()
                this.dimCooldown = 0
            }else {
                this.dimCooldown -= delta
            }
        }
        this.pointer = this.scene.input.activePointer
        this.updatePlayerRotation()
        if(this.wKey.isDown) {
            this.y -= this.speed * delta
        }else if (this.sKey.isDown) {
            this.y += this.speed * delta
        }
        if(this.dKey.isDown) {
            this.x += this.speed * delta
        }else if (this.aKey.isDown) {
            this.x -= this.speed * delta
        }
    }
}