$(document).ready(function() {

    /**
     * Main Calculator
     * 
     * When form is submitted, calculate basic income, and display it in <div id="result"><div>
     */
    $("#calculate").click(function () {

        // Grab values inserted by the user and assign then to a variable.
        var usCitizens = $("#usCitizens").val(),
            socialSecurity = $("#socialSecurity").val();
            unemploymentWelfare = $("#unemploymentWelfare").val();
            medicare = $("#medicare").val();
            medicaid = $("#medicaid").val();
            interestOnDebt = $("#interestOnDebt").val();
            defenseSpending = $("#defenseSpending").val();
            otherDiscretionary = $("#otherDiscretionary").val();

        // Put the variables into an array.
        var inputs = [ 
                usCitizens, 
                socialSecurity,
                unemploymentWelfare,
                medicare,
                medicaid,
                interestOnDebt,
                defenseSpending,
                otherDiscretionary
            ];
            
        var incomeTaxNewRevenue = cleanUp( $("#income-tax-new-revenue").val()),
            corporateTaxNewRevenue = cleanUp( $("#corporate-tax-new-revenue").val()),
            ssTaxNewRevenue = cleanUp( $("#ss-tax-new-revenue").val()),
            medicareTaxNewRevenue = cleanUp( $("#medicare-tax-new-revenue").val()),
            unimploymentTaxNewRevenue = cleanUp( $("#unimployment-tax-new-revenue").val()),
            otherRetirementTaxNewRevenue = cleanUp( $("#other-retirement-tax-new-revenue").val()),
            exciseTaxNewRevenue = cleanUp( $("#excise-tax-new-revenue").val()),
            estateTaxNewRevenue = cleanUp( $("#estate-tax-new-revenue").val()),
            customsTaxNewRevenue = cleanUp( $("#customs-tax-new-revenue").val()),
            depositTaxNewRevenue = cleanUp( $("#deposit-tax-new-revenue").val()),
            otherTaxNewRevenue = cleanUp( $("#other-tax-new-revenue").val()),
            revenueTotal = incomeTaxNewRevenue + 
                    corporateTaxNewRevenue + 
                    ssTaxNewRevenue + 
                    medicareTaxNewRevenue +
                    unimploymentTaxNewRevenue + 
                    otherRetirementTaxNewRevenue + 
                    exciseTaxNewRevenue + 
                    estateTaxNewRevenue +
                    customsTaxNewRevenue + 
                    depositTaxNewRevenue + 
                    otherTaxNewRevenue;
            $("#revenue-total").val("$" + commaSeparateNumber(revenueTotal) );
            
        

        // Loop through the inputs array to sanitize each variable.
        var cleanInputs = [];
        $(inputs).each(function() {
            currentInput = cleanUp(this);
            cleanInputs.push(currentInput);
        });
        
        // Pull each value out of the cleanInputs array and give it a variable.
        var usCitizensClean = cleanInputs[0],
            socialSecurityClean = cleanInputs[1],
            unemploymentWelfareClean = cleanInputs[2],
            medicareClean = cleanInputs[3],
            medicaidClean = cleanInputs[4],
            interestOnDebtClean = cleanInputs[5],
            defenseSpendingClean = cleanInputs[6],
            otherDiscretionarylean = cleanInputs[7];

        // If the "Replace with UBI" checkbox is not checked, don't calculate it in the final equation.
        // We do this by setting it to zero.
        if ($("#socialSecurityChecked").prop("checked") === false) { socialSecurityClean = 0; }
        if ($("#unemploymentWelfareChecked").prop("checked") === false) { unemploymentWelfareClean = 0; }
        if ($("#medicareChecked").prop("checked") === false) { medicareClean = 0; }
        if ($("#medicaidChecked").prop("checked") === false) { medicaidClean = 0; }
        if ($("#interestOnDebtChecked").prop("checked") === false) { interestOnDebtClean = 0; }
        if ($("#defenseSpendingChecked").prop("checked") === false) { defenseSpendingClean = 0; }
        if ($("#otherDiscretionaryChecked").prop("checked") === false) { otherDiscretionarylean = 0; }

        // Calculate the UBI payments.
        var ubiSum = (socialSecurityClean + unemploymentWelfareClean + medicareClean
                + medicaidClean + interestOnDebtClean + defenseSpendingClean 
                + otherDiscretionarylean) / usCitizensClean,
            rounded = Math.round( ubiSum ),
            roundedWithCommas = rounded.toLocaleString("en-US"),
            perMonth = Math.round (rounded / 12),
            perMonthWithCommas = perMonth.toLocaleString("en-US");
            
        // Output result of calculations.
        $("#result").html("$" + roundedWithCommas + " per citizen<br>$" + perMonthWithCommas + " per month per citizen");

    }); // End main calculator.

});