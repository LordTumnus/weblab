<script lang="ts">
  export let indeterminate: boolean = false;
  export let value: number = 0;
</script>

<span class="root">
  <span class="bar" class:indeterminate class:value={!indeterminate} style='--progress: {value - 100};'/>
</span>

<style>
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

  .value{
    width: 100%;
    transform: translateX(calc(var(--progress) * 1%));
    transition: transform 0.2s linear;
    transform-origin: left;
    transform-origin: left center;
  }

  .indeterminate {
    width: auto;
    animation: 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite normal
      none running linear-indeterminate;
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
