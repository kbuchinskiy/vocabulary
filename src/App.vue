<template>
  <div id="app">
    <h1>vocabulary</h1>
    <br />
    <input type="text" v-model="wordInput" />
    <button v-show="wordsToDisplay.length === 0" @click="addWord">add</button>
    <div class="words-list">
      <div class="word" v-for="(word, index) in wordsToDisplay" :key="index">
        {{ word.en }}
        <span class="separator"> — </span>
        {{ word.ru }}
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import wordService from '@/api/wordService'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      wordInput: '',
      words: ['lorem', 'durem'],
      wordsToDisplay: [],
    }
  },
  methods: {
    onWordChange: _.throttle(function (current) {
      this.wordsToDisplay = this.words.filter((w) => w.en.startsWith(current))
    }, 500),
    addWord() {
      this.words.push(this.wordInput)
      this.wordInput = ''
    },
    async getWords() {
      const { data } = await wordService.getWords()
      this.words = data
      this.wordsToDisplay = this.words
    },
  },
  watch: {
    wordInput(current) {
      this.onWordChange(current)
    },
  },
  async created() {
    await this.getWords()
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.words-list {
  margin: 3% 20% 0;
}

.word {
  display: flex;
  margin-bottom: 0.5rem;

  padding: 0.3rem;
  border-bottom: 1px solid rgb(207, 207, 207);

  .separator {
    display: inline-block;
    margin: 0 1rem;
  }
}
</style>
