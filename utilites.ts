export function $(query: any): any{
	return document.querySelector(query)	
} 
export function $$(query: any): any{
	return document.querySelectorAll(query)	
} 
export function is_null(v: any): v is null {
	return v === null;
}