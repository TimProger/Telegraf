const { Markup, Composer, Scenes} = require('telegraf')

const startStep = new Composer()
startStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data = {}
        ctx.wizard.state.data.userName = ctx.message.from.username
        ctx.wizard.state.data.first_name = ctx.message.from.first_name
        ctx.wizard.state.data.last_name = ctx.message.from.last_name
        await ctx.replyWithHTML(`Решили написать мне письмо? Что ж, я с радостью его приму! Для начала скажите мне, <b>как вас зовут?</b>`)
        return ctx.wizard.next()        
    } catch (e) {
        console.log(e)
        ctx.replyWithHTML(error)
    }
})

const titleStep = new Composer()
titleStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data.name = ctx.message.text
        await ctx.replyWithHTML("Отлично, а теперь введите <b>текст</b>, который желаете отправить! ✏️")
        return ctx.wizard.next()        
    } catch (e) {
        console.log(e)
        ctx.replyWithHTML(error)
    }
})

const lastStep = new Composer()
lastStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data.text = ctx.message.text
        const message = `<b>Имя</b>\n${ctx.wizard.state.data.name}\n\n<b>Сообщение</b>\n${ctx.wizard.state.data.text}`
        await ctx.replyWithHTML(`${message} \n\n <i>Письмо успешно отправлено! 📬</i>`)
        return ctx.scene.leave()        
    } catch (e) {
        console.log(e)
        ctx.replyWithHTML(error)
        
    }
})

const sendScene = new Scenes.WizardScene('timWizard', startStep, titleStep, lastStep)
module.exports = sendScene