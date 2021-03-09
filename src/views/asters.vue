<template>
  <section class="section_one">
    <h1>Les astres</h1>
    <!-- {{ astersList }} -->
    <aster-list
      v-if="!isLoading"
      :asters="asters"
    />
    <div v-else class="loading">
      CHARGEMENT ...
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import AsterList from '../components/aster_list.vue'
import {onMounted, ref} from 'vue'

export default {
  components : {
    AsterList
  },
  setup(_) {
    const astersList = ref([])
    const isLoading =ref(Boolean)

    const getAllAsters = async () => {
      isLoading.value = true
      await axios.get('https://api.le-systeme-solaire.net/rest/bodies/').then(resp => (astersList.value = resp.data.bodies))
      isLoading.value = false
    }
    onMounted(getAllAsters)
    return { 
      asters : astersList, 
      isLoading : isLoading
    }
  },
}
</script>

<style scoped>
main {
  padding-top: 12vh;
  background: rgb(19, 15, 70);
}
.section_one {
  color: #fff;
}
.loading {
  text-align: center;
  height: 20vh;
  line-height: 20vh;
}
</style>