
export let GameState = {
    playerLives: 1,
    playerMaxLife: 5,
    playerCash: 11000,
    upgrades: {
        ReloadSpeed: {
            name: "Reload-Speed",
            currentLevel: 1,
            costMultiplier: 1.5,
            maxLevel: 6,
            baseCost: 1000,
            calculateReloadSpeed () {
            if(this.currentReloadSpeedLevel >= 5) {
                return false
            } else {
                this.reloadSpeedMultiplier = this.reloadSpeedMultiplier + (this.currentReloadSpeedLevel * this.reloadSpeedMultiplierInc)
                console.log(`New reload speed : ${this.reloadSpeedMultiplier}`)
                return true
                }
            }
        },
        BulletSpeed: {
            name: "Bullet-Speed",
            costMultiplier: 1.5,
            baseCost: 1000,
            currentLevel: 1,
            maxLevel: 6,
        },
        MovementSpeed: {
            name: "Movement-Speed",
            costMultiplier: 1.5,
            baseCost: 1000,
            currentLevel: 1,
            maxLevel: 6,
            
        },
    }  
}