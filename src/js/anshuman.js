(function($) {


    $.ui.autocomplete.prototype._renderItem = function(ul, item) {
        var re = new RegExp("^" + this.term, "i");
        var t = item.label.replace(re, "<span style='color:#3c2fd3;text-transform:capitalize;'>" + this.term + "</span>");
        return $("<li></li>")
            .data("item.autocomplete", item)
            .append(t)
            .appendTo(ul);
    };

    $.ui.autocomplete.prototype._renderItem = function(ul, item) {
        var re = new RegExp("^" + this.term, "i");
        var t = item.label.replace(re, "<span style='color:#3c2fd3;text-transform:capitalize;'>" + this.term + "</span>");
        return $("<li></li>")
            .data("item.autocomplete", item)
            .append(t)
            .appendTo(ul);
    };

    $("#locationAutocomplete").autocomplete({
        source: ["Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bahrainx", "Bangladesh", "Brunei", "Cambodia", "China", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan"],
        appendTo: '.locations_dropdown',
        classes: {
            "ui-autocomplete": "location-autocomplete"
        }
    })



})(jQuery);