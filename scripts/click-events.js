$(document).ready(function() {
    
    $("#income-tax-slider").on("change", function() {
        var unsanitizedVal = ($("#income-tax-slider").val() * .01) * cleanUp($("#income-tax").val());
        var sanitizedVal = unsanitizedVal.toFixed();
        $("#income-slider-percent").text($("#income-tax-slider").val() + "%");
        $("#income-tax-new-revenue").val("$" + commaSeparateNumber( sanitizedVal ));
    });
    
    $("#corporate-tax-slider").on("change", function() {
        var unsanitizedVal = ($("#corporate-tax-slider").val() * .01) * cleanUp($("#corporate-tax").val());
        var sanitizedVal = unsanitizedVal.toFixed();
        $("#corporate-slider-percent").text($("#corporate-tax-slider").val() + "%");
        $("#corporate-tax-new-revenue").val("$" + commaSeparateNumber( sanitizedVal ));
    });
    
    /**
     * Checks all the checkboxes in a specific fieldset, on user click.
     */
    $(function () {
        $('.check-all').on('click', function () {
            $(this).closest('fieldset').find(':checkbox').prop('checked', this.checked);
        });
    }); // End checkboxes helper function.
        
});