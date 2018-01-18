var btn = document.getElementById('calcButton');

function calculateSEPIRA() {
    calculateSETax();

    //calculate contribution limit
    var contributionLimit = (profitField.value - selfEmploymentTax / 2) * .2;

    //determine maximum contribution based on year
    var maxContributionLimit;
    if (yearField.value === '2017') {
        maxContributionLimit = 54000;
    } else if (yearField.value === '2018') {
        maxContributionLimit = 55000;
    }

    //don't let contribution limit exceed maximum contribution limit
    if (contributionLimit > maxContributionLimit) {
        contributionLimit = maxContributionLimit;
    }

    var result = document.getElementById('result');
    //output a result only if there are no errors being displayed
    if (profitError.innerHTML === '' && otherError.innerHTML === '') {
        //format SEP IRA contribution limit with commas and two decimal places
        contributionLimit = contributionLimit.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 2 });

        //display SEP IRA contribution limit
        result.innerHTML = 'Your SEP IRA contribution limit for ' + yearField.value + ' is $' + contributionLimit + '.';
    } else {
        result.innerHTML = '';
    }
}

btn.onclick = calculateSEPIRA;
