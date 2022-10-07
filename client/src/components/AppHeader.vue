<template>
  <nav>
    <el-row v-if="!$auth.loading" :gutter="2" justify="end" type="flex">
      <el-col :span="2">
        <el-button v-if="!$auth.isAuthenticated" @click="login"
          >Sign in</el-button
        >
        <el-button v-if="$auth.isAuthenticated" @click="logout"
          >Log out</el-button
        >
      </el-col>
    </el-row>
  </nav>
</template>
<script>
export default {
  name: "Nav",
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>
