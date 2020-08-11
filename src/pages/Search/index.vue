<template>
  <div>
    <h1>Search...</h1>
    params参数：{{$route.params.keyword}}
    query参数：{{$route.query.keyword}}
  </div>
</template>

<script>
export default {
  name: "Search",
};
</script>

<style lang="less" scoped>
</style>
