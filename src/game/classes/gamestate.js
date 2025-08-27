
export let GameState = {
    playerCash: 500,
    upgrades: {
        PlayerLives: {
            name: "Player-Lives",
            costMultiplier: 1.5,
            baseCost: 1000,
            currentLevel: 1,
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
            baseSpeed: 300
        },
        BulletDamage: {
            name: "Bullet-Damage",
            costMultiplier: 1.5,
            baseCost: 1000,
            currentLevel: 1,
            maxLevel: 6,
            baseDamage: 10
        },
        Turrets: {
            name: "Turrets",
            costMultiplier: 1.5,
            baseCost: 3000,
            currentLevel: 1,
            maxLevel: 6,
        },
        TurretBulletSpeed: {
            name: "Turrets",
            costMultiplier: 1.5,
            baseCost: 4000,
            currentLevel: 1,
            baseSpeed: 310,
            maxLevel: 6,
        },

    }  
}