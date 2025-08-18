import { GameState } from "./gamestate";
export default class Bullet extends Phaser.GameObjects.Image {
            constructor(scene) {
                super(scene, 0, 0, "bullet"); //super refers to parent class which is Phaser.GameObject.Image
                this.incX = 0; //How many incremnetal steps to use 
                this.incY = 0;
                this.lifespan = 0;
                this.speed = Phaser.Math.GetSpeed((GameState.upgrades.BulletSpeed.currentLevel * 150 * 2), 1)
            }
            
            fire(pointerX, pointerY, playerX, playerY) {
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
