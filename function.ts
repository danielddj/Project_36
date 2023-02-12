
const pieces: any = {0: ["Wrook", "Wknight", "Wbishop", "Wqueen", "Wking", "Wrook", "Wknight", "Wbishop"], 
                        1: ["Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn"],
                        6: ["Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn"],
                        7: ["Brook", "Bknight", "Bbishop", "Bqueen", "Bking", "Brook", "Bknight", "Bbishop"]}

const board: Array<string> = ["w", "b", "w", "b", "w", "b", "w", "b",
                              "b", "w", "b", "w", "b", "w", "b", "w",
                              "w", "b", "w", "b", "w", "b", "w", "b",
                              "b", "w", "b", "w", "b", "w", "b", "w",
                              "w", "b", "w", "b", "w", "b", "w", "b",
                              "b", "w", "b", "w", "b", "w", "b", "w",
                              "w", "b", "w", "b", "w", "b", "w", "b",
                              "b", "w", "b", "w", "b", "w", "b", "w",]

function is_null(v: any): v is null {
	return v === null;
}

function insert_pieces(row: number) {
        for(let i = 0; i <= 7; i++) {    
            const current = document.getElementById(`${row}${i}`)
            
            if (!is_null(current) && row in pieces) {
                const current_pieces: any = pieces[row][i]
                current.innerHTML = `<img class='allimg ${current_pieces}' src="images/${current_pieces}.png" alt="">`
                current.style.cursor = 'pointer'
            }
        }
}

function coloring() {
    const color = document.querySelectorAll<HTMLElement>('.box') 
    let i: number = 0

    color.forEach(square => { 
        if (board[i] === "w") {
            square.style.backgroundColor = 'rgb(255, 254, 254)'
            square.style.outline = "1px solid black";

        } else if ((board[i] === "b")) {
            square.style.backgroundColor = "rgb(216, 175, 98)"
            square.style.outline = "1px solid black";
        }
        i = i + 1
    })
}




function handle_move() {
    
}



coloring()

insert_pieces(0)
insert_pieces(1)
insert_pieces(6)
insert_pieces(7)



