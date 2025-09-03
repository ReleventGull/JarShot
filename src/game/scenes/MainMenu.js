import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background');

       this.playButton = this.add.text(512, 300, 'Play', {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.upgradeButton = this.add.text(512, 400, 'Upgrades', {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        
        this.customizeButton = this.add.text(512, 500, 'Customize', {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        this.controlsButton = this.add.text(512, 600, 'Controls', {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        
        this.controlsButton.setInteractive()
        this.customizeButton.setInteractive()
        this.playButton.setInteractive()
        this.upgradeButton.setInteractive()
        
        this.playButton.on("pointerup", () => {
            console.log("Starting game...")
            this.scene.start('Game');
        })
        this.upgradeButton.on('pointerup', () => {
            this.scene.start("Upgrades")
        })
        this.customizeButton.on("pointerup", () => {
            this.scene.start("Customize")
        })
        this.controlsButton.on('pointerup', () => {
            this.scene.start("Controls")
        })
    }
}
