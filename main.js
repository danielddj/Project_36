"use strict";
exports.__esModule = true;
var graphics_handler_1 = require("./graphics_handler");
var utilites_1 = require("./utilites");
var pieces_handler_1 = require("./pieces_handler");
var current_click = { "piece_selected": false, "piece": "", "id": "" };
var whos_turn = "white";
(0, utilites_1.$$)(".box").forEach(function (box) {
    box.addEventListener('click', function () {
        if (current_click.piece_selected) {
            if (current_click.id === box.id) {
                current_click = utilites_1.deselect_piece;
                console.log(current_click);
            }
            else {
                if (c_board.piece === null && (0, pieces_handler_1.legal_move)(c_board[current_click.id]).includes(box.id)) {
                    (0, pieces_handler_1.move_piece)(box.id, current_click.id, c_board);
                    whos_turn = (0, pieces_handler_1.invert_move)(whos_turn);
                    console.log(whos_turn);
                    current_click = utilites_1.deselect_piece;
                }
                else if (c_board[current_click.id].piece_color === c_board[box.id].piece_color) {
                    console.log("Same color!");
                }
                else if ((0, pieces_handler_1.legal_move)(c_board[current_click.id]).includes(box.id)) {
                    (0, pieces_handler_1.move_piece)(box.id, current_click.id, c_board);
                    whos_turn = (0, pieces_handler_1.invert_move)(whos_turn);
                    console.log(whos_turn);
                    current_click = utilites_1.deselect_piece;
                }
            }
        }
        else {
            if (c_board[box.id].piece !== null && whos_turn === c_board[box.id].piece_color) {
                current_click = { "piece_selected": true, "piece": c_board["".concat(box.id)].piece, "id": "".concat(box.id) };
                console.log(current_click);
            }
            else {
                return (c_board[box.id].piece === null)
                    ? console.log("Please select a piece")
                    : console.log("It is not your turn!");
            }
        }
    });
});
var c_board = (0, pieces_handler_1.intitial_game)();
(0, graphics_handler_1.arr_to_html)(c_board);
(0, graphics_handler_1.coloring)();
