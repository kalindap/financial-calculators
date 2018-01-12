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

    //format SEP IRA contribution limit with commas and two decimal places
    contributionLimit = contributionLimit.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 2 });

    //display SEP IRA contribution limit
    var result = document.getElementById('result');
    result.textContent = 'Your SEP IRA contribution limit for ' + yearField.value + ' is $' + contributionLimit + '.';
}

btn.onclick = calculateSEPIRA;
