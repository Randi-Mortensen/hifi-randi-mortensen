var equalColumns = function () {
    //console.log("Hej");
    var columns = document.getElementsByClassName("col-md-6");

    console.log(columns.length);
    var length = columns.length;
    var height = 0;

    for (var i = 0; i < length; i++) {
        columns[i].style.height = "auto";
    }

    for (var i = 0; i < length; i++) {
        //console.log(i);
        if (columns[i].clientHeight > height) {
            height = columns[i].clientHeight;
            //console.log(height);
        }
    }

    for (var i = 0; i < length; i++) {
        columns[i].style.height = height + "px";
    }
}
equalColumns();
window.addEventListener("resize", equalColumns, true);