const nodemailer = require("nodemailer");
const fs = require('fs')
const data = require("../../../data.json");
// const {sendEmail} = require('../../utils/ultils')




module.exports = {

    index(req, res) {

        return res.render('index', data);

    },

    async post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill all fields!')
            }
        }

        let { name, email, message } = req.body

        const id = Number(data.members.length + 1)

        data.members.push({
            id,
            name,
            email,
            message
        })



        await fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
            if (err) return res.send("Write file error!");

            let transporter = nodemailer.createTransport({
                host: "smtp.umbler.com",
                port: 587,
                secure: false,
                auth: {
                    user: "sabrina@efiz.com.br",
                    pass: "sabrina321"
                }

            })


            //nome da pessoa que enviou
            transporter.sendMail({
                from: " EFIZ <sabrina@efiz.com.br>",
                to: `${email}, sabrina@efiz.com.br`,
                subject: " EFIZ Contabilidade e Consultoria Financeira",
                text: "description",
                html: `<h4> Olá, ${name} </h4>
            </br>
            <p> Sabrina Oliveira </p> </br>
            <p>Contadora Consultora </p> </br>
            <p>CRC-BA 043591 </p> </br>
            <p>Contato: (71)99918-2592 / (75)98264-8139 </p> </br>
            <p> Linkedin:https://www.linkedin.com/in/sabrina-oliveira-2938a7ba/</p> </br>
        `

            }).then(message => {
                console.log(message)
            }).catch(err => {
                console.log(err)
            })

            return res.redirect('/')

        })


    }


}