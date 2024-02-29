<script lang="ts">
    import Routine from "$lib/components/Routine.svelte"
    import RoutineCreateForm from "$lib/components/RoutineCreateForm.svelte"
    import * as Types from "$lib/types"
    import { Constants } from "$lib/constants"
    import { routinesStore } from "./hooks.client"

    export let data

    routinesStore.subscribe((value) => {
        data.routines = value
    })

    function onRoutineCreate(event: CustomEvent<Types.Routine>) {
        routinesStore.update((routines) => {
            return [...routines, event.detail]
        })
    }
</script>

<hgroup class="mb-4">
    <h1 class="text-xl font-bold">Welcome to {Constants.APP_NAME}!</h1>
    <p class="text-[#848d97]">This is a simple app to help you keep track of your routines. Let's get things done together!</p>
    <p class="text-[#848d97]">NOTE: Inter-browser and inter-device sync is not supported yet.</p>
</hgroup>

<RoutineCreateForm class="mb-4" on:routineCreate={onRoutineCreate} />

{#if data.routines.length > 0}
    <h2 class="text-lg mb-2 font-bold">Your routines</h2>
    <div class="flex flex-col">
        {#each data.routines as routine}
            <Routine {routine} />
        {/each}
    </div>
{/if}
