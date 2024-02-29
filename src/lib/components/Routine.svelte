<script lang="ts">
    import * as Types from "$lib/types"

    export let routine: Types.Routine
</script>

<div class="block border-t-2 py-7 last-of-type:border-b-2">
    <a href={`/${routine.canonicalName}`}><h2 class="text-lg font-bold text-blue-500 hover:underline">{routine.canonicalName}</h2></a>
    <p class="text-[#848d97]">{routine.workflows.length} workflows</p>
</div>
