<template>
  <div class="outer page404">
    <h1>{{ tipsMessage }}</h1>
    <h2>当前账号无访问权限，请联系管理员</h2>
  </div>
</template>
<script>
export default {
  name: 'page404',
  data() {
    return {
      tipsMessage: '404',
    };
  },
};
</script>
<style lang="scss" scoped>
.outer {
  width: 100%;
  height: 100%;
  &.page404 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
