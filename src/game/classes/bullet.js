import { GameState } from "./gamestate";
export default class Bullet extends Phaser.GameObjects.Image {
            constructor(scene) { // uses speed level and baseSpeed from game state on the get method for the group for reusability
                super(scene, 0, 0, "bullet"); //super refers to parent class which is Phaser.GameObject.Image
                this.incX = 0; //How many incremnetal steps to use 
                this.incY = 0;
                this.lifespan = 0;
                this.speed
                this.damage
            }
            init(config){
                this.speed = Phaser.Math.GetSpeed((config.bulletSpeedLevel * config.multiplier) * config.bulletSpeed, 1)
                this.damage = config.bulletDamage * config.bulletDamageLevel
            }

            fire(targetX, targetY, startingPointx, startingPointY) {
                this.setPosition(startingPointx, startingPointY)
                this.setActive(true)
                this.setVisible(true)
                const angle = Phaser.Math.Angle.Between(targetX, targetY, startingPointx, startingPointY)
                this.setRotation(angle + Math.PI)
                this.incX = Math.cos(angle); //Tell us which way the bullet should increment on the x and y axis
                this.incY = Math.sin(angle);
                this.lifespan = 5000
            }

            removeBullet() {
                this.setActive(false);
                this.setVisible(false);
                this.destroy()
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
