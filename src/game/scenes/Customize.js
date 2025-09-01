import { Scene } from "phaser"
import { GameState } from "../classes/gamestate"
export class Customize extends Scene {
    constructor () {
        super("Customize")
    }
    currentSelection = "player"
    currentSubSelection = "body"
    
    createPlayerScene() {
        this.barrel.fillColor = GameState.colors.playerBarrelColor
        this.body.fillColor = GameState.colors.playerBodyColor
    }

    createTurretScene() {
        console.log(GameState.colors)
        this.barrel.fillColor = GameState.colors.turretBarrelColor
        this.body.fillColor = GameState.colors.turretBodyColor
    }

    create() {
        this.viewContainer = this.add.container(180,280)
        this.body = this.add.circle(0, 0, 80, GameState.colors.playerBodyColor)
        this.barrel = this.add.rectangle(this.body.width/2, 0, 60, 10, GameState.colors.playerBarrelColor).setOrigin(1, .5)
        this.viewContainer.add(this.body)
        this.viewContainer.add(this.barrel)

        this.activeDisplays = []
        this.backButton = this.add.text(100, 70, "Back")
        
        this.playerButton = this.add.text(100, 100, "Player")
        this.turretButton = this.add.text(200, 100, "Turret")
       
        this.bodyButton = this.add.text(100, 150, "Body")
        this.barrelButton = this.add.text(200, 150, "Barrel")

        //Lines to show selected cats
        this.selectedMainLine = this.add.rectangle(this.playerButton.x, this.playerButton.y + 20, this.playerButton.width, 5, 0x000000).setOrigin(0, .5)
        this.selectSubLine = this.add.rectangle(this.bodyButton.x, this.bodyButton.y + 20, this.bodyButton.width, 5, 0x000000).setOrigin(0, .5)
        
        
        
        this.playerButton.setInteractive()
        this.turretButton.setInteractive()
        this.backButton.setInteractive()
        this.barrelButton.setInteractive()
        this.bodyButton.setInteractive()
        
        this.playerButton.on('pointerup', () => {
            this.currentSelection = "player"
            this.selectedMainLine.destroy()
            this.selectedMainLine = this.add.rectangle(this.playerButton.x, this.playerButton.y + 20, this.playerButton.width, 5, 0x000000).setOrigin(0, .5)
            this.createPlayerScene()
        })
        this.turretButton.on('pointerup', () => {
            this.currentSelection = "turret"
            this.selectedMainLine.destroy()
            this.selectedMainLine = this.add.rectangle(this.turretButton.x, this.turretButton.y + 20, this.turretButton.width, 5, 0x000000).setOrigin(0, .5)
            this.createTurretScene()
        })
        //Changes selection to body
        this.bodyButton.on("pointerup", () => {
            this.selectSubLine.destroy()
            this.currentSubSelection = "body"
            this.selectSubLine = this.add.rectangle(this.bodyButton.x, this.bodyButton.y + 20, this.bodyButton.width, 5, 0x000000).setOrigin(0, .5)
        })
        this.barrelButton.on("pointerup", () => {
            this.selectSubLine.destroy()
            this.currentSubSelection = "barrel"
            this.selectSubLine = this.add.rectangle(this.barrelButton.x, this.barrelButton.y + 20, this.barrelButton.width, 5, 0x000000).setOrigin(0, .5)
        })


        this.createPlayerScene()
        

        this.backButton.on("pointerup", () => {
            this.scene.start("MainMenu")
        })


        
        
        this.colorsArray = Phaser.Display.Color.HSVColorWheel(1, 1)
        for(let i = 0; i < this.colorsArray.length; i++) {
            let current = this.colorsArray[i]
            let currentColor = this.add.rectangle(100 + (i*2), 600, 2, 200, Phaser.Display.Color.GetColor(current.r, current.g, current.b))
            currentColor.setInteractive()
            currentColor.on("pointerdown", () => {
                let currentColor = Phaser.Display.Color.GetColor(current.r, current.g, current.b)
                if(this.currentSelection == "player" && this.currentSubSelection == "body") {
                    this.body.fillColor = currentColor
                    GameState.colors.playerBodyColor = currentColor
                    localStorage.setItem("jarShot_playerBodyColor", String(currentColor))
                }
                if(this.currentSelection == "player" && this.currentSubSelection == "barrel") {
                    GameState.colors.playerBarrelColor = currentColor
                    localStorage.setItem("jarShot_playerBarrelColor", String(currentColor))
                    this.barrel.fillColor = currentColor
                }
                if(this.currentSelection == "turret" && this.currentSubSelection == "body") {
                    this.body.fillColor = currentColor
                    GameState.colors.turretBodyColor = currentColor
                    localStorage.setItem("jarShot_turretBodyColor", String(currentColor))
                }
                if(this.currentSelection == "turret" && this.currentSubSelection == "barrel") {
                    GameState.colors.turretBarrelColor = currentColor
                    localStorage.setItem("jarShot_turretBarrelColor", String(currentColor))
                    this.barrel.fillColor = currentColor
                }
                
            })
            currentColor.on("pointerover", () => {
                if(this.input.activePointer.isDown) {
                    let currentColor = Phaser.Display.Color.GetColor(current.r, current.g, current.b)
                    if(this.currentSelection == "player" && this.currentSubSelection == "body") {
                        this.body.fillColor = currentColor
                        GameState.colors.playerBodyColor = currentColor
                        localStorage.setItem("jarShot_playerBodyColor", String(currentColor))
                    }
                    if(this.currentSelection == "player" && this.currentSubSelection == "barrel") {
                        GameState.colors.playerBarrelColor = currentColor
                        localStorage.setItem("jarShot_playerBarrelColor", String(currentColor))
                        this.barrel.fillColor = currentColor
                    }
                    if(this.currentSelection == "turret" && this.currentSubSelection == "body") {
                        this.body.fillColor = currentColor
                        GameState.colors.turretBodyColor = currentColor
                        localStorage.setItem("jarShot_turretBodyColor", String(currentColor))
                    }
                    if(this.currentSelection == "turret" && this.currentSubSelection == "barrel") {
                        GameState.colors.turretBarrelColor = currentColor
                        localStorage.setItem("jarShot_turretBarrelColor", String(currentColor))
                        this.barrel.fillColor = currentColor
                }
                }
            })
        }
       


         

        
    }
    update() { 

            
    }
}