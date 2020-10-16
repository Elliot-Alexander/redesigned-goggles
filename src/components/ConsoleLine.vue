<template>
  <div class="w-full text-blue-500">
    <p>{{ terminalOutput }}</p>
  </div>
</template>

<script>
export default {
  name: "ConsoleLine",
  props: {
    terminalOutput: String
  }
}
</script>

<style scoped>

</style>