function RemoveTodo(id) {
    console.log(id);
    $('#row_' + id).remove();
}

function MarkItemDone(id) {
    var elem = $('#row_' + id);
    if (elem.hasClass("strikeout")) {
        elem.removeClass("strikeout");
    } else {
        elem.addClass("strikeout");
    }
}