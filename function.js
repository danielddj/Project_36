var pieces = { 0: ["Wrook", "Wknight", "Wbishop", "Wqueen", "Wking", "Wrook", "Wknight", "Wbishop"],
    1: ["Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn"],
    6: ["Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn"],
    7: ["Brook", "Bknight", "Bbishop", "Bqueen", "Bking", "Brook", "Bknight", "Bbishop"] };
var board = ["w", "b", "w", "b", "w", "b", "w", "b",
    "b", "w", "b", "w", "b", "w", "b", "w",
    "w", "b", "w", "b", "w", "b", "w", "b",
    "b", "w", "b", "w", "b", "w", "b", "w",
    "w", "b", "w", "b", "w", "b", "w", "b",
    "b", "w", "b", "w", "b", "w", "b", "w",
    "w", "b", "w", "b", "w", "b", "w", "b",
    "b", "w", "b", "w", "b", "w", "b", "w",];
function is_null(v) {
    return v === null;
}
function insert_pieces(row) {
    for (var i = 0; i <= 7; i++) {
        var current = document.getElementById("".concat(row).concat(i));
        if (!is_null(current) && row in pieces) {
            var current_pieces = pieces[row][i];
            current.innerHTML = "<img class='allimg ".concat(current_pieces, "' src=\"images/").concat(current_pieces, ".png\" alt=\"\">");
            current.style.cursor = 'pointer';
        }
    }
}
function coloring() {
    var color = document.querySelectorAll('.box');
    var i = 0;
    color.forEach(function (square) {
        if (board[i] === "w") {
            square.style.backgroundColor = 'rgb(255, 254, 254)';
            square.style.outline = "1px solid black";
        }
        else if ((board[i] === "b")) {
            square.style.backgroundColor = "rgb(216, 175, 98)";
            square.style.outline = "1px solid black";
        }
        i = i + 1;
    });
}
document.querySelectorAll('.box').forEach(function (item) {
    item.addEventListener('click', function () {
        if (!(item.innerHTML === "")) {
            document.querySelectorAll('.box').forEach(function (item2) {
                item2.addEventListener('click', function () {
                    if ((item2.innerHTML === "")) {
                        console.log("hej");
                    }
                }, { once: true });
            });
        }
    });
});
coloring();
insert_pieces(0);
insert_pieces(1);
insert_pieces(6);
insert_pieces(7);
