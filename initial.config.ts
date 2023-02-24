export type square_type ={
    piece: string | null;
    id: string;
    piece_color: string | null
}

export type board_type = {
    [key: string]: square_type;
}


//The starting normal starting position of each piece
export const starting_pos: board_type = {"1": {piece: "Brook", id: "1", piece_color: "black"}, 
                                    "2": {piece: "Bknight", id: "2", piece_color: "black"}, 
                                    "3": {piece: "Bbishop", id: "3", piece_color: "black"}, 
                                    "4": {piece: "Bqueen", id: "4", piece_color: "black"}, 
                                    "5": {piece: "Bking", id: "5", piece_color: "black"}, 
                                    "6": {piece: "Bbishop", id: "6", piece_color: "black"}, 
                                    "7": {piece: "Bknight", id: "7", piece_color: "black"}, 
                                    "8": {piece: "Brook", id: "8", piece_color: "black"}, 
                                    "11": {piece: "Bpawn", id: "11", piece_color: "black"}, 
                                    "12": {piece: "Bpawn", id: "12", piece_color: "black"}, 
                                    "13": {piece: "Bpawn", id: "13", piece_color: "black"}, 
                                    "14": {piece: "Bpawn", id: "14", piece_color: "black"}, 
                                    "15": {piece: "Bpawn", id: "15", piece_color: "black"}, 
                                    "16": {piece: "Bpawn", id: "16", piece_color: "black"}, 
                                    "17": {piece: "Bpawn", id: "17", piece_color: "black"}, 
                                    "18": {piece: "Bpawn", id: "18", piece_color: "black"}, 
                                    "71": {piece: "Wrook", id: "71", piece_color: "white"}, 
                                    "72": {piece: "Wknight", id: "72", piece_color: "white"}, 
                                    "73": {piece: "Wbishop", id: "73", piece_color: "white"}, 
                                    "74": {piece: "Wqueen", id: "74", piece_color: "white"}, 
                                    "75": {piece: "Wking", id: "75", piece_color: "white"}, 
                                    "76": {piece: "Wbishop", id: "76", piece_color: "white"}, 
                                    "77": {piece: "Wknight", id: "77", piece_color: "white"}, 
                                    "78": {piece: "Wrook", id: "78", piece_color: "white"},
                                    "61": {piece: "Wpawn", id: "61", piece_color: "white"}, 
                                    "62": {piece: "Wpawn", id: "62", piece_color: "white"}, 
                                    "63": {piece: "Wpawn", id: "63", piece_color: "white"}, 
                                    "64": {piece: "Wpawn", id: "64", piece_color: "white"}, 
                                    "65": {piece: "Wpawn", id: "65", piece_color: "white"}, 
                                    "66": {piece: "Wpawn", id: "66", piece_color: "white"}, 
                                    "67": {piece: "Wpawn", id: "67", piece_color: "white"}, 
                                    "68": {piece: "Wpawn", id: "68", piece_color: "white"}}

export const board_color: Array<string> = ["w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",
                                    "w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",
                                    "w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",
                                    "w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",]



//Our internal representation of the chess board, where each key-value pair is a square.                                    
export const c_board: board_type  = {
    "1": {piece: null, id: "1", piece_color: null}, 
    "2": {piece: null, id: "2", piece_color: null}, 
    "3": {piece: null, id: "3", piece_color: null}, 
    "4": {piece: null, id: "4", piece_color: null}, 
    "5": {piece: null, id: "5", piece_color: null}, 
    "6": {piece: null, id: "6", piece_color: null}, 
    "7": {piece: null, id: "7", piece_color: null}, 
    "8": {piece: null, id: "8", piece_color: null}, 
    "11": {piece: null, id: "11", piece_color: null}, 
    "12": {piece: null, id: "12", piece_color: null}, 
    "13": {piece: null, id: "13", piece_color: null}, 
    "14": {piece: null, id: "14", piece_color: null}, 
    "15": {piece: null, id: "15", piece_color: null}, 
    "16": {piece: null, id: "16", piece_color: null}, 
    "17": {piece: null, id: "17", piece_color: null}, 
    "18": {piece: null, id: "18", piece_color: null}, 
    "21": {piece: null, id: "21", piece_color: null}, 
    "22": {piece: null, id: "22", piece_color: null}, 
    "23": {piece: null, id: "23", piece_color: null}, 
    "24": {piece: null, id: "24", piece_color: null}, 
    "25": {piece: null, id: "25", piece_color: null}, 
    "26": {piece: null, id: "26", piece_color: null}, 
    "27": {piece: null, id: "27", piece_color: null}, 
    "28": {piece: null, id: "28", piece_color: null}, 
    "31": {piece: null, id: "31", piece_color: null}, 
    "32": {piece: null, id: "32", piece_color: null}, 
    "33": {piece: null, id: "33", piece_color: null}, 
    "34": {piece: null, id: "34", piece_color: null}, 
    "35": {piece: null, id: "35", piece_color: null}, 
    "36": {piece: null, id: "36", piece_color: null}, 
    "37": {piece: null, id: "37", piece_color: null}, 
    "38": {piece: null, id: "38", piece_color: null}, 
    "41": {piece: null, id: "41", piece_color: null}, 
    "42": {piece: null, id: "42", piece_color: null}, 
    "43": {piece: null, id: "43", piece_color: null}, 
    "44": {piece: null, id: "44", piece_color: null}, 
    "45": {piece: null, id: "45", piece_color: null}, 
    "46": {piece: null, id: "46", piece_color: null}, 
    "47": {piece: null, id: "47", piece_color: null}, 
    "48": {piece: null, id: "48", piece_color: null}, 
    "51": {piece: null, id: "51", piece_color: null}, 
    "52": {piece: null, id: "52", piece_color: null}, 
    "53": {piece: null, id: "53", piece_color: null}, 
    "54": {piece: null, id: "54", piece_color: null}, 
    "55": {piece: null, id: "55", piece_color: null}, 
    "56": {piece: null, id: "56", piece_color: null}, 
    "57": {piece: null, id: "57", piece_color: null}, 
    "58": {piece: null, id: "58", piece_color: null}, 
    "61": {piece: null, id: "61", piece_color: null}, 
    "62": {piece: null, id: "62", piece_color: null}, 
    "63": {piece: null, id: "63", piece_color: null}, 
    "64": {piece: null, id: "64", piece_color: null}, 
    "65": {piece: null, id: "65", piece_color: null}, 
    "66": {piece: null, id: "66", piece_color: null}, 
    "67": {piece: null, id: "67", piece_color: null}, 
    "68": {piece: null, id: "68", piece_color: null}, 
    "71": {piece: null, id: "71", piece_color: null}, 
    "72": {piece: null, id: "72", piece_color: null}, 
    "73": {piece: null, id: "73", piece_color: null}, 
    "74": {piece: null, id: "74", piece_color: null}, 
    "75": {piece: null, id: "75", piece_color: null}, 
    "76": {piece: null, id: "76", piece_color: null}, 
    "77": {piece: null, id: "77", piece_color: null}, 
    "78": {piece: null, id: "78", piece_color: null}, 
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




