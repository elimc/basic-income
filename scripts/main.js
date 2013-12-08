$(document).ready(function() {
                
    $(function () {
        $('.checkAll').on('click', function () {
            $(this).closest('fieldset').find(':checkbox').prop('checked', this.checked);
        });
    });

    $("#calculate").click(function () {

        var usCitizens = $("#usCitizens").val(),
            socialSecurity = $("#socialSecurity").val();
            unemploymentWelfare = $("#unemploymentWelfare").val();
            medicare = $("#medicare").val();
            medicaid = $("#medicaid").val();
            interestOnDebt = $("#interestOnDebt").val();
            defenseSpending = $("#defenseSpending").val();
            otherDiscretionary = $("#otherDiscretionary").val();

        var inputs = [ 
                usCitizens, 
                socialSecurity,
                unemploymentWelfare,
                medicare,
                medicaid,
                interestOnDebt,
                defenseSpending,
                otherDiscretionary
            ],
            cleanInputs = [];

        /**
         * Clean up the data for manipulation.
         */
        function cleanUp( rawInput ) {
            var withOutCommas = rawInput.replace(/,/g, "");
            var removeWhiteSpace = withOutCommas.replace(/\s/g, "");
            var floated = parseFloat(removeWhiteSpace);
            return floated;
        }

        $(inputs).each(function() {
            currentInput = cleanUp(this);
            cleanInputs.push(currentInput);
        });

        var usCitizensClean = cleanInputs[0],
            socialSecurityClean = cleanInputs[1],
            unemploymentWelfareClean = cleanInputs[2],
            medicareClean = cleanInputs[3],
            medicaidClean = cleanInputs[4],
            interestOnDebtClean = cleanInputs[5],
            defenseSpendingClean = cleanInputs[6],
            otherDiscretionarylean = cleanInputs[7];

        if ($("#socialSecurityChecked").prop("checked") === false) { socialSecurityClean = 0; }
        if ($("#unemploymentWelfareChecked").prop("checked") === false) { unemploymentWelfareClean = 0; }
        if ($("#medicareChecked").prop("checked") === false) { medicareClean = 0; }
        if ($("#medicaidChecked").prop("checked") === false) { medicaidClean = 0; }
        if ($("#interestOnDebtChecked").prop("checked") === false) { interestOnDebtClean = 0; }
        if ($("#defenseSpendingChecked").prop("checked") === false) { defenseSpendingClean = 0; }
        if ($("#otherDiscretionaryChecked").prop("checked") === false) { otherDiscretionarylean = 0; }

        var sum = (socialSecurityClean + unemploymentWelfareClean + medicareClean
                + medicaidClean + interestOnDebtClean + defenseSpendingClean 
                + otherDiscretionarylean) / usCitizensClean,
            rounded = Math.round( sum ),
            roundedWithCommas = rounded.toLocaleString("en-US");
            perMonth = Math.round (rounded / 12);
            perMonthWithCommas = perMonth.toLocaleString("en-US");

            console.log(sum);
            console.log(rounded.toLocaleString("en-US"));

        $("#result").html("$" + roundedWithCommas + " per citizen<br>$" + perMonthWithCommas + " per month");

    });

});