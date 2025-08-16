import { Scene } from 'phaser';
import { GameState } from '../classes/gamestate'
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

        this.playButton.setInteractive()
        this.upgradeButton.setInteractive()
        this.playButton.on("pointerup", () => {
            console.log("Starting game...")
            this.scene.start('Game');
        })
        this.upgradeButton.on('pointerup', () => {
            this.scene.start("Upgrades")
        })

    }
}
