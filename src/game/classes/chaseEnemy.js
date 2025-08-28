

export default class ChaseEnemy extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, "chaseEnemy")
        this.scene = scene
    }
    speed;
    cashPerKill = 300;
    isOnPlayer = 0;
    isHiit = 0
    speed;
    spawn() {
        this.container = this.scene.add.container(0,0)
        this.hp.setPosition(this.getBottomCenter().x, this.getBottomCenter().y + 12)
        this.container.add(this)
        this.container.add(this.hp)
        this.setActive(true) 
        this.setVisible(true)
        this.setOrigin(.5)
        let randomSpot = Phaser.Utils.Array.GetRandom(["top", "left", "right", "bottom"])
        this.speed = Phaser.Math.GetSpeed(300, 1)
        randomSpot = "right"
        switch(randomSpot) {
            case "top":
                this.container.setPosition(Phaser.Math.Between(0, this.scene.scale.width - this.width/2), 0 + (this.width/2))
                break;
            case"bottom": 
                this.container.setPosition(Phaser.Math.Between(0, this.scene.scale.width - this.width/2), this.scene.scale.height - this.height/2)
                break;
            case "left":
                this.container.setPosition(0 + this.width/2, Phaser.Math.Between(0 + this.height/2, this.scene.scale.height - this.height/2))
                break;
            case "right":
                this.container.setPosition(this.scene.scale.width - this.width/2, Phaser.Math.Between(0, this.scene.scale.height - this.height/2))
                break;
            default: 
                return;
        }
    }
    update(time, delta) {
        if (this.isHit >= 0) {
        this.isHit -= delta
            if(this.isHit < 0) {
                this.isHit = 0
            }
        }
        if(this.isOnPlayer > 0) {
            this.isOnPlayer -= delta
            if(this.isOnPlayer < 0){
                this.isOnPlayer = 0
            } 
        }
        let angle = Phaser.Math.Angle.Between(this.container.x, this.container.y, this.scene.player.x, this.scene.player.y)
        this.incX = Math.cos(angle) * this.speed
        this.incY = Math.sin(angle) * this.speed
        this.container.x += this.incX *  delta
        this.container.y += this.incY *  delta
    }
}