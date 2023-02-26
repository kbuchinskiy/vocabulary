module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: './tsconfig.json',
  },
  rules: {
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'spaced-comment': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'vue/no-v-for-template-key': 'off',
    // Vue 3 allows v-model arguments
    'vue/no-v-model-argument': 'off',
    'vue/no-multiple-template-root': 'off',
  },
};
