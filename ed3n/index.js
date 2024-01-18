const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const morgan = require('morgan');



const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.static('style'));
app.use(express.static('images'));

app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aidanhughes88@gmail.com', 
        pass: 'miuh rswt pesj xbra' 
    }
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/menu', (req, res) => {
    res.render('menu');
});

app.get('/booking', (req, res) => {
    res.render('booking');
});


app.post('/submit', (req, res) => {
    const { name, email, date, time, comments } = req.body;

    // Do something with the form data (e.g., save to a database)

    const mailOptions = {
        from: 'aidanhughes88@gmail.com', 
        to: 'aidanhughes88@gmail.com', 
        subject: 'New Booking',
        text: `Name: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\nComments: ${comments}`,
        replyTo: email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error occurred while sending the email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Form submitted successfully! Check your email for confirmation.');
        }
    });
    res.redirect('/booking');
    console.log('Redirected to /booking');
});

app.get('/catering', (req, res) => {
    res.render('catering');
}); 

app.post('/submit1', (req, res) => {
    const { name, email, comments } = req.body;

    // remember to put form data into database

    const mailOptions = {
        from: 'aidanhughes88@gmail.com', 
        to: 'aidanhughes88@gmail.com', 
        subject: 'New Booking',
        text: `Name: ${name}\nEmail: ${email}\nComments: ${comments}`,
        replyTo: email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error occurred while sending the email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Form submitted successfully! Check your email for confirmation.');
        }
    });
    res.redirect('/booking');
    console.log('Redirected to /booking');
});

app.get('/venue', (req, res) => {
    res.render('venue');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use(morgan('dev'));