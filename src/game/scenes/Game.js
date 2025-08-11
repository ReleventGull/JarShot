import { Scene } from 'phaser';
import Enemy from '../classes/enemy'
import Bullet from  '../classes/bullet'
export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }
    isCooldownActive;
    cooldownCount;
    countDownUntilEnemySpawn = 500
    score = 0
    updatePlayerRotation(pX, pY) {
        const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pX, pY)
        this.player.setRotation(angle);
    }
    determineEnemySpawn() {
        const chance = Phaser.Math.Between(0,1)

            let enemy = this.enemies.get() 
            if(enemy) {
                 enemy.spawnEnemy()
                 this.countDownUntilEnemySpawn = 500
                 return enemy;
            }
           
        this.countDownUntilEnemySpawn = 500
    }
    create () {
        this.cooldownCount = 200
        this.isCooldownActive = false
        
        this.bullets = this.add.group({ //refers to the bullet class up above
            classType: Bullet,
            maxSize: 50,
            runChildUpdate: true
        })
        this.enemies = this.add.group({
            classType: Enemy,
            maxSize: 20,
            runChildUpdate: true
        })
        this.scoreText = this.add.text(0, 0, `Score: ${this.score}`)
        this.player = this.physics.add.sprite(400, 300, "player") //don't forget to add the physics to it bro
        this.player.setCollideWorldBounds(true)
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update (time, delta) {
        for(let j = 0; j < this.bullets.children.entries.length; j++) {
                let bul = this.bullets.children.entries[j]
                let checkCollide;
            for(let i = 0; i < this.enemies.children.entries.length; i++) {
                let ene = this.enemies.children.entries[i]
                 checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(bul.getBounds(), ene.getBounds())
                if(checkCollide) {
                    bul.destroy()
                    ene.destroy()
                    this.score += 1
                    this.scoreText.setText(`Score: ${this.score}`)
                    break;
                }
            }
            if (checkCollide) break;
        }

        let pointer = this.input.activePointer
        if(this.cooldownCount <= 0) {
            this.isCooldownActive = false
        }
        if(pointer.leftButtonDown() && !this.isCooldownActive) {
            this.cooldownCount = 200
            this.isCooldownActive = true
            let bullet = this.bullets.get()
            if(bullet) {
                bullet.fire(pointer.x, pointer.y, this.player.x, this.player.y)
            }
        }else if(this.isCooldownActive){
            this.cooldownCount -= delta
        }
        
        if(this.countDownUntilEnemySpawn <= 0) {
            this.determineEnemySpawn()
        }else {
            this.countDownUntilEnemySpawn -= delta
        }
        
        
        this.updatePlayerRotation(pointer.x, pointer.y)
        if(this.wKey.isDown) {
            this.player.setVelocityY(-800)
        }else if (this.sKey.isDown) {
            this.player.setVelocityY(800)
        }else {
            this.player.setVelocityY(0)
        }
        if(this.aKey.isDown) {
            this.player.setVelocityX(-800)
        }else if(this.dKey.isDown) {
            this.player.setVelocityX(800)
        }else {
            this.player.setVelocityX(0)
        }
    }
}
