$(document).ready(function() {

    /**
     * Main Calculator
     * 
     * When form is submitted, calculate basic income, and display it in <div id="result"><div>
     */
    $("#calculate").click(function () {

        // Grab values from revenue section and sum them.
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
        
        // Grab values from expense section and sum them.
        var ssExpenseNew = cleanUp( $("#ss-expense-new").val()),
            medicareExpenseNew = cleanUp( $("#medicare-expense-new").val()),
            medicaidExpenseNew = cleanUp( $("#medicaid-expense-new").val()),
            tarpExpenseNew = cleanUp( $("#tarp-expense-new").val()),
            otherExpenseNew = cleanUp( $("#other-expense-new").val()),
            mandatoryTotal = ssExpenseNew + 
                    medicareExpenseNew + 
                    medicaidExpenseNew + 
                    tarpExpenseNew +
                    otherExpenseNew;
            $("#mandatory-total").val("$" + commaSeparateNumber(mandatoryTotal) );
            
        // Grab the expense values and sum them.
        var securityExpenseNew = cleanUp( $("#security-expense-new").val()),
            nonSecurityExpenseNew = cleanUp( $("#non-security-expense-new").val()),
            discretionaryTotal = securityExpenseNew + 
                    nonSecurityExpenseNew;
            $("#discretionary-total").val("$" + commaSeparateNumber(discretionaryTotal) );
            
        // Grab value from net interest section and sum the total budget.
        var netInterest = cleanUp( $("#net-interest-expense").val()),
            mandatoryTotal = cleanUp( $("#mandatory-total").val()),
            discretionaryTotal= cleanUp( $("#discretionary-total").val()),
            totalUBI  = netInterest +
                    mandatoryTotal + 
                    discretionaryTotal;
            $("#ubi-total").val("$" + commaSeparateNumber(totalUBI) );
        
        // Grab population section.
        var population = cleanUp( $("#us-citizens").val() );
        
        // Finally, perform the actual calculations to determine the UBI.
        var ubiRaw = totalUBI / population,
            ubiPerYear = Math.round(ubiRaw),
            ubiPerMonth = commaSeparateNumber(Math.round( ubiRaw / 12 ));
        
        // Output the calculated result.
        $("#result").html("$" + ubiPerYear + " per adult per year<br>$" + ubiPerMonth + " per adult per month");

    }); // End main calculator.

});