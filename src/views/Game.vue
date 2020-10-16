<template>
  <div class="bg-white shadow-2xl rounded px-8 py-6 pb-4 w-full flex flex-col h-screen">
    <div class="">
      <game-connection></game-connection>
    </div>
    <button v-on:click="startServer" class="text-white font-bold py-3 rounded w-1/3 bg-gradient-to-r from-teal-400 to-indigo-700 self-center mb-4">
      <span v-if="!started">Start</span>
      <span v-if="started">Stop</span>
    </button>
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
    started: false
  }),
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