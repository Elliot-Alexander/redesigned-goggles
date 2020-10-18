<template>
  <div class="bg-white shadow-2xl rounded px-8 py-6 pb-4 w-full flex flex-col h-screen">
    <div class="">
      <game-connection></game-connection>
    </div>
    <div class="self-center">
      <input readonly v-model="gamecode" @focus="$event.target.select()" class="lg:text-6xl text-xl text-center shadow-md appearance-none border rounded w-full py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none" id="gamecode" type="text" placeholder="Gamecode">
    </div>
    <div class="flex flex-row w-full h-full mr-2">
      <div v-if="host" class="w-full h-full">
        <console></console>
      </div>
      <div class="w-full ml-2">
        <users></users>
      </div>
    </div>
  </div>
</template>

<script>
import Console from "@/components/Console";
import Users from "@/components/Users";
import GameConnection from "@/components/GameConnection";
export default {
  name: "Game",
  components: {GameConnection, Users, Console},
  data: () => ({
    host: true,
    gamecode: '',
    started: false
  }),
  sockets: {
    userInfo: function (val) {
      this.gamecode = val
    }
  },
  methods: {
    startServer: function () {
      if (!this.started) {
        this.$socket.client.emit('startServer', true)
        this.started = !this.started
      } else {
        this.$socket.client.emit('stopServer', true)
        this.started = !this.started
      }
    }
  }
}
</script>

<style scoped>

</style>