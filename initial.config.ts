export type square_type ={
    piece: piece | null;
    id: string;
}

export type board_type = {
    [key: string]: square_type;
}

export interface piece {
    piece_name: string
    piece_color: string
    moves: Array<string>
    pawn_moves?: Array<string>
    times_moved: number
}


//The starting normal starting position of each piece
export const starting_pos: board_type = {"1": {piece: {piece_name: "Brook", piece_color: "black", moves: [], times_moved: 0}, id: "1"}, 
                                    "2": {piece: {piece_name: "Bknight", piece_color: "black", moves: [], times_moved: 0}, id: "2"}, 
                                    "3": {piece: {piece_name: "Bbishop", piece_color: "black", moves: [], times_moved: 0}, id: "3"}, 
                                    "4": {piece: {piece_name: "Bqueen", piece_color: "black", moves: [], times_moved: 0}, id: "4"}, 
                                    "5": {piece: {piece_name: "Bking", piece_color: "black", moves: [], times_moved: 0}, id: "5"}, 
                                    "6": {piece: {piece_name: "Bbishop", piece_color: "black", moves: [], times_moved: 0}, id: "6"}, 
                                    "7": {piece: {piece_name: "Bknight", piece_color: "black", moves: [], times_moved: 0}, id: "7"}, 
                                    "8": {piece: {piece_name: "Brook", piece_color: "black", moves: [], times_moved: 0}, id: "8"}, 
                                    "11": {piece: {piece_name: "Bpawn", piece_color: "black", moves: [], times_moved: 0, pawn_moves:[]}, id: "11"}, 
                                    "12": {piece: {piece_name: "Bpawn", piece_color: "black", moves: [], times_moved: 0, pawn_moves: []}, id: "12"}, 
                                    "13": {piece: {piece_name: "Bpawn", piece_color: "black", moves: [], times_moved: 0, pawn_moves: []}, id: "13"}, 
                                    "14": {piece: {piece_name: "Bpawn", piece_color: "black", moves: [], times_moved: 0, pawn_moves: []}, id: "14"}, 
                                    "15": {piece: {piece_name: "Bpawn", piece_color: "black", moves: [], times_moved: 0, pawn_moves: []}, id: "15"}, 
                                    "16": {piece: {piece_name: "Bpawn", piece_color: "black", moves: [], times_moved: 0, pawn_moves: []}, id: "16"}, 
                                    "17": {piece: {piece_name: "Bpawn", piece_color: "black", moves: [], times_moved: 0, pawn_moves: []}, id: "17"}, 
                                    "18": {piece: {piece_name: "Bpawn", piece_color: "black", moves: [], times_moved: 0, pawn_moves: []}, id: "18"}, 
                                    "71": {piece: {piece_name: "Wrook", piece_color: "white", moves: [], times_moved: 0,}, id: "71"}, 
                                    "72": {piece: {piece_name: "Wknight", piece_color: "white", moves: [], times_moved: 0,}, id: "72"}, 
                                    "73": {piece: {piece_name: "Wbishop", piece_color: "white", moves: [], times_moved: 0,}, id: "73"}, 
                                    "74": {piece: {piece_name: "Wqueen", piece_color: "white", moves: [], times_moved: 0,}, id: "74"}, 
                                    "75": {piece: {piece_name: "Wking", piece_color: "white", moves: [], times_moved: 0,}, id: "75"}, 
                                    "76": {piece: {piece_name: "Wbishop", piece_color: "white", moves: [], times_moved: 0,}, id: "76"}, 
                                    "77": {piece: {piece_name: "Wknight", piece_color: "white", moves: [], times_moved: 0,}, id: "77"}, 
                                    "78": {piece: {piece_name: "Wrook", piece_color: "white", moves: [], times_moved: 0,}, id: "78"},
                                    "61": {piece: {piece_name: "Wpawn", piece_color: "white", moves: [], times_moved: 0, pawn_moves: []}, id: "61"}, 
                                    "62": {piece: {piece_name: "Wpawn", piece_color: "white", moves: [], times_moved: 0, pawn_moves: []}, id: "62"}, 
                                    "63": {piece: {piece_name: "Wpawn", piece_color: "white", moves: [], times_moved: 0, pawn_moves: []}, id: "63"}, 
                                    "64": {piece: {piece_name: "Wpawn", piece_color: "white", moves: [], times_moved: 0, pawn_moves: []}, id: "64"}, 
                                    "65": {piece: {piece_name: "Wpawn", piece_color: "white", moves: [], times_moved: 0, pawn_moves: []}, id: "65"}, 
                                    "66": {piece: {piece_name: "Wpawn", piece_color: "white", moves: [], times_moved: 0, pawn_moves: []}, id: "66"}, 
                                    "67": {piece: {piece_name: "Wpawn", piece_color: "white", moves: [], times_moved: 0, pawn_moves: []}, id: "67"}, 
                                    "68": {piece: {piece_name: "Wpawn", piece_color: "white", moves: [], times_moved: 0, pawn_moves: []}, id: "68"},}

export const board_color: Array<string> = ["w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",
                                    "w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",
                                    "w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",
                                    "w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",]


type king = {
    id: string
    under_check: boolean
    checking_piece: {piece: null | piece, id: string | null}
}

export type king_type = {
    [key: string]: king;
}

export const king_tracker: king_type = {
    "Wking": {id: "75", under_check: false, checking_piece: {piece: null, id: null}},
    "Bking": {id: "5", under_check: false, checking_piece: {piece: null, id: null}}
}


//Our internal representation of the chess board, where each key-value pair is a square.                                    
export const c_board: board_type  = {
    "1": {piece: null, id: "1"}, 
    "2": {piece: null, id: "2"}, 
    "3": {piece: null, id: "3"}, 
    "4": {piece: null, id: "4"}, 
    "5": {piece: null, id: "5"}, 
    "6": {piece: null, id: "6"}, 
    "7": {piece: null, id: "7"}, 
    "8": {piece: null, id: "8"}, 
    "11": {piece: null, id: "11"}, 
    "12": {piece: null, id: "12"}, 
    "13": {piece: null, id: "13"}, 
    "14": {piece: null, id: "14"}, 
    "15": {piece: null, id: "15"}, 
    "16": {piece: null, id: "16"}, 
    "17": {piece: null, id: "17"}, 
    "18": {piece: null, id: "18"}, 
    "21": {piece: null, id: "21"}, 
    "22": {piece: null, id: "22"}, 
    "23": {piece: null, id: "23"}, 
    "24": {piece: null, id: "24"}, 
    "25": {piece: null, id: "25"}, 
    "26": {piece: null, id: "26"}, 
    "27": {piece: null, id: "27"}, 
    "28": {piece: null, id: "28"}, 
    "31": {piece: null, id: "31"}, 
    "32": {piece: null, id: "32"}, 
    "33": {piece: null, id: "33"}, 
    "34": {piece: null, id: "34"}, 
    "35": {piece: null, id: "35"}, 
    "36": {piece: null, id: "36"}, 
    "37": {piece: null, id: "37"}, 
    "38": {piece: null, id: "38"}, 
    "41": {piece: null, id: "41"}, 
    "42": {piece: null, id: "42"}, 
    "43": {piece: null, id: "43"}, 
    "44": {piece: null, id: "44"}, 
    "45": {piece: null, id: "45"}, 
    "46": {piece: null, id: "46"}, 
    "47": {piece: null, id: "47"}, 
    "48": {piece: null, id: "48"}, 
    "51": {piece: null, id: "51"}, 
    "52": {piece: null, id: "52"}, 
    "53": {piece: null, id: "53"}, 
    "54": {piece: null, id: "54"}, 
    "55": {piece: null, id: "55"}, 
    "56": {piece: null, id: "56"}, 
    "57": {piece: null, id: "57"}, 
    "58": {piece: null, id: "58"}, 
    "61": {piece: null, id: "61"}, 
    "62": {piece: null, id: "62"}, 
    "63": {piece: null, id: "63"}, 
    "64": {piece: null, id: "64"}, 
    "65": {piece: null, id: "65"}, 
    "66": {piece: null, id: "66"}, 
    "67": {piece: null, id: "67"}, 
    "68": {piece: null, id: "68"}, 
    "71": {piece: null, id: "71"}, 
    "72": {piece: null, id: "72"}, 
    "73": {piece: null, id: "73"}, 
    "74": {piece: null, id: "74"}, 
    "75": {piece: null, id: "75"}, 
    "76": {piece: null, id: "76"}, 
    "77": {piece: null, id: "77"}, 
    "78": {piece: null, id: "78"}, 
}


interface pieces_type {
    [key: string]: string;
}


//Neccesary to display images
export const pieces: pieces_type= {"Wpawn": require("./images/Wpawn.png"), 
                                "Wqueen": require("./images/Wqueen.png"), 
                                "Wrook": require("./images/Wrook.png"), 
                                "Wknight": require("./images/Wknight.png"), 
                                "Wking": require("./images/Wking.png"), 
                                "Wbishop": require("./images/Wbishop.png"),
                                "Bpawn": require("./images/Bpawn.png"), 
                                "Bqueen": require("./images/Bqueen.png"), 
                                "Brook": require("./images/Brook.png"), 
                                "Bknight": require("./images/Bknight.png"), 
                                "Bking": require("./images/Bking.png"), 
                                "Bbishop": require("./images/Bbishop.png") }



