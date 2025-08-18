
export let GameState = {
    playerLives: 1,
    playerMaxLife: 5,
    playerCash: 100,
    upgrades: {
        ReloadSpeed: {
            name: "Reload-Speed",
            costMultiplier: 1.5,
            baseCost: 1000,
            currentLevel: 1,
            maxLevel: 6,
        },
        BulletSpeed: {
            name: "Bullet-Speed",
            costMultiplier: 1.5,
            baseCost: 1000,
            currentLevel: 1,
            maxLevel: 6,
        },
        BulletDamage: {
            name: "Bullet-Damage",
            costMultiplier: 1.5,
            baseCost: 1000,
            currentLevel: 1,
            maxLevel: 6,
        },
    }  
}