import { 
    starting_pos, board_color, board   
} from "./initial.config";

import { pieces } from "./pieces.config";

export function intitial_game(){
    Object.keys(starting_pos).forEach(val => {
        board[val] = {"piece": starting_pos[val]}
      });
      return board
}

export function move(current_click, c_board, box){
    if (current_click.piece_selected) {
        if (current_click.id === box.id){
            current_click = {"piece_selected": false, "piece": "", "id": ""} 
            console.log(current_click)   
        } else {
            box.innerHTML = `${current_click.piece} <img class='allimg' src="${pieces[current_click.piece]}" alt="">`
            document.getElementById(current_click.id).innerHTML = ``
            c_board[box.id].piece = `${current_click.piece}`
            current_click = {"piece_selected": false, "piece": "", "id": ""}
            console.log(document.getElementById(current_click.id))
        }
    } else {
        if (c_board[box.id].piece !== undefined)
            current_click = {"piece_selected": true, "piece": c_board[`${box.id}`].piece, "id": `${box.id}`}
            console.log(current_click) 
    }
}