
import { 
    $,
    $$, is_null  
} from "./utilites";

import { 
    board_color, board_type, pieces,   
} from "./initial.config";

/** Takes our back end representation of the chess board and displays it on the screen  
  * @param c_board The chess board to display in html. 
  * @returns Void, only edits the HTML to display pieces.
  */

export function obj_to_html(c_board: board_type): void {
    Object.keys(c_board).forEach(val => {
        const current_element = document.getElementById(val)
        if (!is_null(current_element)) {
            if (c_board[val].piece !== null) {
                current_element.innerHTML = `${c_board[val].piece} <img class='allimg' src="${pieces[c_board[val].piece.piece_name]}" alt="">`
                current_element.style.cursor = 'pointer' 
                console.log(c_board[val].piece.dependants)
            } else {}  
        } else {
            console.error("Error, null in current_element", current_element)
        }    
    });
}

/** Moves a piece grapically on the screen  
  * @param {string} to The ID of the square where the piece is moving to.
  * @param {string} from The ID of the square where the piece is moving from. 
  * @returns Void, only edits the HTML to display pieces.
  */

export function move_piece_graphically(to: string, from: string): void {
    $(to).innerHTML = $(from).innerHTML
    $(from).innerHTML = ""
    $(from).style.cursor = "default"
    $(to).style.cursor = "pointer"
}

/** Makes each HTML box element the color it is supposed to be 
 * and adds a black outline  
  * @returns Void, only edits the HTML to display color.
  */
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



