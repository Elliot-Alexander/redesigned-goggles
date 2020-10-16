<template>
  <div id="app">
    <div class="flex lg:items-center h-screen lg:w-3/4 mx-auto">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data: () => ({

  }),
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

body{
  @apply bg-gradient-to-r from-indigo-700 to-teal-400;
  font-family: 'Roboto', sans-serif;
}
</style>
