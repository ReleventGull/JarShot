

export default class ChaseEnemy extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, "chaseEnemy")
        this.scene = scene
    }
    speed;
    spawn() {
        this.setActive(true) 
        this.setVisible(true)
        this.setOrigin(0,0)
        let randomSpot = Phaser.Utils.Array.GetRandom(["top", "left", "right", "bottom"])
        this.speed = Phaser.Math.GetSpeed(300, 1)
        this.cashPerKill = 150
        this.isHit = 0
        randomSpot = "right"
        switch(randomSpot) {
            case "top":
                console.log("Spawning chase enemy...")
                this.setPosition(Phaser.Math.Between(0, this.scene.scale.width - this.width/2), 0 + (this.width/2))
                break;
            case"bottom": 
                this.setPosition(Phaser.Math.Between(0, this.scene.scale.width - this.width/2), this.scene.scale.height - this.height/2)
                break;
            case "left":
                this.setPosition(0 + this.width/2, Phaser.Math.Between(0 + this.height/2, this.scene.scale.height - this.height/2))
                break;
            case "right":
                this.setPosition(this.scene.scale.width - this.width/2, Phaser.Math.Between(0, this.scene.scale.height - this.height/2))
                break;
            default: 
                return;
        }
    }
    update(time, delta) {
        this.hp.setPosition(this.getBottomCenter().x, this.getBottomCenter().y + 12)
        if (this.isHit >= 0) {
        this.isHit -= delta
            if(this.isHit < 0) {
                this.isHit = 0
            }
        }
        let angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y)
        let xInc = Math.cos(angle)
        let yInc = Math.sin(angle)
        this.x += xInc * (this.speed * delta)
        this.y += yInc * (this.speed * delta)
    }
}