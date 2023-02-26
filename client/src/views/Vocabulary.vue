<template>
  <div v-loading="loading">
    <h2>Vocabulary</h2>
    <div class="actions-panel">
      <el-row :gutter="10" justify="center" type="flex">
        <el-col :span="5">
          <el-input
            v-model="origin"
            :debounce="1000"
            placeholder="Word to add"
          ></el-input>
        </el-col>
        <el-col :span="5">
          <el-input v-model="translation" placeholder="Translation" />
        </el-col>
        <el-col :span="2">
          <el-button
            :icon="Plus"
            :disabled="!enableAddBtn"
            @click="addWord"
            circle
          />
        </el-col>
      </el-row>
    </div>
    <words-list
      :words="dictionaryData"
      @[WordListEvents.DELETE_WORD]="deleteWord"
    />
    <el-pagination
      v-show="itemsTotal > limit"
      layout="prev, pager, next"
      :current-page="pageNumber"
      :page-size="limit"
      :total="itemsTotal"
      @current-change="fetchWords($event)"
    />
  </div>
</template>

<script>
import WordsList from '@/components/WordsList.vue';
import { debounce } from 'lodash';
import { defineComponent, ref, computed, onBeforeMount, watch } from 'vue';
import { WordListEvents } from '@/components/WordsList.vue';
import { Plus } from '@element-plus/icons-vue';
import { useWordsStore } from '@/store/words';

export default defineComponent({
  name: 'Vocabulary',
  components: { WordsList },
  setup() {
    const loading = ref(false);

    const origin = ref('');
    const translation = ref('');
    const pageNumber = ref(1);
    const itemsTotal = ref(0);
    const limit = ref(10);

    const wordsStore = useWordsStore();

    const dictionaryData = computed(() => wordsStore.words);

    const enableAddBtn = computed(() => {
      return (
        origin.value.length > 2 &&
        translation.value.length > 2 &&
        !dictionaryData.value.length
      );
    });

    const resetInputData = () => {
      origin.value = '';
      translation.value = '';
      itemsTotal.value = 0;
    };

    const addWord = async () => {
      loading.value = true;
      resetInputData();
      loading.value = false;
    };

    const deleteWord = async (origin) => {
      await wordsStore.deleteWord(origin);
    };

    const fetchWords = async () => {
      loading.value = true;

      await wordsStore.loadWords({
        search: origin.value,
        limit: limit.value,
        page: pageNumber.value,
      });

      loading.value = false;
    };

    const fetchWithDelay = debounce(() => {
      fetchWords();
    }, 500);

    watch(
      () => origin.value,
      () => {
        fetchWithDelay();
      }
    );

    onBeforeMount(() => {
      fetchWords();
    });

    return {
      loading,
      dictionaryData,
      origin,
      translation,
      pageNumber,
      itemsTotal,
      limit,
      enableAddBtn,
      addWord,
      deleteWord,
      fetchWords,
      WordListEvents,
      Plus,
    };
  },
});
</script>

<style>
.actions-panel {
  margin-bottom: 1em;
}
</style>

<style scoped>
h2 {
  margin: 1.5em 0 1em;
}

.el-pagination {
  margin-top: 1em;
}
</style>
