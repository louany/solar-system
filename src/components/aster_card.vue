<template>
  <div class="aster_card">
    <article class="aster">
      {{ aster.name }}
      <p class="isPlanet">
        <span>Planète : </span>
        <span v-if="aster.isPlanet">
          Oui
        </span>
        <span v-else>
          Non
        </span>
      </p>
      <p class="withMoon">
        <span>Lunes :  </span>
        <span v-if="aster.moons">
          <ul>
            <li
              v-for="(moon, index) in aster.moons"
              :key="index"
            >
              {{ moon.moon }}
            </li>
          </ul>
        </span>
        <span v-else>
          Non
        </span>
      </p>
      <router-link
        :to="{name : 'Aster', params : { id : aster.id }}"
        class="aster_link"
      >
        En savoir plus
      </router-link>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    aster : {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss">
  .aster_card {
    width: 100%;
    padding: 0 5px;
  }
  .aster {
    background: rgb(45, 37, 151);
    padding: 2.4rem;
    margin-bottom: .8rem
  }
  .aster_link {
    text-align: center;
    width: 12rem;
    margin: 0 auto;
    display: block;
    color: #fff;
    padding: .4rem .8rem;
    text-decoration: none;
    border: 1px solid #fff;
    &:hover {
      color: rgb(204, 122, 16);
      border: 1px solid rgb(204, 122, 16);
    }
  }
  @media (min-width: 768px) {
    .aster_card {
      width: 50%;
    }
  }
  @media (min-width: 998px) {
    .aster_card {
      width: calc(100% /3);
    }
  }
</style>