import { 
    move_piece_graphically 
} from "./graphics_handler";

import { 
    board_type, square_type, c_board   
} from "./initial.config";

/** Takes a list of all the pieces and the id where they are supposed to be and
 * writes them to our data structure. It is done this way to make it easier to,
 * start in different scenarios and not the normal one.
  * @param {board_type} c_board The starting position of each piece. 
  * @returns c_board with all the pieces in the corresponding slot.
  */

export function intitial_game(starting_pos: board_type): board_type{
    Object.keys(starting_pos).forEach(val => {
        c_board[val].piece = starting_pos[val].piece
        c_board[val].piece_color = starting_pos[val].piece_color
      });
      return c_board;
}

/** Moves the pieces in the data structure and also calls the move_piece_graphically function
  * @param {string} to The ID of the square where the piece is moving to.
  * @param {string} from The ID of the square where the piece is moving from.
  * @param {board_type} c_board The data structure. 
  * @returns c_board, the updated data structure.
  */

export function move_piece(to:string, from: string, c_board: board_type): board_type{
       c_board[to].piece = c_board[from].piece
       c_board[to].piece_color = c_board[from].piece_color
       c_board[from].piece = null
       c_board[from].piece_color = null
       move_piece_graphically(to, from)
       
       return c_board
}

/** Changes the color of the one who is moving next.
  * @param {string} color The color of the one who did the move
  * @returns The color of the one who is moving next
  */

export function invert_move(color: string): string {
    return (color === "white")
           ? "black"
           : "white"
}

export function legal_move(box: square_type): Array<string>{
    const id = parseInt(box.id)
    let legal_moves = []
        if (box.piece === "Wpawn") {
            for(let i = id; i >= id - 10; i = i - 10){
                legal_moves.push(i.toString())
            }
        } 
        else if (box.piece === "Bpawn") {
            for(let i = id; i <= id + 10; i = i + 10){
                legal_moves.push(i.toString())
            }
        } 
        else if (box.piece === "Bknight"){
            for(let i = id; i <= id + 21; i = i + 21){
                legal_moves.push(i.toString())
            }
        }
    return legal_moves
}