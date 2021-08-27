const { Markup, Composer, Scenes } = require("telegraf");

const gameFirstStep = new Composer();
gameFirstStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data = {};
    await ctx.replyWithHTML(
      "Тебе нужно угадать число от 1 до 100 которое я загадал, попробуем? Если готов, пиши 'Да', иначе пиши 'Нет'",
      Markup.keyboard([["Да", "Нет"]])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});
const getNum = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
let num = getNum(100, 1);
let counter = 0;
const gameSecondStep = new Composer();
gameSecondStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.ready = ctx.message.text;
    if (
      ctx.wizard.state.data.ready.toLowerCase() === "да" ||
      ctx.wizard.state.data.ready.toLowerCase() === "lf"
    ) {
      num = getNum(100, 1);
      await ctx.replyWithHTML(
        "Отлично, в таком случае скажи мне, какое <b>число</b> я загадал?",
        Markup.keyboard([["Сдаюсь!"]])
          .oneTime()
          .resize()
      );
      await ctx.replyWithHTML("Введите число от 1 до 100.");
      return ctx.wizard.next();
    } else {
      await ctx.replyWithHTML(
        "Нет так нет, уговаривать не буду.",
        Markup.removeKeyboard(true)
      );
      return ctx.scene.leave();
    }
  } catch (e) {
    console.log(e);
  }
});
const gameThirdStep = new Composer();
gameThirdStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.num = ctx.message.text;
    if (+ctx.wizard.state.data.num === num) {
      await ctx.replyWithHTML(
        `🔥 Это <b>правильный</b> ответ, поздравляю! 🔥 \nВаших попыток угадать ровно ${counter}`,
        Markup.removeKeyboard(true)
      );
      return ctx.scene.leave();
    } else if (+ctx.wizard.state.data.num > num) {
      await ctx.replyWithHTML(
        "Не верно, загаданное число <b>МЕНЬШЕ</b> написанного. Попробуйте ещё раз!",
        counter++
      );
    } else if (+ctx.wizard.state.data.num < num) {
      await ctx.replyWithHTML(
        "Не верно, загаданное число <b>БОЛЬШЕ</b> написанного. Попробуйте ещё раз!",
        counter++
      );
    } else if (ctx.wizard.state.data.num === "Сдаюсь!") {
      await ctx.replyWithHTML(
        `🔥 Правильный ответ был ${num}, но вы можете попробовать снова, написав цифру 3! 🔥`,
        Markup.removeKeyboard(true)
      );
      return ctx.scene.leave();
    }
  } catch (e) {
    console.log(e);
  }
});

const gameScene = new Scenes.WizardScene(
  "botWizard",
  gameFirstStep,
  gameSecondStep,
  gameThirdStep
);
module.exports = gameScene;
