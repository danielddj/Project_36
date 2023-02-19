import { move_piece_graphically } from "./graphics_handler";
import { 
    starting_pos, board_color, c_board, board   
} from "./initial.config";

export function intitial_game(): board{
    Object.keys(starting_pos).forEach(val => {
        c_board[val].piece = starting_pos[val].piece
        c_board[val].piece_color = starting_pos[val].piece_color
      });
      return c_board;
}

export function move_piece(to:string, from: string, c_board: board): board{
       c_board[to].piece = c_board[from].piece
       c_board[to].piece_color = c_board[from].piece_color
       c_board[from].piece = null
       c_board[from].piece_color = null
       move_piece_graphically(to, from)
       
       return c_board
}

export function invert_move(color: string): string {
    return (color === "white")
           ? "black"
           : "white"

}