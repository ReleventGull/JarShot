import { Scene } from "phaser";
export class Controls extends Scene {
    constructor() 
    {
        super("Controls")
    }
    create() {
        this.backButton = this.add.text(100, 40, "Back")
        this.fireButton = this.add.text(100, 70, "Fire: Left Click")
        this.movementTextButton = this.add.text(100, 100, "Movement: WASD")
        this.placeSentryButton = this.add.text(100, 130, "Place Sentry: R")
        this.pauseGameButton = this.add.text(100, 160, "Pause Game: P")
        this.backButton.setInteractive()
        this.backButton.on('pointerup', () => {
            this.scene.start("MainMenu")
        })
    }
}