$(document).ready(function() {
    
    /**
     * Load a JSON files and insert its values into the calculator.
     * 
     * @param {string} table - JSON page to load.
     * @returns {undefined}
     */
    function loadData ( table ) {

        // Load specific JSON page depending on which link is clicked.
        $.getJSON( "db/" + table + ".json", function ( db ) {

            // Assign JSON values to variables.
            var year = db.year,
                incomeBaseIndividual = db.revenue.incomeBase.individual,
                incomeBaseCorporate = db.revenue.incomeBase.corporate,
                receiptsIndividual = db.revenue.receipts.individual,
                receiptsCorporate = db.revenue.receipts.corporate,
                receiptsSSPayroll = db.revenue.receipts.ssPayroll,
                receiptsMedicarePayroll = db.revenue.receipts.medicarePayroll,
                receiptsunimploymentInsurance = db.revenue.receipts.unimploymentInsurance,
                receiptsOtherRetirement = db.revenue.receipts.otherRetirement,
                receiptsExcise = db.revenue.receipts.excise,
                receiptsEstate = db.revenue.receipts.estate,
                receiptscustomsDuties = db.revenue.receipts.customsDuties,
                receiptsFederalReserve = db.revenue.receipts.federalReserve,
                receiptsOtherMiscellaneous = db.revenue.receipts.otherMiscellaneous,
                receiptsTotal = db.revenue.receipts.total,
                mandatorySS = db.expenses.mandatory.ss,
                mandatoryMedicare = db.expenses.mandatory.medicare,
                mandatoryMedicaid = db.expenses.mandatory.medicaid,
                mandatoryTarp = db.expenses.mandatory.tarp,
                mandatoryunemploymentWelfare = db.expenses.mandatory.unemploymentWelfare,
                mandatoryTotal = db.expenses.mandatory.total,
                discretionarySecurity = db.expenses.discretionary.security,
                discretionaryNonSecurity = db.expenses.discretionary.nonSecurity,
                discretionaryTotal = db.expenses.discretionary.total,
                netInterest = db.expenses.netInterest,
                totalExpense = db.expenses.total;
                resultsTotalRevenue = db.results.totalRevenue;
                resultsNonUBIExpense = db.results.nonUBIExpense;
                resultsDeficitSurplus = db.results.deficitSurplus;
                resultsTotalDebt = db.results.totalDebt;
                population = db.population;

            $(".year").html( year );

            $("#income-tax").val( incomeBaseIndividual );
            $("#corporate-tax").val( incomeBaseCorporate );

            $("#income-tax-receipts").html( receiptsIndividual );
            $("#corporate-tax-receipts").html( receiptsCorporate );
            $("#ss-tax-receipts").html( receiptsSSPayroll );
            $("#medicare-tax-receipts").html( receiptsMedicarePayroll );
            $("#unimployment-tax-receipts").html( receiptsunimploymentInsurance );
            $("#other-retirement-tax-receipts").html( receiptsOtherRetirement );
            $("#excise-tax-receipts").html( receiptsExcise );
            $("#estate-tax-receipts").html( receiptsEstate );
            $("#customs-tax-receipts").html( receiptscustomsDuties );
            $("#federal-tax-receipts").html( receiptsFederalReserve );
            $("#other-tax-receipts").html( receiptsOtherMiscellaneous );
            $("#total-tax-receipts").html( receiptsTotal );

            $("#ss-expense").val( mandatorySS );
            $("#medicare-expense").val( mandatoryMedicare );
            $("#medicaid-expense").val( mandatoryMedicaid );
            $("#tarp-expense").val( mandatoryTarp );
            $("#other-expense").val( mandatoryunemploymentWelfare );
            $("#mandatory-expense").val( mandatoryTotal );
            $("#security-expense").val( discretionarySecurity );
            $("#non-security-expense").val( discretionaryNonSecurity );
            $("#discretionary-expense").val( discretionaryTotal );
            $("#net-interest").val( netInterest );
            $("#total-expense").val( totalExpense );

            $("#total-revenue-current").val( resultsTotalRevenue );
            $("#non-UBI-current").val( resultsNonUBIExpense );
            $("#net-interest-current").val( netInterest );
            $("#deficit-surplus-current").val( resultsDeficitSurplus );
            $("#total-debt-current").val( resultsTotalDebt );
            $("#us-citizens").val( population );
        });                    
    }

    // Load the US 2010 budget.
    $("#2010").click(function(e) {
        e.preventDefault();
        resestValues();
        loadData( table = "us_2010" );
    });

    // Load the US 2011 budget.
    $("#2011").click(function(e) {
        e.preventDefault();
        resestValues();
        loadData( table = "us_2011" );
    });

    // Load the US 2012 budget.
    $("#2012").click(function(e) {
        e.preventDefault();
        resestValues();
        loadData( table = "us_2012" );
    });

    /**
     * Main Calculator
     * 
     * When form is submitted, calculate basic income, and display it in <div id="result"><div>
     */
    $("#calculate").click(function () {

        // Grab values from revenue section and sum them.
        var revenueValues = [
            $("#income-tax-new-revenue").val(),
            $("#corporate-tax-new-revenue").val(),
            $("#ss-tax-new-revenue").val(),
            $("#medicare-tax-new-revenue").val(),
            $("#unimployment-tax-new-revenue").val(),
            $("#other-retirement-tax-new-revenue").val(),
            $("#excise-tax-new-revenue").val(),
            $("#estate-tax-new-revenue").val(),
            $("#customs-tax-new-revenue").val(),
            $("#deposit-tax-new-revenue").val(),
            $("#other-tax-new-revenue").val()
        ];

        var revenueSum = 0;
        $.each( revenueValues, function( i, val ) {
            revenueSum += cleanUp( val );
        } );
        $("#revenue-total").val("$" + commaSeparateNumber( revenueSum ) );

        // Grab values from expense section and sum them.
        var mandatoryExpenseValues = [
            $("#ss-expense-new").val(),
            $("#medicare-expense-new").val(),
            $("#medicaid-expense-new").val(),
            $("#tarp-expense-new").val(),
            $("#other-expense-new").val()
        ];

        var mandatorySum = 0;
        $.each(mandatoryExpenseValues, function( i, val ) {
            mandatorySum += cleanUp( val );
        });
        $("#mandatory-total").val(fixNegative("$" + commaSeparateNumber( mandatorySum ) ));
        
        // Grab the expense values and sum them.
        var discretionaryExpenseValues = [
            $("#security-expense-new").val(),
            $("#non-security-expense-new").val()
        ];
        
        var discretionarySum = 0;
        $.each( discretionaryExpenseValues, function( i, val ) {
            discretionarySum += cleanUp( val );
        });
        $("#discretionary-total").val("$" + commaSeparateNumber( discretionarySum ) );
        
        // Grab values for final calculations.
        var population = cleanUp( $("#us-citizens").val() ),
            nonUBIExpenseCurrent = cleanUp( $("#non-UBI-current").val() ),
            totalExpenseCurrent =  cleanUp( $("#total-expense").val() );
        
        /**
         * PERFORM THE ACTUAL CALCULATIONS.
         */
        
        $("#your-total-revenue").val("$" + commaSeparateNumber( revenueSum ) );
        
        // Calculate the UBI value and insert the sum into UBI amount total.
        var totalUBI  = mandatorySum + discretionarySum;
        $("#ubi-total").val(fixNegative("$" + commaSeparateNumber( totalUBI ) ));
        $("#your-UBI-expense").val(fixNegative("$" + commaSeparateNumber( totalUBI ) ));
        
        var nonUBIExpense = nonUBIExpenseCurrent - totalUBI;
        $("#your-non-UBI").val("$" + commaSeparateNumber( nonUBIExpense ) );
        
        var deficitSurplus = revenueSum - totalExpenseCurrent;
        $("#your-deficit-surplus").val( fixNegative("$" + commaSeparateNumber( deficitSurplus )) );
        
        // Finally, perform the actual calculations to determine the UBI.
        var ubiRaw = ( totalUBI / population ),
        ubiPerYear = commaSeparateNumber( Math.round( ubiRaw ) ),
        ubiPerMonth = commaSeparateNumber( Math.round( ubiRaw / 12 ) );
        
        // Output the calculated result.
        $("#ubi-per-year").val( noNegative( "$" + ubiPerYear ) );
        $("#ubi-per-month").val( noNegative( "$" + ubiPerMonth ) );

    }); // End main calculator.

});