import { browser } from "$app/environment"
import * as Types from "$lib/types"
import { writable } from "svelte/store"

export const routinesStore = writable<Types.Routine[]>([])

function init() {
    const rawCache = localStorage.getItem("cache")
    let cache: Types.Cache = {
        routines: []
    }

    if (rawCache != null) {
        cache = JSON.parse(rawCache)
        routinesStore.set(cache.routines)
    }

    routinesStore.subscribe((value) => {
        cache.routines = value
        localStorage.setItem("cache", JSON.stringify(cache))
    })
}

if (browser) {
    init()
}
