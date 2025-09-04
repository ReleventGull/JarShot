import { Scene } from "phaser"
import { GameState } from "../classes/gamestate"
export class Customize extends Scene {
    constructor () {
        super("Customize")
    }
    currentSelection = "player"
    currentSubSelection = "body"
    barHeights = 250
    saturationArray = []
    body;
    barrel;
    createPlayerScene() {
        this.barrel.fillColor = GameState.colors.playerBarrelColor
        this.body.fillColor = GameState.colors.playerBodyColor
    }
    createTurretScene() {
        this.barrel.fillColor = GameState.colors.turretBarrelColor
        this.body.fillColor = GameState.colors.turretBodyColor
    }
    changeSaturationBar() {
        switch(this.currentSubSelection) {
            case "body":
                for(let i = 0; i < this.saturationArray.length; i++) {
                    let color = Phaser.Display.Color.IntegerToColor(this.body.fillColor)
                    this.saturationArray[i].fillColor = Phaser.Display.Color.HSVToRGB(color._h, (i+1)/100, color._v).color
                }
                break
            case "barrel":
                for(let i = 0; i < this.saturationArray.length; i++) {
                    let color = Phaser.Display.Color.IntegerToColor(this.barrel.fillColor)
                    this.saturationArray[i].fillColor = Phaser.Display.Color.HSVToRGB(color._h, (i+1)/100, color._v).color
                }
                break
        }

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
            this.changeSaturationBar()
        })
        this.turretButton.on('pointerup', () => {
            this.currentSelection = "turret"
            this.selectedMainLine.destroy()
            this.selectedMainLine = this.add.rectangle(this.turretButton.x, this.turretButton.y + 20, this.turretButton.width, 5, 0x000000).setOrigin(0, .5)
            this.createTurretScene()
            this.changeSaturationBar()
        })
        //Changes selection to body
        this.bodyButton.on("pointerup", () => {
            this.selectSubLine.destroy()
            this.currentSubSelection = "body"
            this.selectSubLine = this.add.rectangle(this.bodyButton.x, this.bodyButton.y + 20, this.bodyButton.width, 5, 0x000000).setOrigin(0, .5)
            this.changeSaturationBar()
        })
        this.barrelButton.on("pointerup", () => {
            this.selectSubLine.destroy()
            this.currentSubSelection = "barrel"
            this.selectSubLine = this.add.rectangle(this.barrelButton.x, this.barrelButton.y + 20, this.barrelButton.width, 5, 0x000000).setOrigin(0, .5)
            this.changeSaturationBar()
        })
        
        this.createPlayerScene()
        
        this.backButton.on("pointerup", () => {
            this.scene.start("MainMenu")
        })

        for(let i = 1; i <=360; i++) {
            let current = Phaser.Display.Color.HSVToRGB(i/360, 1, 1)
            let currentColor = this.add.rectangle(100, 450 + (i * this.barHeights/360), 20, this.barHeights/360, current.color)
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
                this.changeSaturationBar()
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
                this.changeSaturationBar()
                }
                
            })
        }
        
        let hue = Phaser.Display.Color.IntegerToColor(this.body.fillColor)
        for(let i = 1; i <= 100; i++) {
            let current = Phaser.Display.Color.HSVToRGB(hue._h, i/100, 1)
            let currentColor = this.add.rectangle(140, 450 + (i * this.barHeights/100), 20, this.barHeights/100, current.color)
            this.saturationArray.push(currentColor)
            currentColor.setInteractive()
            let saturation = Phaser.Display.Color.IntegerToColor(currentColor.fillColor)._s
            currentColor.on('pointerdown', () => {
                if(this.currentSelection == "player" && this.currentSubSelection == "body") {
                    let bodyRGB = Phaser.Display.Color.IntegerToColor(this.body.fillColor)
                    this.body.fillColor = Phaser.Display.Color.HSVToRGB(bodyRGB._h, saturation, bodyRGB._v).color
                    GameState.colors.playerBodyColor = this.body.fillColor
                    localStorage.setItem("jarShot_playerBodyColor", String(this.body.fillColor))
                }
                if(this.currentSelection == "player" && this.currentSubSelection == "barrel") {
                    let barrelRGB = Phaser.Display.Color.IntegerToColor(this.barrel.fillColor)
                    this.barrel.fillColor = Phaser.Display.Color.HSVToRGB(barrelRGB._h, saturation, barrelRGB._v).color
                    GameState.colors.playerBarrelColor = this.barrel.fillColor
                    localStorage.setItem("jarShot_playerBarrelColor", String(this.barrel.fillColor))
                    
                }
                if(this.currentSelection == "turret" && this.currentSubSelection == "body") {
                    let bodyRGB = Phaser.Display.Color.IntegerToColor(this.body.fillColor)
                    this.body.fillColor = Phaser.Display.Color.HSVToRGB(bodyRGB._h, saturation, bodyRGB._v).color
                    GameState.colors.turretBodyColor = this.body.fillColor
                    localStorage.setItem("jarShot_turretBodyColor", String(this.body.fillColor))
                }
                if(this.currentSelection == "turret" && this.currentSubSelection == "barrel") {
                    let barrelRGB = Phaser.Display.Color.IntegerToColor(this.barrel.fillColor)
                    this.barrel.fillColor = Phaser.Display.Color.HSVToRGB(barrelRGB._h, saturation, barrelRGB._v).color
                    GameState.colors.turretBarrelColor = this.barrel.fillColor
                    localStorage.setItem("jarShot_turretBarrelColor", String(this.barrel.fillColor))
                }
                this.changeSaturationBar()
            })
            currentColor.on('pointerover', () => {
                if(this.input.activePointer.isDown) {
                    if(this.currentSelection == "player" && this.currentSubSelection == "body") {
                    let bodyRGB = Phaser.Display.Color.IntegerToColor(this.body.fillColor)
                    this.body.fillColor = Phaser.Display.Color.HSVToRGB(bodyRGB._h, saturation, bodyRGB._v).color
                    GameState.colors.playerBodyColor = this.body.fillColor
                    localStorage.setItem("jarShot_playerBodyColor", String(this.body.fillColor))
                }
                if(this.currentSelection == "player" && this.currentSubSelection == "barrel") {
                    let barrelRGB = Phaser.Display.Color.IntegerToColor(this.barrel.fillColor)
                    this.barrel.fillColor = Phaser.Display.Color.HSVToRGB(barrelRGB._h, saturation, barrelRGB._v).color
                    GameState.colors.playerBarrelColor = this.barrel.fillColor
                    localStorage.setItem("jarShot_playerBarrelColor", String(this.barrel.fillColor))
                    
                }
                if(this.currentSelection == "turret" && this.currentSubSelection == "body") {
                    let bodyRGB = Phaser.Display.Color.IntegerToColor(this.body.fillColor)
                    this.body.fillColor = Phaser.Display.Color.HSVToRGB(bodyRGB._h, saturation, bodyRGB._v).color
                    GameState.colors.turretBodyColor = this.body.fillColor
                    localStorage.setItem("jarShot_turretBodyColor", String(this.body.fillColor))
                }
                if(this.currentSelection == "turret" && this.currentSubSelection == "barrel") {
                    let barrelRGB = Phaser.Display.Color.IntegerToColor(this.barrel.fillColor)
                    this.barrel.fillColor = Phaser.Display.Color.HSVToRGB(barrelRGB._h, saturation, barrelRGB._v).color
                    GameState.colors.turretBarrelColor = this.barrel.fillColor
                    localStorage.setItem("jarShot_turretBarrelColor", String(this.barrel.fillColor))
                }
                this.changeSaturationBar()
                }
                
            })
        }
        
        for(let i = 1; i <= 100; i++) {
            let current = Phaser.Display.Color.HSVToRGB(0, 0, i/100)
            let currentColor = this.add.rectangle(180, 450 + (i * this.barHeights/100), 20, this.barHeights/100, current.color)
            let value = i/100
            currentColor.setInteractive()
            currentColor.on('pointerdown', () => {
                if(this.currentSelection == "player" && this.currentSubSelection == "body") {
                    let bodyRGB = Phaser.Display.Color.IntegerToColor(this.body.fillColor)
                    this.body.fillColor = Phaser.Display.Color.HSVToRGB(bodyRGB._h, bodyRGB._s, value).color
                    GameState.colors.playerBodyColor = this.body.fillColor
                    localStorage.setItem("jarShot_playerBodyColor", String(this.body.fillColor))
                }
                if(this.currentSelection == "player" && this.currentSubSelection == "barrel") {
                    let barrelRGB = Phaser.Display.Color.IntegerToColor(this.barrel.fillColor)
                    this.barrel.fillColor = Phaser.Display.Color.HSVToRGB(barrelRGB._h, barrelRGB._s, value).color
                    GameState.colors.playerBarrelColor = this.barrel.fillColor
                    localStorage.setItem("jarShot_playerBarrelColor", String(this.barrel.fillColor))
                    
                }
                if(this.currentSelection == "turret" && this.currentSubSelection == "body") {
                    let bodyRGB = Phaser.Display.Color.IntegerToColor(this.body.fillColor)
                    this.body.fillColor = Phaser.Display.Color.HSVToRGB(bodyRGB._h, bodyRGB._s, value).color
                    GameState.colors.turretBodyColor = this.body.fillColor
                    localStorage.setItem("jarShot_turretBodyColor", String(this.body.fillColor))
                }
                if(this.currentSelection == "turret" && this.currentSubSelection == "barrel") {
                    let barrelRGB = Phaser.Display.Color.IntegerToColor(this.barrel.fillColor)
                    this.barrel.fillColor = Phaser.Display.Color.HSVToRGB(barrelRGB._h, barrelRGB._s, value).color
                    GameState.colors.turretBarrelColor = this.barrel.fillColor
                    localStorage.setItem("jarShot_turretBarrelColor", String(this.barrel.fillColor))
                }
                this.changeSaturationBar()
            })
            currentColor.on('pointerover', () => {
                if(this.input.activePointer.isDown) {
                     if(this.currentSelection == "player" && this.currentSubSelection == "body") {
                    let bodyRGB = Phaser.Display.Color.IntegerToColor(this.body.fillColor)
                    this.body.fillColor = Phaser.Display.Color.HSVToRGB(bodyRGB._h, bodyRGB._s, value).color
                    GameState.colors.playerBodyColor = this.body.fillColor
                    localStorage.setItem("jarShot_playerBodyColor", String(this.body.fillColor))
                }
                if(this.currentSelection == "player" && this.currentSubSelection == "barrel") {
                    let barrelRGB = Phaser.Display.Color.IntegerToColor(this.barrel.fillColor)
                    this.barrel.fillColor = Phaser.Display.Color.HSVToRGB(barrelRGB._h, barrelRGB._s, value).color
                    GameState.colors.playerBarrelColor = this.barrel.fillColor
                    localStorage.setItem("jarShot_playerBarrelColor", String(this.barrel.fillColor))
                    
                }
                if(this.currentSelection == "turret" && this.currentSubSelection == "body") {
                    let bodyRGB = Phaser.Display.Color.IntegerToColor(this.body.fillColor)
                    this.body.fillColor = Phaser.Display.Color.HSVToRGB(bodyRGB._h, bodyRGB._s, value).color
                    GameState.colors.turretBodyColor = this.body.fillColor
                    localStorage.setItem("jarShot_turretBodyColor", String(this.body.fillColor))
                }
                if(this.currentSelection == "turret" && this.currentSubSelection == "barrel") {
                    let barrelRGB = Phaser.Display.Color.IntegerToColor(this.barrel.fillColor)
                    this.barrel.fillColor = Phaser.Display.Color.HSVToRGB(barrelRGB._h, barrelRGB._s, value).color
                    GameState.colors.turretBarrelColor = this.barrel.fillColor
                    localStorage.setItem("jarShot_turretBarrelColor", String(this.barrel.fillColor))
                }
                this.changeSaturationBar()
                }

            })
        }
    }
    update() { 

            
    }
}