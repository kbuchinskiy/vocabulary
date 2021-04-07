<template>
  <div>
    <input v-model="wordInput" type="text" placeholder="enter word..." />

    <form
      v-show="wordsToDisplay.length === 0"
      class="add-word"
      @submit.prevent="addWord"
    >
      <input
        v-model="wordTranslation"
        type="text"
        placeholder="enter translation..."
        required="true"
      />
      <br />
      <button type="sumbit">add new word</button>
    </form>

    <section class="words-list">
      <word-list-item
        v-for="word in wordsToDisplay"
        :word="word"
        :key="word.id"
        @remove="deleteWord"
      ></word-list-item>
    </section>
  </div>
</template>

<script>
import _ from 'lodash'
import WordListItem from '@/components/WordListItem'
import wordService from '@/api/wordService'
export default {
  name: 'App',
  components: {
    WordListItem,
  },
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
          id: this.words.length + 1,
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

<style lang="scss" scoped>
input {
  padding: 0.4rem;
  min-width: 300px;
}

.words-list {
  min-width: 320px;
  max-width: 700px;
  margin: 3% auto 0;
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
