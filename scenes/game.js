const { Markup, Composer, Scenes} = require('telegraf')

const gameFirstStep = new Composer()
gameFirstStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data = {}
        ctx.wizard.state.data.userName = ctx.message.from.username
        ctx.wizard.state.data.first_name = ctx.message.from.first_name
        ctx.wizard.state.data.last_name = ctx.message.from.last_name
        await ctx.replyWithHTML("Тебе нужно угадать число от 1 до 5 которое я загадал, попробуем? Если готов, пиши 'Да', иначе пиши 'Нет'", Markup.keyboard([
            ['Да', 'Нет']
        ]).oneTime().resize())
        return ctx.wizard.next()        
    } catch (e) {
        console.log(e)
    }
})
const getNum = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min
let num = getNum(5, 1)
const gameSecondStep = new Composer()
gameSecondStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data.ready = ctx.message.text
        if(ctx.wizard.state.data.ready === "Да" || ctx.wizard.state.data.ready === "да"){
            num = getNum(5, 1)
            await ctx.replyWithHTML("Отлично, в таком случае скажи мне, какое <b>число</b> я загадал?", Markup.keyboard([
                ['1', '2', '3', '4', '5']
            ]).oneTime().resize())
            return ctx.wizard.next()
        }else{
            await ctx.replyWithHTML("Нет так нет, уговаривать не буду.")
            return ctx.scene.leave()
        }
    } catch (e) {
        console.log(e)
    }
})
const gameThirdStep = new Composer()
gameThirdStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data.num = ctx.message.text
        if(ctx.wizard.state.data.num === num.toString()){
            await ctx.replyWithHTML("🔥 Это <b>правильный</b> ответ, поздравляю! 🔥", Markup.keyboard([
            ]).oneTime().resize())
            return ctx.scene.leave()
        }else{
            await ctx.replyWithHTML(`💥 Ответ неверный, правильный ответ ${num} 💥`, Markup.keyboard([
            ]).oneTime().resize())
            return ctx.scene.leave()
        }
    } catch (e) {
        console.log(e)
    }
})

const gameScene = new Scenes.WizardScene('botWizard', gameFirstStep, gameSecondStep, gameThirdStep)
module.exports = gameScene