var yearField = document.getElementById('year');
var profitField = document.getElementById('profit');
var otherEarningsField = document.getElementById('other-earnings');
var btn = document.getElementById('calcButton');
var profitError = document.getElementById('profitError');
var otherError = document.getElementById('otherError');
var selfEmploymentTax;


//show error messages if profit or other earnings inputs are not numbers
profitField.oninput = function() {
    if (profitField.validity.patternMismatch === true) {
        profitError.innerHTML = ' Digits only please';
    } else {
        profitError.innerHTML = '';
    }
}

otherEarningsField.oninput = function() {
    if (otherEarningsField.validity.patternMismatch === true) {
        otherError.innerHTML = ' Digits only please';
    } else {
        otherError.innerHTML = '';
    }
}

function calculateSETax() {
    //get user inputs
    var year = yearField.value;
    var profit = Number(profitField.value);
    var otherEarnings = Number(otherEarningsField.value);


    //determine maximum taxable earnings based on year
    var maxTaxableEarnings;
    if (year === '2017') {
        maxTaxableEarnings = 127200;
    } else if (year === '2018') {
        maxTaxableEarnings = 128700;
    }

    //calculate self-employment tax
    if (profit * .9235 < 400) {
        selfEmploymentTax = 0;
    } else if ((profit * .9235) + otherEarnings <= maxTaxableEarnings) {
        selfEmploymentTax = profit * .9235 * .153;
    } else if ((profit * .9235) + otherEarnings > maxTaxableEarnings && otherEarnings < maxTaxableEarnings) {
        selfEmploymentTax = (profit * .9235 * .029) + ((maxTaxableEarnings - otherEarnings) * .124);
    } else if (otherEarnings >= maxTaxableEarnings) {
        selfEmploymentTax = profit * .9235 * .029;
    }
    return selfEmploymentTax;
}

function outputSETax() {
    calculateSETax();
    var result = document.getElementById('result');

    //output a result only if there are no errors being displayed
    if (profitError.innerHTML === '' && otherError.innerHTML === '') {
        //format self-employment tax with commas and two decimal places
        selfEmploymentTax = selfEmploymentTax.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 2 });

        //display self-employment tax
        result.innerHTML = 'Your self-employment tax for ' + yearField.value + ' is $' + selfEmploymentTax + '.';
    } else {
        result.innerHTML = '';
    }
}

btn.onclick = outputSETax;
