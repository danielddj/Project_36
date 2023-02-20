import { 
    coloring, arr_to_html  
} from "./graphics_handler";

import { 
    $$, deselect_piece   
} from "./utilites";

import { Queue } from 'queue-typescript';

import { 
    intitial_game, invert_move, legal_move, move_piece 
} from "./pieces_handler";



let current_click = {"piece_selected": false,"piece":"", "id": "" }

let whos_turn = "white"

$$(".box").forEach((box: any) => {
    box.addEventListener('click', function(){
        if (current_click.piece_selected) {
            if (current_click.id === box.id){
                current_click = deselect_piece
                console.log(current_click)   
            } else {
                if(c_board.piece === null && legal_move(c_board[current_click.id]).includes(box.id)){
                    move_piece(box.id, current_click.id, c_board)
                    whos_turn = invert_move(whos_turn)
                    console.log(whos_turn) 
                    current_click = deselect_piece
                } else if (c_board[current_click.id].piece_color === c_board[box.id].piece_color) {
                    console.log("Same color!")
                } else if (legal_move(c_board[current_click.id]).includes(box.id)) {
                    move_piece(box.id, current_click.id, c_board)
                    whos_turn = invert_move(whos_turn) 
                    console.log(whos_turn)
                    current_click = deselect_piece
                }
            }
        } else {
            if (c_board[box.id].piece !== null && whos_turn === c_board[box.id].piece_color){
                current_click = {"piece_selected": true, "piece": c_board[`${box.id}`].piece, "id": `${box.id}`}
                console.log(current_click) 
            } else {
                return (c_board[box.id].piece === null)
                       ? console.log("Please select a piece")
                       : console.log("It is not your turn!")
            }
        }
    })
})

let c_board = intitial_game()

arr_to_html(c_board)

coloring();



