<script lang="ts">
  export let indeterminate: boolean = false;
  export let value: number = 0;
  export let show_value: boolean = false;
  export let border_type: "unset" | "pill" = "unset";

  let progress__linear_indeterminate: boolean;
  $: {
    progress__linear_indeterminate = indeterminate;
  }
</script>

<div class="progress__linear-root">
  <span class="progress__linear-track progress__linear-{border_type}-border">
    <span
      class="progress__linear-bar"
      class:progress__linear_indeterminate
      class:progress__linear_value={!indeterminate}
      style="--progress: {value * 100 - 100};"
    />
  </span>
</div>
<div
  class="progress__linear-text"
  class:progress__linear-text--show={show_value && !indeterminate}
>
  {value * 100}%
</div>

<style>
  .progress__linear-root {
    flex-grow: 1;
    display: flex;
    height: 100%;
  }

  .progress__linear-track {
    flex-grow: 1;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: block;
    z-index: 0;
    background-color: rgb(167, 202, 237);
  }

  .progress__linear-bar {
    position: absolute;
    left: 0px;
    bottom: 0px;
    top: 0px;
    background-color: #1976d2;
  }

  .progress__linear_value {
    width: 100%;
    transform: translateX(calc(var(--progress) * 1%));
    transition: transform 0.2s linear;
    transform-origin: left;
    transform-origin: left center;
  }

  .progress__linear-text {
    min-width: 35px;
    display: none;
  }

  .progress__linear_indeterminate {
    width: auto;
    animation: 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite normal
      none running linear-indeterminate;
  }

  .progress__linear-unset-border {
    border-radius: unset;
  }

  .progress__linear-pill-border {
    border-radius: 5000px;
  }

  .progress__linear-text--show {
    display: block;
    text-align: center;
  }

  @keyframes linear-indeterminate {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }
</style>
