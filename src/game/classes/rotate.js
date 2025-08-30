export class RotateEnemy extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, "rotateEnemy")
        this.scene = scene
    }
    rotateSpeed = Phaser.Math.GetSpeed(30, 1)
    speed = Phaser.Math.GetSpeed(230, 1)
    distance = 80
    pointX
    pointY
    deg = 0
    isHit = 0
    isOnPlayer = 0
    cashPerKill = 150;
    spawnEnemy() {


        this.container = this.scene.add.container(0,0)
        this.container.add(this)
        let spawnSide = Phaser.Utils.Array.GetRandom(['left', 'right'])
        spawnSide = "left"
        if(spawnSide == "right") {
            this.pointX = 0
            this.deg = -90
        }else {
            this.pointX = this.scene.scale.width
            this.deg = 90
        }
        this.pointY = Phaser.Math.Between(0, this.scene.scale.height)
        this.container.add(this.hp)
        this.hp.setPosition(this.getBottomCenter().x, this.getBottomCenter().y + 12)
        
        this.setActive(true)
        this.setVisible(true)
    }
    rotate() {
        this.container.x = this.pointX + this.distance * Math.cos(this.deg += this.rotateSpeed)
        this.container.y = this.pointY + this.distance * Math.sin(this.deg)
    }
    chasePlayer(delta) {
        let player = this.scene.player
        let angle = Phaser.Math.Angle.Between(this.container.x, this.container.y, player.x, player.y)
        this.incX = Math.cos(angle)
        this.incY = Math.sin(angle)
        let distanceFromPlayer = Phaser.Math.Distance.Between(this.pointX, this.pointY, player.x, player.y)
        if(distanceFromPlayer < this.distance) {
            this.pointX -= (this.incX * this.speed) * delta
            this.pointY -= (this.incY * this.speed) * delta
        }else {
            this.pointX += (this.incX * this.speed) * delta
            this.pointY += (this.incY * this.speed) * delta
        }  
    }
    update(time, delta) {
        if(this.isHit > 0) {
            this.isHit -= delta
            if(this.isHit < 0) {
                this.isHit = 0
            }
        }
        if(this.isOnPlayer > 0) {
            this.isOnPlayer -= delta
            if(this.isOnPlayer < 0) {
                this.isOnPlayer = 0
            }
        }
        this.rotate()
        this.chasePlayer(delta)
    }
}