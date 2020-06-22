<template>
  <div class="form-card">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Index",
};
</script>

<style lang="less" scoped>
.form-card {
  height: calc(~"100% - 100px");
  overflow-y: hidden;
  margin: 10px;
}
</style>
