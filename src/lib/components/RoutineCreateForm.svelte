<script lang="ts">
    import "$lib/styles/form.css"
    import * as Types from "$lib/types"
    import { Utils } from "$lib/utils"
    import { createEventDispatcher } from "svelte"
    import { get } from "svelte/store"
    import { routinesStore } from "../../routes/hooks.client"

    let routineName = ""
    let isFormValid = false
    let isFormTouched = false
    let formValidationMessage = ""

    const dispatch = createEventDispatcher()

    function onCreateRoutine() {
        const sanitizedRoutineName = Utils.sanitizeRoutineName(routineName)

        const routine: Types.Routine = {
            id: sanitizedRoutineName.toLowerCase(),
            canonicalName: sanitizedRoutineName,
            workflows: []
        }
        dispatch("routineCreate", routine)
        clearForm()
    }

    function clearForm() {
        routineName = ""
        isFormValid = false
        isFormTouched = false
    }

    $: if (routineName) isFormTouched = true
    $: ({ formValidationMessage, isFormValid } = Utils.validateRoutineName(routineName, get(routinesStore)))
</script>

<div class={$$restProps.class}>
    <h2 class="text-lg border-b-2 mb-4 pb-2 font-bold">Create a new routine</h2>
    <form on:submit|preventDefault={onCreateRoutine}>
        <div class="flex flex-col gap-1 mb-8">
            <label for="routine-name-input" class="font-bold">Routine name</label>
            <input id="routine-name-input" class="text-input" type="text" bind:value={routineName} />
            {#if isFormTouched}
                <p class="text-sm font-bold {isFormValid ? 'text-[#3fb950]' : 'text-[#f85149]'}">{formValidationMessage}</p>
            {/if}
        </div>
        <button class="rounded-button block bg-[#1f883d] border-[#1f793a] disabled:bg-[#1e5b2e] disabled:border-[#336b43] disabled:text-[#8fad97] ml-auto" type="submit" disabled={!isFormValid}>Create routine</button>
    </form>
</div>
