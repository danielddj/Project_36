import { move_piece_graphically } from "./graphics_handler";
import { 
    starting_pos, c_board, board, chess_box   
} from "./initial.config";

//Riktningar att röra sig.
const UP = -10
const DOWN = 10
const LEFT = -1
const RIGHT = 1
const UP_LEFT = -11
const UP_RIGHT = -9
const DOWN_LEFT = 9
const DOWN_RIGHT = 11



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




function bounds_check(current_square:number,direction:number):boolean      // Hjälpfunktion som kollar om en pjäs rör sig inom brädet.
{   
    return current_square + direction > 1 || current_square + direction < 78
    ?true
    :false
}

function collision_check(current_square:number,direction:number):boolean      // Hjälpfunktion som kollar om en pjäs möter en annan pjäs.
{       let destination = String(current_square + direction);
        
}


export function legal_move(selected_piece: chess_box): Array<string>        // Kollar alla tillåtna värden på den valde pjäsen och sparar dessa i en array.
{                                                                       
    let current_square:number = parseInt(selected_piece.id)                           
    let legal_moves: Array<string> = []
    
    switch (selected_piece.piece)
    {
        case "Wpawn":
            current_square += UP
            legal_moves.push(current_square.toString())
            break;
        
        case "Bpawn":
            current_square += DOWN
            legal_moves.push(current_square.toString())
            break; 

        

        case "Wking":
        if (bounds_check(current_square,UP))
        { 
        current_square += UP
        legal_moves.push(current_square.toString())
        }  
        else if (bounds_check(current_square,DOWN))
        {
         current_square += DOWN
         legal_moves.push(current_square.toString())   
        } 
        else if (bounds_check(current_square,LEFT))
        {
         current_square += LEFT
         legal_moves.push(current_square.toString())   
        } 
        else if (bounds_check(current_square,RIGHT))
        {
         current_square += RIGHT
         legal_moves.push(current_square.toString())   
        } 
        else if (bounds_check(current_square,UP_LEFT))
        {
         current_square += UP_LEFT
         legal_moves.push(current_square.toString())   
        } 
        else if (bounds_check(current_square,UP_RIGHT))
        {
         current_square += UP_RIGHT
         legal_moves.push(current_square.toString())   
        } 
        else if (bounds_check(current_square,DOWN_LEFT))
        {
         current_square += DOWN_LEFT
         legal_moves.push(current_square.toString())   
        }    
        else if (bounds_check(current_square,DOWN_RIGHT))
        {
         current_square += DOWN_RIGHT
         legal_moves.push(current_square.toString())   
        }  
        break;
        

        case "Bking":
        if (bounds_check(current_square,UP))
        { 
        current_square += UP
        legal_moves.push(current_square.toString())
        }  
        else if (bounds_check(current_square,DOWN))
        {
         current_square += DOWN
         legal_moves.push(current_square.toString())   
        } 
        else if (bounds_check(current_square,LEFT))
        {
         current_square += LEFT
         legal_moves.push(current_square.toString())   
        } 
        else if (bounds_check(current_square,RIGHT))
        {
         current_square += RIGHT
         legal_moves.push(current_square.toString())   
        } 
        else if (bounds_check(current_square,UP_LEFT))
        {
         current_square += UP_LEFT
         legal_moves.push(current_square.toString())   
        } 
        else if (bounds_check(current_square,UP_RIGHT))
        {
         current_square += UP_RIGHT
         legal_moves.push(current_square.toString())   
        } 
        else if (bounds_check(current_square,DOWN_LEFT))
        {
         current_square += DOWN_LEFT
         legal_moves.push(current_square.toString())   
        }    
        else if (bounds_check(current_square,DOWN_RIGHT))
        {
         current_square += DOWN_RIGHT
         legal_moves.push(current_square.toString())
        break;
        
        case "Wrook":
        for (let i = current_square; collision_check(current_square,UP) && bounds_check(current_square,UP)  ;i += 10)
            {
                legal_moves.push(current_square.toString())
            }
        
        for (let i = current_square; collision_check(current_square,DOWN) && bounds_check(current_square,DOWN); i -=10)
        {
            legal_moves.push(current_square.toString())
        }

        for (let i = current_square; collision_check(current_square,LEFT) && bounds_check(current_square,LEFT)  ;i -= 1)
        {
            legal_moves.push(current_square.toString())
        }

        for (let i = current_square; collision_check(current_square,RIGHT) && bounds_check(current_square,RIGHT)  ;i += 1)
        {
            legal_moves.push(current_square.toString())
        }
        
        for (let i = current_square; collision_check(current_square,DOWN) && bounds_check(current_square,DOWN)  ;i -= 10)

        {
            legal_moves.push(current_square.toString())
        }
        break; 

            
        case "Brook":
        for (let i = current_square; collision_check(current_square,UP) && bounds_check(current_square,UP) ;i += 10)
            {   current_square = i
                legal_moves.push(current_square.toString())
            }
        
        for (let i = current_square; collision_check(current_square,DOWN) && bounds_check(current_square,DOWN);i -=10)
        {
            legal_moves.push(current_square.toString())
        }

        for (let i = current_square; collision_check(current_square,LEFT) && bounds_check(current_square,LEFT)  ;i -= 1)
        {
            legal_moves.push(current_square.toString())
        }

        for (let i = current_square; collision_check(current_square,RIGHT) && bounds_check(current_square,RIGHT)  ;i += 1)
        {
            legal_moves.push(current_square.toString())
        }
        
        for (let i = current_square; collision_check(current_square,DOWN) && bounds_check(current_square,DOWN)  ;i -= 10)

        {
            legal_moves.push(current_square.toString())
        }
        break;
         
        default:
           break;
    }  

    console.log(legal_moves)
    return legal_moves
}

