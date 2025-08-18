
export let GameState = {
    playerLives: 1,
    playerMaxLife: 5,
    playerCash: 11000,
    upgrades: {
        ReloadSpeed: {
            name: "Reload-Speed",
            currentLevel: 6,
            costMultiplier: 1.5,
            maxLevel: 6,
            baseCost: 1000,
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