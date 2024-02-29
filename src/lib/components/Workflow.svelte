<script lang="ts">
    import ProgressRing from "$lib/components/ProgressRing.svelte"
    import * as Types from "$lib/types"
    import { createEventDispatcher } from "svelte"
    import CircleCheckIcon from "$lib/components/CircleCheckIcon.svelte"
    import CircleIcon from "$lib/components/CircleIcon.svelte"
    import RemoveButton from "$lib/components/RemoveButton.svelte"

    export let workflow: Types.Workflow

    let progressPercent = 0

    const dispatch = createEventDispatcher()

    function onStepStateChange() {
        dispatch("workflowUpdate", workflow)
    }

    function resetWorkflow() {
        workflow.steps = workflow.steps.map((step) => ({ ...step, done: false }))
        dispatch("workflowUpdate", workflow)
    }

    function createWorkflowRemover(): () => void {
        return () => {
            dispatch("workflowRemove", workflow)
        }
    }

    $: progressPercent = (workflow.steps.filter((step) => step.done).length / workflow.steps.length) * 100
</script>

<div class="border-2 rounded-md">
    <div class="flex items-center p-3 gap-2">
        <span class="w-5 h-5">
            <ProgressRing {progressPercent} />
        </span>
        <h2 class="inline text-lg font-bold">{workflow.label}{progressPercent == 100 ? "(done!)" : ""}</h2>
    </div>
    <ol class="p-3 border-t-2">
        {#each workflow.steps as step}
            <li>
                <label class="cursor-pointer flex items-center gap-3 p-2 hover:bg-[#393f47] transition-colors duration-200 rounded-md">
                    <label class="w-5 h-5">
                        {#if step.done}
                            <CircleCheckIcon />
                        {:else}
                            <CircleIcon />
                        {/if}
                        <input class="hidden" type="checkbox" bind:checked={step.done} on:change={() => onStepStateChange()} />
                    </label>
                    <span class="leading-none">{step.label}</span>
                </label>
            </li>
        {/each}
    </ol>
    <div class="flex justify-end p-3 gap-4">
        <button class="rounded-button block bg-[#21262d] border-[#363b42]" on:click={resetWorkflow}>Reset workflow</button>
        <RemoveButton removeButtonClickCallback={createWorkflowRemover()}>Remove workflow</RemoveButton>
    </div>
</div>
