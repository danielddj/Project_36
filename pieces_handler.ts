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


let turn_count = 1

export let in_check_w = false

export let in_check_b = false

export let Wking_slot = "75"

export let Bking_slot = "5"

//Riktningar att röra sig.
const UP = -10
const DOWN = 10
const LEFT = -1
const RIGHT = 1
const UP_LEFT = -11
const UP_RIGHT = -9
const DOWN_LEFT = 9
const DOWN_RIGHT = 11


export function intitial_game(starting_pos: board_type): board_type{
    Object.keys(starting_pos).forEach(val => {
        c_board[val].piece = starting_pos[val].piece
        c_board[val].piece.piece_color = starting_pos[val].piece.piece_color
      });
      Object.keys(starting_pos).forEach(val => {
        c_board[val].piece.moves = legal_move(c_board[val])
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
    c_board[from].piece = null
    move_piece_graphically(to, from)

    if (c_board[to].piece.piece_name === "Wking") {
        Wking_slot = to
    } else if (c_board[to].piece.piece_name === "Bking") {
        Bking_slot = to
    }

    return c_board
}

export function update_moves(){
    Object.keys(c_board).forEach(val => {
        console.log(Wking_slot)
        if (c_board[val].piece !== null) {
            const legal_moves = legal_move(c_board[val])
            c_board[val].piece.moves = legal_moves
            console.log(legal_moves)
            if (legal_moves.includes(Wking_slot) && c_board[val].piece.piece_name !== "Wking") {
                in_check_w = true
                console.log(in_check_w)
            } else if (legal_moves.includes(Bking_slot) && c_board[val].piece.piece_name !== "Bking") {
                in_check_b = true
                console.log(Bking_slot)
            }
        }
      });
}


/** Changes the color of the one who is moving next.
  * @param {string} color The color of the one who did the move
  * @returns The color of the one who is moving next
  */

export function invert_move(color: string): string {
    turn_count = turn_count + 1
    return (color === "white")
           ? "black" 
           : "white"             
}


let first_collision = true
function check_bounds_collision(target_square: number, pawn: boolean, selected_piece: square_type): boolean {
    // Hjälpfunktion som kollar om en pjäs rör sig inom brädet.
    function bounds_check():boolean {      
        return (target_square % 10 > 0 && target_square % 10 <= 8) && (target_square < 79 && target_square > 0) 
               ? true
               : false 
        
    }

    // Hjälpfunktion som kollar om en pjäs möter en annan pjäs.
    function collision_check(): boolean {
            if ((c_board[target_square].piece !== null)){
                if (selected_piece.piece.piece_color !== c_board[target_square].piece.piece_color && first_collision){
                    first_collision = false
                    return true
                } else{
                    return false
                }
            } else if (c_board[target_square].piece === null && first_collision) {
                return true
            } else {        
                return false
            }
    }

    function collision_check_pawn(): boolean{
            if (c_board[target_square].piece === null) {
                return false
            } else {
                return (selected_piece.piece.piece_color === c_board[target_square].piece.piece_color)
                       ? false
                       : true
            }
    }

    return pawn 
           ? bounds_check() && collision_check_pawn()
           : bounds_check() && collision_check()
}

// Kollar alla tillåtna värden på den valde pjäsen och sparar dessa i en array.
export function legal_move(selected_piece: square_type): Array<string>        
{                                                                           
    let current_square:number = parseInt(selected_piece.id)                           
    let legal_moves: Array<string> = []
    let working_square: number 
    let target_square: number
    const push = (target_square: number) => legal_moves.push(target_square.toString())
    
    switch (selected_piece.piece.piece_name)
    {
        case "Wpawn": 
            target_square = current_square + UP
            if (c_board[target_square].piece === null ){
                push(target_square)
            }
            
            target_square = current_square + UP_LEFT
            if (check_bounds_collision(target_square, true, selected_piece)) {
                push(target_square)
            }
            target_square = current_square + UP_RIGHT
            if (check_bounds_collision(target_square, true, selected_piece)) {
                push(target_square)
            }

            break; 

        
        case "Bpawn":
            target_square = current_square + DOWN
            if (c_board[target_square].piece === null) {
                push(target_square)
            }
            
            target_square = current_square + DOWN_LEFT
            if (check_bounds_collision(target_square, true, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + DOWN_RIGHT
            if (check_bounds_collision(target_square, true, selected_piece)) {
                push(target_square)
            }
                
            break; 

        

        case "Wking":
            target_square = current_square + UP
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }
        
            target_square = current_square + DOWN
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            } 

            target_square = current_square + LEFT
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + RIGHT 
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + UP_LEFT
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + UP_RIGHT 
                   if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + DOWN_LEFT 
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + DOWN_RIGHT    
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            } 

        break;
    
        case "Bking":
            target_square = current_square + UP
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + DOWN
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            } 

            target_square = current_square + LEFT
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + RIGHT 
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + UP_LEFT
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + UP_RIGHT 
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            } 

            target_square = current_square + DOWN_LEFT
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }
        
            target_square = current_square + DOWN_RIGHT       
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

        break;
          
        case "Wrook":
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + UP, false, selected_piece)){
                working_square = working_square + UP
                push(working_square)
            }
        
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN, false, selected_piece)){
                working_square = working_square + DOWN
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + LEFT, false, selected_piece)){
                working_square = working_square + LEFT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + RIGHT, false, selected_piece)){
                working_square = working_square + RIGHT
                push(working_square)
            }
            
        break; 

        case "Brook":
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + UP, false, selected_piece)){
                working_square = working_square + UP
                push(working_square)
            }
        
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN, false, selected_piece)){
                working_square = working_square + DOWN
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + LEFT, false, selected_piece)){
                working_square = working_square + LEFT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + RIGHT, false, selected_piece)){
                working_square = working_square + RIGHT
                push(working_square)
            }
            
        break; 

        case "Wbishop":
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN_RIGHT, false, selected_piece)){
                working_square = working_square + DOWN_RIGHT
                push(working_square)
            }
        
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN_LEFT, false, selected_piece)){
                working_square = working_square + DOWN_LEFT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + UP_RIGHT, false, selected_piece)){
                working_square = working_square + UP_RIGHT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + UP_LEFT, false, selected_piece)){
                working_square = working_square + UP_LEFT
                push(working_square)
            }

            break;

        case "Bbishop":
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN_RIGHT, false, selected_piece)){
                working_square = working_square + DOWN_RIGHT
                push(working_square)
            }
        
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN_LEFT, false, selected_piece)){
                working_square = working_square + DOWN_LEFT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + UP_RIGHT, false, selected_piece)){
                working_square = working_square + UP_RIGHT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + UP_LEFT, false, selected_piece)){
                working_square = working_square + UP_LEFT
                push(working_square)
            }

            break;
        
        case "Wqueen":
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN_RIGHT, false, selected_piece)){
                working_square = working_square + DOWN_RIGHT
                push(working_square)
            }
        
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN_LEFT, false, selected_piece)){
                working_square = working_square + DOWN_LEFT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + UP_RIGHT, false, selected_piece)){
                working_square = working_square + UP_RIGHT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + UP_LEFT, false, selected_piece)){
                working_square = working_square + UP_LEFT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + UP, false, selected_piece)){
                working_square = working_square + UP
                push(working_square)
            }
        
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN, false, selected_piece)){
                working_square = working_square + DOWN
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + LEFT, false, selected_piece)){
                working_square = working_square + LEFT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + RIGHT, false, selected_piece)){
                working_square = working_square + RIGHT
                push(working_square)
            }

        break;

        case "Bqueen":
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN_RIGHT, false, selected_piece)){
                working_square = working_square + DOWN_RIGHT
                push(working_square)
            }
        
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN_LEFT, false, selected_piece)){
                working_square = working_square + DOWN_LEFT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + UP_RIGHT, false, selected_piece)){
                working_square = working_square + UP_RIGHT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + UP_LEFT, false, selected_piece)){
                working_square = working_square + UP_LEFT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + UP, false, selected_piece)){
                working_square = working_square + UP
                push(working_square)
            }
        
            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + DOWN, false, selected_piece)){
                working_square = working_square + DOWN
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + LEFT, false, selected_piece)){
                working_square = working_square + LEFT
                push(working_square)
            }

            working_square = current_square
            first_collision = true
            while(check_bounds_collision(working_square + RIGHT, false, selected_piece)){
                working_square = working_square + RIGHT
                push(working_square)
            }

        break;
         
        case "Wknight":
            target_square = current_square + (UP * 2 + LEFT)
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + (UP * 2 + RIGHT)
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            } 

            target_square = current_square + (DOWN * 2 + LEFT)
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + (DOWN * 2 + RIGHT)
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            } 

            target_square = current_square + (LEFT * 2 + UP) 
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + (LEFT * 2 + DOWN) 
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + (RIGHT * 2 + UP) 
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + (RIGHT * 2 + DOWN)    
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

        break;


        case "Bknight":
            target_square = current_square + (UP * 2 + LEFT)
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + (UP * 2 + RIGHT)
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + (DOWN * 2 + LEFT)
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + (DOWN * 2 + RIGHT)
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            } 

            target_square = current_square + (LEFT * 2 + UP) 
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + (LEFT * 2 + DOWN) 
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + (RIGHT * 2 + UP) 
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

            target_square = current_square + (RIGHT * 2 + DOWN)    
            if (check_bounds_collision(target_square, false, selected_piece)) {
                push(target_square)
            }

        break;
        
    }
    return legal_moves
    
}