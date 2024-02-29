<script lang="ts">
    import "$lib/styles/app.css"
    import Header from "$lib/components/Header.svelte"
    import * as Types from "$lib/types"
    import { afterNavigate } from "$app/navigation"
    import { page } from "$app/stores"
    import { Utils } from "$lib/utils"
    import { routinesStore } from "./hooks.client"
    import { Constants } from "$lib/constants"
    import { onMount } from "svelte"

    let routineName = ""
    let routines: Types.Routine[] = []

    function updateRoutineName(routines: Types.Routine[] = []) {
        const currentLocation = Utils.getCurrentLocation($page.url)

        const routine = Utils.getRoutine(currentLocation, routines)

        if (routine != null) {
            routineName = routine.canonicalName
        } else {
            routineName = ""
        }
    }

    afterNavigate(() => updateRoutineName(routines))

    onMount(() => {
        routinesStore.subscribe((value) => {
            routines = value
        })
    })
</script>

<svelte:head>
    {#if routineName === ""}
        <title>{Constants.APP_NAME}</title>
    {:else}
        <title>{Constants.APP_NAME} / {routineName}</title>
    {/if}
</svelte:head>

<Header {routineName} />
<div id="app">
    <slot />
</div>

<style>
    #app {
        @apply w-[80svw] mx-auto my-12 md:w-[max(35svw,720px)];
    }
</style>
