<template>
  <Home></Home>
</template>

<script>
import Home from "./views/Home";

export default {
  name: 'App',
  components: {Home},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.scrollarea {
  overflow-y: auto;
}
</style>
