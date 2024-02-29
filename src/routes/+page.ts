import { get } from "svelte/store"
import { routinesStore } from "./hooks.client"
/** @type {import('./$types').PageLoad} */
export function load() {
    const routines = get(routinesStore)

    return {
        routines
    }
}
