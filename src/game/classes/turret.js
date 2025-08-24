export class Turret extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, "turret")
        this.scene = scene
    }
    lookingForEnemy = false
    targetedEnemy
    spawnTurret() {
        this.setPosition(this.scene.player.x, this.scene.player.y)
        this.setActive(true)
        this.setVisible(true)

    }
    searchForEnemy() {
        let shortestDistance = 10000000
        let chosenEnemy;
        for(let i = 0; i < this.scene.enemies.children.entries.length; i++) {
            let currentEnemy = this.scene.enemies.children.entries[i]
            console.log(currentEnemy.x)
            let distance = Phaser.Math.Distance.Between(this.x, this.y, currentEnemy.x, currentEnemy.y)
            if(shortestDistance > distance) {
                chosenEnemy = currentEnemy
            }
        }
        if(!chosenEnemy){
            this.lookingForEnemy = false
        }else {
            this.targetedEnemy = chosenEnemy
        }
    }
    update() {

        if(!this.lookingForEnemy && this.targetedEnemy == null) {
            this.lookingForEnemy = true
            this.searchForEnemy()
        }else {
            let angle = Phaser.Math.Angle.Between(this.x, this.y, this.targetedEnemy.x, this.targetedEnemy.y)
            this.setRotation(angle)
        }
    }
}