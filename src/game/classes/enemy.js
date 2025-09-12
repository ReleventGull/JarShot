

export default class Enemy extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, "enemy")
        this.scene = scene
    }
    direction;
    direction2;
    speed;
    cashPerKill = 100;
    isHit = 0;
    isOnPlayer = 0
    incX = 0
    incY = 0
    spawnEnemy() {
        this.setOrigin(0,0)
        this.container = this.scene.add.container(0,0)
        this.hp.setPosition(this.getBottomCenter().x, this.getBottomCenter().y + 12)
        this.container.add(this)
        this.container.add(this.hp)
        
        this.setActive(true)
        this.setVisible(true)
        this.direction = Phaser.Utils.Array.GetRandom(['vertical', 'horizontal'])
        this.speed = Phaser.Math.GetSpeed(300, 1)
        if (this.direction == "vertical") {
            let randomPixel = Phaser.Math.Between(0, this.scene.scale.width)
            randomPixel = randomPixel + this.width > this.scene.scale.width ? randomPixel = this.scene.scale.width - this.width : randomPixel
            this.container.setPosition(randomPixel, 0)
            this.direction2 = "down"
        }else {
            let randomPixel = Phaser.Math.Between(0, this.scene.scale.height)
            this.container.setPosition(0, randomPixel)
            this.direction2 = "right";
        }
    }
    moveDown(delta) {
        let pixelsToMove = this.speed * delta;
        this.incY = this.speed
        if(this.container.y + pixelsToMove + this.height >= this.scene.scale.height) {
            this.direction2 = "up"
        }else {
            this.container.y += pixelsToMove
        }
    }
    moveUp(delta) {
        let pixelsToMove = this.speed * delta;
        this.incY = -this.speed
        if(this.container.y - pixelsToMove <= 0) {
            this.direction2 = "down"
        }else {
            this.container.y -= pixelsToMove
        }
    }

    moveRight (delta) {
        let pixelsToMove = this.speed * delta;
        this.incX = this.speed
        if(pixelsToMove + this.container.x + this.width >= this.scene.scale.width) {
            this.direction2 = "left"
        }else {
            this.container.x += pixelsToMove
        }
    }
    moveLeft (delta) {
        let pixelsToMove = this.speed * delta;
        this.incX = -this.speed
        if(this.container.x - pixelsToMove <= 0) {
            this.direction2 = "right"
        }else {
            this.container.x -= pixelsToMove
        }
    }
    removeEnemy () {
        this.setActive(false)
        this.setVisible(false)
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
        switch (this.direction2) {
            case "down": 
                this.moveDown(delta)
            break;
            case "up":
                this.moveUp(delta)
            break;
            case "left":
                this.moveLeft(delta)
            break;
            case "right":
                this.moveRight(delta)
            break;

            default: 
            console.log("This one doesn't have a direction");
            return;
        }
        if(this.speed * 10 <= 6) {
            this.speed = Phaser.Math.GetSpeed(this.speed * 1000 + (delta / 100), 1)
        }
        
     }
}

