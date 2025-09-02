import { GameState } from "./gamestate"

export class Turret extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, "turret")
        this.scene = scene
    }
    lookingForEnemy = false
    targetedEnemy
    reloadCooldown = 0
    spawnTurret() {
        this.setPosition(this.scene.player.x, this.scene.player.y)
        this.setActive(true)
        this.setVisible(true)

    }
    trackEnemy(delta) {
        let enemy = this.targetedEnemy
        //For grabbing the relative position
        let rX = enemy.container.x - this.x 
        let rY = enemy.container.y - this.y
        let enemyX = enemy.incX
        let enemyY = enemy.incY;   
        let bulletSpeed = Phaser.Math.GetSpeed(GameState.upgrades.TurretBulletSpeed.baseSpeed * (GameState.upgrades.TurretBulletSpeed.multiplier * GameState.upgrades.TurretBulletSpeed.currentLevel), 1)

        let A = (enemyX)**2 + (enemyY)**2 - bulletSpeed**2
        let B = 2 * ((rX * (enemyX)) + (rY * (enemyY)))
        let C = Math.pow(rX, 2) + Math.pow(rY, 2)
        let discriminant = Math.pow(B, 2) - 4 * A * C;
        let t1 = (-B + Math.sqrt(discriminant)) / (2 * A);
        let t2 = (-B - Math.sqrt(discriminant)) / (2 * A);

        let t;  
        
        if (t1 > 0 && t2 > 0) {
            t = Math.min(t1, t2);
        } else if (t1 > 0) {
            t = t1;
        } else if (t2 > 0) {
            t = t2;
        } else {
            t = null;
        }
        
  
        this.x_hit = enemy.container.x + enemyX * t;
        this.y_hit = enemy.container.y + enemyY * t;
        let angle = Phaser.Math.Angle.Between(this.x, this.y, this.x_hit, this.y_hit)
        this.setRotation(angle + Math.PI / 2)
    }
    searchForEnemy() {
        let shortestDistance = 10000000
        let chosenEnemy;
        let enemies = [...this.scene.enemies.children.entries, ...this.scene.chaseEnemies.children.entries, ...this.scene.tankEnemies.children.entries]
        for(let i = 0; i < enemies.length; i++) {
            let currentEnemy = enemies[i]
            let distance = Phaser.Math.Distance.Between(this.x, this.y, currentEnemy.container.x, currentEnemy.container.y)
            if(shortestDistance > distance) {
                chosenEnemy = currentEnemy
            }
        }
        if(chosenEnemy){
            this.targetedEnemy = chosenEnemy
        }
        this.lookingForEnemy = false
    }
    removeEnemy() {
        this.targetedEnemy = null
        this.x_hit = null
        this.y_hit = null
    }
    update(time, delta) {
        if (this.reloadCooldown > 0) {
            this.reloadCooldown -= delta
            if(this.reloadCooldown <= 0) {
                    this.reloadCooldown = 0
                }
            }
        if(!this.lookingForEnemy && this.targetedEnemy == null) {
            this.lookingForEnemy = true
            this.searchForEnemy()
        }else {
            if(this.targetedEnemy) {
                if (this.targetedEnemy.active) {
                    this.trackEnemy(delta)
                    let bullet = this.scene.turretBullets.get()
                    if(bullet && this.reloadCooldown == 0) {
                        this.reloadCooldown = 1100 - (GameState.upgrades.TurretReloadSpeed.currentLevel * 120)
                            bullet.init({
                                bulletSpeed: GameState.upgrades.TurretBulletSpeed.baseSpeed,
                                bulletSpeedLevel: GameState.upgrades.TurretBulletSpeed.currentLevel,
                                multiplier: GameState.upgrades.TurretBulletSpeed.multiplier,
                                bulletDamage: GameState.upgrades.TurretBulletDamage.baseDamage,
                                bulletDamageLevel: GameState.upgrades.TurretBulletDamage.currentLevel
                            })
                       
                        bullet.fire(this.x_hit, this.y_hit, this.x, this.y)
                    }
                }else {
                    this.removeEnemy()
                }
            } 
        }
    }
}