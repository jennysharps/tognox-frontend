import express from 'express'
import path from 'path'
import proxy from 'http-proxy-middleware'
import bodyParser from 'body-parser'

import reactApp from './app'
import sendEmail from './mailer'

const host = process.env.HOST || '0.0.0.0'
const serverPort = process.env.PORT || 3333

const app = express()

if (process.env.NODE_ENV === 'production') {
  // In production we want to serve our JavaScripts from a file on the file
  // system.
  app.use('/static', express.static(path.join(process.cwd(), 'build/client/static')));
} else {
  // Otherwise we want to proxy the webpack development server.
  app.use(['/static','/sockjs-node'], proxy({
    target: `http://localhost:${process.env.REACT_APP_CLIENT_PORT}`,
    ws: true,
    logLevel: 'error'
  }));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
  console.log('req', req.body)
  const { email = '', name = '', message = '' } = req.body

  sendEmail({email, name, message}).then(() => {
    console.log(`Sent the message "${message}" from <${name}> ${email}.`);
    res.redirect('/#success');
  }).catch((error) => {
    console.log(`Failed to send the message "${message}" from <${name}> ${email} with the error ${error && error.message}`);
    res.redirect('/#error');
  }).finally(() => res.end())
})

app.use('/', express.static('build/client'))

app.use(reactApp)

app.listen(serverPort, host, () => {
  console.log('process.env', process.env, `PUBLIC_URL: ${process.env.PUBLIC_URL}`);
})
console.log(`Listening at http://${host}:${serverPort}`)
