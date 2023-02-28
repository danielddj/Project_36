import { 
    coloring, display_current_piece, highlight_legal_moves, obj_to_html, remove_highlights  
} from "./graphics_handler";

import { 
    $$, deselect_piece   
} from "./utilites";

import { 
    intitial_game, invert_move, move_piece 
} from "./pieces_handler";

import {
    starting_pos 
} from "./initial.config";


let current_click = {"piece_selected": false, "piece":"", "id": ""}

let whos_turn = "white"



/** Is not relly a function, adds event listeners to each HTMLElement called box (square) 
 * so that it is listening to moves. Does the appropriate checks for the move, and then
 * calls the corresponding functions
  */

$$(".box").forEach((box: any) => {
    box.addEventListener('click', function(){
        console.log(c_board[box.id].piece)
        if (current_click.piece_selected) {
            if (current_click.id === box.id){
                current_click = deselect_piece
                display_current_piece("") 
                remove_highlights(c_board[box.id].piece.moves)   
            } else {
                if(c_board[current_click.id].piece.moves.includes(box.id)){
                    remove_highlights(c_board[current_click.id].piece.moves)
                    move_piece(box.id, current_click.id, c_board)
                    whos_turn = invert_move(whos_turn)
                    current_click = deselect_piece
                } else {
                    console.log("Illegal move!")
            }
        }
        } else {
            if (c_board[box.id].piece !== null && whos_turn === c_board[box.id].piece.piece_color){
                current_click = {"piece_selected": true, "piece": c_board[`${box.id}`].piece.piece_name, "id": `${box.id}`}
                highlight_legal_moves(c_board[box.id].piece.moves)
                display_current_piece(`${current_click.piece} - Square: ${box.id}`) 
            } else {
                return (c_board[box.id].piece === null)
                       ? console.log("Please select a piece")
                       : console.log("It is not your turn!")
            }
        }
    })
})

let c_board = intitial_game(starting_pos)

obj_to_html(c_board)

coloring();

