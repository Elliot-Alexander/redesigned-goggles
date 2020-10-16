<template>
    <div class="block flex w-full">
      <h2 class="text-xl">{{ name }}</h2>
    </div>
</template>

<script>
export default {
  name: "User",
  props: {
    name: String
  },
  methods: {
  }
}
</script>

<style scoped>

</style>