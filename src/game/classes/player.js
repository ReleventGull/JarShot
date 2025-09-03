import { GameState } from "./gamestate";

export default class Player extends Phaser.GameObjects.Container {
    constructor (scene) {
        super(scene, scene.scale.width/2, scene.scale.height/2)
        this.scene = scene
    }
    pointer;
    speed;
    dimCooldown = 0
    spawnPlayer() {
        this.setActive(true)
        this.setVisible(true)
        this.speed = Phaser.Math.GetSpeed(305, 1)
    
        this.body = this.scene.add.circle(0, 0, 16, GameState.colors.playerBodyColor).setOrigin(.5)
        this.turret = this.scene.add.rectangle(this.body.width/2 , 0, 15, 5, GameState.colors.playerBarrelColor).setOrigin(1, .5)
        this.add(this.body)
        this.add(this.turret)
        
        this.wKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    updatePlayerRotation() {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, this.pointer.x, this.pointer.y)
        this.setRotation(angle)
    }
    //Dim function needs rework due to container changes
    dimPlayer () {
        //this.body.setTint(0xFF0000)
        this.dimCooldown = 200
    }

    update(delta) {
        if(this.dimCooldown > 0) {
            if(this.dimCooldown - delta <= 0) {
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