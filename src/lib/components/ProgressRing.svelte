<script lang="ts">
    export let progressPercent: number

    const PROGRESS_RING_RADIUS = 40

    let circumference = 0
    let ringColor = "#e7a100"

    $: circumference = 2 * Math.PI * PROGRESS_RING_RADIUS
    $: ringColor = progressPercent === 100 ? "#3fb950" : "#e7a100"
</script>

<svg width="100%" height="100%" viewBox="0 0 100 100">
    <circle cx="50%" cy="50%" r="20" fill={ringColor} />
    <circle id="progress-circle" cx="50%" cy="50%" r={PROGRESS_RING_RADIUS} fill="transparent" stroke={ringColor} stroke-width="10" style="stroke-dasharray: {circumference} {circumference}; stroke-dashoffset: {circumference - (progressPercent / 100) * circumference};" transform="rotate(-90 50 50)" />
</svg>

<style>
    #progress-circle {
        transition-property: stroke-dashoffset, fill, stroke;
        transition-duration: 0.3s;
    }
</style>
