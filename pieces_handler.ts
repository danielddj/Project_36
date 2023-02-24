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
    turn_count = turn_count + 1
    return (color === "white")
           ? "black" 
           : "white" 
            
}



function check_bounds_collision(target_square: number, pawn: boolean, color: string): boolean {
    function bounds_check():boolean {      // Hjälpfunktion som kollar om en pjäs rör sig inom brädet.
        return (target_square % 10 > 0 && target_square % 10 < 8) && (target_square < 79 && target_square > 0) 
               ? true
               : false 
        
    }

    function collision_check(): boolean {     // Hjälpfunktion som kollar om en pjäs möter en annan pjäs.
        return c_board[target_square].piece === null || color !== c_board[target_square].piece_color
               ? true
               : false       
    }

    function collision_check_pawn(): boolean{
        return c_board[target_square].piece !== null || color !== c_board[target_square].piece_color
               ? true
               : false 
    }

    return pawn 
           ? bounds_check() && collision_check_pawn()
           : bounds_check() && collision_check()
}


export function legal_move(selected_piece: square_type): Array<string>        // Kollar alla tillåtna värden på den valde pjäsen och sparar dessa i en array.
{                                                                           
    let current_square:number = parseInt(selected_piece.id)                           
    let legal_moves: Array<string> = []
    let working_square:number 
    let target_square:number
    const push = (target_square: number) => legal_moves.push(target_square.toString())
    
    switch (selected_piece.piece)
    {
        case "Wpawn": 

            target_square = current_square + UP
            if (c_board[target_square].piece === null ){
                push(target_square)
            }
            
            target_square = current_square + UP_LEFT
            if (check_bounds_collision(target_square, true, "white")) {
                push(target_square)
            }
            target_square = current_square + UP_RIGHT
            if (check_bounds_collision(target_square, true, "white")) {
                push(target_square)
            }

            break; 

        
        case "Bpawn":
            target_square = current_square + DOWN
            if (c_board[target_square].piece === null) {
                push(target_square)
            }
            
            target_square = current_square + DOWN_LEFT
            if (check_bounds_collision(target_square, true, "black")) {
                push(target_square)
            }

            target_square = current_square + DOWN_RIGHT
            if (check_bounds_collision(target_square, true, "black")) {
                push(target_square)
            }
                
            break; 

        

        case "Wking":
            
            target_square = current_square + UP
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }
        
            target_square = current_square + DOWN
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            } 

            target_square = current_square + LEFT
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }

            target_square = current_square + RIGHT 
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }

            target_square = current_square + UP_LEFT
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }

            target_square = current_square + UP_RIGHT 
                   if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }

            target_square = current_square + DOWN_LEFT 
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }

            target_square = current_square + DOWN_RIGHT    
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            } 

        break;
    
        

        case "Bking":
            target_square = current_square + UP
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

            target_square = current_square + DOWN
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            } 

            target_square = current_square + LEFT
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

            target_square = current_square + RIGHT 
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

            target_square = current_square + UP_LEFT
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

            target_square = current_square + UP_RIGHT 
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            } 

            target_square = current_square + DOWN_LEFT
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }
        
            target_square = current_square + DOWN_RIGHT       
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

        break;
        
        
        case "Wrook":
            working_square = current_square
            while(check_bounds_collision(working_square + UP, false, "white")){
                working_square = working_square + UP
                push(working_square)
            }
        
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN, false, "white")){
                working_square = working_square + DOWN
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + LEFT, false, "white")){
                working_square = working_square + LEFT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + RIGHT, false, "white")){
                working_square = working_square + RIGHT
                push(working_square)
            }
            
        break; 

          
        case "Brook":
            working_square = current_square
            while(check_bounds_collision(working_square + UP, false, "black")){
                working_square = working_square + UP
                push(working_square)
            }
        
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN, false, "black")){
                working_square = working_square + DOWN
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + LEFT, false, "black")){
                working_square = working_square + LEFT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + RIGHT, false, "black")){
                working_square = working_square + RIGHT
                push(working_square)
            }
            
        break; 

        case "Wbishop":
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN_RIGHT, false, "white")){
                working_square = working_square + DOWN_RIGHT
                push(working_square)
            }
        
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN_LEFT, false, "white")){
                working_square = working_square + DOWN_LEFT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + UP_RIGHT, false, "white")){
                working_square = working_square + UP_RIGHT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + UP_LEFT, false, "white")){
                working_square = working_square + UP_LEFT
                push(working_square)
            }

            break;

        case "Bbishop":
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN_RIGHT, false, "black")){
                working_square = working_square + DOWN_RIGHT
                push(working_square)
            }
        
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN_LEFT, false, "black")){
                working_square = working_square + DOWN_LEFT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + UP_RIGHT, false, "black")){
                working_square = working_square + UP_RIGHT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + UP_LEFT, false, "black")){
                working_square = working_square + UP_LEFT
                push(working_square)
            }

            break;
        
        case "Wqueen":
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN_RIGHT, false, "white")){
                working_square = working_square + DOWN_RIGHT
                push(working_square)
            }
        
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN_LEFT, false, "white")){
                working_square = working_square + DOWN_LEFT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + UP_RIGHT, false, "white")){
                working_square = working_square + UP_RIGHT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + UP_LEFT, false, "white")){
                working_square = working_square + UP_LEFT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + UP, false, "white")){
                working_square = working_square + UP
                push(working_square)
            }
        
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN, false, "white")){
                working_square = working_square + DOWN
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + LEFT, false, "white")){
                working_square = working_square + LEFT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + RIGHT, false, "white")){
                working_square = working_square + RIGHT
                push(working_square)
            }

        break;

        case "Bqueen":
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN_RIGHT, false, "white")){
                working_square = working_square + DOWN_RIGHT
                push(working_square)
            }
        
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN_LEFT, false, "white")){
                working_square = working_square + DOWN_LEFT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + UP_RIGHT, false, "white")){
                working_square = working_square + UP_RIGHT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + UP_LEFT, false, "white")){
                working_square = working_square + UP_LEFT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + UP, false, "white")){
                working_square = working_square + UP
                push(working_square)
            }
        
            working_square = current_square
            while(check_bounds_collision(working_square + DOWN, false, "white")){
                working_square = working_square + DOWN
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + LEFT, false, "white")){
                working_square = working_square + LEFT
                push(working_square)
            }

            working_square = current_square
            while(check_bounds_collision(working_square + RIGHT, false, "white")){
                working_square = working_square + RIGHT
                push(working_square)
            }
            
        break;
         
        case "Wknight":
            target_square = current_square + (UP * 2 + LEFT)
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }

            target_square = current_square + (UP * 2 + RIGHT)
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            } 

            target_square = current_square + (DOWN * 2 + LEFT)
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }

            target_square = current_square + (DOWN * 2 + RIGHT)
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            } 

            target_square = current_square + (LEFT * 2 + UP) 
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }

            target_square = current_square + (LEFT * 2 + DOWN) 
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }

            target_square = current_square + (RIGHT * 2 + UP) 
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }

            target_square = current_square + (RIGHT * 2 + DOWN)    
            if (check_bounds_collision(target_square, false, "white")) {
                push(target_square)
            }

        break;


        case "Bknight":
            target_square = current_square + (UP * 2 + LEFT)
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

            target_square = current_square + (UP * 2 + RIGHT)
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

            target_square = current_square + (DOWN * 2 + LEFT)
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

            target_square = current_square + (DOWN * 2 + RIGHT)
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            } 

            target_square = current_square + (LEFT * 2 + UP) 
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

            target_square = current_square + (LEFT * 2 + DOWN) 
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

            target_square = current_square + (RIGHT * 2 + UP) 
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

            target_square = current_square + (RIGHT * 2 + DOWN)    
            if (check_bounds_collision(target_square, false, "black")) {
                push(target_square)
            }

        break;
        
    }  

    console.log(legal_moves)
    return legal_moves
}

