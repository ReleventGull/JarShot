import { Scene } from 'phaser';
import { GameState } from '../classes/gamestate';

export class Upgrades extends Scene
{
    constructor ()
    {
        super('Upgrades');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0xff0000);
        let upgradeDots = {}
        this.add.image(512, 384, 'background').setAlpha(0.5);
        this.incForRows = 0 //For creating space between the upgrades displayed
        
        let backButton = this.add.text(200, 200 - 40, "Back").setOrigin(0, .5)
        backButton.setInteractive()
        backButton.on("pointerup", () => {
                this.scene.start("MainMenu")
        })
        
        let cashDisplay = this.add.text(backButton.x, backButton.y - 40, `Cash: ${GameState.playerCash}`).setOrigin(0, 0.5)
 
    
        for(let item in GameState.upgrades){
            let currentUpgrade = GameState.upgrades[item]
            let currentNameBox = this.add.text(200, 200 + this.incForRows, item).setOrigin(0, .5)
            currentNameBox.width = 200
            upgradeDots[item] = []
     
            let inc = 40

            for(let i = 1; i < GameState.upgrades[item].maxLevel; i++) {
                upgradeDots[item].push(this.add.rectangle(currentNameBox.x + inc + 100, currentNameBox.y, 20, 12, currentUpgrade.currentLevel > i   ? 0x99999 : 0x999999).setOrigin(0,.5))
                inc += 40
            }

        //Adds the blue upgrade button for when player wants to purchase upgade
        let upgradeButton = this.add.rectangle(currentNameBox.x + 340, currentNameBox.y, 30, 30, 0x99999).setOrigin(0,.5)
        //this code below handles purchases
        upgradeButton.setInteractive()
        upgradeButton.on("pointerup", () => {
            let cost = (currentUpgrade.costMultiplier * (currentUpgrade.currentLevel - 1)) * currentUpgrade.baseCost + currentUpgrade.baseCost
            if(GameState.playerCash >= cost) {
                if(currentUpgrade.currentLevel < currentUpgrade.maxLevel) {
                   
                    currentUpgrade.currentLevel += 1
                    GameState.playerCash -= cost
                    cashDisplay.setText(`Cash: ${GameState.playerCash}`)
                    //This loop is for changing the colors of the upgrade buttons after the upgrade are applied
                    for(let i = 0; i < upgradeDots[item].length; i++) {
                        let currentUpgradeDot = upgradeDots[item][i]
                        if(currentUpgrade.currentLevel > i+1) {
                            console.log("I hit here", currentUpgradeDot);
                            currentUpgradeDot.fillColor = 0x99999
                        }
                    }
                }
            }
        })
        
        //incremental value for space between each upgrade
        this.incForRows += 40

        //displays the cost of the upgrade
        this.add.text(currentNameBox.x + 400, currentNameBox.y, `${((currentUpgrade.costMultiplier * (currentUpgrade.currentLevel - 1)) * currentUpgrade.baseCost + currentUpgrade.baseCost)}` ).setOrigin(.5)
        }
    }
}
