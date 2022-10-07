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
            icon="el-icon-plus"
            :disabled="!enableAddBtn"
            @click="addWord"
            circle
          />
        </el-col>
      </el-row>
    </div>
    <words-list :words="dictionaryData" @update="fetchWords" />
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
import WordsList from "@/components/WordsList";
import { api } from "@/api/words";
import _ from "lodash";

export default {
  name: "Vocabulary",
  components: { WordsList },
  data() {
    return {
      loading: false,
      dictionaryData: [],
      origin: "",
      translation: "",

      pageNumber: 1,
      itemsTotal: 0,
      limit: 10,
    };
  },
  computed: {
    enableAddBtn() {
      return (
        this.origin.length > 2 &&
        this.translation.length > 2 &&
        !this.dictionaryData.length
      );
    },
  },
  methods: {
    async addWord() {
      this.loading = true;
      try {
        await api().post("/words", {
          origin: this.origin,
          translation: this.translation,
        });
      } catch (e) {
        this.$message.error("Word doesn't exist");
        console.log(e);
      }

      this.origin = "";
      this.translation = "";
      this.itemsTotal = 0;

      this.loading = false;
    },
    async fetchWords(pageNumber = this.pageNumber) {
      this.loading = true;
      const { data } = await api().get("/words", {
        params: {
          search: this.origin,
          limit: this.limit,
          page: pageNumber,
        },
      });
      this.dictionaryData = data.data;
      this.itemsTotal = data.count;

      this.loading = false;
    },
  },
  watch: {
    //search
    origin: _.debounce(async function () {
      await this.fetchWords(this.origin);
    }, 500),
  },
  async created() {
    await this.fetchWords();
  },
};
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
