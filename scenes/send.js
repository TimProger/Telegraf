const { Markup, Composer, Scenes } = require("telegraf");

const startStep = new Composer();
startStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data = {};
    await ctx.replyWithHTML(
      `Решили написать мне письмо? Что ж, я с радостью его приму!`
    );
    await ctx.replyWithHTML(
      "Введите <b>текст</b>, который желаете отправить! ✏️"
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
    const message = `Ваше сообщение:\n${ctx.wizard.state.data.text}`;
    ctx.replyWithHTML(`${message} \n\n <i>Письмо успешно отправлено! 📬</i>`);
    const username = `${ctx.message.from.first_name} ${ctx.message.from.last_name}`;
    ctx.telegram.sendMessage(
      (ctx.message.chat.id = process.env.chatid),
      `New message from ${username}! My lord, look what we've got: \n\n ${message}`
    );
    return ctx.scene.leave();
  } catch (e) {
    console.log(e);
  }
});

const sendScene = new Scenes.WizardScene("timWizard", startStep, lastStep);
module.exports = sendScene;
