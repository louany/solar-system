<template>
  <Header />
  <main role="main">
    <router-view />
  </main>
</template>

<script>
import Header from './layout/components/header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-size: 10px;
}

#app {
  font-family: cursive, 'Courier New', Courier, monospace;
  position: relative;
  z-index: 1;
  font-size: 16px;
  background: rgb(19, 15, 70);
  height: 100vh;
  max-height: 100vh;
}

main {
  & > :not(.homeBg)  {
    padding-top: 12vh;
  }
  background: rgb(19, 15, 70);
}
section {
  padding: 0 3vh;
  h1 {
    color: rgb(204, 122, 16);
    font-size: 3.2rem;
    border-bottom: 4px solid rgb(204, 122, 16);
  }
}

</style>
