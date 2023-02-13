export const starting_pos: any = {"a1": "Brook", "b1": "Bknight", "c1": "Bbishop", "d1": "Bqueen", "e1": "Bking", "f1": "Brook", "g1": "Bknight", "h1": "Bbishop", 
                                    "a2": "Bpawn", "b2": "Bpawn", "c2": "Bpawn", "d2": "Bpawn", "e2": "Bpawn", "f2": "Bpawn", "g2": "Bpawn", "h2": "Bpawn", 
                                    "a8": "Wrook", "b8": "Wknight", "c8": "Wbishop", "d8": "Wqueen", "e8": "Wking", "f8": "Wrook", "g8": "Wknight", "h8": "Wbishop", 
                                    "a7": "Wpawn", "b7": "Wpawn", "c7": "Wpawn", "d7": "Wpawn", "e7": "Wpawn", "f7": "Wpawn", "g7": "Wpawn", "h7": "Wpawn",}

export const board_color: Array<string> = ["w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",
                                    "w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",
                                    "w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",
                                    "w", "b", "w", "b", "w", "b", "w", "b",
                                    "b", "w", "b", "w", "b", "w", "b", "w",]

export type chessbox ={
    piece: string;
    id: string;
    element: Element
}

export const board: any = {
    "a1": {}, "b1": {}, "c1": {}, "d1": {}, "e1": {}, "f1": {}, "g1": {}, "h1": {},
    "a2": {}, "b2": {}, "c2": {}, "d2": {}, "e2": {}, "f2": {}, "g2": {}, "h2": {},
    "a3": {}, "b3": {}, "c3": {}, "d3": {}, "e3": {}, "f3": {}, "g3": {}, "h3": {},
    "a4": {}, "b4": {}, "c4": {}, "d4": {}, "e4": {}, "f4": {}, "g4": {}, "h4": {},
    "a5": {}, "b5": {}, "c5": {}, "d5": {}, "e5": {}, "f5": {}, "g5": {}, "h5": {},
    "a6": {}, "b6": {}, "c6": {}, "d6": {}, "e6": {}, "f6": {}, "g6": {}, "h6": {},
    "a7": {}, "b7": {}, "c7": {}, "d7": {}, "e7": {}, "f7": {}, "g7": {}, "h7": {},
    "a8": {}, "b8": {}, "c8": {}, "d8": {}, "e8": {}, "f8": {}, "g8": {}, "h8": {}
}