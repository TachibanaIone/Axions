<script lang="ts">
    import { Constants } from "$lib/constants"

    export let routineName: string = ""
</script>

<header class="bg-[#010409] border-b-2 px-8 py-5">
    <nav>
        <h1>
            <a href="/" class={routineName === "" ? "font-bold" : ""}>{Constants.APP_NAME}</a>
            {#if routineName !== ""}
                <span class="routine-name font-bold">{routineName}</span>
            {/if}
        </h1>
    </nav>
</header>

<style>
    .routine-name::before {
        content: "/";
        color: #848d97;
        margin: 0 0.5rem;
    }
</style>
