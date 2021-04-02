<template>
  <div id="app">
    <h1>v-vocabulary</h1>
    <br />
    <input v-model="wordInput" type="text" placeholder="enter word..." />

    <section v-show="wordsToDisplay.length === 0" class="add-word">
      <input
        v-model="wordTranslation"
        type="text"
        placeholder="enter translation..."
      />
      <br />
      <button @click="addWord">add new word</button>
    </section>

    <section class="words-list">
      <article
        class="word"
        v-for="(word, index) in wordsToDisplay"
        :key="index"
      >
        <p>
          {{ word.en }}
          <span class="separator"> — </span>
          {{ word.ru }}
        </p>
        <button @click="deleteWord(word.id)">delete</button>
      </article>
    </section>
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
      wordTranslation: '',
      words: [],
      wordsToDisplay: [],
    }
  },
  methods: {
    onWordChange: _.throttle(function (current) {
      this.wordsToDisplay = this.words.filter((w) => w.en.startsWith(current))
    }, 500),
    async addWord() {
      if (this.wordTranslation) {
        await wordService.postWord({
          id: this.words[this.words.length - 1].id + 1,
          en: this.wordInput,
          ru: this.wordTranslation,
        })
        this.wordInput = ''
        this.wordTranslation = ''
        this.getWords()
      } else {
        alert('enter word translation')
      }
    },
    async deleteWord(id) {
      await wordService.deleteWord(id)
      this.getWords()
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

input {
  padding: 0.4rem;
  min-width: 300px;
}

.words-list {
  margin: 3% 20% 0;
}

.word {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  padding: 0.3rem;
  border-bottom: 1px solid rgb(207, 207, 207);

  p {
    margin: 0;
  }

  .separator {
    display: inline-block;
    margin: 0 1rem;
  }
}

.add-word {
  input {
    margin: 1rem 0;
  }
  button {
    padding: 0.3rem;
  }
}
</style>
