export const ssr = false

import { get } from "svelte/store"
import { routinesStore } from "../hooks.client"
import { Utils } from "$lib/utils"
import { error } from "@sveltejs/kit"
/** @type {import('./$types').PageLoad} */
export function load({ url }) {
    const routines = get(routinesStore)
    const routine = Utils.getRoutine(Utils.getCurrentLocation(url), routines)

    if (routine != null) {
        return {
            routine
        }
    }

    error(404, "Routine not found")
}
