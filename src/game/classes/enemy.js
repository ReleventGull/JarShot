

export default class Enemy extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, "enemy")
        this.scene = scene
    }
    direction;
    direction2;
    speed;
    cashPerKill = 100;
    hp = 10
    isHit = 0;
    spawnEnemy() {
        
        this.setActive(true)
        this.setVisible(true)
        this.setOrigin(0,0)
        this.direction = Phaser.Utils.Array.GetRandom(['vertical', 'horizontal'])
        this.speed = Phaser.Math.GetSpeed(300, 1)
        console.log("Speed", this.speed);
        if (this.direction == "vertical") {
            let randomPixel = Phaser.Math.Between(0, this.scene.scale.width)
            randomPixel = randomPixel + this.width > this.scene.scale.width ? randomPixel = this.scene.scale.width - this.width : randomPixel
            this.setPosition(randomPixel, 0)
            this.direction2 = "down"
        }else {
            let randomPixel = Phaser.Math.Between(0, this.scene.scale.height)
            randomPixel = randomPixel + this.height > this.scene.scale.height ? randomPixel = this.scene.scale.height - this.height : randomPixel
            this.setPosition(0, randomPixel)
            this.direction2 = "right";
        }
    }
    moveDown(delta) {
        let pixelsToMove = this.speed * delta;
        if(this.y + pixelsToMove + this.height >= this.scene.scale.height) {
            this.direction2 = "up"
        }else {
            this.y += pixelsToMove
        }
    }
    moveUp(delta) {
        let pixelsToMove = this.speed * delta;
        if(this.y - pixelsToMove <= 0) {
            this.direction2 = "down"
        }else {
            this.y -= pixelsToMove
        }
    }

    moveRight (delta) {
        let pixelsToMove = this.speed * delta;
        if(pixelsToMove + this.x + this.width >= this.scene.scale.width) {
            this.direction2 = "left"
        }else {
            this.x += pixelsToMove
        }
    }
    moveLeft (delta) {
        let pixelsToMove = this.speed * delta;
        if(this.x - pixelsToMove <= 0) {
            this.direction2 = "right"
        }else {
            this.x -= pixelsToMove
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
        console.log("Speed here", this.speed);
        if(this.speed * 10 <= 6) {
            this.speed = Phaser.Math.GetSpeed(this.speed * 1000 + (delta / 100), 1)
        }
        
     }
}

