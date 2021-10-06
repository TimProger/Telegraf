// Привязываю бота к коду и импортирую код из файлов папки ./scenes/
require("dotenv").config();
const { Telegraf, Scenes, Markup, session } = require("telegraf");
const error = "Ошибка, такой команды не существует";
const sendScene = require("./scenes/send");
const gameScene = require("./scenes/game");
const bot = new Telegraf(process.env.BOT_TOKEN);

// Создаю переменные, отвечающие за текст отправляемый ботом
const command_about =
  "Мой ник 🔥TimProg🔥 и моей целью является стать <b>full stack разработчиком</b>.\nДанный бот создан исключительно для практики знаний, однако я планирую развивать идею бота и вероятно в будущем он станет отличным собеседником. \n <i>К концу года выпущу несколько обновлений, чтобы сделать бота ещё более живым.</i>";
const command_list = `Список доступных команд: \n\n 1. <i><b>🌝 TimProg 🌚</b></i>\n\n 2. <i><b>🏆 Мои работы 🏆</b></i> \n\n 3. <i><b>🎲 Игра "Угадай число" 🎲</b></i> \n\n 4. <i><b>✉️ Письмо разработчику ✉️</b></i>`;

// Пишу ответы на команды и добавляю клавиатуру
const stage = new Scenes.Stage([sendScene, gameScene]);
bot.use(session());
bot.use(stage.middleware());

// Незаконченная идея с отправкой сообщения ботом в другую беседу
bot.hears("Письмо разработчику", (ctx) => ctx.scene.enter("timWizard"));

// Команда отвечающая за показ моих работ ботом
bot.hears("Мои работы", async (ctx) => {
  await ctx.reply(
    `У меня есть небольшой список, который будет пополняться с каждым новым проектом над которым я работал.`
  );
  await ctx.replyWithHTML(
    `Мои проекты: \n\n ⭐️ <i><b>Comics.hub</b></i> ⭐️\n\n ⭐️ <i><b>Telegraf</b></i> ⭐️ \n\n ⭐️ <i><b>NoteWrite</b></i> ⭐️ \n\n ⭐️ <i><b>TailwindVK</b></i> ⭐️

        `,
    Markup.inlineKeyboard([
      [Markup.button.callback("Comics.hub", "comicshub")],
      [Markup.button.callback("Telegraf", "telegraf")],
      [Markup.button.callback("NoteWrite", "notewrite")],
      [Markup.button.callback("TailwindVK", "tailwindvk")],
    ]),
    Markup.keyboard([["Comics.hub", "Telegraf", "NoteWrite", "TailwindVK"]])
  );
});

// Команда начинающая игру "Угадай число"
bot.hears("Игра", (ctx) => ctx.scene.enter("botWizard"));

// Команда выдающая список команд
bot.hears("Список", (ctx) => {
  ctx.replyWithHTML(command_list);
});

// Команда отправляющая текст из переменной написанной выше
bot.hears("TimProg", (ctx) => {
  ctx.replyWithHTML(command_about);
});

// Ку
bot.hears("Привет", (ctx) => {
  ctx.reply("Ну здраствуй");
});

// Вступительная речь, появляющаяся при команде /start или при запуске бота. Добавляет клавиатуру и кнопку выводящую список команд
bot.start(async (ctx) => {
  try {
    await ctx.replyWithHTML(
      `Приветствую, я начинающий веб-разработчик 🔥TimProg🔥 и я решил сделать <i><b>бота</b></i> для Telegram который расскажет немного обо мне. \n
Список доступных команд можно посмотреть нажав на "Список команд" или отправив фразу "Список".`,
      Markup.inlineKeyboard([
        [Markup.button.callback("📋 Список команд 📋", "commandList")],
      ]),
      Markup.keyboard([
        ["TimProg", "Письмо разработчику"],
        ["Мои работы", "Игра"],
      ])
        .oneTime()
        .resize()
    );
  } catch (e) {
    console.log(e);
    ctx.replyWithHTML(error);
  }
});

// Создание клавиатуры для списка
bot.action("commandList", (ctx) => {
  ctx.replyWithHTML(
    command_list,
    Markup.keyboard([["1", "2", "3", "4"]])
      .oneTime()
      .resize()
  );
});

// Ответ на цифру 1
bot.hears("1", (ctx) => {
  ctx.replyWithHTML(command_about);
});

// Ответ на цифру 2
bot.hears("2", async (ctx) => {
  await ctx.reply(
    `У меня есть небольшой список, который будет пополняться с каждым новым проектом над которым я работал.`
  );
  await ctx.replyWithHTML(
    `Мои проекты: \n\n ⭐️ <i><b>Comics.hub</b></i> ⭐️\n\n ⭐️ <i><b>Telegraf</b></i> ⭐️ \n\n ⭐️ <i><b>NoteWrite</b></i> ⭐️ \n\n ⭐️ <i><b>TailwindVK</b></i> ⭐️

        `,
    Markup.inlineKeyboard([
      [Markup.button.callback("Comics.hub", "comicshub")],
      [Markup.button.callback("Telegraf", "telegraf")],
      [Markup.button.callback("NoteWrite", "notewrite")],
      [Markup.button.callback("TailwindVK", "tailwindvk")],
    ]),
    Markup.keyboard([["Comics.hub", "Telegraf", "NoteWrite", "TailwindVK"]])
  );
});

// Объявление переменных отвечающих за текст в "Моих работах"
const firstWork = `Проект не был закончен до конца, однако над ним я не мало попыхтел. Это мой первый проект, ссылка на который находится ниже. \n\n🤖 https://github.com/TimProger/Comics.hub 🤖`;
const secondWork = `Данный проект был закончен и вы можете наблюдать его перед своими глазами. Репозиторий с данным проектом находится по ссылке ниже \n\n🤖 https://github.com/TimProger/Telegraf 🤖`;
const thirdWork = `Почти законченный проект для записи заметок, сохраняющихся в локальном хранилище браузера. \n\nПерейти на сайт можно по этой ссылке: https://notewrite.herokuapp.com/ \n\nА посмотреть репозиторий с кодом можно тут: \n🤖 https://github.com/TimProger/notewrite 🤖`;
const forthWork = `На днях посмотрел курс по фреймворку Tailwind CSS и решил наконец-то понять, как же работает ВКонтакте. Спустя несколько дней я наконец закончил делать свою страницу. \n\nПерейти на сайт можно по этой ссылке: https://timproger.github.io/Tailwind_VK/# \n\nА посмотреть репозиторий с кодом можно тут: \n🤖 https://github.com/TimProger/Tailwind_VK 🤖`;

// Ответ на цифру 3
bot.hears("3", (ctx) => ctx.scene.enter("botWizard"));

// Ответ на цифру 4
bot.hears("4", (ctx) => ctx.scene.enter("timWizard"));

// Команды отвечающие за ответ в "Моих работах"

bot.on('poll', (ctx) => console.log('Poll update', ctx.poll))

bot.command('poll', (ctx) =>
  ctx.replyWithPoll(
    'Your favorite math constant',
    ['x', 'e', 'π', 'φ', 'γ'],
    { is_anonymous: false }
  )
)

bot.hears("Comics.hub", (ctx) => {
  ctx.replyWithHTML(firstWork, {
    disable_web_page_preview: true,
  });
});
bot.action("comicshub", (ctx) => {
  ctx.replyWithHTML(firstWork, {
    disable_web_page_preview: true,
  });
});

bot.hears("Telegraf", (ctx) => {
  ctx.replyWithHTML(secondWork, {
    disable_web_page_preview: true,
  });
});
bot.action("telegraf", (ctx) => {
  ctx.replyWithHTML(secondWork, {
    disable_web_page_preview: true,
  });
});

bot.action("NoteWrite", (ctx) => {
  ctx.replyWithHTML(thirdWork, {
    disable_web_page_preview: true,
  });
});
bot.action("notewrite", (ctx) => {
  ctx.replyWithHTML(thirdWork, {
    disable_web_page_preview: true,
  });
});
bot.action("TailwindVK", (ctx) => {
  ctx.replyWithHTML(forthWork, {
    disable_web_page_preview: true,
  });
});
bot.action("tailwindvk", (ctx) => {
  ctx.replyWithHTML(forthWork, {
    disable_web_page_preview: true,
  });
});

// Чередующиеся стикеры в ответ на стикер
let counter = 0;
bot.on("sticker", (ctx) => {
  if (counter < 1) {
    ctx.reply("🤩");
    counter++;
  } else {
    ctx.reply("😎");
    counter--;
    if (counter > 1) {
      counter = 0;
    }
  }
});

// Запуск бота
bot.launch();
