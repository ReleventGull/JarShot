
export let GameState = {
    playerCash: 500,
    colors: {
        playerBodyColor: '0x000000',
        playerBarrelColor: '0xFFFFFF',
        turretBodyColor: '0x000000',
        turretBarrelColor: '0xFFFFFF'
    },
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
            baseCooldown: 700,
            maxLevel: 6,
        },
        BulletSpeed: {
            name: "Bullet-Speed",
            costMultiplier: 1.5,
            baseCost: 1000,
            currentLevel: 1,
            maxLevel: 6,
            baseSpeed: 320
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
            name: "Turret-Bullet-Speed",
            costMultiplier: 1.5,
            baseCost: 1500,
            currentLevel: 1,
            baseSpeed: 310,
            maxLevel: 6,
        },
        TurretReloadSpeed: {
            name: "Turret-Reload-Speed",
            costMultiplier: 1.5,
            baseCost: 1500,
            currentLevel: 1,
            baseCooldown: 1000,
            maxLevel: 6,
        },
        TurretBulletDamage: {
            name: "Turret-Reload-Speed",
            costMultiplier: 1.5,
            baseCost: 1500,
            currentLevel: 1,
            baseDamage: 5,
            maxLevel: 6,
        },

    }  
}