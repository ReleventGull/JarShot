import { GameObjects } from "phaser";

export class BossOne extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, "bossOne")
        this.scene = scene
    }
    moveCooldown = 300
    isMoveActive = false
    idleSpeed = Phaser.Math.GetSpeed(500, 1)
    idleDirection = 'left'
    
    //Variables for Bullet Rain
    bulletRainMovementSpeed = Phaser.Math.GetSpeed(300, 1)
    isBulletRainReady = false
    bulletRainBulletCooldown = 0
    bulletRainBulletDamage = 1
    bulletRainDamageLevel = 1
    bulletRainBulletSpeed = 800
    bulletRainBulletSpeedLevel = 1
    bulletRainBulletSpeedMultiplier = 1
    spawnEnemy() {
        this.container = this.scene.add.container()
        this.container.setPosition(this.scene.scale.width/2, this.width/2 + 6)
        this.container.add(this.hp)
        this.hp.setPosition(this.getBottomCenter().x, this.getBottomCenter().y + 12)
        this.container.add(this)
    }
    
    selectMoveToUse() {
        let randomMove = Phaser.Utils.Array.GetRandom(['Bullet Rain'])
        this.isMoveActive = randomMove
        this.moveCooldown = 5000
    }

    idleMove(delta) {
        switch (this.idleDirection) {
            case 'left': 
            if(this.container.x - this.idleSpeed * delta < this.width/2) {
                this.idleDirection = 'right'
            }else {
                this.container.x -= this.idleSpeed * delta
                break
            }   
            case 'right':
                if(this.container.x + this.idleSpeed * delta > this.scene.scale.width - this.width/2) {
                this.idleDirection = 'left'
            }else {
                this.container.x += this.idleSpeed * delta
                break
            }   
        }
            
    }
    bulletRain(delta) {
        if(!this.isBulletRainReady) {
            if(this.container.x - this.bulletRainMovementSpeed * delta < this.width/2)  {
                this.isBulletRainReady = true
            }else {
                this.container.x -= this.bulletRainMovementSpeed * delta
            }
        }else {
            if(this.container.x + this.bulletRainMovementSpeed * delta > this.scene.scale.width - this.width/2) {
                this.isMoveActive = false
                this.isBulletRainReady = false
                this.idleDirection = "left"
            }else {
                //Once bullet rain is ready it will start shooting here
                this.container.x += this.bulletRainMovementSpeed * delta
                    if (this.bulletRainBulletCooldown == 0) {
                        //If cooldown is 0, check for bullet and fire
                    let bullet = this.scene.bossOneBullets.get()
                        if(bullet) {
                            bullet.init({
                                bulletSpeedLevel: this.bulletRainBulletSpeedLevel,
                                multiplier: this.bulletRainBulletSpeedMultiplier,
                                bulletSpeed: this.bulletRainBulletSpeed,
                                damage: this.bulletRainBulletDamage,
                                bulletDamageLevel: this.bulletRainDamageLevel
                            })
                            bullet.fire(this.container.x, this.scene.scale.height, this.container.x, this.container.y)
                            this.bulletRainBulletCooldown = 300
                        }
                }else {
                    //Cooldown run
                    this.bulletRainBulletCooldown -= delta
                    if(this.bulletRainBulletCooldown < 0) {
                        this.bulletRainBulletCooldown = 0
                    }
                
            }
        } 
        }
    }

    update(time, delta) {
        if(this.isMoveActive == false) {
            this.idleMove(delta)
            if(this.moveCooldown > 0) {
                this.moveCooldown -= delta
                if(this.moveCooldown <= 0) {
                    this.moveCooldown = 0
                }
            }else{
                this.selectMoveToUse()
            }
        }else {
            switch (this.isMoveActive) {
                case "Bullet Rain": 
                    this.bulletRain(delta)
                    break;
            }
        }   
    }
}