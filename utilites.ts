export const $: any = query => document.querySelector(query)
export const $$: any = query => document.querySelectorAll(query)
export const $$$: any = (element, query) => element.querySelector(query)

export function is_null(v: any): v is null {
	return v === null;
}