import { Scene } from 'phaser';
import Enemy from '../classes/enemy'
import ChaseEnemy from '../classes/chaseEnemy';
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
            }
            let chaseEnemy = this.chaseEnemies.get()
            if(chaseEnemy) {
                chaseEnemy.spawn()
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

        this.chaseEnemies = this.add.group({
            classType: ChaseEnemy,
            maxSize: 5,
            runChildUpdate: true
        })
        
        this.player = new Player(this)
        this.add.existing(this.player)
        this.player.spawnPlayer()
        this.player.lives = GameState.playerLives
        this.cashText = this.add.text(0, 0, `Cash: ${GameState.playerCash}`)
    }

    update (time, delta) {
        this.player.update(delta)
        //First for loop for detecting player collision with enemy
        for(let i = 0; i < this.enemies.children.entries.length; i++) {
            let ene = this.enemies.children.entries[i]
            let checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), ene.getBounds())
            if (checkCollide) {
                this.player.lives -= 1
                if(this.player.lives <= 0) {
                setTimeout(() => {
                    this.scene.start("MainMenu")
                    }, 3000)
                this.add.text(this.scale.width / 2, this.scale.height / 2, "YOU DIED",
                    {
                        color: "red",
                        fontSize: "4em"
                    }
                ).setOrigin(.5)
                
                
                this.scene.pause()
            }
        }
    }

        //this loop for detecting bullet collision with enemy
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
                    this.cashText.setText(`Cash: ${GameState.playerCash}`)
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
