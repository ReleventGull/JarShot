
export let GameState = {
    playerCash: 10000,
    upgrades: {
        PlayerLives: {
            name: "Player-Lives",
            costMultiplier: 1.5,
            baseCost: 1000,
            currentLevel: 5,
            maxLevel: 6,
        },
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
        Turrets: {
            name: "Turrets",
            costMultiplier: 1.5,
            baseCost: 3000,
            currentLevel: 2,
            maxLevel: 6,
        },

    }  
}