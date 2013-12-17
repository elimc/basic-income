$(document).ready(function() {
    
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
    
});