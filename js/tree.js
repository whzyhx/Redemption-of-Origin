var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: [
        ["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}],
        ["display-text",
            function() {
                if(!hasUpgrade("z",21))
                return ''
                if(hasUpgrade("z",62))
                return '木头: '+format(player.z.mutou)
                return '木头: '+format(player.z.mutou)+' / '+format(player.z.mutoushangxian)
            },
            { "color": "green", "font-size": "28px","text-align":"left"}
        ],
        ["display-text",
            function() {
                if(!hasUpgrade("z",23))
                return ''
                if(hasUpgrade("z",62))
                return '石头: '+format(player.z.shitou)
                return '石头: '+format(player.z.shitou)+' / '+format(player.z.shitoushangxian)
            },
            { "color": "grey", "font-size": "28px","text-align":"left"}
        ],
        ["display-text",
            function() {
                if(!hasUpgrade("z",42))
                return ''
                if(hasUpgrade("z",62))
                return '铜矿: '+format(player.z.tong)
                return '铜矿: '+format(player.z.tong)+' / '+format(player.z.tongshangxian)
            },
            { "color": "brown", "font-size": "28px","text-align":"left"}
        ],
        ["display-text",
            function() {
                if(!hasUpgrade("z",42))
                return ''
                if(hasUpgrade("z",62))
                return '铁矿: '+format(player.z.tie)
                return '铁矿: '+format(player.z.tie)+' / '+format(player.z.tieshangxian)
            },
            { "color": "silver", "font-size": "28px","text-align":"left"}
        ],
        ["display-text",
            function() {
                if(!hasUpgrade("z",51))
                return ''
                if(hasUpgrade("z",62))
                return '煤矿: '+format(player.z.mei)
                return '煤矿: '+format(player.z.mei)+' / '+format(player.z.meishangxian)
            },
            { "color": "#504A4B", "font-size": "28px","text-align":"left"}
        ],
        ["display-text",
            function() {
                if(!hasUpgrade("z",52))
                return ''
                if(hasUpgrade("z",62))
                return '银矿: '+format(player.z.ying)
                return '银矿: '+format(player.z.ying)+' / '+format(player.z.yingshangxian)
            },
            { "color": "lightblue", "font-size": "28px","text-align":"left"}
        ],
        ["display-text",
            function() {
                if(!hasUpgrade("z",53))
                return ''
                if(hasUpgrade("z",62))
                return '金矿: '+format(player.z.jin)
                return '金矿: '+format(player.z.jin)+' / '+format(player.z.jinshangxian)
            },
            { "color": "gold", "font-size": "28px","text-align":"left"}
        ],
        ["display-text",
            function() {
                if(!hasUpgrade("z",81))
                return ''
                return '沙子: '+format(player.z.shazi)
            },
            { "color": "#FFF8C6", "font-size": "28px","text-align":"left"}
        ],
        ["display-text",
            function() {
                if(!hasUpgrade("z",91))
                return ''
                return '玻璃: '+format(player.z.boli)
            },
            { "color": "lightblue", "font-size": "28px","text-align":"left"}
        ],
    ],
    previousTab: "",
    leftTab: true,
})
// addLayer("tree-tab", {
//     previousTab: "",
//     leftTab: true,
// 	bars:{
// 	},
// 	clickables:{
// 	},
// 	tabFormat: [
// 	]
// })