const { Markup, Composer, Scenes} = require('telegraf')

const q = ctx.wizard.state.data.ready
const b = ctx.wizard.state.data.num

const gameFirstStep = new Composer()
gameFirstStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data = {}
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
        q = ctx.message.text
        if(q === "Да" || q === "да"){
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
        b = ctx.message.text
        if(b === num.toString()){
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