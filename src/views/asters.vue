<template>
  <section class="section_one">
    <h1>Les astres</h1>
    <!-- {{ astersList }} -->
    <aster-filter @filter="filtered($event)" />
    <aster-list
      v-if="!isLoading"
      :asters="asters"
    />
    <div
      v-else
      class="loading"
    >
      <p>CHARGEMENT...</p>
    </div>
  </section>
</template>

<script>
import AsterList from '../components/aster_list.vue'
import AsterFilter from '../components/aster_filter.vue'

import {computed, onMounted, ref} from 'vue'
import axios from 'axios';

export default {
  components : {
    AsterList,
    AsterFilter
  },
  setup(_) {
    const filter = ref('')
    const astersList = ref([])
    const isLoading = ref(Boolean)

    const filteteredAstersList = computed(() => {
      switch (filter.value) {
        case 'isPlanet':
            return astersList.value.filter((aster) => aster.isPlanet === true)
          break;
        case 'withMoon':
            return astersList.value.filter((aster) => aster.moons != null)
          break;
        default:
          return astersList.value
          break;
      }
    });

    const getAllAsters = async () => {
      isLoading.value = true
      await axios.get('https://api.le-systeme-solaire.net/rest/bodies/').then(resp => (astersList.value = resp.data.bodies)).catch(
        (error) => console.log(error)
      )
      isLoading.value = false
    }

    function filtered(event) {
      filter.value = event
    }

    onMounted(getAllAsters)

    return { 
      asters : filteteredAstersList, 
      isLoading : isLoading,
      filtered
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