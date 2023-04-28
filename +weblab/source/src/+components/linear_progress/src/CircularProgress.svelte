<script lang="ts">
  export let value: number = 0;
  export let border_type: "unset" | "pill" = "unset";
  export let show_value: boolean = false;
  export let stroke_width: number = 10;
  export let indeterminate: boolean = false;

  let arcLength: number;
  let arcOffset: number;
  $: {
    arcLength = 2 * Math.PI * (50 - stroke_width);
    arcOffset = arcLength * (1 - value);
  }
</script>

<span
  class="progress__circular-root"
>
  <svg
    viewBox="0 0 100 100"
    class:progress__circular-pill={border_type === "pill"}
    class:progress__circular-root--indeterminate={indeterminate}
  >
    <circle
      class="progress__circular-track"
      cx="50"
      cy="50"
      r={50 - stroke_width}
      stroke-width={stroke_width}
    />
    <circle
      class="progress__circular-bar"
      class:progress__circular-circle--indeterminate={indeterminate}
      cx="50"
      cy="50"
      r={50 - stroke_width}
      stroke-width={stroke_width}
      style="--arcOffset: {arcOffset}; --arcLength: {arcLength}"
    />
  </svg>
</span>

<div
  class="progress__circular-text"
  class:progress__circular--show-text={show_value && !indeterminate}
>
  <div>{value * 100}%</div>
</div>

<style>
  .progress__circular-root {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(-90deg);
  }

  .progress__circular-track {
    fill: transparent;
    stroke: rgb(167, 202, 237);
  }
  .progress__circular-bar {
    fill: transparent;
    stroke: #1976d2;
    stroke-dasharray: var(--arcLength);
    stroke-dashoffset: var(--arcOffset);
    transition: stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .progress__circular-pill {
    stroke-linecap: round;
  }

  .progress__circular-text {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
  }
  .progress__circular--show-text {
    display: flex;
  }

  .progress__circular-root--indeterminate {
    animation: progress__circular-rotate 1.4s linear infinite;
  }
  .progress__circular-circle--indeterminate {
    animation: progress__circular-dash 1.4s ease-in-out infinite;
  }

  @keyframes progress__circular-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes progress__circular-dash {
    0% {
      stroke-dasharray: 1, 251.327;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 170, 251.327;
      stroke-dashoffset: -15;
    }
    100% {
      stroke-dasharray: 170, 251.327;
      stroke-dashoffset: -251.327;
    }
  }
</style>
