<script lang="ts">
    import RemoveButton from "$lib/components/RemoveButton.svelte"
    import * as Types from "$lib/types"
    import { createEventDispatcher } from "svelte"
    import "$lib/styles/form.css"

    let workflowName = ""
    let steps: Types.Step[] = [{ label: "", done: false }]

    const dispatch = createEventDispatcher()

    function onAddStep() {
        steps = [...steps, { label: "", done: false }]
    }

    function onCreateWorkflow() {
        const workflow: Types.Workflow = { label: workflowName, steps }
        dispatch("workflowAdd", workflow)
        clearForm()
    }

    function clearForm() {
        workflowName = ""
        steps = [{ label: "", done: false }]
    }

    function createStepRemover(index: number): () => void {
        return () => {
            steps = steps.filter((_, i) => i !== index)
        }
    }

    $: isFormValid = workflowName != "" && steps.length > 0 && steps.every((step) => step.label != "")
</script>

<h2 class="text-lg border-b-2 mb-4 pb-2 font-bold">Create a new workflow</h2>
<form on:submit|preventDefault={onCreateWorkflow}>
    <div class="flex flex-col mb-8 gap-4">
        <label class="flex flex-col gap-1">
            <p class="font-bold">Add a title</p>
            <input class="text-input" type="text" bind:value={workflowName} placeholder="Title" />
        </label>
        <div class="flex flex-col gap-3">
            <p class="font-bold">Add steps</p>
            {#each steps as step, index}
                <div class="flex flex-col gap-3">
                    <input class="text-input" type="text" bind:value={step.label} placeholder="Step name" />
                    <RemoveButton class="ml-auto" removeButtonClickCallback={createStepRemover(index)}>Remove step</RemoveButton>
                </div>
            {/each}
        </div>
    </div>
    <div class="flex gap-4 justify-end">
        <button type="button" class="rounded-button block bg-[#21262d] border-[#363b42]" on:click={onAddStep}>Add next step</button>
        <button type="submit" class="rounded-button block bg-[#1f883d] border-[#1f793a] disabled:bg-[#1e5b2e] disabled:border-[#336b43] disabled:text-[#8fad97]" disabled={!isFormValid}>Create workflow</button>
    </div>
</form>
