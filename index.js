require('dotenv').config();
const { Telegraf, Scenes, Markup, session } = require('telegraf');
const sendScene = require("./scenes/send")
const gameScene = require("./scenes/game")
const bot = new Telegraf(process.env.BOT_TOKEN)

const command_about = "Мой ник 🔥TimProg🔥 и моей целью является стать <b>full stack разработчиком</b>.\nДанный бот создан исключительно для практики знаний, однако я планирую развивать идею бота и вероятно в будущем он станет отличным собеседником. \n <i>К концу года выпущу несколько обновлений, чтобы сделать бота ещё более живым.</i>"
const command_list = `Список доступных команд: \n\n 1. <i><b>🌝 TimProg 🌚</b></i>\n\n 2. <i><b>🏆 Мои работы 🏆</b></i> \n\n 3. <i><b>🎲 Игра "Угадай число" 🎲</b></i> \n\n 4. <i><b>✉️ Письмо разработчику ✉️</b></i>`

const stage = new Scenes.Stage([sendScene, gameScene])
bot.use(session())
bot.use(stage.middleware())
bot.hears('Письмо разработчику', ctx => ctx.scene.enter('timWizard'))
bot.hears('Мои работы', async (ctx) => {
    await ctx.reply(`У меня есть небольшой список, который будет пополняться с каждым новым проектом над которым я работал.`)
    await ctx.replyWithHTML(`Мои проекты: \n\n ⭐️ <i><b>Comics.hub</b></i> ⭐️\n\n ⭐️ <i><b>Telegraf</b></i> ⭐️
        `, Markup.inlineKeyboard([
            [Markup.button.callback('Comics.hub', 'comicshub')],[Markup.button.callback('Telegraf', 'telegraf')]
        ]), Markup.keyboard([
            ['Comics.hub', 'Telegraf']
        ])
    )
})
bot.hears('Игра', ctx => ctx.scene.enter('botWizard'))
bot.hears('Список', (ctx) => {
    ctx.replyWithHTML(command_list)
})
bot.hears('TimProg', (ctx) => {
    ctx.replyWithHTML(command_about)
})
bot.hears('Привет', (ctx) => {
    ctx.reply('Ну здраствуй')
})

bot.start(async (ctx) => {
    try {
        await ctx.replyWithHTML(`Приветствую, я начинающий веб-разработчик 🔥TimProg🔥 и я решил сделать <i><b>бота</b></i> для Telegram который расскажет немного обо мне. \n
Список доступных команд можно посмотреть нажав на "Список команд" или отправив фразу "Список".`, Markup.inlineKeyboard([
            [Markup.button.callback('📋 Список команд 📋', 'commandList')]
        ]), Markup.keyboard([
            ['TimProg', 'Письмо разработчику'],
            ['Мои работы', 'Игра'],
        ]).oneTime().resize())
    } catch (e) {
        console.log(e)
    }
})
bot.action('commandList', (ctx) => {
      ctx.replyWithHTML(command_list, Markup.keyboard([
        ['1', '2', '3', '4']
    ]).oneTime().resize());
});
bot.hears('1', (ctx) => {
    ctx.replyWithHTML(command_about)
})
bot.hears('2', async (ctx) => {
    await ctx.reply(`У меня есть небольшой список, который будет пополняться с каждым новым проектом над которым я работал.`)
    await ctx.replyWithHTML(`Мои проекты: \n\n ⭐️ <i><b>Comics.hub</b></i> ⭐️\n\n ⭐️ <i><b>Telegraf</b></i> ⭐️
        `, Markup.inlineKeyboard([
            [Markup.button.callback('Comics.hub', 'comicshub')],[Markup.button.callback('Telegraf', 'telegraf')]
        ]), Markup.keyboard([
            ['Comics.hub', 'Telegraf']
        ])
    )
})
const firstWork = `Проект не был закончен до конца, однако над ним я не мало попыхтел. Это мой первый проект, ссылка на который находится ниже. \n\n🤖 https://github.com/TimProger/Comics.hub 🤖`
const secondWork = `Данный проект был закончен и вы можете наблюдать его перед своими глазами. Репозиторий с данным проектом находится по ссылке ниже \n\n🤖 https://github.com/TimProger/Telegraf 🤖`
bot.hears('3', ctx => ctx.scene.enter('botWizard'))
bot.hears('4', ctx => ctx.scene.enter('timWizard'))
bot.hears('Comics.hub', (ctx) => {
    ctx.replyWithHTML(firstWork);
})
bot.hears('Telegraf', (ctx) => {
    ctx.replyWithHTML(secondWork)
})
bot.action('comicshub', (ctx) => {
    ctx.replyWithHTML(firstWork);
});
bot.action('telegraf', (ctx) => {
    ctx.replyWithHTML(secondWork)
})
let counter = 0
bot.on('sticker', (ctx) => {
    if(counter % 2 == 0){
        ctx.reply('🤩')
        counter++
    }else{
        ctx.reply('😎')
        if(counter>2){
            counter = 0
        }
    }
})

bot.launch()