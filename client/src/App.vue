<template>
  <div id="app">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
export default {
  components: { AppHeader },
  name: "App",
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;

  text-align: center;
  color: #2c3e50;
}
</style>
