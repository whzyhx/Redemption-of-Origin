let modInfo = {
	name: "起源之救赎",
	id: "shenshu_Ni_Ming",
	author: "匿_名",
	pointsName: "信仰",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "",
}

let changelog = `<h1>更新记录:</h1><br>
	<h3>v0.0</h3><br>
		- 增加 层-初.<br>
		- 增加 层-慧.<br>
		- 增加 层-法.<br>`

let winText = `恭喜通关!您已经完成了这个游戏.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	let gain = new ExpantaNum(0)
	if(hasUpgrade("z",11))gain=gain.add(0.05)
	gain=gain.mul(player.z.huoyanbeishu)
	if(hasUpgrade('f',11))gain=gain.mul(layers.f.upgrades[11].EFFECT())
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	'当前残局:探险进度:100%'
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}