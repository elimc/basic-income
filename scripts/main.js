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
        
        var population = cleanUp( $("#us-citizens").val() );
        
        /**
         * PERFORM THE ACTUAL CALCULATIONS.
         */
        
        $("#your-total-revenue").val("$" + commaSeparateNumber( revenueSum ) );
        
        // Calculate the UBI value and insert the sum into UBI amount total.
        var totalUBI  = mandatorySum + discretionarySum;
        $("#ubi-total").val(fixNegative("$" + commaSeparateNumber( totalUBI ) ));
        $("#your-UBI-expense").val(fixNegative("$" + commaSeparateNumber( totalUBI ) ));
        
        var nonUBIExpense= 3260000000000 - totalUBI;
        $("#your-non-UBI").val("$" + commaSeparateNumber( nonUBIExpense ) );
        
        var deficitSurplus = revenueSum - 3456000000000;
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