<script lang="ts">
    import { browser } from "$app/environment"
    import ListIcon from "$lib/components/ListIcon.svelte"
    import GearIcon from "$lib/components/GearIcon.svelte"
    import Workflow from "$lib/components/Workflow.svelte"
    import WorkflowInputForm from "$lib/components/WorkflowCreateForm.svelte"
    import * as Types from "$lib/types"
    import { onMount } from "svelte"
    import { routinesStore } from "../hooks.client"
    import { Utils } from "$lib/utils"
    import { goto } from "$app/navigation"
    import { get } from "svelte/store"
    import RemoveButton from "$lib/components/RemoveButton.svelte"

    export let data

    let pageLoaded = false
    let currentTab: "Workflows" | "Settings" = "Workflows"
    let newRoutineName = data.routine.canonicalName
    let isFormValid = false
    let isFormTouched = false
    let formValidationMessage = ""

    function updateRoutineName() {
        const sanitizedRoutineName = Utils.sanitizeRoutineName(newRoutineName)

        data.routine.id = sanitizedRoutineName.toLowerCase()
        data.routine.canonicalName = sanitizedRoutineName

        isFormTouched = false
        isFormValid = false
        formValidationMessage = ""

        goto(`/${sanitizedRoutineName}`)
    }

    function onWorkflowAdd(event: CustomEvent<Types.Workflow>) {
        data.routine.workflows = [...data.routine.workflows, event.detail]
    }

    function onWorkflowUpdate(event: CustomEvent<Types.Workflow>) {
        const updatedWorkflow = event.detail
        data.routine.workflows = data.routine.workflows.map((workflow) => {
            if (workflow.label === updatedWorkflow.label) {
                return updatedWorkflow
            }
            return workflow
        })
    }

    function onWorkflowRemove(event: CustomEvent<Types.Workflow>) {
        const removedWorkflow = event.detail
        data.routine.workflows = data.routine.workflows.filter((workflow) => workflow.label !== removedWorkflow.label)
    }

    function createRoutineRemover(): () => void {
        return () => {
            routinesStore.update((routines) => {
                return routines.filter((routine) => routine.id !== data.routine.id)
            })
            goto("/")
        }
    }

    onMount(() => (pageLoaded = true))

    $: if (browser && pageLoaded) {
        routinesStore.update((routines) => {
            const index = routines.findIndex((r) => r.id === data.routine.id)
            routines[index] = data.routine
            return routines
        })
    }
    $: ({ formValidationMessage, isFormValid } = Utils.validateRoutineName(newRoutineName, get(routinesStore)))
</script>

<div class="flex flex-col gap-2 mb-8 border-b-2">
    <h1 class="text-xl font-bold">{data.routine.canonicalName}</h1>
    <p class="text-sm text-[#848d97]">"Remove" and "Delete" buttons works by pressing and holding it for 1 second.</p>
    <div class="flex flex-row">
        <button class="tab" data-active={currentTab === "Workflows"} on:click={() => (currentTab = "Workflows")}><ListIcon />Workflows</button>
        <button class="tab" data-active={currentTab === "Settings"} on:click={() => (currentTab = "Settings")}><GearIcon /> Settings</button>
    </div>
</div>

{#if currentTab === "Workflows"}
    <div class="mb-8">
        <WorkflowInputForm on:workflowAdd={onWorkflowAdd} />
    </div>

    {#if data.routine.workflows.length > 0}
        <h2 class="text-lg border-b-2 mb-4 py-2 font-bold">Workflows</h2>
        <ol class="flex flex-col gap-8">
            {#each data.routine.workflows as workflow}
                <li>
                    <Workflow {workflow} on:workflowUpdate={onWorkflowUpdate} on:workflowRemove={onWorkflowRemove} />
                </li>
            {/each}
        </ol>
    {/if}
{:else if currentTab === "Settings"}
    <div class=" mb-8">
        <h2 class="text-lg border-b-2 mb-4 pb-2 font-bold">Settings</h2>
        <div class="flex flex-col gap-3 mb-8">
            <label class="flex flex-col gap-1">
                <p class="font-bold">Routine name</p>
                <input class="text-input" type="text" bind:value={newRoutineName} on:blur={() => (isFormTouched = true)} on:input={() => (isFormTouched = true)} placeholder="Title" />
            </label>
            {#if isFormTouched}
                <p class="text-sm font-bold {isFormValid ? 'text-[#3fb950]' : 'text-[#f85149]'}">{formValidationMessage}</p>
            {/if}
            <button class="rounded-button block bg-[#1f883d] border-[#1f793a] disabled:bg-[#1e5b2e] disabled:border-[#336b43] disabled:text-[#8fad97] ml-auto" disabled={!isFormValid} on:click={updateRoutineName}>Update routine name</button>
        </div>
        <div class="flex flex-col gap-3 rounded-md border-2 px-4 py-3 border-[#703031]">
            <div class="flex flex-col gap-1">
                <p class="text-sm font-bold">Delete this routine</p>
                <p class="text-sm">Once you delete a routine, there is no going back. Please be certain.</p>
            </div>
            <RemoveButton removeButtonClickCallback={createRoutineRemover()} class="mx-auto">Delete this routine</RemoveButton>
        </div>
    </div>
{/if}

<style>
    .tab {
        @apply relative flex items-center text-sm h-4 gap-2 px-3 my-3;
    }

    .tab[data-active="true"]::after {
        @apply absolute -bottom-3.5 left-0 w-full h-0.5 bg-[#f78166] rounded-full;
        content: "";
    }
</style>
