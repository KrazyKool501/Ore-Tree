addLayer("c", {
    name: "coal", 
    symbol: "C", 
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#333333",
    requires: new Decimal(10),
    resource: "Coal",
    baseResource: "money",
    baseAmount() {return player.points},
    type: "normal", 
    exponent: 0.5, 
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    upgrades: {
        rows: 4,
        cols: 4,
        11: {
            title: "Doubler",
            description: "Double your money gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Tripler",
            description: "Triple your money gain.",
            cost: new Decimal(2),
            unlocked(){
                return hasUpgrade("c", 11)
            }
        },
        13: {
            title: "Coal Surge",
            description: "Coal boosts Money.",
            cost: new Decimal(4),
            effect() {
                let eff = player.c.points.plus(1).pow(0.2)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("c", 12)
            }
        },
        14: {
            title: "Exponential Money",
            description: "Money boosts itself.",
            cost: new Decimal(8),
            effect() {
                let eff = player.points.plus(1).pow(0.2)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("c", 13)
            }
        }, 
        21: {
            title: "A New Row",
            description: "Increase your base money gain by 1.",
            cost: new Decimal(20),
            unlocked(){
                return hasUpgrade("c", 14)
            }
        },   
    },
    row: 0,
    layerShown(){return true}
})
