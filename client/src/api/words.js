import axios from 'axios';
import { ElMessage } from 'element-plus';

function api() {
  return axios.create({
    baseURL: 'http://localhost:8100/api',
  });
}

const fetchWords = async (search, limit, page) => {
  try {
    const { data } = await api().get('/words', {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // },
      params: {
        search,
        limit,
        page,
      },
    });

    return data;
  } catch (e) {
    ElMessage({
      message: 'Failed to load words',
      grouping: true,
      type: 'error',
    });
    console.error(e);
  }
};

const insertWord = async (origin, translation) => {
  try {
    await api().post('/words', {
      origin,
      translation,
    });
  } catch (e) {
    ElMessage({
      message: 'Word dose not exist',
      grouping: true,
      type: 'error',
    });
    console.error(e);
  }
};

const removeWord = async (origin) => {
  try {
    await api().delete(`/words/${origin}`);
    ElMessage({
      message: 'Word has been delete successfully',
      grouping: true,
      type: 'success',
    });
  } catch (e) {
    console.error(e);
  }
};

export { api, fetchWords, insertWord, removeWord };
