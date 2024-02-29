<script lang="ts">
    import { Utils } from "$lib/utils"

    export let removeButtonClickCallback: () => void

    let removeButtonTimeoutID: number | null = null

    function createTimeOutIDClearer() {
        return () => {
            removeButtonTimeoutID = null
        }
    }
</script>

<button class="rounded-button block bg-[#21262d] border-[#363b42] text-[#f85149] active:bg-[#a40e26] active:border-[#911126] active:text-white {$$restProps.class ?? ''}" type="button" on:mousedown={() => (removeButtonTimeoutID = Utils.onRemoveButtonClick(removeButtonClickCallback))} on:touchstart={() => Utils.onRemoveButtonClick(removeButtonClickCallback)} on:mouseup={() => Utils.onRemoveButtonLeave(removeButtonTimeoutID, createTimeOutIDClearer)} on:mouseleave={() => Utils.onRemoveButtonLeave(removeButtonTimeoutID, createTimeOutIDClearer)} on:touchend={() => Utils.onRemoveButtonLeave(removeButtonTimeoutID, createTimeOutIDClearer)}><slot /></button>
