
import { 
    $,
    $$, is_null  
} from "./utilites";

import { 
    board_color, board, pieces,   
} from "./initial.config";


export function arr_to_html(c_board: board): void {
    Object.keys(c_board).forEach(val => {
        const current_element = $(val)
        if (!is_null(current_element)) {
            if (c_board[val].piece !== null) {
                current_element.innerHTML = `${c_board[val].piece} <img class='allimg' src="${pieces[c_board[val].piece]}" alt="">`
                current_element.style.cursor = 'pointer' 
            } else {}  
        } else {
            console.error("Error, null in current_element", current_element)
        }    
    });
}

export function move_piece_graphically(to: string, from: string): void {
    $(to).innerHTML = $(from).innerHTML
    $(from).innerHTML = ""
    $(from).style.cursor = "default"
    $(to).style.cursor = "pointer"
}

export function coloring() {
    const color = $$('.box') 
    let i: number = 0

    color.forEach((square: any) => { 
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



