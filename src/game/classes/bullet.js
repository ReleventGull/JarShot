import { GameState } from "./gamestate";
export default class Bullet extends Phaser.GameObjects.Image {
            constructor(scene, speedLevel, baseSpeed, damageLevel, baseDamage) { // uses speed level and baseSpeed from game state on the get method for the group for reusability
                console.log(speedLevel, baseSpeed, damageLevel, baseDamage)
                super(scene, 0, 0, "bullet"); //super refers to parent class which is Phaser.GameObject.Image
                this.incX = 0; //How many incremnetal steps to use 
                this.incY = 0;
                this.lifespan = 0;
                this.speed = Phaser.Math.GetSpeed(speedLevel * baseSpeed, 1)
                this.damage = baseDamage * damageLevel
            }
            
            fire(pointerX, pointerY, playerX, playerY) {
                console.log("SPEED HERE", this.speed)
                this.setActive(true)
                this.setVisible(true)
                this.setPosition(playerX, playerY)
                const angle = Phaser.Math.Angle.Between(pointerX, pointerY, playerX, playerY)
                this.setRotation(angle + Math.PI)
                this.incX = Math.cos(angle); //Tell us which way the bullet should increment on the x and y axis
                this.incY = Math.sin(angle);
                this.lifespan = 5000
            }

            removeBullet() {
                this.setActive(false);
                this.setVisible(false);
            }
            
            update (time, delta)
            {
                this.lifespan -= delta;
                
                this.x -= this.incX * (this.speed * delta);
                this.y -= this.incY * (this.speed * delta);
                if (this.lifespan <= 0)
                {
                    this.removeBullet()
                }
            }
        }
