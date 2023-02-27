//Just a document of shortcuts to make typing easier
export function $(query: any): any{
	return document.getElementById(query)	
} 

export function $$(query: any): any{
	return document.querySelectorAll(query)	
} 

export function is_null(v: any): v is null {
	return v === null;
}

export const UP = -10
export const DOWN = 10
export const LEFT = -1
export const RIGHT = 1
export const UP_LEFT = -11
export const UP_RIGHT = -9
export const DOWN_LEFT = 9
export const DOWN_RIGHT = 11

export const deselect_piece = {"piece_selected": false,"piece":"", "id": "" };