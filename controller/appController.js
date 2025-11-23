const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, PASSWORD } = require("../env.js");

const getbill = (req, res) => {
  const { userEmail } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "UNP-GYM",
      link: "https://unp-gym.com",
    },
  });

  let response = {
    body: {
      name: userEmail,
      intro:
        "Selamat datang di UNP-GYM. Akun pendaftaran Anda sudah berhasil dibuat dan siap digunakan.",

      subtitle: "Detail layanan yang aktif:",

      table: {
        data: [
          {
            layanan: "Akses Gym 24 Jam",
            status: "Aktif",
          },
          {
            layanan: "Konsultasi Pelatih",
            status: "Tersedia",
          },
          {
            layanan: "Program Diet Personal",
            status: "Siap Digunakan",
          },
        ],
      },

      outro:
        "Jika Anda butuh bantuan kapan pun, cukup balas email ini. Sampai bertemu di pusat latihan.",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Selamat Datang di UNP-GYM",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "Email sudah dikirim",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = { getbill };
