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




function bounds_check(target_square:number):boolean      // Hjälpfunktion som kollar om en pjäs rör sig inom brädet.
{   
    return target_square > 1 || target_square < 78
    ?true
    :false 
    
}

function collision_check(target_square:number):boolean      // Hjälpfunktion som kollar om en pjäs möter en annan pjäs.
{
   return c_board[target_square].piece === null || c_board[target_square].piece_color !== c_board[target_square].piece_color
   ?true
   :false 
        
}




export function legal_move(selected_piece: chess_box): Array<string>        // Kollar alla tillåtna värden på den valde pjäsen och sparar dessa i en array.
{                                                                           // TODO: pawns kan bara ta andra pjäser diagonalt och gå två steg första draget.
    let current_square:number = parseInt(selected_piece.id)                           
    let legal_moves: Array<string> = []
    let working_square:number 
    let target_square:number
    switch (selected_piece.piece)
    {
        case "Wpawn":
            target_square = current_square + UP
            if (bounds_check(target_square) || collision_check(target_square) )
            legal_moves.push(target_square.toString())
            break;
        
        case "Bpawn":
            target_square = current_square + DOWN
            if (bounds_check(target_square) || collision_check(target_square) )
            legal_moves.push(target_square.toString())
            break; 

        

        case "Wking":
            target_square = current_square + UP
        if (bounds_check(target_square) && collision_check(target_square))
        {
        legal_moves.push(target_square.toString())
        }
        target_square = current_square + DOWN
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        } 
        target_square = current_square + LEFT
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + RIGHT 
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        } 
        target_square = current_square + UP_LEFT
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + UP_RIGHT 
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + DOWN_LEFT 
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + DOWN_RIGHT    
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }  
        break;
    
        

        case "Bking":
            target_square = current_square + UP
        if (bounds_check(target_square) && collision_check(target_square))
        {
        legal_moves.push(target_square.toString())
        }
        target_square = current_square + DOWN
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        } 
        target_square = current_square + LEFT
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + RIGHT 
        if (bounds_check(target_square) && collision_check(target_square))
        {
            
         legal_moves.push(target_square.toString())   
        } 
        target_square = current_square + UP_LEFT
        if (bounds_check(target_square) && collision_check(target_square))
        {
            
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + UP_RIGHT 
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        } 
        target_square = current_square + DOWN_LEFT
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        
        target_square = current_square + DOWN_RIGHT       
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        break;
        
        
        case "Wrook":
        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP)
        {
                legal_moves.push(working_square.toString())
        }
        
        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + DOWN)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + LEFT)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + RIGHT)
        {
            legal_moves.push(working_square.toString())
        }
        break; 

            
        case "Brook":
        for(working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP)
            {
                legal_moves.push(working_square.toString())
            }
        
        for (working_square = current_square ; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + DOWN)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + LEFT)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + RIGHT)
        {
            legal_moves.push(working_square.toString())
        }

        case "Wbishop":
        for(working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP_LEFT)
            {
                legal_moves.push(working_square.toString())
            }
        
        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP_RIGHT)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + DOWN_LEFT)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + DOWN_RIGHT)
        {
            legal_moves.push(working_square.toString())
        }

        case "Bbishop":
        for(working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP_LEFT)
            {
                legal_moves.push(working_square.toString())
            }
        
        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP_RIGHT)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + DOWN_LEFT)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + DOWN_RIGHT)
        {
            legal_moves.push(working_square.toString())
        }
        
        case "Wqueen":
        for(working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP)
        {
            legal_moves.push(working_square.toString())
        }
        
        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + DOWN)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + LEFT)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + RIGHT)
        {
            legal_moves.push(working_square.toString())
        }
        for(working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP_LEFT)
            {
                legal_moves.push(working_square.toString())
            }
        
        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP_RIGHT)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + DOWN_LEFT)
        {
            legal_moves.push(working_square.toString())
        }

        for (working_square = current_square; !(collision_check(working_square) || bounds_check(current_square)) ;working_square + DOWN_RIGHT)
        {
            legal_moves.push(working_square.toString())
        }
        break;

        case "Bqueen":
            for(working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP)
            {
                legal_moves.push(working_square.toString())
            }
            
            for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + DOWN)
            {
                legal_moves.push(working_square.toString())
            }
    
            for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + LEFT)
            {
                legal_moves.push(working_square.toString())
            }
    
            for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + RIGHT)
            {
                legal_moves.push(working_square.toString())
            }
            for(working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP_LEFT)
                {
                    legal_moves.push(working_square.toString())
                }
            
            for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + UP_RIGHT)
            {
                legal_moves.push(working_square.toString())
            }
    
            for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + DOWN_LEFT)
            {
                legal_moves.push(working_square.toString())
            }
    
            for (working_square = current_square; !(collision_check(working_square) || bounds_check(working_square)) ;working_square + DOWN_RIGHT)
            {
                legal_moves.push(working_square.toString())
            }
            break;
         
        case "Wknight":
        target_square = current_square + (UP * 2 + LEFT)
        if (bounds_check(target_square) && collision_check(target_square))
        {
        legal_moves.push(target_square.toString())
        }
        target_square = current_square + (UP * 2 + RIGHT)
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        } 
        target_square = current_square + (DOWN * 2 + LEFT)
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + (DOWN * 2 + RIGHT)
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        } 
        target_square = current_square + (LEFT * 2 + UP) 
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + (LEFT * 2 + DOWN) 
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + (RIGHT * 2 + UP) 
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + (RIGHT * 2 + DOWN)    
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())
        }
        break;


        case "Bknight":
        target_square = current_square + (UP * 2 + LEFT)
        if (bounds_check(target_square) && collision_check(target_square))
        {
        legal_moves.push(target_square.toString())
        }
        target_square = current_square + (UP * 2 + RIGHT)
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        } 
        target_square = current_square + (DOWN * 2 + LEFT)
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + (DOWN * 2 + RIGHT)
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        } 
        target_square = current_square + (LEFT * 2 + UP) 
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + (LEFT * 2 + DOWN) 
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + (RIGHT * 2 + UP) 
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())   
        }
        target_square = current_square + (RIGHT * 2 + DOWN)    
        if (bounds_check(target_square) && collision_check(target_square))
        {
         legal_moves.push(target_square.toString())
        }
        break;
    }  

    console.log(legal_moves)
    return legal_moves
}

