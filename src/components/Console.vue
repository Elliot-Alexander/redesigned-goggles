<template>
  <div class="bg-gray-800 shadow-2xl rounded px-8 py-6 pb-4 mb-4 w-full h-full flex flex-col">
    <div class="h-full">
      <console-line v-for="commandOutput in commandOutputs"
      :terminal-output="commandOutput.message"></console-line>
    </div>
    <div class="w-full">
      <input v-on:keyup.enter="sendCommand" v-model="command" class="bg-gray-700 shadow-md appearance-none rounded w-full py-2 px-3 text-blue-500 leading-tight focus:outline-none" id="command" type="text" placeholder="Command">
    </div>
  </div>
</template>

<script>
import ConsoleLine from "@/components/ConsoleLine";
export default {
  name: "Console",
  components: {ConsoleLine},
  data: () => ({
    command: '',
    commandOutputs: []
  }),
  methods:  {
    sendCommand: function () {
      this.$socket.client.emit('command', this.command)
      this.command = ''
    }
  },
  sockets: {
    command: function (data) {
      let consoleLine = {message: data }
      this.commandOutputs.push(consoleLine)
    }
  }
}
</script>

<style scoped>

</style>