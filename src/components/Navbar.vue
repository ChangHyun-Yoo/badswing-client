<template>
  <div>
    <router-link :to="{name: 'Home'}" class="title">
          배드민턴 자세 진단
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.title {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.75em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  color: #3f4144;
  z-index: 100;
  padding-left: 3em;
  font-weight: bold;
  text-decoration: none;
}
</style>