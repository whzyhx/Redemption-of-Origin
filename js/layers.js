addLayer("cg", 
{ 
    symbol: "CG",
    position: 0,
    startData()
    {
        return{
            unlocked: true,
            points: new ExpantaNum(0),
            kanwanCG:zero,
        }
    },
    color: "white",
    resource: "CG",
    type: "normal",
    tooltip(){return ""},
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount(){return player.points},
    baseResource:"点数",
    gainMult()
    {
        mult=new ExpantaNum(1)
        return mult
    },
    gainExp() 
    { 
        var exp=new ExpantaNum(1)
        return exp
    },
    clickables:
    {
        11:
        {
            display() {
                return '看完了吗?<br>看完就正式开始游戏吧'
            },
            unlocked(){return true},
            style(){return {"height":"125px"}},
            canClick(){return true},
            onClick(){
                player.cg.kanwanCG=n(2)
            }
        },
    },
    tabFormat:
    {
        CG:
        {
            content:
            [
                ["display-text",
                    function()
                    {
                        return `
                        <text style="color:red">魔神</text>降世,天崩地裂<br>
                        曾今繁华的世界如今已经破败不堪<br>
                        你躲在一个山洞里,侥幸活了下来<br>
                        但却失去了大部分记忆<br>
                        山洞的尽头,有一座蒙尘的神像<br>
                        你隐约感觉到,这座神像是拯救世界的关键<br>
                    `},
                    {"color": "white", "font-size": "32px",}
                ],
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                ["row",[["clickable",11],]],
            ]
        },
    },
    row: 1,
    layerShown()
    {
        return player.cg.kanwanCG.lte(1)
    },
})
addLayer("c", 
{ 
    symbol: "初",
    position: 0,
    startData()
    {
        return{
            unlocked: true,
            points: new ExpantaNum(0),

            zanmei:n(1),
            shijian:zero,shijianmx:n(24),

            jiesuoguanzhu:zero,

            mimang:zero,goutongshijian:zero,

            onehang:n(1),
            twohang:n(1),
            threehang:n(1),
            fourhang:n(1),
        }
    },
    color: "orange",
    resource: "信仰",
    type: "normal",
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount(){return n(0)},
    baseResource:"信仰",
    gainMult()
    {
        mult=new ExpantaNum(1)
        return mult
    },
    gainExp() 
    { 
        var exp=new ExpantaNum(1)
        return exp
    },
    tooltip(){return ""},
    update(diff)
    {
        player.c.shijian=player.c.shijian.sub(diff).max(0.001)
        if(player.points.gte(2))
        {
            player.c.jiesuoguanzhu=n(1)
        }
        if(player.c.mimang.gte(0.5))
        {
            player.c.goutongshijian=player.c.goutongshijian.add(diff)
        }
        if(player.c.goutongshijian.gte(30))
        {
            player.c.mimang=n(2)
        }
    },
    infoboxes:
    {
        lore:
        {
            title: "故事",
            body() { return "<h3>几天的祈祷之后,眼前的神像终于发生了一些变化<br>微弱的乳白色光晕缓缓散开,你的眼底倒映着希望<br><br>注意:同行的祈祷会让别的祈祷更加困难(毕竟,这个神像承载的力量是有限的)" },
        },
    },
    bars: 
    {
        1: 
        {
            direction: RIGHT,
            width: 300,
            height: 20,
            fillStyle(){return {"background-color":"orange"}},
            unlocked(){return player.c.mimang.gte(0.5) && player.c.mimang.lte(1.5)},
            display(){return '沟通神明中...'},
            progress() { return player.c.goutongshijian.div(30) },
        },
    },
    clickables:
    {
        11:
        {
            display()
            {
                if(player.c.mimang.lte(n(1.5)))
                {
                    return '颤抖着向??祷告<br><br>距离下次??还剩:'+format(player.c.shijian)+'小时' 
                }
                return '在太阳刚刚升起的时候<br>赞美太阳吧<br><br>距离下次赞美还剩:'+format(player.c.shijian)+'小时<br><br>可获得:'+format(player.c.zanmei.mul(player.z.huoyanbeishu))+'信仰<br><br>同时恢复10%的体力' 
            },
            style(){return {"height":"200px","width":"200px"}},
            unlocked(){return true},
            canClick(){return player.c.shijian.lte(0.01)},
            onClick()
            {
                player.points=player.points.add(player.c.zanmei.mul(player.z.huoyanbeishu))
                player.c.shijian=player.c.shijianmx
                player.z.tilinw=player.z.tilinw.add(player.z.tilimx.div(10)).min(player.z.tilimx)
            }
        },
        12:
        {
            display()
            {
                return '试图沟通神明<br><br>花费:3信仰' 
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return player.c.mimang.lte(1.5)},
            canClick(){return player.points.gte(3) && player.c.mimang.lte(0.5)},
            onClick()
            {
                player.points=player.points.sub(3)
                player.c.mimang=n(1)
            }
        },
    },
    upgrades:
    {
        11:{
            fullDisplay()
            {
                return '<h1>你不敢相信这是真的,神明回应了你<br>你似乎对这个世界有更加深刻的了解了<br>这是太阳神像,它可以在这个黑暗的世界里为你带来光明<br>同时它能教会你很多东西</h1><br><br>花费:1信仰' 
            },
            onPurchase()
            {
                player.points=player.points.sub(1)
            },
            canAfford()
            {
                return player.points.gte(1)
            },
            style(){return {"height":"170px","width":"530px"}},
            unlocked(){return player.c.mimang.gte(1.5)},
            branches:[21,22,23,31,33],
        },
        21:{
            EFFECT()
            {
                var x=player.points.add(1).root(3)
                return x
            },
            fullDisplay()
            {
                return '树木亲和<br>你的虔诚感动了太阳神<br>太阳神赐予你一种独特的天赋-<text style="color:green">树木亲和</text><br>信仰增幅木头<br>当前:'+format(layers.c.upgrades[21].EFFECT())+'x<br>花费:'+format(n(10).mul(player.c.twohang))+'信仰' 
            },
            onPurchase()
            {
                player.points=player.points.sub(n(10).mul(player.c.twohang))
                player.c.twohang=player.c.twohang.mul(3)
            },
            canAfford()
            {
                return player.points.gte(n(10).mul(player.c.twohang))
            },
            style(){return {"height":"125px","width":"150px"}},
            unlocked(){return hasUpgrade("c",11) && hasUpgrade("z",21)},
        },
        22:{
            EFFECT()
            {
                var x=player.points.add(5).logBase(5)
                return x
            },
            fullDisplay()
            {
                return '火焰亲和<br>你的虔诚感动了太阳神<br>太阳神赐予你一种独特的天赋-<text style="color:red">火焰亲和</text><br>信仰增幅火焰<br>当前:'+format(layers.c.upgrades[22].EFFECT())+'x<br>花费:'+format(n(10).mul(player.c.twohang))+'信仰' 
            },
            onPurchase()
            {
                player.points=player.points.sub(n(10).mul(player.c.twohang))
                player.c.twohang=player.c.twohang.mul(3)
            },
            canAfford()
            {
                return player.points.gte(n(10).mul(player.c.twohang))
            },
            style(){return {"height":"125px","width":"150px"}},
            unlocked(){return hasUpgrade("c",11) && hasUpgrade("z",22)},
            branches:[32],
        },
        23:{
            EFFECT()
            {
                var x=player.points.add(1).root(3)
                return x
            },
            fullDisplay()
            {
                return '大地亲和<br>你的虔诚感动了太阳神<br>太阳神赐予你一种独特的天赋-<text style="color:grey">大地亲和</text><br>信仰增幅石头<br>当前:'+format(layers.c.upgrades[23].EFFECT())+'x<br>花费:'+format(n(10).mul(player.c.twohang))+'信仰' 
            },
            onPurchase()
            {
                player.points=player.points.sub(n(10).mul(player.c.twohang))
                player.c.twohang=player.c.twohang.mul(3)
            },
            canAfford()
            {
                return player.points.gte(n(10).mul(player.c.twohang))
            },
            style(){return {"height":"125px","width":"150px"}},
            unlocked(){return hasUpgrade("c",11) && hasUpgrade("z",23)},
        },
        31:{
            EFFECT()
            {
                var x=player.points.add(2).logBase(2).root(2).div(player.z.tilimx.div(100))
                return x
            },
            fullDisplay()
            {
                return '强壮<br>成天沐浴在太阳神的光辉之下,身体逐渐变得强壮<br>信仰会缓慢提高你的体力上限<br>PS:但效果慢慢变差<br>当前:+'+format(layers.c.upgrades[31].EFFECT())+'/s<br>花费:'+format(n(100).mul(player.c.threehang))+'信仰' 
            },
            onPurchase()
            {
                player.points=player.points.sub(n(100).mul(player.c.threehang))
                player.c.threehang=player.c.threehang.mul(3)
            },
            canAfford()
            {
                return player.points.gte(n(100).mul(player.c.threehang))
            },
            style(){return {"height":"125px","width":"150px"}},
            unlocked(){return hasUpgrade("c",11) && player.z.wakuangcishu.gte(5)},
        },
        32:{
            EFFECT()
            {
                var x=player.z.shenghuocishu.add(3).logBase(3)
                return x
            },
            fullDisplay()
            {
                return '心火<br><i>就算没有火,心中的仍有火!</i><br>生火次数增幅火焰和体力恢复(不需要火焰存在)<br>当前:'+format(layers.c.upgrades[32].EFFECT())+'x<br><br>花费:'+format(n(100).mul(player.c.threehang))+'信仰' 
            },
            onPurchase()
            {
                player.points=player.points.sub(n(100).mul(player.c.threehang))
                player.c.threehang=player.c.threehang.mul(3)
            },
            canAfford()
            {
                return player.points.gte(n(100).mul(player.c.threehang))
            },
            style(){return {"height":"125px","width":"150px"}},
            unlocked(){return hasUpgrade("c",22)},
        },
        33:{
            EFFECT()
            {
                var x=player.points.add(1).logBase(10)
                return x
            },
            fullDisplay()
            {
                return '韧性<br><i>挖矿好累...</i><br>干活的时候想到神也许在注视你,顿时充满了干劲<br>信仰增幅你的体力回复<br>当前:'+format(layers.c.upgrades[33].EFFECT())+'x<br>花费:'+format(n(100).mul(player.c.threehang))+'信仰' 
            },
            onPurchase()
            {
                player.points=player.points.sub(n(100).mul(player.c.threehang))
                player.c.threehang=player.c.threehang.mul(3)
            },
            canAfford()
            {
                return player.points.gte(n(100).mul(player.c.threehang))
            },
            style(){return {"height":"125px","width":"150px"}},
            unlocked(){return hasUpgrade("c",11) && player.z.wakuangcishu.gte(5)},
        },
        'shengji1':{
            fullDisplay()
            {
                return '重铸<br><br><i>终于...</i><br><br>原来的神像已经不太满足需求了<br>正好,你现在有更强的材料<br>这些金和银似乎能和太阳神的神力更好的交融<br>也许能解锁些更多的东西<br>花费:10000信仰,10银,10金' 
            },
            onPurchase()
            {
                player.points=player.points.sub(10000)
                player.z.ying=player.z.ying.sub(10)
                player.z.jin=player.z.jin.sub(10)
            },
            canAfford()
            {
                return player.points.gte(10000) && player.z.ying.gte(10) && player.z.jin.gte(10)
            },
            style(){return {"height":"200px","width":"200px"}},
            unlocked(){return hasUpgrade("z",52) && hasUpgrade("z",53) && !hasUpgrade("c",'shengji1') && hasUpgrade("z",'jz14')},
        },
    },
    milestones: {
        0: {
            requirementDescription: "10000信仰",
            effectDescription: `信仰包裹了你,你终于不再害怕了<br><br>你<i>终于</i>可以出门了`,
            done() {return player.points.gte(10000)},
            unlocked(){return player.points.gte(2000) || hasMilestone("c",0)},
            style(){return {"width":"300px"}}
        },
    },
    tabFormat:
    {
        祈祷:
        {
            content:
            [
                "blank",
                ["row",[["clickable",11],]],
                "blank",
                "blank",
                "blank",
                ["row",[["upgrade",'shengji1'],]],
                "blank",
                "blank",
                "blank",
                "milestones",
            ]
        },
        灌注:
        {
            unlocked(){return player.c.jiesuoguanzhu.gte(0.5)},
            content:
            [
                "blank",
                ["row",[["infobox",'lore'],]],
                "blank",
                ["row",[["clickable",12],]],
                "blank",
                ["row",[["bar",1],]],
                ["row",[["upgrade",11],]],
                "blank",
                ["row",[["upgrade",21],"blank","blank","blank","blank","blank",["upgrade",22],"blank","blank","blank","blank","blank",["upgrade",23],]],
                "blank",
                ["row",[["upgrade",31],"blank","blank","blank","blank","blank",["upgrade",32],"blank","blank","blank","blank","blank",["upgrade",33],]],
            ]
        },
    },
    row: 1,
    layerShown()
    {
        return player.cg.kanwanCG.gte(1)
    },
})
addLayer("z", 
{ 
    symbol: "慧",
    position: 1,
    startData()
    {
        return{
            unlocked: true,
            points: new ExpantaNum(0),

            zhishi:zero,zhishihuoqu:zero,

            tilimx:n(100),tilinw:n(100),tilihuifu:n(2),

            mutou:zero,shitou:zero,
            mutoushangxian:n(150),shitoushangxian:n(150),
            tong:zero,tie:zero,mei:zero,ying:zero,jin:zero,
            tongshangxian:n(20),tieshangxian:n(20),meishangxian:n(20),yingshangxian:n(20),jinshangxian:n(20),
            tanxianjindu:zero,

            lastkuangwu:zero,
            wakuangcishu:zero,
            mutouhuoqu:n(1),shitouhuoqu:n(1),

            huoyanshijian:zero,huoyanbeishu:n(1),huoyanhuoqu:n(5),
            shenghuocishu:zero,

            onehang:n(1),
            twohang:n(1),
            threehang:n(1),
            fourhang:n(1),
            fivehang:n(1),
            sixhang:n(1),
            sevenhang:n(1),
        }
    },
    color: "lightblue",
    resource: "信仰",
    type: "normal",
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount(){return n(0)},
    baseResource:"信仰",
    gainMult()
    {
        mult=new ExpantaNum(1)
        return mult
    },
    gainExp() 
    { 
        var exp=new ExpantaNum(1)
        return exp
    },
    tooltip(){return ""},
    update(diff)
    {
        if(hasUpgrade("c",31))
        {
            player.z.tilimx=player.z.tilimx.add(layers.c.upgrades[31].EFFECT().mul(diff))
        }
        player.z.tilihuifu=n(2)
        if(hasUpgrade("z",'jz11'))
        {
            player.z.tilihuifu=player.z.tilihuifu.add(3)
        }
        if(hasUpgrade("c",33))
        {
            player.z.tilihuifu=player.z.tilihuifu.mul(layers.c.upgrades[33].EFFECT())
        }
        if(hasUpgrade("c",32))
        {
            player.z.tilihuifu=player.z.tilihuifu.mul(layers.c.upgrades[32].EFFECT())
        }
        player.z.tilihuifu=player.z.tilihuifu.mul(player.f.monengguantijiacheng)
        player.z.mutou=player.z.mutou.min(player.z.mutoushangxian)
        player.z.shitou=player.z.shitou.min(player.z.shitoushangxian)

        //////////////////////////////////////////////////////////////////////////////////////

        player.z.mutouhuoqu=n(1)
        player.z.huoyanhuoqu=n(5)
        player.z.shitouhuoqu=n(1)
        if(hasUpgrade("c",21))
        {
            player.z.mutouhuoqu=player.z.mutouhuoqu.mul(layers.c.upgrades[21].EFFECT())
        }
        if(hasUpgrade("z",31))
        {
            player.z.mutouhuoqu=player.z.mutouhuoqu.mul(2)
        }
        if(hasUpgrade("z",41))
        {
            player.z.mutouhuoqu=player.z.mutouhuoqu.mul(2)
        }
        if(hasUpgrade("c",22))
        {
            player.z.huoyanhuoqu=player.z.huoyanhuoqu.mul(layers.c.upgrades[22].EFFECT())
        }
        if(hasUpgrade("c",23))
        {
            player.z.shitouhuoqu=player.z.shitouhuoqu.mul(layers.c.upgrades[23].EFFECT())
        }
        if(hasUpgrade("z",33))
        {
            player.z.shitouhuoqu=player.z.shitouhuoqu.mul(2)
        }
        if(hasUpgrade("z",43))
        {
            player.z.shitouhuoqu=player.z.shitouhuoqu.mul(2)
        }

        //////////////////////////////////////////////////////////////////////////////////////
        
        player.z.huoyanshijian=player.z.huoyanshijian.sub(n(1).mul(diff)).max(0.001)
        player.z.huoyanbeishu=n(1)
        if(player.z.huoyanshijian.gte(0.01))
        {
            player.z.huoyanbeishu=player.z.huoyanbeishu.mul(2)
            if(hasUpgrade("z",32))
            {
                player.z.huoyanbeishu=player.z.huoyanbeishu.mul(layers.z.upgrades[32].EFFECT())
            }
        }
        if(hasUpgrade("c",32))
        {
            player.z.huoyanbeishu=player.z.huoyanbeishu.mul(layers.c.upgrades[32].EFFECT())
        }
        //
        player.z.tilinw=player.z.tilinw.add(player.z.tilihuifu.mul(diff)).min(player.z.tilimx)
        player.z.zhishihuoqu=player.points.div(10).root(2)
        if(hasUpgrade("c",11))
        {
            player.z.zhishi=player.z.zhishi.add(player.z.zhishihuoqu.mul(diff))
        }
    },
    infoboxes:
    {
        lore:
        {
            title: "故事",
            body() { return "<h3>神明开化了你,你似乎想到了一些拯救世界的办法<br><br>注意:同行科技的研发会让别的科技更难研发<br>知识的获取基于你的信仰" },
        },
    },
    bars: 
    {
        1: 
        {
            direction: RIGHT,
            width: 400,
            height: 20,
            fillStyle(){return {"background-color":"lime"}},
            style(){return {"color":"green"}},
            unlocked(){return true},
            display(){return '体力 '+format(player.z.tilinw)+'(+'+format(player.z.tilihuifu)+'/s) / '+format(player.z.tilimx)},
            progress() { return player.z.tilinw.div(player.z.tilimx) },
        },
    },
    clickables:
    {
        11: {
            display() 
            {
                return '采集木头<br><br>消耗:5体力<br><br>可获得'+format(player.z.mutouhuoqu)+'木头'
            },
            unlocked(){return hasUpgrade("z",21)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(5.001)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(5)
                player.z.mutou=player.z.mutou.add(player.z.mutouhuoqu)
            }
        },
        12: {
            display() 
            {
                return '用木头生火<br><br>消耗:1木头,3体力<br><br>火焰持续时间+'+format(player.z.huoyanhuoqu)+'s'
            },
            unlocked(){return hasUpgrade("z",22)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(3.001) && player.z.mutou.gte(1)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(3)
                player.z.mutou=player.z.mutou.sub(1)
                player.z.huoyanshijian=player.z.huoyanshijian.add(player.z.huoyanhuoqu)
                player.z.shenghuocishu=player.z.shenghuocishu.add(1)
            }
        },
        13: {
            display() 
            {
                return '采集石头<br><br>消耗:6体力<br><br>可获得'+format(player.z.shitouhuoqu)+'石头'
            },
            unlocked(){return hasUpgrade("z",23)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(6.001)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(6)
                player.z.shitou=player.z.shitou.add(player.z.shitouhuoqu)
            }
        },
        21: {
            display() 
            {
                return '向下挖掘<br><br>消耗:20体力<br><br>'+(player.z.lastkuangwu.lte(0.5)?'什么也没挖到':player.z.lastkuangwu.lte(1.5)?'挖到一块铜矿':'挖到一块铁矿')
            },
            unlocked(){return hasUpgrade("z",42)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(20.001)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(20)
                player.z.wakuangcishu=player.z.wakuangcishu.add(1)
                var x=zero
                x=x.add(Math.random())
                if(x.lte(0.33))
                {
                    player.z.lastkuangwu=n(0)
                }
                else if(x.lte(0.66))
                {
                    player.z.tong=player.z.tong.add(1).min(player.z.tongshangxian)
                    player.z.lastkuangwu=n(1)
                }
                else
                {
                    player.z.tie=player.z.tie.add(1).min(player.z.tieshangxian)
                    player.z.lastkuangwu=n(2)
                }
            }
        },
        22: {
            display() 
            {
                return '用煤炭生火<br><br>消耗:1煤炭,3体力<br><br>火焰持续时间+'+format(player.z.huoyanhuoqu.mul(12))+'s'
            },
            unlocked(){return hasUpgrade("z",51)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(3.001) && player.z.mei.gte(1)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(3)
                player.z.mei=player.z.mei.sub(1)
                player.z.huoyanshijian=player.z.huoyanshijian.add(player.z.huoyanhuoqu.mul(12))
                player.z.shenghuocishu=player.z.shenghuocishu.add(1)
            }
        },
        23: {
            display() 
            {
                return '挖煤<br><br>消耗:30体力'
            },
            unlocked(){return hasUpgrade("z",51)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(30.001)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(30)
                player.z.mei=player.z.mei.add(1).min(player.z.meishangxian)
            }
        },
        24: {
            display() 
            {
                return '掘银<br><br>消耗:40体力'
            },
            unlocked(){return hasUpgrade("z",52)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(40.001)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(40)
                player.z.ying=player.z.ying.add(1).min(player.z.yingshangxian)
            }
        },
        25: {
            display() 
            {
                return '掏金<br><br>消耗:50体力'
            },
            unlocked(){return hasUpgrade("z",53)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(50.001)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(50)
                player.z.jin=player.z.jin.add(1).min(player.z.jinshangxian)
            }
        },
        31: {
            display() 
            {
                return '出门!<br>去探险<br>消耗:所有体力<br><br>当前探险进度:<br>'+format(player.z.tanxianjindu.div(500))+'%'
            },
            unlocked(){return hasMilestone("c",0)},
            style(){return {"height":"125px"}},
            canClick(){return true},
            onClick()
            {
                player.z.tanxianjindu=player.z.tanxianjindu.add(player.z.tilinw).min(50000)
                player.z.tilinw=n(0)
            }
        },
        'jz11': {
            display() 
            {
                return '建造-箱子<br><br>消耗:10体力,25木头,25石头<br><br>提供:50木头上限,50石头上限'
            },
            unlocked(){return true},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(10) && player.z.mutou.gte(25) && player.z.shitou.gte(25)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(10)
                player.z.mutou=player.z.mutou.sub(25)
                player.z.mutoushangxian=player.z.mutoushangxian.add(50)
                player.z.shitou=player.z.shitou.sub(25)
                player.z.shitoushangxian=player.z.shitoushangxian.add(50)
            }
        },
        'jz21': {
            display() 
            {
                if(player.z.tanxianjindu.gte(15000))
                {
                    return '建造-金属盒<br><br>消耗:10体力,50木头,50石头,5铁,5铜<br><br>提供:10铁/铜/煤/银/金上限'
                }
                if(player.z.tanxianjindu.gte(5000))
                {
                    return '建造-金属盒<br><br>消耗:10体力,50木头,50石头,5铁,5铜<br><br>提供:10铁/铜/煤/银上限'
                }
                if(player.z.tanxianjindu.gte(1500))
                {
                    return '建造-金属盒<br><br>消耗:10体力,50木头,50石头,5铁,5铜<br><br>提供:10铁/铜/煤上限'
                }
                return '建造-金属盒<br><br>消耗:10体力,50木头,50石头,5铁,5铜<br><br>提供:10铁/铜上限'
            },
            unlocked(){return hasUpgrade("z",42)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(10) && player.z.mutou.gte(50) && player.z.shitou.gte(50) && player.z.tie.gte(5) && player.z.tong.gte(5)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(10)
                player.z.mutou=player.z.mutou.sub(50)
                player.z.shitou=player.z.shitou.sub(50)
                player.z.tie=player.z.tie.sub(5)
                player.z.mei=player.z.mei.sub(5)
                player.z.tieshangxian=player.z.tieshangxian.add(10)
                player.z.tongshangxian=player.z.tongshangxian.add(10)
                player.z.meishangxian=player.z.meishangxian.add(10)
                player.z.yingshangxian=player.z.yingshangxian.add(10)
                player.z.jinshangxian=player.z.jinshangxian.add(10)
            }
        },
    },
    upgrades:
    {
        11:{
            fullDisplay()
            {
                return '日晷<br>这是太阳神的一种器物<br>你不知道他可以做什么,但是它让你更加虔诚<br><br>花费:'+format(n(10).mul(player.z.onehang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(10).mul(player.z.onehang))
                player.z.onehang=player.z.onehang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(10).mul(player.z.onehang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return true},
            branches:[21,22,23],
        },
        21:{
            fullDisplay()
            {
                return '<text style="color:green">木头</text><br>太阳神告诉你:木头是一种很有用的资源<br>现在你可以采集木头了<br><br>花费:'+format(n(20).mul(player.z.twohang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(20).mul(player.z.twohang))
                player.z.twohang=player.z.twohang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(20).mul(player.z.twohang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",11)},
            branches:[31],
        },
        22:{
            fullDisplay()
            {
                return '<text style="color:orange">火焰</text><br><br>火,不仅带来了光明,更带来了温暖<br>现在你可以生火了<br><br><br>花费:'+format(n(20).mul(player.z.twohang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(20).mul(player.z.twohang))
                player.z.twohang=player.z.twohang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(20).mul(player.z.twohang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",11)},
            branches:[32],
        },
        23:{
            fullDisplay()
            {
                return '<text style="color:grey">石头</text><br>太阳神告诉你:石头也是一种很有用的资源<br>现在你可以采集石头了<br><br>花费:'+format(n(20).mul(player.z.twohang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(20).mul(player.z.twohang))
                player.z.twohang=player.z.twohang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(20).mul(player.z.twohang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",11)},
            branches:[33,34],
        },
        31:{
            fullDisplay()
            {
                return '<text style="color:grey">石斧</text><br>锋利的石头+坚硬的木棍=先进的工具<br>手动采集木头效率翻倍<br><br>花费:'+format(n(100).mul(player.z.threehang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(100).mul(player.z.threehang))
                player.z.threehang=player.z.threehang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(100).mul(player.z.threehang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",21) && hasUpgrade("z",'jz12')},
            branches:[41],
        },
        32:{
            EFFECT()
            {
                var x=player.z.huoyanshijian.add(1).root(2)
                return x
            },
            fullDisplay()
            {
                return '<text style="color:orange">篝火</text><br>火越旺,越温暖<br>火焰的剩余时间增幅火焰倍数<br>当前:'+format(layers.z.upgrades[32].EFFECT())+'x<br><br>花费:'+format(n(100).mul(player.z.threehang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(100).mul(player.z.threehang))
                player.z.threehang=player.z.threehang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(100).mul(player.z.threehang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",22)},
        },
        33:{
            fullDisplay()
            {
                return '<text style="color:grey">石镐</text><br>锋利的石头+坚硬的木棍=先进的工具<br>手动采集石头效率翻倍<br><br>花费:'+format(n(100).mul(player.z.threehang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(100).mul(player.z.threehang))
                player.z.threehang=player.z.threehang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(100).mul(player.z.threehang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",23) && hasUpgrade("z",'jz12')},
            branches:[42,43],
        },
        34:{
            fullDisplay()
            {
                return '建筑学<br>在神明的指引下,你依稀记得,这个世界有种东西叫做建筑<br>解锁 子面板-建筑<br><br>花费:'+format(n(100).mul(player.z.threehang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(100).mul(player.z.threehang))
                player.z.threehang=player.z.threehang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(100).mul(player.z.threehang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",23)},
        },
        41:{
            fullDisplay()
            {
                return '<text style="color:white">铁斧</text><br>更好的材料!<br>手动采集木头效率再翻倍<br><br>花费:'+format(n(300).mul(player.z.fourhang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(300).mul(player.z.fourhang))
                player.z.fourhang=player.z.fourhang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(300).mul(player.z.fourhang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",31) && hasUpgrade("z",'jz13')},
        },
        42:{
            fullDisplay()
            {
                return '挖掘<br>神告诉你:有用的资源不仅仅只有木头和石头,但他们大多在地下沉眠<br><br>现在你可以挖掘了<br><br>花费:'+format(n(300).mul(player.z.fourhang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(300).mul(player.z.fourhang))
                player.z.fourhang=player.z.fourhang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(300).mul(player.z.twohang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",33)},
        },
        43:{
            fullDisplay()
            {
                return '<text style="color:white">铁镐</text><br>更好的材料!<br>手动采集石头效率再翻倍<br><br>花费:'+format(n(300).mul(player.z.fourhang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(300).mul(player.z.fourhang))
                player.z.fourhang=player.z.fourhang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(300).mul(player.z.fourhang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",33) && hasUpgrade("z",'jz13')},
            branches:[51,52,53],
        },
        51:{
            fullDisplay()
            {
                if(player.z.tanxianjindu.lte(1500))
                {
                    return '???<br><br>解锁于:探险进度3%'
                }
                return '煤炭<br>在探险的时候发现一种新的矿物-煤<br>现在你可以采集煤炭了<br>同时你可以用煤炭生火了<br>花费:'+format(n(1000))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(1000))
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(1000)) && player.z.tanxianjindu.gte(1500)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",43)},
        },
        52:{
            fullDisplay()
            {
                if(player.z.tanxianjindu.lte(5000))
                {
                    return '???<br><br>解锁于:探险进度10%'
                }
                return '银<br>在探险的时候发现一种新的矿物-银<br>现在你可以采集银矿了<br><br>花费:'+format(n(1500))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(1500))
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(1500)) && player.z.tanxianjindu.gte(5000)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",43)},
        },
        53:{
            fullDisplay()
            {
                if(player.z.tanxianjindu.lte(15000))
                {
                    return '???<br><br>解锁于:探险进度30%'
                }
                return '金<br>在探险的时候发现一种新的矿物-金<br>现在你可以采集金矿了<br><br>花费:'+format(n(2000))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(2000))
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(2000)) && player.z.tanxianjindu.gte(15000)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",43)},
        },
        'jz11':{
            fullDisplay()
            {
                return '木板床<br><i>总算...可以休息了</i><br><br>体力回复+3/s<br><br>花费:20体力,100木头,100石头' 
            },
            onPurchase()
            {
                player.z.tilinw=player.z.tilinw.sub(n(20))
                player.z.mutou=player.z.mutou.sub(n(100))
                player.z.shitou=player.z.shitou.sub(n(100))
            },
            canAfford()
            {
                return player.z.mutou.gte(n(100)) && player.z.shitou.gte(n(100)) && player.z.tilinw.gte(20)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return player.z.mutoushangxian.gte(200)},
        },
        'jz12':{
            fullDisplay()
            {
                return '工作台<br>有一个工作台,制造物品变得更加方便了<br><br>可以制作东西了<br><br>花费:50体力,250木头,250石头' 
            },
            onPurchase()
            {
                player.z.tilinw=player.z.tilinw.sub(n(50))
                player.z.mutou=player.z.mutou.sub(n(250))
                player.z.shitou=player.z.shitou.sub(n(250))
            },
            canAfford()
            {
                return player.z.mutou.gte(n(250)) && player.z.shitou.gte(n(250)) && player.z.tilinw.gte(50)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return player.z.mutoushangxian.gte(300)},
        },
        'jz13':{
            fullDisplay()
            {
                return '熔炉<br>你可以用矿物来制作物品了<br><br>解锁一些和矿物有关的升级<br><br>花费:50体力,300石头,5铁,5铜' 
            },
            onPurchase()
            {
                player.z.tilinw=player.z.tilinw.sub(n(50))
                player.z.shitou=player.z.shitou.sub(n(300))
                player.z.tie=player.z.tie.sub(5)
                player.z.tong=player.z.tong.sub(5)
            },
            canAfford()
            {
                return player.z.shitou.gte(n(300)) && player.z.tie.gte(n(5)) && player.z.tong.gte(n(5)) && player.z.tilinw.gte(50)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",'jz12') && hasUpgrade('z',42)},
        },
        'jz14':{
            fullDisplay()
            {
                return '高炉<br>想要使用更高级的金和银,石头做的熔炉略微有些不够看了<br>可以使用银和金了<br><br>花费:50体力,30铁,20铜,10煤' 
            },
            onPurchase()
            {
                player.z.tilinw=player.z.tilinw.sub(n(50))
                player.z.tie=player.z.tie.sub(30)
                player.z.tong=player.z.tong.sub(20)
                player.z.mei=player.z.mei.sub(10)
            },
            canAfford()
            {
                return player.z.tie.gte(30) && player.z.tong.gte(20) && player.z.mei.gte(10) && player.z.tilinw.gte(50)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",'jz13') && hasUpgrade("z",51)},
        },
    },
    tabFormat:
    {
        科技:
        {
            content:
            [
                "blank",
                ["row",[["infobox","lore"],]],
                "blank",
                ["display-text",
                    function() { return '你当前有'+format(player.z.zhishi)+'知识(+'+format(player.z.zhishihuoqu)+'点/秒)'},
                    { "color": "lightblue", "font-size": "28px",}
                ],
                "blank",
                ["row",[["upgrade",11],]],
                "blank",
                ["row",[["upgrade",21],"blank","blank","blank",["upgrade",22],"blank","blank","blank",["upgrade",23],]],
                "blank",
                ["row",[["upgrade",31],"blank","blank","blank",["upgrade",32],"blank","blank","blank",["upgrade",33],"blank","blank","blank",["upgrade",34],]],
                "blank",
                ["row",[["upgrade",41],"blank","blank","blank",["upgrade",42],"blank","blank","blank",["upgrade",43],]],
                "blank",
                ["row",["blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank",["upgrade",51],"blank","blank","blank",["upgrade",52],"blank","blank","blank",["upgrade",53],]],
            ]
        },
        行动:
        {
            unlocked(){return hasUpgrade("z",21) || hasUpgrade("z",22) || hasUpgrade("z",23)},
            content:
            [
                "blank",
                ["row",[["bar",1],]],
                "blank",
                "blank",
                ["display-text",
                    function() { return '你的火焰还能燃烧'+format(player.z.huoyanshijian)+'秒'},
                    { "color": "orange", "font-size": "28px",}
                ],
                ["display-text",
                    function() { return '给你的信仰提供'+format(player.z.huoyanbeishu)+'x的加成'},
                    { "color": "orange", "font-size": "28px",}
                ],
                "blank",
                "blank",
                ["row",[["clickable",11],["clickable",12],["clickable",13],]],
                ["row",[["clickable",21],["clickable",22],["clickable",23],["clickable",24],["clickable",25],]],
                "blank",
                ["row",[["clickable",31],]],
            ]
        },
        资源:
        {
            unlocked(){return hasUpgrade("z",21) || hasUpgrade("z",22) || hasUpgrade("z",23)},
            content:
            [
                "blank",
                ["display-text",
                    function() { return '你有 '+format(player.z.mutou)+' / '+format(player.z.mutoushangxian)+' 木头 '},
                    { "color": "green", "font-size": "28px",}
                ],
                ["display-text",
                    function() { return '你有 '+format(player.z.shitou)+' / '+format(player.z.shitoushangxian)+' 石头 '},
                    { "color": "grey", "font-size": "28px",}
                ],
                ["display-text",
                    function() {
                        if(hasUpgrade("z",42))
                        return '你有 '+format(player.z.tong)+' / '+format(player.z.tongshangxian)+' 铜矿'
                        return ''
                    },
                    { "color": "brown", "font-size": "28px",}
                ],
                ["display-text",
                    function() {
                        if(hasUpgrade("z",42))
                        return '你有 '+format(player.z.tie)+' / '+format(player.z.tieshangxian)+ ' 铁矿'
                        return ''
                    },
                    { "color": "silver", "font-size": "28px",}
                ],
                ["display-text",
                    function() {
                        if(hasUpgrade("z",51))
                        return '你有 '+format(player.z.mei)+' / '+format(player.z.meishangxian)+' 煤矿'
                        return ''
                    },
                    { "color": "#504A4B", "font-size": "28px",}
                ],
                ["display-text",
                    function() {
                        if(hasUpgrade("z",52))
                        return '你有 '+format(player.z.ying)+' / '+format(player.z.yingshangxian)+' 银矿'
                        return ''
                    },
                    { "color": "lightblue", "font-size": "28px",}
                ],
                ["display-text",
                    function() {
                        if(hasUpgrade("z",53))
                        return '你有 '+format(player.z.jin)+' / '+format(player.z.jinshangxian)+' 金矿'
                        return ''
                    },
                    { "color": "gold", "font-size": "28px",}
                ],
            ]
        },
        建筑:
        {
            unlocked(){return hasUpgrade("z",34)},
            content:
            [
                "blank",
                ["row",[["bar",1],]],
                "blank",
                ["row",[["clickable",'jz11'],["upgrade",'jz11'],["upgrade",'jz12'],["upgrade",'jz13'],["upgrade",'jz14'],]],
                ["row",[["clickable",'jz21'],]],
            ]
        },
    },
    row: 1,
    layerShown()
    {
        return hasUpgrade("c",11)
    },
})
addLayer("f", 
{ 
    symbol: "法",
    position: 0,
    startData()
    {
        return{
            unlocked: true,
            points: new ExpantaNum(0),
            fali:zero,falitotal:zero,

            monengguantixuyao:n(10),monengguanticishu:zero,monengguantijiacheng:n(1),
        }
    },
    color: "magenta",
    resource: "法力",
    type: "normal",
    tooltip(){return ""},
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount(){return n(0)},
    baseResource:"点数",
    gainMult()
    {
        mult=new ExpantaNum(1)
        return mult
    },
    gainExp() 
    { 
        var exp=new ExpantaNum(1)
        return exp
    },
    clickables:
    {
        11: {
            display() 
            {
                return '兑换<br><br>消耗:10%信仰<br><br>可获得'+format(player.points.div(1000))+'法力'
            },
            unlocked(){return true},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(5.001)},
            onClick()
            {
                var x=player.points.div(10)
                player.points=player.points.sub(x)
                x=x.div(100)
                player.f.fali=player.f.fali.add(x)
                player.f.falitotal=player.f.falitotal.add(x)
            }
        },
        'yongjiu-1': {
            display() 
            {
                return '法力灌体<br><br>最原始,最狂暴的法力注入你的身体<br>痛苦,但确实值得的<br>-增幅体力恢复-<br><br>花费'+format(player.f.monengguantixuyao)+'法力<br>当前:x'+format(player.f.monengguantijiacheng)+'(下一级:x'+format(player.f.monengguantijiacheng.mul(1.05))+')<br>已经灌体:'+format(player.f.monengguanticishu)+'次'
            },
            unlocked(){return true},
            style(){return {"height":"175px","width":"175px"}},
            canClick(){return player.f.fali.gte(player.f.monengguantixuyao)},
            onClick()
            {
                player.f.fali=player.f.fali.sub(player.f.monengguantixuyao)
                player.f.monengguantixuyao=player.f.monengguantixuyao.mul(1.2)
                player.f.monengguanticishu=player.f.monengguanticishu.add(1)
                player.f.monengguantijiacheng=player.f.monengguantijiacheng.mul(1.05)
            }
        },
    },
    microtabs:
    {
        法术:
        {
            永久:
            {
                unlocked(){return player.f.falitotal.gte(0.1)},
                content:
                [
                    "blank",
                    ["row",[["clickable",'yongjiu-1']]],
                ],
            },
            临时:
            {
                unlocked(){return false},
            },
        }
    },
    tabFormat:
    {
        法术:
        {
            content:
            [
                "blank",
                ["display-text",
                    function() { return '你当前有'+format(player.f.fali)+'法力'},
                    { "color": "magenta", "font-size": "28px",}
                ],
                "blank",
                ["row",[["clickable",11],]],
                "blank",
                ["microtabs","法术",{"border-width":"0px"}],
            ],
        }
    },
    row: 2,
    layerShown()
    {   
        return hasUpgrade("c",'shengji1')
    },
})