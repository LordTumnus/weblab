<script lang="ts">
  export let indeterminate: boolean = false;
  export let value: number = 0;
  export let show_value: boolean = false;
  export let border_type: 'unset' | 'rounded' | 'pill' = 'unset'; 
</script>

<div class="container">
  <span class="root {border_type}-border">
    <span
      class="bar"
      class:indeterminate
      class:value={!indeterminate}
      style="--progress: {value*100 - 100};"
    />
  </span>
</div>
<div class="text_display" class:show-text={show_value && !indeterminate}>
  {value}%
</div>

<style>
  .container {
    flex-grow: 1;
    display: flex;
    height: 100%;
  }

  .root {
    flex-grow: 1;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: block;
    z-index: 0;
    background-color: rgb(167, 202, 237);
  }

  .bar {
    position: absolute;
    left: 0px;
    bottom: 0px;
    top: 0px;
    background-color: #1976d2;
  }

  .value {
    width: 100%;
    transform: translateX(calc(var(--progress) * 1%));
    transition: transform 0.2s linear;
    transform-origin: left;
    transform-origin: left center;
  }

  .text_display {
    min-width: 35px;
    display: none;
  }

  .indeterminate {
    width: auto;
    animation: 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite normal
      none running linear-indeterminate;
  }

  .unset-border {
    border-radius: unset;
  }

  .rounded-border {
    border-radius: 10%;
  }

  .pill-border {
    border-radius: 5000px;
  }

  .show-text {
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
