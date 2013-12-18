$(document).ready(function() {
    
    /**
     * Checks all the checkboxes in a specific fieldset, on user click.
     * I haven't gotten this to completely work yet.
     */
//    $(function () {
//        $('.check-all').on('click', function () {
//            $(this).closest('fieldset').find(':checkbox').prop('checked', this.checked);
//        });
//    }); // End checkboxes helper function.
    
    // START EXPENSE SLIDER. These functions all have the same functionality with different id selectors.
    $("#income-tax-slider").change( function() {
        var unsanitizedVal = ($("#income-tax-slider").val() * .01) * cleanUp($("#income-tax").val());
        var sanitizedVal = unsanitizedVal.toFixed();
        
        $("#income-slider-percent").text($("#income-tax-slider").val() + "%");
        $("#income-tax-new-revenue").val("$" + commaSeparateNumber( sanitizedVal ));
    });
    
    $("#corporate-tax-slider").change( function() {
        var unsanitizedVal = ($("#corporate-tax-slider").val() * .01) * cleanUp($("#corporate-tax").val());
        var sanitizedVal = unsanitizedVal.toFixed();
        
        $("#corporate-slider-percent").text($("#corporate-tax-slider").val() + "%");
        $("#corporate-tax-new-revenue").val("$" + commaSeparateNumber( sanitizedVal ));
    });
    
    $("#ss-expense-slider").change( function() {
        var unsanitizedVal = ($("#ss-expense-slider").val() * .01) * cleanUp($("#ss-expense").val());
        var sanitizedVal = unsanitizedVal.toFixed();
        
        if ($("#ss-checkbox").prop("checked") === true) {
            $("#ss-slider-percent").text($("#ss-expense-slider").val() + "%");
            $("#ss-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#ss-slider-percent").text($("#ss-expense-slider").val() + "%");
        }
    });
    
    $("#ss-checkbox").change( function() {
        if ($("#ss-checkbox").prop("checked") === true) {
            var unsanitizedVal = ($("#ss-expense-slider").val() * .01) * cleanUp($("#ss-expense").val());
            var sanitizedVal = unsanitizedVal.toFixed();
            $("#ss-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#ss-expense-new").val("$0");
        }
    });

    $("#medicare-expense-slider").change( function() {
        var unsanitizedVal = ($("#medicare-expense-slider").val() * .01) * cleanUp($("#medicare-expense").val());
        var sanitizedVal = unsanitizedVal.toFixed();
        
        if ($("#medicare-checkbox").prop("checked") === true) {
            $("#medicare-slider-percent").text($("#medicare-expense-slider").val() + "%");
            $("#medicare-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#medicare-slider-percent").text($("#medicare-expense-slider").val() + "%");
        }
    });
    
    $("#medicare-checkbox").change( function() {
        if ($("#medicare-checkbox").prop("checked") === true) {
            var unsanitizedVal = ($("#medicare-expense-slider").val() * .01) * cleanUp($("#medicare-expense").val());
            var sanitizedVal = unsanitizedVal.toFixed();
            $("#medicare-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#medicare-expense-new").val("$0");
        }
    });
    
    $("#medicaid-expense-slider").change( function() {
        var unsanitizedVal = ($("#medicaid-expense-slider").val() * .01) * cleanUp($("#medicaid-expense").val());
        var sanitizedVal = unsanitizedVal.toFixed();
        
        if ($("#medicaid-checkbox").prop("checked") === true) {
            $("#medicaid-slider-percent").text($("#medicaid-expense-slider").val() + "%");
            $("#medicaid-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#medicaid-slider-percent").text($("#medicaid-expense-slider").val() + "%");
        }
    });
    
    $("#medicaid-checkbox").change( function() {
        if ($("#medicaid-checkbox").prop("checked") === true) {
            var unsanitizedVal = ($("#medicaid-expense-slider").val() * .01) * cleanUp($("#medicaid-expense").val());
            var sanitizedVal = unsanitizedVal.toFixed();
            $("#medicaid-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#medicaid-expense-new").val("$0");
        }
    });
    
    $("#tarp-expense-slider").change( function() {
        var unsanitizedVal = ($("#tarp-expense-slider").val() * .01) * cleanUp($("#tarp-expense").val());
        var sanitizedVal = unsanitizedVal.toFixed();
        
        if ($("#tarp-checkbox").prop("checked") === true) {
            $("#tarp-slider-percent").text($("#tarp-expense-slider").val() + "%");
            $("#tarp-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#tarp-slider-percent").text($("#tarp-expense-slider").val() + "%");
        }
    });
    
    $("#tarp-checkbox").change( function() {
        if ($("#tarp-checkbox").prop("checked") === true) {
            var unsanitizedVal = ($("#tarp-expense-slider").val() * .01) * cleanUp($("#tarp-expense").val());
            var sanitizedVal = unsanitizedVal.toFixed();
            $("#tarp-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#tarp-expense-new").val("$0");
        }
    });
    
    $("#other-expense-slider").change( function() {
        var unsanitizedVal = ($("#other-expense-slider").val() * .01) * cleanUp($("#other-expense").val());
        var sanitizedVal = unsanitizedVal.toFixed();
        
        if ($("#other-checkbox").prop("checked") === true) {
            $("#other-slider-percent").text($("#other-expense-slider").val() + "%");
            $("#other-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#other-slider-percent").text($("#other-expense-slider").val() + "%");
        }
    });
    
    $("#other-checkbox").change( function() {
        if ($("#other-checkbox").prop("checked") === true) {
            var unsanitizedVal = ($("#other-expense-slider").val() * .01) * cleanUp($("#other-expense").val());
            var sanitizedVal = unsanitizedVal.toFixed();
            $("#other-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#other-expense-new").val("$0");
        }
    });
    
    $("#security-expense-slider").change( function() {
        var unsanitizedVal = ($("#security-expense-slider").val() * .01) * cleanUp($("#security-expense").val());
        var sanitizedVal = unsanitizedVal.toFixed();
        
        if ($("#security-checkbox").prop("checked") === true) {
            $("#security-slider-percent").text($("#security-expense-slider").val() + "%");
            $("#security-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#security-slider-percent").text($("#security-expense-slider").val() + "%");
        }
    });
    
    $("#security-checkbox").change( function() {
        if ($("#security-checkbox").prop("checked") === true) {
            var unsanitizedVal = ($("#security-expense-slider").val() * .01) * cleanUp($("#security-expense").val());
            var sanitizedVal = unsanitizedVal.toFixed();
            $("#security-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#security-expense-new").val("$0");
        }
    });
    
    $("#non-security-expense-slider").change( function() {
        var unsanitizedVal = ($("#non-security-expense-slider").val() * .01) * cleanUp($("#non-security-expense").val());
        var sanitizedVal = unsanitizedVal.toFixed();
        
        if ($("#non-security-checkbox").prop("checked") === true) {
            $("#non-security-slider-percent").text($("#non-security-expense-slider").val() + "%");
            $("#non-security-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#non-security-slider-percent").text($("#non-security-expense-slider").val() + "%");
        }
    });
    
    $("#non-security-checkbox").change( function() {
        if ($("#non-security-checkbox").prop("checked") === true) {
            var unsanitizedVal = ($("#non-security-expense-slider").val() * .01) * cleanUp($("#non-security-expense").val());
            var sanitizedVal = unsanitizedVal.toFixed();
            $("#non-security-expense-new").val("$" + commaSeparateNumber( sanitizedVal ));
        } else {
            $("#non-security-expense-new").val("$0");
        }
    });
    // END EXPENSES SLIDER

    
    
});