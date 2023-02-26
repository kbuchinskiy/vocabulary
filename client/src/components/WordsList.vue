<template>
  <div>
    <el-table :data="words" empty-text="No words">
      <el-table-column type="expand">
        <template v-slot="scope">
          <el-table :data="scope.row.definitions">
            <el-table-column prop="part_of_speech" label="Part of speech" />
            <el-table-column prop="definition" label="Definition" />
            <el-table-column prop="example" label="Example" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="Word" prop="origin" />
      <el-table-column label="Phonetic" prop="phonetic" />
      <el-table-column label="Translation" prop="translation" />
      <el-table-column align="center" width="60">
        <template v-slot="scope">
          <el-button
            @click="deleteItem(scope.row.origin)"
            :icon="Delete"
            type="danger"
            size="small"
            circle
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Delete } from '@element-plus/icons-vue';

export const WordListEvents = {
  DELETE_WORD: 'DELETE_WORD',
};

export default defineComponent({
  name: 'WordsList',
  props: {
    words: {
      type: Array,
      required: true,
    },
  },
  emits: Object.values(WordListEvents),
  setup(props, { emit }) {
    const deleteItem = (origin) => {
      emit(WordListEvents.DELETE_WORD, origin);
    };
    return {
      deleteItem,
      Delete,
    };
  },
});
</script>

<style scoped>
h2 {
  margin: 0.5em 0 0;
}

.el-image {
  display: block;
  width: 50px;
  height: 50px;
}
</style>
