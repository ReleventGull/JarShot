import { Scene } from "phaser";

export class Pause extends Scene {
    
    constructor() {
        super("Pause")
    }
    
    create() {
        this.resumeButton = this.add.text(this.scale.width/2, this.scale.height/2, "Resume",
            {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(.5)
        this.exitButton = this.add.text(this.scale.width/2, this.scale.height/2 + 80, "Main Menu",
            {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(.5)
        this.resumeButton.setInteractive()
        this.exitButton.setInteractive()
        this.resumeButton.on('pointerup', () => {
            this.scene.resume("Game")
            this.scene.stop()
        })
        this.exitButton.on('pointerup', () => {
            this.scene.stop('Game')
            this.scene.stop()
        /this.scene.start("MainMenu")
        })
    }
}