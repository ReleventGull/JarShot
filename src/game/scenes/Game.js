import { Scene } from 'phaser';
import TankEnemy from '../classes/tankEnemy';
import Enemy from '../classes/enemy'
import ChaseEnemy from '../classes/chaseEnemy';
import Bullet from  '../classes/bullet'
import Player from '../classes/player'
import { RotateEnemy } from '../classes/rotate';
import EnemyHP from '../classes/enemyhp';
import { Turret } from '../classes/turret';
import { GameState } from '../classes/gamestate'
export class Game extends Scene {
    constructor ()
    {
        super('Game');
    }

    countDownUntilEnemySpawn = 500
    elapsedTime = 0
    
    updateCash() {
        this.cashText.setText(`Cash: ${GameState.playerCash}`)
        localStorage.setItem(`jarShotPlayerCash`, GameState.playerCash)
    }
    updatePlayerRotation(pX, pY) {
        const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pX, pY)
        this.player.setRotation(angle);
    }
    
    updatePlayerHealthBarOnDamage() {
        this.playerHealthBarContainer.width = (this.playerLives * 15) + ((this.playerLives - 1) * this.spaceBetweenNodes)
        this.playerHealthNodesList[0].destroy()
        this.playerHealthNodesList.shift()
    }
    
    spawnTurret() {
        let turret = this.turrets.get()
        if(turret) {
            turret.spawnTurret()
        }
    }

    determineEnemySpawn() {
        const rotateChance = Phaser.Math.Between(0, 8)
        if(rotateChance == 0) {
            let rotateEnemy = this.rotateEnemies.get()
            if(rotateEnemy) {
                let enemyHpClass = new EnemyHP(this, 30)
                this.add.existing(enemyHpClass)
                rotateEnemy.hp = enemyHpClass
                rotateEnemy.spawnEnemy()
            }
        }
        let elapseMinutes = Math.floor(Math.floor(this.elapsedTime/1000)/60)
        const basicChance = Phaser.Math.Between(0, (10 - (elapseMinutes > 10 ? 10 : elapseMinutes)))
        if(basicChance == 0) {
            let enemy = this.enemies.get() 
            if(enemy) {
                let enemyHpClass = new EnemyHP(this, 10)
                this.add.existing(enemyHpClass)
                enemy.hp = enemyHpClass
                enemy.spawnEnemy()
            }
        }
        const chaseChance = Phaser.Math.Between(0, 50 - (elapseMinutes > 5 ? 50 : elapseMinutes * 10))
        if(chaseChance == 0) {
            let chaseEnemy = this.chaseEnemies.get()
            if(chaseEnemy) {
                let enemyHpClass = new EnemyHP(this, 20)
                this.add.existing(enemyHpClass)
                chaseEnemy.hp = enemyHpClass
                chaseEnemy.spawn()
            }
        }
        if (elapseMinutes >= 1) {
            const tankChance = Phaser.Math.Between(0, 50 - (elapseMinutes > 10 ? 10 : elapseMinutes))
            if(tankChance == 0) {
                let tankEnemy = this.tankEnemies.get()
                if(tankEnemy) {
                    let enemyHpClass = new EnemyHP(this, 100)
                    this.add.existing(enemyHpClass)
                    tankEnemy.hp = enemyHpClass
                    tankEnemy.spawn()
            }
        }
    }
        this.countDownUntilEnemySpawn = 200
    }

    checkTurretBulletCollision() {  
        for(let bullet of this.turretBullets.children.entries) {
            let checkCollide;
            for(let enemy of this.enemies.children.entries) {
                checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), enemy.getBounds())
                if(checkCollide) {
                    bullet.destroy()
                    enemy.hp.updateHealth(bullet.damage) 
                    if(enemy.hp.currentValue <= 0 ) {
                        GameState.playerCash += enemy.cashPerKill
                        this.updateCash()
                        enemy.hp.destroy()
                        enemy.destroy()
                    }
                }
            }
            if(!bullet.active) {
                continue
            }
            for(let enemy of this.chaseEnemies.children.entries) {
                checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), enemy.getBounds())
                if(checkCollide) {
                    bullet.destroy()
                    enemy.hp.updateHealth(bullet.damage) 
                    if(enemy.hp.currentValue <= 0 ) {
                        GameState.playerCash += enemy.cashPerKill
                        this.updateCash()
                        enemy.hp.destroy()
                        enemy.destroy()
                    }
                }
            }
            if(!bullet.active) {
                continue
            }
            for(let enemy of this.tankEnemies.children.entries) {
                checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), enemy.getBounds())
                if(checkCollide) {
                    bullet.destroy()
                    enemy.hp.updateHealth(bullet.damage) 
                    if(enemy.hp.currentValue <= 0 ) {
                        GameState.playerCash += enemy.cashPerKill
                        this.updateCash()
                        enemy.hp.destroy()
                        enemy.destroy()
                    }
                }
            }
            
        }   
    }

    checkPlayerBulletCollision() {
        for(let bullet of this.bullets.children.entries) {
            let checkCollide
            for(let enemy of this.enemies.children.entries) {
                 checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), enemy.getBounds())

                if(checkCollide && !enemy.isHit) {
                    enemy.isHit = 100
                    checkCollide = false
                    enemy.hp.updateHealth(bullet.damage)
                    bullet.destroy()
                    if(enemy.hp.currentValue <= 0) {
                        enemy.hp.destroy()
                        enemy.destroy()
                        GameState.playerCash += enemy.cashPerKill
                        this.updateCash()
                    }
                    break
                }
            }
            //Checks if bull is inactive to prevent unnecessary loops
            if(!bullet.active) {
                continue
            }
            for(let chaseEnemy of this.chaseEnemies.children.entries) {
                 checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), chaseEnemy.getBounds())
                if(checkCollide && !chaseEnemy.isHit) {
                    chaseEnemy.isHit = 100
                    checkCollide = false
                    chaseEnemy.hp.updateHealth(bullet.damage)
                    bullet.destroy()
                    if(chaseEnemy.hp.currentValue <= 0) {
                        chaseEnemy.hp.destroy()
                        chaseEnemy.destroy()
                        GameState.playerCash += chaseEnemy.cashPerKill
                        this.updateCash()
                    }
                    break;
                }
            }
             //Checks if bull is inactive to prevent unnecessary loops
            if(!bullet.active) {
                continue
            }
            for(let tankEnemy of this.tankEnemies.children.entries) {
                 checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), tankEnemy.getBounds())
                if(checkCollide && !tankEnemy.isHit) {
                    tankEnemy.isHit = 100
                    checkCollide = false
                    tankEnemy.hp.updateHealth(bullet.damage)
                    bullet.destroy()
                    if(tankEnemy.hp.currentValue <= 0) {
                        tankEnemy.hp.destroy()
                        tankEnemy.destroy()
                        GameState.playerCash += tankEnemy.cashPerKill
                        this.updateCash()
                    }
                    break;
                }
            }
            if(!bullet.active) {
                continue
            }
            for(let tankEnemy of this.rotateEnemies.children.entries) {
                 checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), tankEnemy.getBounds())
                if(checkCollide && !tankEnemy.isHit) {
                    tankEnemy.isHit = 100
                    checkCollide = false
                    tankEnemy.hp.updateHealth(bullet.damage)
                    bullet.destroy()
                    if(tankEnemy.hp.currentValue <= 0) {
                        tankEnemy.hp.destroy()
                        tankEnemy.destroy()
                        GameState.playerCash += tankEnemy.cashPerKill
                        this.updateCash()
                    }
                    break;
                }
            }
        }
    }

    checkCollisionForPlayer() {
                //First for loop for detecting player collision with enemy
                
        for(let i = 0; i < this.enemies.children.entries.length; i++) {
            let ene = this.enemies.children.entries[i]
            let checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(this.player.body.getBounds(), ene.getBounds())
            if (checkCollide && ene.isOnPlayer == 0 ) {
                this.playerLives -= 1
                this.player.dimPlayer()
                this.updatePlayerHealthBarOnDamage()
                //the length of cooldown when an enemy hits the player before it can register another hit
                ene.isOnPlayer = this.isOnPlayerCooldown 
                if(this.playerLives <= 0) {
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
        //Seonc for loop for detecting player collision with chase enemy
        for(let i = 0; i < this.chaseEnemies.children.entries.length; i++) {
            let ene = this.chaseEnemies.children.entries[i]
            let checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(this.player.body.getBounds(), ene.getBounds())
            if (checkCollide && ene.isOnPlayer == 0 ) {
                this.playerLives -= 1
                this.player.dimPlayer()
                this.updatePlayerHealthBarOnDamage()
                //the length of cooldown when an enemy hits the player before it can register another hit
                ene.isOnPlayer = this.isOnPlayerCooldown 
                if(this.playerLives <= 0) {
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
        //for detecting player collision with the tank enemies
        for(let i = 0; i < this.tankEnemies.children.entries.length; i++) {
            let ene = this.tankEnemies.children.entries[i]
            let checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(this.player.body.getBounds(), ene.getBounds())
            if (checkCollide && ene.isOnPlayer == 0 ) {
                this.playerLives -= 1
                this.player.dimPlayer()
                this.updatePlayerHealthBarOnDamage()
                //the length of cooldown when an enemy hits the player before it can register another hit
                ene.isOnPlayer = this.isOnPlayerCooldown 
                if(this.playerLives <= 0) {
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
        for(let i = 0; i < this.rotateEnemies.children.entries.length; i++) {
            let ene = this.rotateEnemies.children.entries[i]
            let checkCollide = Phaser.Geom.Intersects.RectangleToRectangle(this.player.body.getBounds(), ene.getBounds())
            if (checkCollide && ene.isOnPlayer == 0 ) {
                this.playerLives -= 1
                this.player.dimPlayer()
                this.updatePlayerHealthBarOnDamage()
                //the length of cooldown when an enemy hits the player before it can register another hit
                ene.isOnPlayer = this.isOnPlayerCooldown 
                if(this.playerLives <= 0) {
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
}

    create () {
        this.bullets = this.add.group({ //refers to the bullet class up above
            classType: Bullet,
            maxSize: 50,
            runChildUpdate: true
        })
        this.turretBullets = this.add.group({
            classType: Bullet,
            maxSize: 50,
            runChildUpdate: true
        })
        this.enemies = this.add.group({
            classType: Enemy,
            maxSize: 30,
            runChildUpdate: true
        })

        this.chaseEnemies = this.add.group({
            classType: ChaseEnemy,
            maxSize: 10,
            runChildUpdate: true
        })

        this.tankEnemies = this.add.group({
            classType: TankEnemy,
            maxSize: 5,
            runChildUpdate: true
        })

        this.turrets = this.add.group( {
            classType: Turret,
            maxSize: GameState.upgrades.Turrets.currentLevel - 1,
            runChildUpdate: true
        })

        this.rotateEnemies = this.add.group({
            classType: RotateEnemy,
            maxSize: 1,
            runChildUpdate: true
        })
        //sets the elapsed time back to 0
        this.elapsedTime = 0
        //Sets how long the enemies cooldown will be when they attack the player
        this.isOnPlayerCooldown = 300
        this.player = new Player(this)
        this.add.existing(this.player)
        this.player.spawnPlayer()
        this.cashText = this.add.text(0, 0, `Cash: ${GameState.playerCash}`)
        this.playerLives = GameState.upgrades.PlayerLives.currentLevel
        
        //Space between each health node
        this.spaceBetweenNodes = 4
        //Container holding health nodes
        this.playerHealthBarContainer = this.add.rectangle(this.player.x, this.player.y + 30, (this.playerLives * 15) + ((this.playerLives - 1) * this.spaceBetweenNodes), 8).setOrigin(.5)
        //health nodes for displaying health. Height goes off of parent container
        this.playerHealthNodesList = []
        for(let i = 0; i < GameState.upgrades.PlayerLives.currentLevel; i++) {
            let container = this.playerHealthBarContainer;
            let space = (i) * this.spaceBetweenNodes
            let xCoord = container.x - (container.width/2) + ((i) * 15)
            this.playerHealthNodesList.push(this.add.rectangle(xCoord + space, container.y, 15, container.height, 0x93939).setOrigin(0, 0.5))
        }
      this.input.keyboard.on("keydown-R", () => {
        this.spawnTurret()
      })
    }
    
    update (time, delta) {
        //Tracks total elapsed time passed
        this.elapsedTime += delta
        //Updates the player health bar container position to be under player
        this.playerHealthBarContainer.setPosition(this.player.x, this.player.y + 30)
        for(let i = 0; i < this.playerHealthNodesList.length; i++) {
            let container = this.playerHealthBarContainer;
            let space = (i) * this.spaceBetweenNodes
            let xCoord = container.x - (container.width/2) + ((i) * 15)
            this.playerHealthNodesList[i].setPosition(xCoord + space, container.y)
        }

        //send current delta to player
        this.player.update(delta)
        
        //For spawning bullets
        if(this.cooldownCount <= 0) {
            this.isBulletCooldownActive = false
        }
        if(this.player.pointer.leftButtonDown() && !this.isBulletCooldownActive) {
            this.cooldownCount = GameState.upgrades.ReloadSpeed.baseCooldown - (GameState.upgrades.ReloadSpeed.currentLevel * 100) //adjust for reload speed
            this.isBulletCooldownActive = true
            
            let bullet = this.bullets.get(
                GameState.upgrades.BulletSpeed.currentLevel,
                GameState.upgrades.BulletSpeed.baseSpeed,
                GameState.upgrades.BulletDamage.currentLevel,
                GameState.upgrades.BulletDamage.baseDamage
                )

            if(bullet) {
                bullet.fire(this.player.pointer.x, this.player.pointer.y, this.player.x, this.player.y)
            }
        }else if(this.isBulletCooldownActive){
            this.cooldownCount -= delta
        }
       
        this.checkCollisionForPlayer()
        this.checkTurretBulletCollision()
        this.checkPlayerBulletCollision()
        //determine enemy spawning
        if(this.countDownUntilEnemySpawn <= 0) {
            this.determineEnemySpawn()
        }else {
            this.countDownUntilEnemySpawn -= delta
        }
        }   
    }
