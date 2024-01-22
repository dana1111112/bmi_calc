const express = require('express');
const bodyParser = require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));




app.get('/', function (req, res) {
    res.sendFile(__dirname + '/bim.html');
});

app.post('/calculate-bmi', function (req, res) {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;

    const age = Number(req.body.age);
    const height = Number(req.body.height);
    const weight = Number(req.body.weight);
    const gender = req.body.gender;

    const bmi = calculateBMI(age, height, weight, gender);

    res.send(`BMI: ${bmi}`);
});

function calculateBMI(age, height, weight, gender) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let result = '';
    if (bmi < 18.5) {
        result = 'Underweight';
    } else if (18.5 <= bmi && bmi <= 24.9) {
        result = 'Healthy';
    } else if (25 <= bmi && bmi <= 29.9) {
        result = 'Overweight';
    } else if (30 <= bmi && bmi <= 34.9) {
        result = 'Obese';
    } else if (35 <= bmi) {
        result = 'Extremely obese';
    }

    return `${result} (BMI: ${bmi.toFixed(2)})`;
}

app.listen(3000, function () {
    console.log('server started on port 3000');
});
