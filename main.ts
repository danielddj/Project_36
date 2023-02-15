import { 
    coloring, arr_to_html  
} from "./graphics_handler";

import { 
    $$   
} from "./utilites";

import { 
    intitial_game, move_piece 
} from "./pieces_handler";

let current_click = {"piece_selected": false,"piece":"", "id": "" }

$$(".box").forEach((box: any) => {
    box.addEventListener('click', function(){
        if (current_click.piece_selected) {
            if (current_click.id === box.id){
                current_click = {"piece_selected": false, "piece": "", "id": ""} 
                console.log(current_click)   
            } else {
                if(box.innerHTML === ""){
                    move_piece(box.id, current_click.id, c_board)
                    current_click = {"piece_selected": false, "piece": "", "id": ""} 
                } else if (c_board[current_click.id].piece_color === c_board[box.id].piece_color) {
                    console.error("Same color!")
                } else {
                    move_piece(box.id, current_click.id, c_board)
                    current_click = {"piece_selected": false, "piece": "", "id": ""}
                }
            }
        } else {
            if (c_board[box.id].piece !== null){
                current_click = {"piece_selected": true, "piece": c_board[`${box.id}`].piece, "id": `${box.id}`}
                console.log(current_click) 
            } else {
                console.log("Please select a piece")
            }
        }
    })
})

let c_board = intitial_game()

arr_to_html(c_board)

coloring();

