<script lang="ts">
  import CircularProgress from "./CircularProgress.svelte";
  import LinearProgress from "./LinearProgress.svelte";

  export let progress_type: "circular" | "linear" = "linear";
  export let value: number = 0;
  export let border_type: "unset" | "pill" = "unset";
  export let show_value: boolean = false;
  export let indeterminate: boolean = false;

  export let stroke_width: number = 10;
</script>

{#if progress_type === "linear"}
  <LinearProgress {value} {border_type} {show_value} {indeterminate} />
{:else}
  <CircularProgress
    {value}
    {border_type}
    {show_value}
    {indeterminate}
    {stroke_width}
  />
{/if}
