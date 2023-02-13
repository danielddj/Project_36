
import { 
    $, $$, $$$, is_null  
} from "./utilites";

import { 
    starting_pos, board_color, board   
} from "./initial.config";

import { 
    pieces   
} from "./pieces.config";

import { 
    intitial_game   
} from "./pieces_handler";


export function arr_to_html(current_board: any) {
    Object.keys(current_board).forEach(val => {
        const current_element = document.getElementById(val)
        if (!is_null(current_element)) {
            if (current_board[val].piece !== undefined) {
                current_element.innerHTML = `${current_board[val].piece} <img class='allimg' src="${pieces[current_board[val].piece]}" alt="">`
                current_element.style.cursor = 'pointer' 
            } else {}  
        } else {
            console.error("Error, null in current_element", current_element)
        }    
    });
}

export function coloring() {
    const color = document.querySelectorAll<HTMLElement>('.box') 
    let i: number = 0

    color.forEach(square => { 
        if (board_color[i] === "w") {
            square.style.backgroundColor = 'rgb(255, 254, 254)'
            square.style.outline = "1px solid black";

        } else if ((board_color[i] === "b")) {
            square.style.backgroundColor = "rgb(216, 175, 98)"
            square.style.outline = "1px solid black";
        }
        i = i + 1
    })
}

const t = intitial_game()

arr_to_html(t)

coloring()



