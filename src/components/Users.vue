<template>
  <div class="w-full border rounded h-full">
      <user v-for="user in users"
          :name="user"></user>
  </div>
</template>

<script>
import User from "@/components/User";
export default {
name: "Users",
  components: {User},
  data: () => ({
  users: []
}),
sockets: {
    users: function(val) {
      this.users = val;
    },
  },
}
</script>

<style scoped>

</style>