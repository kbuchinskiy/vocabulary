import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api, fetchWords, removeWord } from '@/api/words';

export const useWordsStore = defineStore('words', () => {
  const words = ref([]);
  const totalItems = ref(0);

  const loadWords = async (params) => {
    const { search, limit, page } = params;
    const data = await fetchWords(search, limit, page);
    words.value = data.data;
    words.totalItems = data.count;
  };

  const addWord = async (origin, translation) => {
    await api().post('/words', {
      origin,
      translation,
    });
  };

  const deleteWord = async (origin) => {
    await removeWord(origin);
  };

  return { words, totalItems, loadWords, addWord, deleteWord };
});
