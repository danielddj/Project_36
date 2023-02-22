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

export const deselect_piece = {"piece_selected": false,"piece":"", "id": "" };