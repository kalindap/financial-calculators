var btn = document.getElementById('calcButton');

btn.onclick = function() {
    var year = document.getElementById('year').value;
    var profit = document.getElementById('profit').value;
    var otherEarnings = document.getElementById('other-earnings').value;

    var maxTaxableEarnings;
    if (year === '2017') {
        maxTaxableEarnings = 127200;
    } else if (year === '2018') {
        maxTaxableEarnings = 128700;
    }

    var selfEmploymentTax;
    if (profit * .9235 < 400) {
        selfEmploymentTax = 0;
    } else if (profit * .9235 + otherEarnings <= maxTaxableEarnings) {
        selfEmploymentTax = profit * .9235 * .153;
    } else if ((profit * .9235 + otherEarnings > maxTaxableEarnings) && (otherEarnings < maxTaxableEarnings)) {
        selfEmploymentTax = (profit * .9235 * .029) + ((maxTaxableEarnings - otherEarnings) * .124);
    } else if (otherEarnings >= maxTaxableEarnings) {
        selfEmploymentTax = profit * .9235 * .029;
    }

    selfEmploymentTax = selfEmploymentTax.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 2 });

    var result = document.getElementById('result');
    result.textContent = 'Your self-employment tax for ' + year + ' is $' + selfEmploymentTax + '.';
}
