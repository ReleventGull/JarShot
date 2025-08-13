import { Scene } from 'phaser';
import Enemy from '../classes/enemy'
import Bullet from  '../classes/bullet'
import Player from '../classes/player'
import { GameState } from '../classes/gamestate'
export class Game extends Scene {
    constructor ()
    {
        super('Game');
    }

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
        
        this.player = new Player(this)
        this.add.existing(this.player)
        this.player.spawnPlayer()
        
        this.scoreText = this.add.text(0, 0, `Score: ${this.score}`)
    }

    update (time, delta) {
        this.player.update(delta)
        for(let j = 0; j < this.bullets.children.entries.length; j++) {
                let bul = this.bullets.children.entries[j]
                let checkCollide;
            for(let i = 0; i < this.enemies.children.entries.length; i++) {
                let ene = this.enemies.children.entries[i]
                 checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(bul.getBounds(), ene.getBounds())
                if(checkCollide) {
                    bul.destroy()
                    ene.destroy()
                    GameState.playerCash += ene.cashPerKill
                    console.log(GameState.playerCash)
                    this.score += 1
                    this.scoreText.setText(`Score: ${this.score}`)
                    break;
                }
            }
            if (checkCollide) break;
        }
        if(this.cooldownCount <= 0) {
            this.isCooldownActive = false
        }
        if(this.player.pointer.leftButtonDown() && !this.isCooldownActive) {
            this.cooldownCount = 200
            this.isCooldownActive = true
            let bullet = this.bullets.get()
            if(bullet) {
                bullet.fire(this.player.pointer.x, this.player.pointer.y, this.player.x, this.player.y)
            }
        }else if(this.isCooldownActive){
            this.cooldownCount -= delta
        }
        
        if(this.countDownUntilEnemySpawn <= 0) {
            this.determineEnemySpawn()
        }else {
            this.countDownUntilEnemySpawn -= delta
        }
        }   
    }
