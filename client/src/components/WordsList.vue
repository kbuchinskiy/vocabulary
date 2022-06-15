<template>
  <div>
    <el-table :data="words" empty-text="No words">
      <el-table-column type="expand">
        <template slot-scope="scope">
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
      <el-table-column label="Image" width="80">
        <template v-slot="scope">
          <el-image :src="scope.row.image_url" fit="cover" alt="image" />
        </template>
      </el-table-column>
      <el-table-column align="center" width="60">
        <template v-slot="scope">
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
