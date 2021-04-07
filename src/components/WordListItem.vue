<template>
  <div class="word">
    <p>
      {{ word.en }}
      <span class="separator"> — </span>
      {{ word.ru }}
    </p>
    <button @click="$emit('remove', word.id)">delete</button>
  </div>
</template>

<script>
export default {
  name: 'word-list-item',
  props: {
    word: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
