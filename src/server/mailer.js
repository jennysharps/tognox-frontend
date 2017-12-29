import nodeMailer from 'nodemailer'

const config = {
  host: 'mail.jennylynnsharps.com',
  port: 143,
  secure: false,
  auth: {
    user: 'jennylynn@jennylynnsharps.com',
    pass: 'Entrp911!!'
  }
}

const transporter = nodeMailer.createTransport(config)

const sendMail = message => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) => {
      if (error) {
        reject(error)
        return
      }
      resolve(info)
    });
  })
}

export default sendMail
