addLayer("c", {
    name: "coal", 
    symbol: "c", 
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
        if (hasUpgrade("c", 22)) mult = mult.times(0.8);
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
                if (hasUpgrade("c", 23)) eff = player.c.points.plus(1).pow(0.5)
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
            cost: new Decimal(15),
            unlocked(){
                return hasUpgrade("c", 14)
            }
        },
        22: {
            title: "Is it worth it?",
            description: "Quadruple money gain, but increase coal cost.",
            cost: new Decimal(35),
            unlocked(){
                return hasUpgrade("c", 21)
            }
        }, 
        23: {
            title: "Very Original",
            description: "Boost the above upgrade's effect (Coal Surge)",
            cost: new Decimal(60),
            unlocked(){
                return hasUpgrade("c", 22)
            }
        },
        24: {
            title: "New Mines",
            description: "Unlock Copper",
            cost: new Decimal(100),
            unlocked(){
                return hasUpgrade("c", 23)
            }
        },
    },
    row: 0,
    layerShown(){return true}
})
addLayer("b", {
    name: "copper", 
    symbol: "C", 
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#e19329",
    requires: new Decimal(300),
    resource: "Copper",
    baseResource: "Coal",
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
    },
    row: 1,
    layerShown(){if(hasUpgrade("c", 24)) return true}
})
