<template>
  <div class="aster_filter">
    <span @click="all">Tout</span>
    <span @click="isPlanet">Planètes</span>
    <span @click="withMoon">Astres possédant une lune</span>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  emits: ['filter'],
  setup(_,context) {

    function all() {
      context.emit("filter", 'all')
    }
    function isPlanet() {
      context.emit("filter", 'isPlanet')
    }
    function withMoon() {
      context.emit("filter", 'withMoon')
    }

    return {
      all, 
      isPlanet, 
      withMoon
      }
  }
}
</script>

<style lang="scss">
.aster_filter {
  padding: 1.6rem 0;

  span {
    padding: .8rem 1.2rem;
    display: inline-block;
    background: rgb(45, 37, 151);
    cursor: pointer;
    &:not(:last-of-type) {
      margin-right: 1.2rem;
    }
    &:target,
    &:focus,
    &:active,
    &:hover {
      background: rgb(204, 122, 16);
    }
  }
}
</style>