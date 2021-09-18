const { Markup, Composer, Scenes } = require("telegraf");

const startStep = new Composer();
startStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data = {};
    await ctx.replyWithHTML(
      `Решили написать мне письмо? Что ж, я с радостью его приму! Для начала скажите мне, <b>как вас зовут?</b>`
    );
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});

const titleStep = new Composer();
titleStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.name = ctx.message.text;
    await ctx.replyWithHTML(
      "Отлично, а теперь введите <b>текст</b>, который желаете отправить! ✏️"
    );
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});

const lastStep = new Composer();
lastStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.text = ctx.message.text;
    const message = `<b>Имя</b>\n${ctx.wizard.state.data.name}\n\n<b>Сообщение</b>\n${ctx.wizard.state.data.text}`;
    ctx.telegram.sendMessage(
      (ctx.message.chat.id = process.env.chatid),
      `New message my lord! Look at it: \n\n ${message}`
    );
    await ctx.replyWithHTML(
      `${message} \n\n <i>Письмо успешно отправлено! 📬</i>`
    );
    return ctx.scene.leave();
  } catch (e) {
    console.log(e);
  }
});

const sendScene = new Scenes.WizardScene(
  "timWizard",
  startStep,
  titleStep,
  lastStep
);
module.exports = sendScene;
