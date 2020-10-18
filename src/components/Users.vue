<template>
  <div class="w-full border rounded h-full">
      <user name="John Doe"></user>
      <user name="John Doe"></user>
      <user name="John Doe"></user>
      <user name="John Doe"></user>
  </div>
</template>

<script>
import User from "@/components/User";
export default {
name: "Users",
  components: {User},
sockets: {
    users: function(val) {
      users = val;
    },
  },
}
</script>

<style scoped>

</style>