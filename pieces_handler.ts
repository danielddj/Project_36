import { 
    display_message, move_piece_graphically 
} from "./graphics_handler";

import { 
    board_type, square_type, c_board, king_tracker, piece
} from "./initial.config";

import { 
    DOWN, DOWN_LEFT, DOWN_RIGHT, LEFT, RIGHT, UP, UP_LEFT, UP_RIGHT, first_char, second_char 
} from "./utilites";

/** Takes a list of all the pieces and the id where they are supposed to be and
 * writes them to our data structure. It is done this way to make it easier to,
 * start in different scenarios and not the normal one.
 * @precondition That the wanted starting position is a non empty object of
 * board_type and all the pieces in starting_pos is with in the 8x8 board
  * @param {board_type} c_board The starting position of each piece. 
  * @returns c_board with all the pieces in the corresponding slot.
  */

export function intitial_game(starting_pos: board_type): board_type{
    Object.keys(starting_pos).forEach(val => {
        c_board[val].piece = starting_pos[val].piece;
        (c_board[val].piece as piece).piece_color = (starting_pos[val].piece as piece).piece_color;
    });

    Object.keys(starting_pos).forEach(val => {
        (c_board[val].piece as piece).moves = legal_move(c_board[val], c_board);
    });

    return c_board;
}

/** Updates the variable Wking_slot and Bking_slot, after the king has moved
 * @precondition Color is either "white" or "black" and to is an existing square
 * on the board
 * @param {to} string The position the king is moving to. 
  * @param {from} string The position the king is moving from.
  * @example update_king_slot(2, 3) Changes the id stored in kingtracker from "3" to "2"
  * @returns void, only assignment 
  */

function update_king_slot(to: string, color: string): void{
    if (color === "white") {
        king_tracker.Wking.id = to;
    } else {
        king_tracker.Bking.id = to;
    }
}


/** Moves the pieces in the data structure and also calls the move_piece_graphically function
 * @precondition To and from must be existing squares, and c_board[from] must have a piece in it.
  * @param {string} to The ID of the square where the piece is moving to.
  * @param {string} from The ID of the square where the piece is moving from.
  * @param {board_type} c_board The data structure. 
  * @example move_piece(3, 2) changes the position of the piece stored in two to three,
  * and then deletes the piece from square 2
  * @returns Void only assignment
  */

export function move_piece(to:string, from: string): void{   
    if (((c_board[from].piece as piece).piece_name === "Wking" || (c_board[from].piece as piece).piece_name === "Bking") && 
        (from === "5" || from === "75") && (to === "1" || to === "8" || to === "78" || to === "71")) {
        if (to === "78"){
            move_piece("77", "75");
            move_piece("76", "78");
        }
        if (to === "71") {
            move_piece("73", "75");
            move_piece("74", "71"); 
        }
        if (to === "1"){
            move_piece("4", "1");
            move_piece("3", "5");
        }  
        if (to === "8" ){  
            move_piece("7", "5");
            move_piece("6", "8");
        }  
    } else {
        c_board[to].piece = c_board[from].piece;
        c_board[from].piece = null;
        move_piece_graphically(to, from);
        (c_board[to].piece as piece).times_moved = (c_board[to].piece as piece).times_moved + 1;

        if((c_board[to].piece as piece).piece_name === "Wking") {
            update_king_slot(to, "white");
        } else if((c_board[to].piece as piece).piece_name === "Bking") {
            update_king_slot(to, "black");
        }
    }
    update_moves();
}


/** Updates the legal moves for each piece when it is called
 * also check if the king is in check position, if this is the
 * case it checks if it is check mate.
 * @precondition Non
  * @returns void, only assignment 
  */

function update_moves(): void{
    Object.keys(c_board).forEach(val => {
        if (c_board[val].piece !== null) {
            const legal_moves = legal_move(c_board[val], c_board);
            (c_board[val].piece as piece).moves = legal_moves;
        }
    });
    check_check();

    if (king_tracker.Wking.under_check) {
        check_move_out("white");
    } else if (king_tracker.Bking.under_check) {
        check_move_out("black");
    } else {
        display_message("");
    }
}

/** Changes the color of the one who is moving next.
 * @precondition Color is either "white" or "black"
  * @param {string} color The color of the one who did the move
  * @example returns white, when called with black.
  * @returns The color of the one who is moving next
  */

export function invert_move(color: string): string {
    if (color === "white"){
        (document.getElementById("turn") as HTMLElement).innerHTML = "Blacks turn";
        return "black";
    } else { 
        (document.getElementById("turn") as HTMLElement).innerHTML = "Whites turn";
        return "white";
     }             
}

/** Calculates where the king is in reference to the piece that is checking it
 * @precondition Color is either "white" or "black", and there exist a piece located at id and it
 * is putting the king under check
  * @param {string} checking_square The square of the piece putting the king under check
  * @param {string} color The color of the king under check
  * @example When white king is located at square 1, and the threatening piece a rook at square 5
  * eg. checking_direction(5, "white") it returns Left and left corresponds to -1  
  * @returns The number corresponding to the directon of the check
  */

function checking_direction(checking_square: string, color: string): number {
    const slot = (color: string) => {return color === "white" ? king_tracker.Wking.id : king_tracker.Bking.id};
    const king_square_int = parseInt(slot(color));
    const checking_square_int = parseInt(checking_square);
    if (checking_square_int % 10 === king_square_int % 10) {
        return checking_square_int < king_square_int
            ? DOWN
            : UP;
    } 
    else if (first_char(checking_square_int) === first_char(king_square_int) 
            || (checking_square_int  <= 8 && king_square_int <= 8)) {
        return checking_square_int - king_square_int > 0
            ? LEFT
            : RIGHT;
    } 
    else if ((second_char(checking_square_int) as number) < (second_char(king_square_int) as number)){
        return checking_square_int - king_square_int < 0
            ? DOWN_RIGHT
            : UP_RIGHT;
    } else {
        return checking_square_int - king_square_int < 0
            ? DOWN_LEFT
            : UP_LEFT;
        }  
}

/** Calculates the squares that if moved to interupts a check. As an example the squares inbetween
 * a king and a rook of the oposite color
 * @precondition Color is either "white" or "black", and there exist a piece located at id and it
 * is putting the king under check
  * @param {string} id The square of the piece putting the king under check
  * @param {string} color The color of the king under check
  * @example When white king is located at square 1, and the threatening piece a rook at square 5
  * eg. in_checking_dir(5, "white") it returns ["5", "4", "3", "2"] 
  * @returns Array with all the squares that when moved to interups the check
  */

function in_checking_dir(color: string, id: number) {
    const slot = () => {return color === "white" ? king_tracker.Wking : king_tracker.Bking};
    let disrupt_moves: Array<string> = [];
    const dir = checking_direction(slot().id, color);
    
    if (dir === LEFT) {
        (slot().checking_piece.piece as piece).moves.forEach(val => {
            const val_as_int = parseInt(first_char(val) as string);
            if (val_as_int === first_char(id) && val_as_int - id < 0) {
                disrupt_moves.push(val);
            }
        });
    }
        
    if (dir === RIGHT) {
        (slot().checking_piece.piece as piece).moves.forEach(val => {
            const val_as_int = parseInt(first_char(val) as string);
            if (val_as_int === first_char(id) && val_as_int - id > 0) {
                disrupt_moves.push(val);    
            }
        });
    }

    if (dir === DOWN) {
        (slot().checking_piece.piece as piece).moves.forEach(val => {
            const val_as_int = parseInt(first_char(val) as string);
            if (second_char(val_as_int) === second_char(id) && val_as_int - id < 0) {
                disrupt_moves.push(val);    
            }
        });
    }
        
    if (dir === DOWN) {
        (slot().checking_piece.piece as piece).moves.forEach(val => {
            const val_as_int = parseInt(first_char(val) as string);
            if (second_char(val_as_int) === second_char(id) && val_as_int - id > 0) {
                disrupt_moves.push(val);    
            }
        });
    }

    if (dir === UP_RIGHT) {
        for(let i = id; bounds_check(i); i + UP_RIGHT){
            disrupt_moves.push(i.toString());   
        }
    }

    if (dir === UP_LEFT) {
        for(let i = id; bounds_check(i); i + UP_LEFT){
            disrupt_moves.push(i.toString());   
        }
    }

    if (dir === DOWN_LEFT) {
        for(let i = id; bounds_check(i); i + UP_RIGHT){
            disrupt_moves.push(i.toString());   
        }
    }

    if (dir === DOWN_RIGHT) {
        for(let i = id; bounds_check(i); i + UP_RIGHT){
            disrupt_moves.push(i.toString());   
        }
    }
        return disrupt_moves;     
}

/** Updates the king_tracker to add or remove a piece checking the king
 * @precondition Color is either "white" or "black", and there exist a piece at id
  * @param {string} id The square of the piece putting the king under check
  * @param {string} color The color of the witch king_tracker that is being updated
  * @param {string} remove If the information about the piece putting the king under check
  * is supposed to be removed or not
  * @returns Void
  */

function update_check(id: string, color: string, remove: boolean): void{
    const slot = () => {return color === "white" ? king_tracker.Wking : king_tracker.Bking}; 
    if(!remove){
        slot().checking_piece.piece = c_board[id].piece;
        slot().checking_piece.id = id;
        slot().under_check = true;
    } else {
        slot().checking_piece.piece = null;
        slot().checking_piece.id = null;
        slot().under_check = false;
    }
}

/** Checks if the king is under check or not
  * is supposed to be removed or not
  * @precondition There exist two kings on the chessboard
  * @returns Void only assingment
  */

function check_check(): void {
    ["white", "black"].forEach(color => {    
    const slot = () => {return color === "white" ? king_tracker.Wking : king_tracker.Bking}; 
    Object.keys(c_board).every(id => {
        if (c_board[id].piece !== null && (c_board[id].piece as piece).moves.includes(slot().id)) {
            if (color === "white"){
                update_check(id, color, false);
                return false;
            } else {
                update_check(id, color, false);
                return false;
            } 
        } else {
            update_check(id, color, true);
            display_message("");
            return true;
        }
    });

    return color === "white" 
        ? slot().under_check
        : slot().under_check});
}

/** Checks if the king can make its way out of check posion. And displays the right message. 
 * @precondition Color is either "white" or "black" and that king is under check
  * @param {string} color The color of the the king that is being checked
  * is supposed to be removed or not
  * @returns Void
  */


function check_move_out(color: string): void {
    const slot = () => {return color === "white" ? king_tracker.Wking : king_tracker.Bking};

    if ((c_board[slot().id].piece as piece).moves.length !== 0) {
        display_message("Under check");
    } else if (Object.keys(can_block_check(color)).length !== 0) {
        display_message("Under check");
    } else {
        display_message(`${invert_move(color)} won!`);
    }
}

/** Checks if there is a piece that can either take the checking piece or move into the
 * checking lane
 * @precondition The king is under check and color is "white" or "black"
  * @param {string} color The color of the king being checked
  * @example When white king is located at square 1, white queen at 25 and the threatening piece a rook at square 5
  * it returns ["5", "4"] because these moves interupt the check
  * @returns A key value pair with the piece that can interupt the check and with 
  * witch moves
  */

function can_block_check(color: string): {[key: string]: Array<string>} {
    const slot = () => {return color === "white" ? king_tracker.Wking : king_tracker.Bking};
    const disrupt_moves: {[key: string]: Array<string>} = {};
    Object.keys(c_board).forEach(id => {
        if (c_board[id].piece !== null && (slot().checking_piece.piece as piece).piece_color !== (c_board[id].piece as piece).piece_color 
            && ((c_board[id].piece as piece).moves.some(r => in_checking_dir(color, parseInt((slot().checking_piece.id as string))).includes(r)) 
            || (c_board[id].piece as piece).moves.includes(slot().checking_piece.id as string))) {
                disrupt_moves[id] = (((c_board[id].piece as piece).moves.filter(id => {return id === slot().checking_piece.id as string 
                                    || in_checking_dir(color, parseInt(slot().checking_piece.id as string)).includes(id)})));
        }
    });
    return disrupt_moves;
}



/** Checks if a given square is a square on the chessboard
 * @precondition None
  * @param {number} target_square The number of the square being checked
  * @example bounds_check(1000) returns false 
  * @returns Boolean
  */

function bounds_check(target_square: number):boolean {      
    return (target_square % 10 > 0 && target_square % 10 <= 8) && (target_square < 79 && target_square > 0) 
            ? true
            : false;     
}

/** Checks if there occurs a collision between pieces and when a piece hits the edge of the board
 * @precondition Selected_piece exist on the board, and the board is of a standard 8x8 type
  * @param {number} target_square The number of the square being checked 
  * @param {boolean} pawn if it is a pawn or not
  * @param {square_type} selected_piece. The piece that is being checked
  * @param {board_type} board The board that is being checked
  * @returns Boolean
  */

let first_collision = true
function check_bounds_collision(target_square: number, pawn: boolean, selected_piece: square_type, board: board_type): boolean {
    // Hjälpfunktion som kollar om en pjäs möter en annan pjäs.
    function collision_check(): boolean {
            if ((board[target_square].piece !== null)){
                if ((selected_piece.piece as piece).piece_color !== (board[target_square].piece as piece).piece_color && first_collision){
                    first_collision = false;
                    return true;
                } else{
                    return false;
                }
            } else if (board[target_square].piece === null && first_collision) {
                return true;
            } else {        
                return false;
            }
    }

    function collision_check_pawn(): boolean{
            if (board[target_square].piece === null) {
                return false;
            } else {
                return ((selected_piece.piece as piece).piece_color === (board[target_square].piece as piece).piece_color)
                    ? false
                    : true;
            }
    }

    return pawn
           ? bounds_check(target_square) && collision_check_pawn()
           : bounds_check(target_square) && collision_check();
}

/** Checks if there occurs a collision between the king and the rook in case of castling
 * @precondition color is either "white" or "black" and direction is left or right
  * @param {string} color The color of king being checked
  * @param {number} direction the direction of the castling move
  * @example If there is pieces between the rook and the king it returns false, 
  * it returns true if there are no pieces between them.
  * @returns Boolean
  */

function collosion_check_castling(color: string, direction: string): boolean {
    let foo = () => {return color === "white" ? 75 : 5};
    let slot = foo();
    if(direction === "left"){
        while(c_board[(slot - 1).toString()].piece === null) {
            if(slot === 3 || slot === 73) {
                return true;
            } else {
                slot = slot - 1;
            }
        } 
    } 

    if(direction === "right"){
        while(c_board[(slot + 1).toString()].piece === null) {
            if(slot === 6 || slot === 76) {
                return true;
            } else {
                slot = slot + 1;
            }
        } 
    } 
    return false;
}

/** Calculates the legal moves for a piece
 * @precondition selected_piece exist on the chessboard
  * @param {string} selected_piece Which piece legal moves should be calculated for
  * @param {number} board What datastructure it should look in

  * @returns Boolean
  */
 
 export function legal_move (selected_piece: square_type, board: board_type): Array<string> {
    function legal_move_square(selected_piece: square_type, board: board_type): Array<string> {                                                                           
        let current_square: number = parseInt(selected_piece.id);                           
        let legal_moves: Array<string> = [];
        let working_square: number 
        let target_square: number
        const add_move = (target_square: number) => {if (first_collision = true, check_bounds_collision(target_square, false, selected_piece, board)){
                                                        legal_moves.push(target_square.toString())
                                                    }};


        const push = (target_square: number) => {legal_moves.push(target_square.toString())};
                                                    
        
        switch ((selected_piece.piece as piece).piece_name) {

            case "Wpawn":
                target_square = current_square + UP;
                if (board[target_square].piece === null ){
                    push(target_square);
                }
                
                if ((selected_piece.piece as piece).times_moved === 0 && board[current_square + (UP * 2)].piece === null
                    && c_board[(current_square - 10).toString()].piece === null){
                        push(current_square + (UP * 2));     
                }

                target_square = current_square + UP_LEFT;
                first_collision = true;
                    if (check_bounds_collision(target_square, true, selected_piece, board)) {
                        push(target_square);
                    }

                target_square = current_square + UP_RIGHT;
                first_collision = true;
                    if (check_bounds_collision(target_square, true, selected_piece, board)) {
                        push(target_square);
                    }

                break; 

            
            case "Bpawn":
                target_square = current_square + DOWN;
                if (board[target_square].piece === null) {
                    push(target_square);
                }

                if ((selected_piece.piece as piece).times_moved === 0 && board[current_square + (DOWN * 2)].piece === null 
                    && c_board[(current_square + 10).toString()].piece === null){
                        push(current_square + (DOWN * 2));
                }
                
                target_square = current_square + DOWN_LEFT;
                first_collision = true;
                    if (check_bounds_collision(target_square, true, selected_piece, board)) {
                        push(target_square);
                    }
                

                target_square = current_square + DOWN_RIGHT;
                first_collision = true;
                    if (check_bounds_collision(target_square, true, selected_piece, board)) {
                        push(target_square);
                    }
                    
                break; 

            

            case "Wking":
                target_square = current_square + UP;
                add_move(target_square);
            
                target_square = current_square + DOWN;
                add_move(target_square);

                target_square = current_square + LEFT;
                add_move(target_square);

                target_square = current_square + RIGHT;
                add_move(target_square);

                target_square = current_square + UP_LEFT;
                add_move(target_square);

                target_square = current_square + UP_RIGHT;
                add_move(target_square);

                target_square = current_square + DOWN_LEFT;
                add_move(target_square);

                target_square = current_square + DOWN_RIGHT;  
                add_move(target_square);

                if ((selected_piece.piece as piece).times_moved === 0 && c_board["78"].piece !== null && c_board["78"].piece.times_moved === 0 && collosion_check_castling("white", "right")){
                    push(78);
                }

                if ((selected_piece.piece as piece).times_moved === 0 && c_board["71"].piece !== null && c_board["71"].piece.times_moved === 0 && collosion_check_castling("white", "left")){
                    push(71);
                }

            break;
        
            case "Bking":
                target_square = current_square + UP
                add_move(target_square);

                target_square = current_square + DOWN
                add_move(target_square);

                target_square = current_square + LEFT
                add_move(target_square);

                target_square = current_square + RIGHT
                add_move(target_square);

                target_square = current_square + UP_LEFT
                add_move(target_square);

                target_square = current_square + UP_RIGHT 
                add_move(target_square);

                target_square = current_square + DOWN_LEFT
                add_move(target_square);
            
                target_square = current_square + DOWN_RIGHT
                add_move(target_square);

                if ((selected_piece.piece as piece).times_moved === 0 && c_board["8"].piece !== null && c_board["8"].piece.times_moved === 0 && collosion_check_castling("black", "right")){
                    push(8);
                }

                if ((selected_piece.piece as piece).times_moved === 0 && c_board["1"].piece !== null && c_board["1"].piece.times_moved === 0 && collosion_check_castling("black", "left")){
                    push(1);
                }

            break;
            
            case "Wrook":
                working_square = current_square;

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP, false, selected_piece, board)){
                    working_square = working_square + UP;
                    push(working_square);
                }
            
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN, false, selected_piece, board)){
                    working_square = working_square + DOWN;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + LEFT, false, selected_piece, board)){
                    working_square = working_square + LEFT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + RIGHT, false, selected_piece, board)){
                    working_square = working_square + RIGHT;
                    push(working_square);
                }
                
            break; 

            case "Brook":
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP, false, selected_piece, board)){
                    working_square = working_square + UP;
                    push(working_square);
                }
            
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN, false, selected_piece, board)){
                    working_square = working_square + DOWN
                    push(working_square)
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + LEFT, false, selected_piece, board)){
                    working_square = working_square + LEFT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + RIGHT, false, selected_piece, board)){
                    working_square = working_square + RIGHT;
                    push(working_square);
                }
                
            break; 

            case "Wbishop":
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN_RIGHT, false, selected_piece, board)){
                    working_square = working_square + DOWN_RIGHT;
                    push(working_square);
                }
            
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN_LEFT, false, selected_piece, board)){
                    working_square = working_square + DOWN_LEFT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP_RIGHT, false, selected_piece, board)){
                    working_square = working_square + UP_RIGHT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP_LEFT, false, selected_piece, board)){
                    working_square = working_square + UP_LEFT;
                    push(working_square);
                }

                break;

            case "Bbishop":
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN_RIGHT, false, selected_piece, board)){
                    working_square = working_square + DOWN_RIGHT;
                    push(working_square);
                }
            
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN_LEFT, false, selected_piece, board)){
                    working_square = working_square + DOWN_LEFT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP_RIGHT, false, selected_piece, board)){
                    working_square = working_square + UP_RIGHT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP_LEFT, false, selected_piece, board)){
                    working_square = working_square + UP_LEFT;
                    push(working_square);
                }

                break;
            
            case "Wqueen":
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN_RIGHT, false, selected_piece, board)){
                    working_square = working_square + DOWN_RIGHT;
                    push(working_square);
                }
            
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN_LEFT, false, selected_piece, board)){
                    working_square = working_square + DOWN_LEFT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP_RIGHT, false, selected_piece, board)){
                    working_square = working_square + UP_RIGHT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP_LEFT, false, selected_piece, board)){
                    working_square = working_square + UP_LEFT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP, false, selected_piece, board)){
                    working_square = working_square + UP;
                    push(working_square);
                }
            
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN, false, selected_piece, board)){
                    working_square = working_square + DOWN;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + LEFT, false, selected_piece, board)){
                    working_square = working_square + LEFT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + RIGHT, false, selected_piece, board)){
                    working_square = working_square + RIGHT;
                    push(working_square);
                }

            break;

            case "Bqueen":
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN_RIGHT, false, selected_piece, board)){
                    working_square = working_square + DOWN_RIGHT;
                    push(working_square);
                }
            
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN_LEFT, false, selected_piece, board)){
                    working_square = working_square + DOWN_LEFT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP_RIGHT, false, selected_piece, board)){
                    working_square = working_square + UP_RIGHT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP_LEFT, false, selected_piece, board)){
                    working_square = working_square + UP_LEFT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + UP, false, selected_piece, board)){
                    working_square = working_square + UP;
                    push(working_square);
                }
            
                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + DOWN, false, selected_piece, board)){
                    working_square = working_square + DOWN;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + LEFT, false, selected_piece, board)){
                    working_square = working_square + LEFT;
                    push(working_square);
                }

                working_square = current_square;
                first_collision = true;
                while(check_bounds_collision(working_square + RIGHT, false, selected_piece, board)){
                    working_square = working_square + RIGHT;
                    push(working_square);
                }

            break;
            
            case "Wknight":
                target_square = current_square + (UP * 2 + LEFT);
                add_move(target_square);

                target_square = current_square + (UP * 2 + RIGHT);
                add_move(target_square);

                target_square = current_square + (DOWN * 2 + LEFT);
                add_move(target_square);

                target_square = current_square + (DOWN * 2 + RIGHT);
                add_move(target_square);

                target_square = current_square + (LEFT * 2 + UP); 
                add_move(target_square);

                target_square = current_square + (LEFT * 2 + DOWN);
                add_move(target_square);

                target_square = current_square + (RIGHT * 2 + UP); 
                add_move(target_square);

                target_square = current_square + (RIGHT * 2 + DOWN);    
                add_move(target_square);

            break;


            case "Bknight":
                target_square = current_square + (UP * 2 + LEFT);
                add_move(target_square);

                target_square = current_square + (UP * 2 + RIGHT);
                add_move(target_square);

                target_square = current_square + (DOWN * 2 + LEFT);
                add_move(target_square);

                target_square = current_square + (DOWN * 2 + RIGHT);
                add_move(target_square);

                target_square = current_square + (LEFT * 2 + UP); 
                add_move(target_square);

                target_square = current_square + (LEFT * 2 + DOWN); 
                add_move(target_square);

                target_square = current_square + (RIGHT * 2 + UP); 
                add_move(target_square);

                target_square = current_square + (RIGHT * 2 + DOWN);    
                add_move(target_square);

            break;
            
        }
        
        return legal_moves;
        
    }

    function move_into_check(legal_moves: Array<string>): Array<string> {     
            let illegal_moves: Array<string> = [];
            const slot = () => {return (selected_piece.piece as piece).piece_color === "black" ? king_tracker.Bking : king_tracker.Wking}; 

            legal_move_square(selected_piece, c_board).forEach(target_square => {
                let cloned_array: board_type = JSON.parse(JSON.stringify(c_board));
                cloned_array[target_square].piece = selected_piece.piece;
                cloned_array[selected_piece.id].piece = null;

                Object.keys(cloned_array).forEach(val => {
                    if (cloned_array[val].piece !== null) {
                        const legal_moves = legal_move_square(cloned_array[val], cloned_array);
                        (cloned_array[val].piece as piece).moves = legal_moves;
                    }
                });

                Object.keys(cloned_array).forEach(val => {
                    const square = cloned_array[val];
                    if (square.piece !== null && (square.piece as piece).piece_color !== (selected_piece.piece as piece).piece_color 
                    && ((selected_piece.piece as piece).piece_name === "Wking" || (selected_piece.piece as piece).piece_name === "Bking") 
                    && (cloned_array[val].piece as piece).moves.includes(target_square)) {
                        illegal_moves.push(target_square);
                    }
                    else if (square.piece !== null && !((selected_piece.piece as piece).piece_name === "Wking" 
                            || (selected_piece.piece as piece).piece_name === "Bking") 
                            && (square.piece as piece).piece_color !== (selected_piece.piece as piece).piece_color 
                            && ((cloned_array[val].piece as piece).moves.includes(slot().id))) {
                        illegal_moves.push(target_square);
                    }
                });
            });

        return legal_moves.filter(foo => !illegal_moves.includes(foo));
    }

    return move_into_check(legal_move_square(selected_piece, board));
}