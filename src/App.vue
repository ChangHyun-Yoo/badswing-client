<template>
  <Navbar />
  <div style="height: 3.75em; width: 100%; background-color: #f5f5f5;" />
  <router-view />
</template>

<script>
import Navbar from '../src/components/Navbar.vue';
export default {
  name: 'App',
  components: {
    Navbar,
  }
}
</script>

<style>
#app {
  font-family: 'Noto Sans KR';
}

body {
  margin: 0;
}
</style>
