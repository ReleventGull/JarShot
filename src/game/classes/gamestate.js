
export let GameState = {
    playerCash: 500,
    currentReloadSpeedLevel: 0,
    maxReloadSpeedLevel: 5,
    reloadSpeedMultiplier: 1,
    reloadSpeedMultiplierInc: .2,
    calculateReloadSpeed () {
        if(this.currentReloadSpeedLevel >= 5) {
            return false
        }else {
            this.reloadSpeedMultiplier = this.reloadSpeedMultiplier + (this.currentReloadSpeedLevel * this.reloadSpeedMultiplierInc)
            console.log(`New reload speed : ${this.reloadSpeedMultiplier}`)
            return true
        }
    }
}