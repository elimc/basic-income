/**
 * Remove spaces, commas, and dollar signs. Typecasts value into a float.
 * 
 * @param {string} rawInput User input value without sanitization.
 * @returns {float} Sanitized user input. 
 */
function cleanUp( rawInput ) {
    var sanitize = rawInput.replace(/,|[$]|\s/g, "");
    var floated = parseFloat(sanitize);
    return floated;
}

/**
 * Insert commas into number.
 * 
 * @param {flat} val number to insert commas into.
 * @returns {float} Number with proper commas.
 */
function commaSeparateNumber( val ){
    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}

/**
 * Checks all the checkboxes in a specific fieldset, on user click.
 * I haven't gotten this to completely work yet.
 */
//$(function () {
//    $('.check-all').on('click', function () {
//        $(this).closest('fieldset').find(':checkbox').prop('checked', this.checked);
//    });
//}); // End checkboxes helper function.

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