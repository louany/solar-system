<template>
  <div class="asters_list">
    <!-- {{ AsterCard }} -->
    <aster-filter />
    <aster-card
      v-for="(aster, index) in asters"
      :key="index"
      :aster="aster"
    />
  </div>  
</template>

<script>
import AsterCard from './aster_card.vue'
import AsterFilter from './aster_filter.vue'

export default {
  components : {
      AsterCard,
      AsterFilter
  },
  props: {
    asters : {
      type: Array,
      required: true
    }
  },
}
</script>

<style>
.asters_list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 1.2rem;
  margin: 0 -5px;
}
</style>