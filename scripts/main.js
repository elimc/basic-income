$(document).ready(function() {
    
    $('#chanceSlider').on('change', function(){
        $('#chance').val($('#chanceSlider').val());
    });

    $('#chance').on('keyup', function(){
        $('#chanceSlider').val($('#chance').val());
    });
    
    /**
     * Checks all the checkboxes in a specific fieldset, on user click.
     */
    $(function () {
        $('.check-all').on('click', function () {
            $(this).closest('fieldset').find(':checkbox').prop('checked', this.checked);
        });
    }); // End checkboxes helper function.

    /**
     * Add commas and a dollar sign while user is typing. Also removes cents and spaces and some other garbage.
     * 
     * jQuery formatCurrency plugin: http://plugins.jquery.com/project/formatCurrency
     */
    $(function() {

        // Format while typing & warn on decimals entered, no cents
        $('.formatInput').blur(function() {
            $(this).formatCurrency({ colorize: true, negativeFormat: '-%s%n', roundToDecimalPlace: 0 });
        })
        .keyup(function(e) {
            var e = window.event || e;
            var keyUnicode = e.charCode || e.keyCode;
            if (e !== undefined) {
                switch (keyUnicode) {
                    case 16: break; // Shift
                    case 27: this.value = ''; break; // Esc: clear entry
                    case 35: break; // End
                    case 36: break; // Home
                    case 37: break; // cursor left
                    case 38: break; // cursor up
                    case 39: break; // cursor right
                    case 40: break; // cursor down
                    case 78: break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
                    case 110: break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
                    case 190: break; // .
                    default: $(this).formatCurrency({ colorize: true, negativeFormat: '-%s%n', roundToDecimalPlace: -1, eventOnDecimalsEntered: true });
                }
            }
        });
    }); // End formatCurrency plugin.


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

        /**
         * Remove spaces, commas, and dollar signs. Make sure the element is a float.
         * 
         * @param {string} rawInput User input value without sanitization.
         * @returns {float} Sanitized user input. 
         */
        function cleanUp( rawInput ) {
            var sanitize = rawInput.replace(/,|[$]|\s/g, "");
            var floated = parseFloat(sanitize);
            return floated;
        }
        
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

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages': ['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 22]
    ]);

    // Set chart options
    var options = {'title': 'How Much Pizza I Ate Last Night',
        'width': 600,
        'height': 600};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function tipCalculate(slider) {
    var tip = document.getElementById("tip");
    var slideVal = document.getElementById("slideVal");
    var bill = document.getElementById("bill").value;
    var percent = slider * .01;
    slideVal.innerHTML = slider + "%";
    tip.innerHTML = "$" + (bill * percent).toFixed();
}