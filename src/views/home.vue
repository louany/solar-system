<template>
  <div class="homeBg">
    <img
      src="@/assets/background.png"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="scss" scoped>
main {
  overflow: hidden;
}
.homeBg {
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  max-width: 100%;
  max-height: 100vh;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>