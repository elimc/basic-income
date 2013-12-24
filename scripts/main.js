$(document).ready(function() {

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

        var revenueTotal = 0;
        $.each( revenueValues, function( i, val ) {
            revenueTotal += cleanUp( val );
        } );
        $("#revenue-total").val("$" + commaSeparateNumber( revenueTotal ) );

        // Grab values from expense section and sum them.
        var mandatoryExpenseValues = [
            $("#ss-expense-new").val(),
            $("#medicare-expense-new").val(),
            $("#medicaid-expense-new").val(),
            $("#tarp-expense-new").val(),
            $("#other-expense-new").val()
        ];

        var mandatoryTotal = 0;
        $.each(mandatoryExpenseValues, function( i, val ) {
            mandatoryTotal += cleanUp( val );
        });
        $("#mandatory-total").val(fixNegative("$" + commaSeparateNumber( mandatoryTotal ) ));
        
        // Grab the expense values and sum them.
        var discretionaryExpenseValues = [
            $("#security-expense-new").val(),
            $("#non-security-expense-new").val()
        ];
        
        discretionaryTotal = 0;
        $.each( discretionaryExpenseValues, function( i, val ) {
            discretionaryTotal += cleanUp( val );
        });
        $("#discretionary-total").val("$" + commaSeparateNumber( discretionaryTotal ) );
        
        population = cleanUp( $("#us-citizens").val() );
        
        /**
         * PERFORM THE ACTUAL CALCULATIONS.
         */
        
        $("#your-total-revenue").val("$" + commaSeparateNumber( revenueTotal ) );
        
        // Calculate the UBI value and insert the sum into UBI amount total.
        totalUBI  = mandatoryTotal + discretionaryTotal;
        $("#ubi-total").val(fixNegative("$" + commaSeparateNumber( totalUBI ) ));
        $("#your-UBI-expense").val(fixNegative("$" + commaSeparateNumber( totalUBI ) ));
        
        var nonUBIExpense= 3260000000000 - totalUBI;
        $("#your-non-UBI").val("$" + commaSeparateNumber( nonUBIExpense ) );
        
        deficitSurplus = revenueTotal - 3456000000000;
        $("#your-deficit-surplus").val( fixNegative("$" + commaSeparateNumber( deficitSurplus )) );
        
        // Finally, perform the actual calculations to determine the UBI.
        ubiRaw = ( totalUBI / population ),
        ubiPerYear = commaSeparateNumber( Math.round( ubiRaw ) ),
        ubiPerMonth = commaSeparateNumber( Math.round( ubiRaw / 12 ) );
        
        // Output the calculated result.
        $("#ubi-per-year").val( noNegative( "$" + ubiPerYear ) );
        $("#ubi-per-month").val( noNegative( "$" + ubiPerMonth ) );

    }); // End main calculator.

});