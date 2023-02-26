<template>
  <div>
    <el-table :data="words" empty-text="No words" @row-click="onRowClick">
      <el-table-column label="Word" prop="origin" />
      <el-table-column label="Phonetic" prop="phonetic" />
      <el-table-column label="Translation" prop="translation" />
      <el-table-column align="center" width="60">
        <template v-slot="scope">
          <el-button
            @click.stop="deleteItem(scope.row.origin)"
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
import { useRouter } from 'vue-router';

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
    const router = useRouter();
    const deleteItem = (origin) => {
      emit(WordListEvents.DELETE_WORD, origin);
    };
    const onRowClick = ({ origin }) => {
      router.push({
        name: 'WordPage',
        params: {
          origin,
        },
      });
    };
    return {
      deleteItem,
      Delete,
      onRowClick,
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
