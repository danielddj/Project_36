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

export function first_char(foo: number | string){
	return typeof(foo) === "string"
		   ? foo.charAt(0)
		   : parseInt(foo.toString().charAt(0))
}

export function second_char(foo: number | string){
	if (typeof foo === "number") {
		if (getlength(foo) === 1) {
			return first_char(foo)
		} else {
			return parseInt(foo.toString().charAt(1))
		}
	} else {
		return foo.charAt(1)
	}
}

export function getlength(number: number) {
    return number.toString().length;
}