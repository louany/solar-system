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
    <transition name="fade">
      <p
        v-if="error"
        :class="`error`"
      >
        {{ error }}
      </p>
    </transition>
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
    const filter = ref(String)
    const astersList = ref([])
    const isLoading = ref(Boolean)
    const error = ref('')
    const errorClass = ref('in_progress')

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
      await axios
      .get('https://api.le-systeme-solaire.net/rest/bodies/')
      .then(resp => (astersList.value = resp.data.bodies))
      .catch((error) => error.value = 'Une erreur est survenue')
      setTimeout(() => {
        error.value = ''
      }, 2000);
      isLoading.value = false
    }

    function filtered(event) {
      filter.value = event
    }

    onMounted(getAllAsters)

    return { 
      asters : filteteredAstersList, 
      isLoading : isLoading,
      filtered : filtered,
      error : error,
      errorClass : errorClass
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
  .error {
    background: rgb(255, 89, 89);
    color: #fff;
    padding: .8rem 1.2rem;
    width: auto;
    max-width: 100%;
    position: absolute;
    top: 5vh;
    transform: translateX(-50%);
    left: 50%;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .loading {
    text-align: center;
    height: 20vh;
    line-height: 20vh;
  }
</style>