const sendGrid = require("@sendgrid/mail");

const mail = sendGrid.setApiKey(
  "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"
);

const welcomeemail = (email, name) => {
  mail.send({
    to: email,
    from: "vibhumishra61@gmail.com",
    subject: "Thanks for joining app!",
    text: `welcome to the app!! ${name}, Let me know how you go along the app.`,
  });
};

const goodbuy = (email, name) => {
  console.log("deleted>>", email, name);
  mail.send({
    to: email,
    from: "vibhumishra61@gmail.com",
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};

module.exports = { welcomeemail, goodbuy };
