import { c_board, king_tracker, piece, starting_pos } from "./initial.config"
import { bounds_check, checking_direction, check_bounds_collision, check_move_out, collosion_check_castling, intitial_game, move_piece } from "./pieces_handler"
import { LEFT, first_char, second_char } from "./utilites"

intitial_game(starting_pos)

test("Check_check check_move_out", () =>{
    move_piece("55", "75")
    move_piece("57", "4")
    expect(king_tracker.Wking.under_check).toBe(true)
    expect(check_move_out("white")).toBe(true)
    expect(king_tracker.Wking.id).toBe("55")
    move_piece("75", "55")
    move_piece("4", "57")
})


test("Can_block_check, in_checking_dir", () => {
    move_piece("25", "4")
    move_piece("31", "5")
    move_piece("38", "74")
    expect((c_board["25"].piece as piece).moves).toEqual(["36", "34", "35"])
})

test("Bounds check", () => {
    expect(bounds_check(1)).toEqual(true)
    expect(bounds_check(78)).toEqual(true)
    expect(bounds_check(0)).toEqual(false)
    expect(bounds_check(79)).toEqual(false)
})

test("Test castling", () => {
    move_piece("56", "77")
    move_piece("57", "76")
    expect(collosion_check_castling("white", "right")).toBe(true)
    expect(collosion_check_castling("white", "left")).toBe(false)
    move_piece("78", "75")
    expect((c_board["76"].piece as piece).piece_name).toBe("Wrook")
    expect((c_board["77"].piece as piece).piece_name).toBe("Wking")
    move_piece("76", "56")
    move_piece("77", "57")
})

test("Bound_collison", () => {
    expect(check_bounds_collision(31, false, c_board[38], c_board)).toBe(true) 
    expect(check_bounds_collision(33, false, c_board[38], c_board)).toBe(false)   
})

test("Checking direction", () => {
    expect(checking_direction("38", "black")).toBe(LEFT)
})

test("First_char, Second_char", () => {
    let foo = (Math.floor(Math.random() * 10))
    expect(first_char(foo)).toBe(foo)
    expect(second_char(foo)).toBe(foo)

    let bar = foo + 10
    expect(second_char(bar)).toBe(foo)
    expect(first_char(bar)).toBe(1)

})