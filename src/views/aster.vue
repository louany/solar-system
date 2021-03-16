<template>
  <section>
    <!-- <p>{{ aster }}</p> -->
    <p v-if="aster">
      {{ aster.name }}
    </p>
    <p class="withMoon">
      <span>Lunes :  </span>
      <span v-if="aster.moons">
        <ul>
          <li
            v-for="(moon, index) in moons"
            :key="index"
          >
            <router-link :to="{name : 'Aster', params : { id : moon.id }}">
              {{ moon.name }}
            </router-link>
          </li>
        </ul>
      </span>
      <span v-else>
        Non
      </span>
    </p>
  </section>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
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
    const moonsOfAster = ref(aster.value.moons)
    const moons = ref([])
    const error = (String)

    const asterComputed = computed(() => {
      return aster.value
    })
    const moonsComputed = computed(() => {
      return moons.value
    })

    async function getAster(asterId) {
      await axios
      .get(`https://api.le-systeme-solaire.net/rest/bodies/${asterId}`)
      .then( (resp) => aster.value = resp.data )
      .catch( (e) => console.log(e))
    }

    async function getMoonsOfAster(moonsList) {
      if(Array.isArray(moonsList)) {
          moonsList.map( async (moon) => 
          await axios
          .get(moon.rel)
          .then( (resp) => moons.value.push(resp.data))
          .catch( (e) => console.log(e))
        )     
      } else {
        console.log('Pas de lunes')
        return moons.value = []
      }
    }

    onMounted( async function () {
      await getAster(props.asterId)
      await getMoonsOfAster(aster.value.moons)
    })
    
    watch(() => props.asterId,
      async newData => {
        aster.value = await getAster(props.asterId)
        moons.value = await getMoonsOfAster(moonsOfAster)
      } 
    )
    return { 
      moons: moonsComputed, 
      aster: asterComputed 
    }
  }
}
</script>

<style>

</style>