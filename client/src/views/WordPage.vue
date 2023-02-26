<template>
  <h1>{{ wordData.origin }}</h1>
  <el-table :data="wordData.definitions" empty-text="No adddition data">
    <el-table-column label="Part of speach" prop="part_of_speech" />
    <el-table-column label="Definiiton" prop="definition" />
    <el-table-column label="Example" prop="example" />
  </el-table>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from 'vue';
import { fetchWord } from '@/api/words';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'WordPage',
  setup() {
    const wordData = ref('');
    const route = useRoute();

    onBeforeMount(async () => {
      const { data } = await fetchWord(route.params.origin);
      wordData.value = data;
    });
    return { wordData };
  },
});
</script>

<style scoped></style>
