var yearField = document.getElementById('year');
var ageField = document.getElementById('age');
var profitField = document.getElementById('profit');
var otherContributionsField = document.getElementById('other-contributions');
var otherCatchupField = document.getElementById('other-catchup');
var btn = document.getElementById('calcButton');
var profitError = document.getElementById('profitError');
var otherError = document.getElementById('otherError');

function calculateSIMPLEIRA() {
    //get user inputs
    var year = yearField.value;
    var age = ageField.value;
    var profit = Number(profitField.value);
    var otherContributions = Number(otherContributionsField.value);
    var otherCatchup = Number(otherCatchupField.value);

    //determine maximum contribution limit based on year and age
    var maxContributionLimit;
    var maxCatchup;
    if (year === '2017' && age === 'younger') {
        maxContributionLimit = 12500;
        maxCatchup = 0;
    } else if (year === '2017' && age === 'older') {
        maxContributionLimit = 12500;
        maxCatchup = 3000;
    } else if (year === '2018' && age === 'younger') {
        maxContributionLimit = 12500;
        maxCatchup = 0;
    } else if (year === '2018' && age === 'older') {
        maxContributionLimit = 12500;
        maxCatchup = 3000;
    }

    //set other contributions and other catchup to 0 if nothing is entered
    if (otherContributions === undefined) {
        otherContributions = 0;
    }

    if (otherCatchup === undefined) {
        otherCatchup = 0;
    }

    //adjust maximum contributions and maximum catchup contributions based on other contributions and other catchup contributions
    maxContributionLimit = maxContributionLimit - otherContributions;
    if (maxContributionLimit <= 0) {
        maxContributionLimit = 0;
    }

    maxCatchup = maxCatchup - otherCatchup;
    if (maxCatchup <= 0) {
        maxCatchup = 0;
    }

    //calculate net earnings from self-employment
    var netEarnings = profit * .9235;

    //calculate employer contribution limit
    var employerLimit = netEarnings * .03;

    //calculate employee contribution limit
    if (netEarnings <= maxContributionLimit) {
        maxCatchup = 0;
        maxContributionLimit = netEarnings;
    } else if (netEarnings < maxContributionLimit + maxCatchup) {
        maxCatchup = netEarnings - maxContributionLimit;
    }
    var employeeLimit = maxContributionLimit + maxCatchup;

    //calculate total contribution limit
    var totalLimit = employerLimit + maxContributionLimit + maxCatchup;

    //format output with commas and two decimal places
    employerLimit = employerLimit.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 2 });
    employeeLimit = employeeLimit.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 2 });
    totalLimit = totalLimit.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 2 });

    //display contribution limits
    var result = document.getElementById('result');
    result.innerHTML = 'Your total SIMPLE IRA contribution limit for ' + year + ' is $' + totalLimit +
    ' (made up of an employee contribution of $' + employeeLimit + ' and an employer contribution of $' + employerLimit + ').';

}

btn.onclick = calculateSIMPLEIRA;
