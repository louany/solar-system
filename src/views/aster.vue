<template>
  <div>{{ aster }}</div>
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
</template>

<script>
import { onMounted, ref, watch } from 'vue'
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
    const moons = ref([])
    const error = (String)

    async function getAster(asterId) {
      await axios
      .get(`https://api.le-systeme-solaire.net/rest/bodies/${asterId}`)
      .then( (resp) => aster.value = resp.data )
      .catch( (e) => console.log(e))
    }

    function getMoonsOfAster() {
      if(aster.value.moons) {
          aster.value.moons.map( async (moon) => 
          await axios
          .get(moon.rel)
          .then( (resp) => moons.value.push(resp.data))
          .catch( (e) => console.log(e))
        )     
      } else {
        return console.log('Pas de lunes')
      }
    }

    onMounted( async function () {
      await getAster(props.asterId)
      await getMoonsOfAster()
    })
    
    watch(() => props.asterId,
      async newData => {
        aster.value = await getAster(props.asterId)
        moons.value = await getMoonsOfAster()
      } 
    )
    return { aster, moons }
  }
}
</script>

<style>

</style>