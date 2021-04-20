<template>
  <div id="app">
    <h1>v-vocabulary</h1>
    <word-list />
  </div>
</template>

<script>
import WordList from '@/components/WordList'
export default {
  name: 'App',
  components: {
    WordList,
  },
}
</script>

<style lang="scss">
// @import 'reset-css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
