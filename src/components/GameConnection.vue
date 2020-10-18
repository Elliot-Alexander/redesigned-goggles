<template>
  <div class="rounded w-full">
    <p class="text-center">Server {{ status }}</p>
    <input readonly v-model="server" @focus="$event.target.select()" class="lg:text-6xl text-xl text-center shadow-md appearance-none border rounded w-full py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none" id="server" type="text" placeholder="Server starting...">
  </div>
</template>

<script>
export default {
  name: "GameConnection",
  data: () => ({
    server: '',
    status: 'Offline'
}),
sockets: {
    ip: function(val) {
      console.log("ip receiverd " + val);
      console.log(val);
      this.server = val;
      this.status="Online"
    },
  },
}
</script>

<style scoped>

</style>