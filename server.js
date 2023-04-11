require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())


let transporter = nodemailer.createTransport({
		service: "gmail",		
		auth: {
		  user: process.env.TRANSPORTER_EMAIL,
		  pass: process.env.TRANSPORTER_PASSWORD
		}
});

transporter.verify((error) => {
	if(error) {
		console.log(error)
	} else {
		console.log('Ready to Send')
	}
})

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.post('/send', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const message = req.body.message;
	const mail = {
		from: '"Fred Foo 👻" <foo@example.com>',
		to: `${email}`,
		subject: "Hello ✔",		
		html: `
				<b>Hi, ${name}, How are you)</b>				
				
				<p>Message: ${message}</p>
			`
	}
	
	transporter.sendMail(mail, (error) => {
		if(error) {
		res.json({status: 'ERROR'})
	} else {
		res.json({status: 'Message Sent'})
	}
	})  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})