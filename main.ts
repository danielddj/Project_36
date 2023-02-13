import { 
    starting_pos, board_color, board  
} from "./initial.config";


import { 
    coloring, arr_to_html   
} from "./graphics_handler";

import { 
    $$   
} from "./utilites";

import { 
    pieces   
} from "./pieces.config";

import { intitial_game } from "./pieces_handler";

let c_board = intitial_game()

let current_click = {"piece_selected": false,"piece":"", "id": "" }

$$(".box").forEach(box => {
    box.addEventListener('click', function(){
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
    })
})

coloring()

arr_to_html(c_board)