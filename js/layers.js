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
                showTab('none')
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

            lingting:zero,lingtingshijian:zero,
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
        if(player.c.lingting.gte(0.5))
        {
            player.c.lingtingshijian=player.c.lingtingshijian.add(diff)
        }
        if(player.c.lingtingshijian.gte(30))
        {
            player.c.lingting=n(2)
        }
    },
    infoboxes:
    {
        lore:
        {
            title: "故事",
            body() { return "<h3>几天的祈祷之后,眼前的神像终于发生了一些变化<br>微弱的乳白色光晕缓缓散开,你的眼底倒映着希望<br><br>注意:同行的祈祷会让别的祈祷更加困难<br>(毕竟,这个神像承载的力量是有限的)" },
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
        2: 
        {
            direction: RIGHT,
            width: 300,
            height: 20,
            fillStyle(){return {"background-color":"orange"}},
            unlocked(){return player.c.lingting.gte(0.5) && player.c.lingting.lte(1.5)},
            display(){
                var s=''
                var ch=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
                for(var i=0;i<36;i++)
                {
                    var x=zero
                    x=x.add(Math.random())
                    x=x.mul(26).floor().min(25)
                    s=s+ch[x]
                }
                return s
            },
            progress() { return player.c.lingtingshijian.div(30) },
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
        13:
        {
            display()
            {
                return '聆听<br><br>花费:10000信仰' 
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return player.c.lingting.lte(1.5)},
            canClick(){return player.points.gte(10000) && player.c.lingting.lte(0.5)},
            onClick()
            {
                player.points=player.points.sub(10000)
                player.c.lingting=n(1)
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
                ["row",[["clickable",13],]],
                "blank",
                ["row",[["bar",2],]],
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

            shazi:zero,boli:zero,
            yitianchong:zero,jindu:zero,wendu:n(15),bolizhuangtai:zero,

            tongpianyitianchong:zero,tongpianhoudu:n(5),lengque:zero,

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
            eighthang:n(1),
            ninehang:n(1),
            tenhang:n(1),
            shiyihang:n(1),
            shierhang:n(1),
            shisanhang:n(1),
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
    tooltip(){
        return ""
    },
    update(diff)
    {
        if(player.z.tongpianhoudu.lte(0.5))
        {
            player.z.tongpianyitianchong=n(2)
        }
        if(player.z.bolizhuangtai.gte(1.5))
        {
            player.z.wendu=player.z.wendu.add(n(100).mul(diff))
            player.z.jindu=player.z.jindu.add(n(0.1).mul(diff))
        }
        if(player.z.bolizhuangtai.gte(0.5))
        {
            player.z.wendu=player.z.wendu.sub(n(40).mul(diff))
            player.z.jindu=player.z.jindu.add(n(0.01).mul(diff))
        }
        if(player.z.wendu.gte(750) || player.z.wendu.lte(5))
        {
            player.z.wendu=n(15)
            player.z.jindu=n(0)
            player.z.bolizhuangtai=n(0)
            player.z.yitianchong=n(0)
        }
        if(player.z.jindu.gte(5))
        {
            player.z.yitianchong=n(2)
            player.z.wendu=n(15)
            player.z.bolizhuangtai=n(0)
        }
        player.z.shazi=player.z.shazi.mul(n(0.9).pow(diff)).max(0.0001)

        //////////////////////////////////////////////////////////////////////////////////////

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
        player.z.mutouhuoqu=player.z.mutouhuoqu.mul(player.f.caijibeishu)
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
        player.z.shitouhuoqu=player.z.shitouhuoqu.mul(player.f.caijibeishu)

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
        2: 
        {
            direction: RIGHT,
            width: 400,
            height: 20,
            fillStyle(){
                if(player.z.yitianchong.gte(1.5))
                {
                    return {"background-color":"grey"}
                }
                if(player.z.yitianchong.gte(0.5))
                {
                    if(player.z.bolizhuangtai.eq(1))
                    {
                        return {"background-color":"blue"}
                    }
                    if(player.z.bolizhuangtai.eq(2))
                    {
                        return {"background-color":"red"}
                    }
                    if(player.z.bolizhuangtai.eq(0))
                    {
                        return {"background-color":"lightblue"}
                    }
                }
                return {"background-color":"lightblue"}
            },
            style(){
                // if(player.z.yitianchong.gte(0.5))
                // {
                //     return {"background-color":"lightblue","color":"white","border-width":"2px"}
                // }
                return {"color":"white","border-width":"2px"}
            },
            unlocked(){return true},
            display(){
                if(player.z.yitianchong.gte(1.5))
                {
                    return '钢化玻璃'
                }
                if(player.z.yitianchong.gte(0.5))
                {
                    return '玻璃: '+format(player.z.wendu)+' <sup>o</sup>C'
                }
                return '无'
            },
            progress() {
                return player.z.jindu.div(5)
            },
        },
        3: 
        {
            direction: RIGHT,
            width: 400,
            height:function(){
                return player.z.tongpianhoudu.mul(10)
            },
            fillStyle(){
                if(player.z.tongpianyitianchong.gte(0.5))
                {
                    return {"background-color":"brown"}
                }
                return {"background-color":"black"}
            },
            style(){
                // if(player.z.yitianchong.gte(0.5))
                // {
                //     return {"background-color":"lightblue","color":"white","border-width":"2px"}
                // }
                return {"color":"white","background-color":"brown"}
            },
            unlocked(){return true},
            display(){
                if(player.z.tongpianyitianchong.gte(0.5))
                {
                    return ''
                }
                return '无'
            },
            progress() {
                if(player.z.tongpianyitianchong.gte(0.5))
                {
                    return 2
                }
                return 0
            },
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
                    player.z.tong=player.z.tong.add(n(1).mul(player.f.wakuangbeishu)).min(player.z.tongshangxian)
                    player.z.lastkuangwu=n(1)
                }
                else
                {
                    player.z.tie=player.z.tie.add(n(1).mul(player.f.wakuangbeishu)).min(player.z.tieshangxian)
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
                player.z.mei=player.z.mei.add(n(1).mul(player.f.wakuangbeishu)).min(player.z.meishangxian)
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
                player.z.ying=player.z.ying.add(n(1).mul(player.f.wakuangbeishu)).min(player.z.yingshangxian)
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
                player.z.jin=player.z.jin.add(n(1).mul(player.f.wakuangbeishu)).min(player.z.jinshangxian)
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
        41: {
            display() 
            {
                return '挖沙<br><br>消耗:50体力<br><br>注:沙子没有储存上限,但每秒会流失10%的沙子'
            },
            unlocked(){return hasUpgrade("z",81)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(50.001)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(50)
                player.z.shazi=player.z.shazi.add(n(1).mul(player.f.wakuangbeishu))
            }
        },
        42: {
            display() 
            {
                return '烧制玻璃<br><br>消耗:50体力 5沙子 1煤'
            },
            unlocked(){return hasUpgrade("z",91)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(50.001) && player.z.shazi.gte(5) && player.z.mei.gte(1)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(50)
                player.z.shazi=player.z.shazi.sub(5)
                player.z.mei=player.z.mei.sub(1)
                player.z.boli=player.z.boli.add(1)
            }
        },
        'jz11': {
            display() 
            {
                return '建造-箱子<br><br>消耗:10体力,25木头,25石头<br><br>提供:50木头/石头上限'
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
        'jz22': {
            display() 
            {
                return '建造-窝棚<br><br>消耗:100体力,300木头,300石头<br><br>提供:1000木头/石头上限'
            },
            unlocked(){return hasUpgrade("z",61)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tilinw.gte(100) && player.z.mutou.gte(300) && player.z.shitou.gte(300)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(100)
                player.z.mutou=player.z.mutou.sub(300)
                player.z.shitou=player.z.shitou.sub(300)
                player.z.mutoushangxian=player.z.mutoushangxian.add(1000)
                player.z.shitoushangxian=player.z.shitoushangxian.add(1000)
            }
        },
        'sw1': {
            display() 
            {
                return '填充<br><br>消耗:20玻璃'
            },
            unlocked(){return hasUpgrade("z",91) && player.z.yitianchong.lte(0.5)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.boli.gte(20)},
            onClick()
            {
                player.z.boli=player.z.boli.sub(20)
                player.z.yitianchong=n(1)
            }
        },
        'sw1-1': {
            display() 
            {
                return '加热<br>+100 <sup>o</sup>C/s'
            },
            unlocked(){return player.z.yitianchong.gte(0.5) && hasUpgrade("z",101) && player.z.yitianchong.lte(1.5)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.bolizhuangtai.lte(1.5)},
            onClick()
            {
                player.z.bolizhuangtai=n(2)
            }
        },
        'sw1-2': {
            display() 
            {
                return '冷却<br>-40 <sup>o</sup>C/s'
            },
            unlocked(){return player.z.yitianchong.gte(0.5) && hasUpgrade("z",102) && player.z.yitianchong.lte(1.5)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.bolizhuangtai.lte(0.5) || player.z.bolizhuangtai.gte(1.5)},
            onClick()
            {
                player.z.bolizhuangtai=n(1)
            }
        },
        'sw1-3': {
            display() 
            {
                return '停止'
            },
            unlocked(){return player.z.yitianchong.gte(0.5) && player.z.yitianchong.lte(1.5)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.bolizhuangtai.gte(0.5)},
            onClick()
            {
                player.z.bolizhuangtai=n(0)
            }
        },
        'sw2': {
            display() 
            {
                return '填充<br><br>消耗:50铜'
            },
            unlocked(){return hasUpgrade("z",82) && player.z.tongpianyitianchong.lte(0.5)},
            style(){return {"height":"125px"}},
            canClick(){return player.z.tong.gte(50)},
            onClick()
            {
                player.z.tong=player.z.tong.sub(50)
                player.z.tongpianyitianchong=n(1)
            }
        },
        'sw2-1': {
            display() 
            {
                return '压缩<br><br>消耗:500体力<br><br>'+'铜片 厚度: '+format(player.z.tongpianhoudu)+' cm'
            },
            unlocked(){return player.z.tongpianyitianchong.gte(0.5) && hasUpgrade("z",82) && player.z.tongpianyitianchong.lte(1.5)},
            style(){return {"height":"125px","width":"150px"}},
            canClick(){return player.z.tilinw.gte(500)},
            onClick()
            {
                player.z.tilinw=player.z.tilinw.sub(500)
                if(hasUpgrade("z",92))
                {
                    player.z.tongpianhoudu=player.z.tongpianhoudu.div(1.05)
                }
                else
                {
                    player.z.tongpianhoudu=player.z.tongpianhoudu.div(1.02)
                }
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
            branches:[21,22,23,61,62],
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
                return player.z.zhishi.gte(n(300).mul(player.z.fourhang))
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
            branches:[63],
        },
        53:{
            fullDisplay()
            {
                if(player.z.tanxianjindu.lte(10000))
                {
                    return '???<br><br>解锁于:探险进度20%'
                }
                return '金<br>在探险的时候发现一种新的矿物-金<br>现在你可以采集金矿了<br><br>花费:'+format(n(2000))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(2000))
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(2000)) && player.z.tanxianjindu.gte(10000)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",43)},
            branches:[63],
        },
        61:{
            fullDisplay()
            {
                return '环保主义<br>需要更多的空间!<br>解锁更多物资储存建筑<br><br>花费:'+format(n(2000).mul(player.z.sixhang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(2000).mul(player.z.sixhang))
                player.z.sixhang=player.z.sixhang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(2000).mul(player.z.sixhang)) && player.z.tanxianjindu.gte(1500) && hasUpgrade("z",51) && hasUpgrade("z",52) && hasUpgrade("z",53) && !hasUpgrade("z",62)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return   hasUpgrade("z",51) && hasUpgrade("z",52) && hasUpgrade("z",53) && !hasUpgrade("z",62)},
            branches:[71],
        },
        62:{
            fullDisplay()
            {
                return '堆放<br>你忽然想起现在只有你一个人了<br>为什么把多余的资源放在地上呢<br><text style="color:red">你现在不需要资源上限了</text><br>花费:'+format(n(2000).mul(player.z.sixhang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(2000).mul(player.z.sixhang))
                player.z.sixhang=player.z.sixhang.mul(2)
                player.z.mutoushangxian=n(1e100)
                player.z.shitoushangxian=n(1e100)
                player.z.tieshangxian=n(1e100)
                player.z.tongshangxian=n(1e100)
                player.z.meishangxian=n(1e100)
                player.z.jinshangxian=n(1e100)
                player.z.yingshangxian=n(1e100)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(2000).mul(player.z.sixhang)) && player.z.tanxianjindu.gte(1500) && hasUpgrade("z",51) && hasUpgrade("z",52) && hasUpgrade("z",53) && !hasUpgrade("z",61)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",51) && hasUpgrade("z",52) && hasUpgrade("z",53) && !hasUpgrade("z",61)},
            branches:[71],
        },
        63:{
            fullDisplay()
            {
                return '结合<br>科技+魔法=???<br><br>解锁 子面板-符文<br><br>花费:'+format(n(2000).mul(player.z.sixhang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(2000).mul(player.z.sixhang))
                player.z.sixhang=player.z.sixhang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(2000).mul(player.z.sixhang)) && hasUpgrade("z",52) && hasUpgrade("z",53)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",52) && hasUpgrade("z",53)},
            branches:[71],
        },
        71:{
            fullDisplay()
            {
                return '<h1>突飞猛进</h1><br>强大的法力让你对新的事物掌握的无比快速<br><br><h2><text style="color:orange">准备接受新的神谕吧</text></h2><br><br>花费:'+format(20000)+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(20000)
            },
            canAfford()
            {
                return player.z.zhishi.gte(20000)
            },
            style(){return {"height":"125px","width":"750px"}},
            unlocked(){return hasUpgrade("f",'fw31')},
            branches:[81,82,83,84],
        },
        81:{
            fullDisplay()
            {
                return '原材料-沙子<br>神告诉你:想让制作二级圣物,需要钢化玻璃<br>因此沙子是必须品<br>现在你可以挖沙子了<br><br>花费:'+format(n(5000).mul(player.z.eighthang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(5000).mul(player.z.eighthang))
                player.z.eighthang=player.z.eighthang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(5000).mul(player.z.eighthang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return player.c.lingting.gte(1.5)},
            branches:[91],
        },
        82:{
            fullDisplay()
            {
                return '原材料-压缩铜<br>神告诉你:想让制作二级圣物,需要铜片<br><br>现在你可以尝试压缩铜了<br><br>花费:'+format(n(5000).mul(player.z.eighthang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(5000).mul(player.z.eighthang))
                player.z.eighthang=player.z.eighthang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(5000).mul(player.z.eighthang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return player.c.lingting.gte(1.5)},
            branches:[92],
        },
        83:{
            fullDisplay()
            {
                return '原材料-魔法合金<br>神告诉你:想让制作二级圣物,需要魔法合金<br><br>现在你可以着手制作合金了<br><br>花费:'+format(n(5000).mul(player.z.eighthang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(5000).mul(player.z.eighthang))
                player.z.eighthang=player.z.eighthang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(5000).mul(player.z.eighthang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return player.c.lingting.gte(1.5)},
        },
        84:{
            fullDisplay()
            {
                return '原材料-导线<br>神告诉你:想让能量正常流通,需要导线<br><br>现在你可以制作导线了<br><br>花费:'+format(n(5000).mul(player.z.eighthang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(5000).mul(player.z.eighthang))
                player.z.eighthang=player.z.eighthang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(5000).mul(player.z.eighthang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return player.c.lingting.gte(1.5)},
        },
        91:{
            fullDisplay()
            {
                return '原材料-玻璃<br>神告诉你:想让制作二级圣物,需要钢化玻璃<br>因此你需要先拥有玻璃<br>现在你可以烧制玻璃了<br>花费:'+format(n(10000).mul(player.z.ninehang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(10000).mul(player.z.ninehang))
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(10000).mul(player.z.ninehang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",81)},
            branches:[101,102],
        },
        92:{
            fullDisplay()
            {
                return '快速压缩<br>更好的技巧<br>每次压缩铜片 /1.02=>/1.05<br>花费:'+format(n(10000).mul(player.z.ninehang))+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(10000).mul(player.z.ninehang))
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(10000).mul(player.z.ninehang))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",82)},
        },
        101:{
            fullDisplay()
            {
                return '加热<br><br>你知道如何加热玻璃了<br><br>花费:'+format(10000)+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(10000)
            },
            canAfford()
            {
                return player.z.zhishi.gte(10000)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",91)},
        },
        102:{
            fullDisplay()
            {
                return '冷却<br><br>你知道如何冷却玻璃了<br><br>花费:'+format(10000)+'知识' 
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(10000)
            },
            canAfford()
            {
                return player.z.zhishi.gte(10000)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return hasUpgrade("z",91)},
        },
        111:{
            fullDisplay()
            {
                return '下一个目标<br><br>二级圣物:太阳能板<br><br>前置:???'
            },
            onPurchase()
            {
                player.z.zhishi=player.z.zhishi.sub(n(2000).mul(player.z.sixhang))
                player.z.sixhang=player.z.sixhang.mul(2)
            },
            canAfford()
            {
                return player.z.zhishi.gte(n(2000).mul(player.z.sixhang)) && hasUpgrade("z",52) && hasUpgrade("z",53)
            },
            style(){return {"height":"125px","width":"150px"}},
            unlocked(){return hasUpgrade("z",52) && hasUpgrade("z",53)},
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
                "blank",
                ["row",["blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank",["upgrade",61],["upgrade",62],"blank","blank","blank",["upgrade",63],]],
                "blank",
                ["row",[["upgrade",71]]],
                "blank",
                ["row",[["upgrade",81],"blank","blank","blank",["upgrade",82],"blank","blank","blank",["upgrade",83],"blank","blank","blank",["upgrade",84],]],
                "blank",
                ["row",[["upgrade",91],"blank","blank","blank",["upgrade",92],"blank","blank","blank",["upgrade",93],"blank","blank","blank",["upgrade",94],]],
                "blank",
                ["row",[["upgrade",101],"blank","blank","blank",["upgrade",102],"blank","blank","blank",["upgrade",103],"blank","blank","blank",["upgrade",104],]],
                "blank",
                ["row",[["upgrade",111]]],
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
                ["row",[["clickable",41],["clickable",42],["clickable",43],["clickable",44],["clickable",45],]],
                "blank",
                ["row",[["clickable",31],]],
            ]
        },
        // 资源:
        // {
        //     unlocked(){return hasUpgrade("z",21) || hasUpgrade("z",22) || hasUpgrade("z",23)},
        //     content:
        //     [
        //         "blank",
        //         ["display-text",
        //             function() { return '你有 '+format(player.z.mutou)+' / '+format(player.z.mutoushangxian)+' 木头 '},
        //             { "color": "green", "font-size": "28px",}
        //         ],
        //         ["display-text",
        //             function() { return '你有 '+format(player.z.shitou)+' / '+format(player.z.shitoushangxian)+' 石头 '},
        //             { "color": "grey", "font-size": "28px",}
        //         ],
        //         ["display-text",
        //             function() {
        //                 if(hasUpgrade("z",42))
        //                 return '你有 '+format(player.z.tong)+' / '+format(player.z.tongshangxian)+' 铜矿'
        //                 return ''
        //             },
        //             { "color": "brown", "font-size": "28px",}
        //         ],
        //         ["display-text",
        //             function() {
        //                 if(hasUpgrade("z",42))
        //                 return '你有 '+format(player.z.tie)+' / '+format(player.z.tieshangxian)+ ' 铁矿'
        //                 return ''
        //             },
        //             { "color": "silver", "font-size": "28px",}
        //         ],
        //         ["display-text",
        //             function() {
        //                 if(hasUpgrade("z",51))
        //                 return '你有 '+format(player.z.mei)+' / '+format(player.z.meishangxian)+' 煤矿'
        //                 return ''
        //             },
        //             { "color": "#504A4B", "font-size": "28px",}
        //         ],
        //         ["display-text",
        //             function() {
        //                 if(hasUpgrade("z",52))
        //                 return '你有 '+format(player.z.ying)+' / '+format(player.z.yingshangxian)+' 银矿'
        //                 return ''
        //             },
        //             { "color": "lightblue", "font-size": "28px",}
        //         ],
        //         ["display-text",
        //             function() {
        //                 if(hasUpgrade("z",53))
        //                 return '你有 '+format(player.z.jin)+' / '+format(player.z.jinshangxian)+' 金矿'
        //                 return ''
        //             },
        //             { "color": "gold", "font-size": "28px",}
        //         ],
        //     ]
        // },
        建筑:
        {
            unlocked(){return hasUpgrade("z",34)},
            content:
            [
                "blank",
                ["row",[["bar",1],]],
                "blank",
                ["row",[["clickable",'jz11'],["upgrade",'jz11'],["upgrade",'jz12'],["upgrade",'jz13'],["upgrade",'jz14'],]],
                ["row",[["clickable",'jz21'],["clickable",'jz22'],]],
            ]
        },
        圣物:
        {
            unlocked(){return player.c.lingting.gte(1.5)},
            content:
            [
                "blank",
                ["display-text",
                    function() { return '一级圣物:日晷(已完成)'},
                    { "color": "white", "font-size": "28px",}
                ],
                "blank",
                ["display-text",
                    function() { return '二级圣物:太阳能板(未完成)'},
                    { "color": "white", "font-size": "28px",}
                ],
                ["display-text",
                    function() {
                        if(player.z.yitianchong.gte(0.5) && player.z.yitianchong.lte(1.5))
                        return '温馨提示:合适的玻璃温度应该在5<sup>o</sup>C~750<sup>o</sup>C,否则就会损坏'},
                    { "color": "white", "font-size": "16px",}
                ],
                ["display-text",
                    function() {
                        if(player.z.tongpianyitianchong.gte(0.5) && player.z.tongpianyitianchong.lte(1.5))
                        return '温馨提示:良好的铜片厚度应该5mm以下哦'},
                    { "color": "white", "font-size": "16px",}
                ],
                "blank",
                "blank",
                "blank",
                ["row",[["clickable","sw1"],["bar",2],["clickable","sw1-1"],["clickable","sw1-2"],["clickable","sw1-3"],]],
                ["row",[["clickable","sw2"],["bar",3],["clickable","sw2-1"],]],
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
            fali:zero,falitotal:zero,falilianjie:n(10),

            monengguantixuyao:n(10),monengguanticishu:zero,monengguantijiacheng:n(1),

            fumobeishu:n(1),caijibeishu:n(1),wakuangbeishu:n(1),
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
                return '法力灌体<br><br>最原始,最狂暴的法力注入你的身体<br>痛苦,但确实值得的<br>-增幅体力恢复-<br><br>花费'+format(player.f.monengguantixuyao)+'法力<br>当前:x'+format(player.f.monengguantijiacheng)+'(下一次:x'+format(player.f.monengguantijiacheng.mul(1.05))+')<br>已经灌体:'+format(player.f.monengguanticishu)+'次'
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
    upgrades:
    {
        11:{
            EFFECT()
            {
                var eff=one
                if(player.f.falitotal.mul(player.f.falilianjie).gte(player.points))
                {
                    eff=player.points.root(4)
                }
                return eff
            },
            fullDisplay()
            {
                return '信仰连接<br>你用你的法力把你的信仰串联在一起<br>但你的法力总量是有限的,一旦你的信仰超过了你的连接上限,该升级将失去效果<br>(注:每点法力可以为'+format(player.f.falilianjie)+'点信仰提供连接)<br>效果:信仰增幅信仰<br>当前增幅:'+format(layers.f.upgrades[11].EFFECT())+'x<br>花费:100法力'
            },
            onPurchase()
            {
                player.f.fali=player.f.fali.sub(100)
            },
            canAfford()
            {
                return player.f.fali.gte(100)
            },
            style(){return {"height":"175px","width":"175px"}},
            unlocked(){return player.f.monengguanticishu.gte(3)},
        },
        'fw11':{
            fullDisplay()
            {
                return '效率I<br><br>手动采集效率x1.5<br>额外花费倍数x5<br><br>花费:'+format(n(100).mul(player.f.fumobeishu))+'法力' 
            },
            onPurchase()
            {
                player.f.fali=player.f.fali.sub(n(100).mul(player.f.fumobeishu))
                player.f.fumobeishu=player.f.fumobeishu.mul(5)
                player.f.caijibeishu=player.f.caijibeishu.mul(1.5)
            },
            canAfford()
            {
                return player.f.fali.gte(n(100).mul(player.f.fumobeishu))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return true},
        },
        'fw12':{
            fullDisplay()
            {
                return '效率II<br><br>手动采集效率x2<br>额外花费倍数x7<br><br>花费:'+format(n(100).mul(player.f.fumobeishu))+'法力' 
            },
            onPurchase()
            {
                player.f.fali=player.f.fali.sub(n(100).mul(player.f.fumobeishu))
                player.f.fumobeishu=player.f.fumobeishu.mul(7)
                player.f.caijibeishu=player.f.caijibeishu.mul(2)
            },
            canAfford()
            {
                return player.f.fali.gte(n(100).mul(player.f.fumobeishu)) && hasUpgrade("f",'fw11')
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return true},
        },
        'fw13':{
            fullDisplay()
            {
                return '效率III<br><br>手动采集效率x3<br>额外花费倍数x10<br><br>花费:'+format(n(100).mul(player.f.fumobeishu))+'法力' 
            },
            onPurchase()
            {
                player.f.fali=player.f.fali.sub(n(100).mul(player.f.fumobeishu))
                player.f.fumobeishu=player.f.fumobeishu.mul(10)
                player.f.caijibeishu=player.f.caijibeishu.mul(3)
            },
            canAfford()
            {
                return player.f.fali.gte(n(100).mul(player.f.fumobeishu)) && hasUpgrade("f",'fw12')
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return true},
        },
        'fw21':{
            fullDisplay()
            {
                return '时运I<br><br>矿物掉落x1.2<br>额外花费倍数x5<br><br>花费:'+format(n(100).mul(player.f.fumobeishu))+'法力' 
            },
            onPurchase()
            {
                player.f.fali=player.f.fali.sub(n(100).mul(player.f.fumobeishu))
                player.f.fumobeishu=player.f.fumobeishu.mul(5)
                player.f.wakuangbeishu=player.f.wakuangbeishu.mul(1.2)
            },
            canAfford()
            {
                return player.f.fali.gte(n(100).mul(player.f.fumobeishu))
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return true},
        },
        'fw22':{
            fullDisplay()
            {
                return '时运II<br><br>矿物掉落x1.5<br>额外花费倍数x7<br><br>花费:'+format(n(100).mul(player.f.fumobeishu))+'法力' 
            },
            onPurchase()
            {
                player.f.fali=player.f.fali.sub(n(100).mul(player.f.fumobeishu))
                player.f.fumobeishu=player.f.fumobeishu.mul(7)
                player.f.wakuangbeishu=player.f.wakuangbeishu.mul(1.5)
            },
            canAfford()
            {
                return player.f.fali.gte(n(100).mul(player.f.fumobeishu)) && hasUpgrade("f",'fw21')
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return true},
        },
        'fw23':{
            fullDisplay()
            {
                return '时运III<br><br>矿物掉落x2<br>额外花费倍数x10<br><br>花费:'+format(n(100).mul(player.f.fumobeishu))+'法力' 
            },
            onPurchase()
            {
                player.f.fali=player.f.fali.sub(n(100).mul(player.f.fumobeishu))
                player.f.fumobeishu=player.f.fumobeishu.mul(10)
                player.f.wakuangbeishu=player.f.wakuangbeishu.mul(2)
            },
            canAfford()
            {
                return player.f.fali.gte(n(100).mul(player.f.fumobeishu)) && hasUpgrade("f",'fw22')
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return true},
        },
        'fw31':{
            fullDisplay()
            {
                return '智慧I<br><br><i>想,想,想...</i><br>嗯,我似乎想出什么了<br>智商:120=>150<br><br>花费:'+format(2000)+'法力' 
            },
            onPurchase()
            {
                player.f.fali=player.f.fali.sub(2000)
            },
            canAfford()
            {
                return player.f.fali.gte(2000)
            },
            style(){return {"height":"125px","width":"125px"}},
            unlocked(){return true},
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
                    "blank",
                    "blank",
                    "blank",
                    ["row",[["upgrade",11]]],
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
                ["display-text",
                    function() { return '总计法力:'+format(player.f.falitotal)},
                    { "color": "white", "font-size": "16px",}
                ],
                "blank",
                ["row",[["clickable",11],]],
                "blank",
                ["microtabs","法术",{"border-width":"0px"}],
            ],
        },
        符文:
        {
            unlocked(){return hasUpgrade("z",63)},
            content:
            [
                "blank",
                ["display-text",
                    function() { return '你当前有'+format(player.f.fali)+'法力'},
                    { "color": "magenta", "font-size": "28px",}
                ],
                ["display-text",
                    function() { return '当前消耗倍数为:x'+format(player.f.fumobeishu)+'<br>(注:智慧符文不受此效果影响)'},
                    { "color": "white", "font-size": "16px",}
                ],
                "blank",
                "blank",
                ["row",[["upgrade","fw11"],["upgrade","fw12"],["upgrade","fw13"],]],
                ["row",[["upgrade","fw21"],["upgrade","fw22"],["upgrade","fw23"],]],
                ["row",[["upgrade","fw31"],["upgrade","fw32"],["upgrade","fw33"],]],
            ],
        },
    },
    row: 2,
    layerShown()
    {   
        return hasUpgrade("c",'shengji1')
    },
})