<template>
  <div>{{ aster }}</div>
</template>

<script>
import { onMounted, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'Aster',
  props : {
    asterId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const aster = ref([])
    const getAster = async () => {
      await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${props.asterId}`).then(resp => (aster.value = resp.data))
    }
    onMounted(getAster)
    return { aster }
  }
}
</script>

<style>

</style>