<template>
  <div>
    <el-table :data="words" empty-text="No words">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div v-for="(meaning, i) in scope.row.definitions" :key="i">
            <h2>{{ meaning.partOfSpeech }}</h2>
            <el-table :data="meaning.definitions">
              <el-table-column label="Definition" prop="definition" />
              <el-table-column label="Example" prop="example" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Word" prop="origin" />
      <el-table-column label="Phonetic" prop="phonetic" />
      <el-table-column label="Translation" prop="translation" />
      <el-table-column label="Image" width="80">
        <template v-slot="scope">
          <el-image :src="scope.row.imgUrl" fit="cover" alt="image" />
        </template>
      </el-table-column>
      <el-table-column align="center" width="60">
        <template v-slot="scope">
          <!--          <el-button icon="el-icon-edit" size="small" circle />-->
          <el-button
            @click="deleteItem(scope.row.origin)"
            icon="el-icon-delete"
            size="small"
            circle
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { api } from "../api/words";

export default {
  name: "WordsList",

  props: {
    words: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async deleteItem(origin) {
      const response = await api().delete(`/words/${origin}`);
      console.log(response);
      this.$emit("update");
    },
  },
};
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
