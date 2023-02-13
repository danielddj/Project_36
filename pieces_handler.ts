import { 
    starting_pos, board_color, board   
} from "./initial.config";

export function intitial_game(){
    Object.keys(starting_pos).forEach(val => {
        board[val] = {"piece": starting_pos[val]}
      });
      return board
}