"use strict";
exports.__esModule = true;
var graphics_handler_1 = require("./graphics_handler");
var utilites_1 = require("./utilites");
var pieces_config_1 = require("./pieces.config");
var pieces_handler_1 = require("./pieces_handler");
var c_board = (0, pieces_handler_1.intitial_game)();
var current_click = { "piece_selected": false, "piece": "", "id": "" };
(0, utilites_1.$$)(".box").forEach(function (box) {
    box.addEventListener('click', function () {
        if (current_click.piece_selected) {
            if (current_click.id === box.id) {
                current_click = { "piece_selected": false, "piece": "", "id": "" };
                console.log(current_click);
            }
            else {
                box.innerHTML = "".concat(current_click.piece, " <img class='allimg' src=\"").concat(pieces_config_1.pieces[current_click.piece], "\" alt=\"\">");
                document.getElementById(current_click.id).innerHTML = "";
                c_board[box.id].piece = "".concat(current_click.piece);
                current_click = { "piece_selected": false, "piece": "", "id": "" };
                console.log(document.getElementById(current_click.id));
            }
        }
        else {
            if (c_board[box.id].piece !== undefined)
                current_click = { "piece_selected": true, "piece": c_board["".concat(box.id)].piece, "id": "".concat(box.id) };
            console.log(current_click);
        }
    });
});
(0, graphics_handler_1.coloring)();
(0, graphics_handler_1.arr_to_html)(c_board);
