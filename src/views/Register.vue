<template>
    <div class="bg-white shadow-2xl rounded px-8 py-6 pb-4 mb-4 w-full lg:w-1/2 lg:mx-auto">
      <div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="username">
            Name
          </label>
          <input v-model="name" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="username" type="text" placeholder="Name">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="room">
            Room ID
          </label>
          <input v-model="room" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="room" type="text" placeholder="Room ID">
        </div>
        <div class="flex mb-4 justify-center mb-4">
          <button v-on:click="" class="text-white font-bold py-3 rounded w-1/2 bg-gradient-to-r from-teal-400 to-indigo-700">
            <span>Join</span>
          </button>
      </div>
        <div class="flex mb-4 justify-center mb-4">
          <button v-on:click="" class="text-white font-bold py-3 rounded w-1/2 bg-gradient-to-r from-teal-400 to-indigo-700">
            <span>Generate Room ID</span>
          </button>
      </div>
      <div v-if="error" class="shadow bg-red-700 rounded mb-6 text-center font-semibold text-white">
        <p class="py-2">Oops! Looks like there's something wrong.</p>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    name: '',
    room: '',
    error: false
  }),
  sockets: {
    roomCheck: function(val) {
      if (val) {
        this.$router.push('/chat')
        this.$router.go(1)
      } else {
        this.error = true
      }
    }
  },
  methods: {
    register: function () {
      if (this.name !== undefined || this.name !== '' &&
          this.room !== undefined || this.room !== '') {
        this.$socket.client.emit('register_user', {
          name: this.name,
          room: this.room
        })
      }
    },

  }
}
</script>

<style scoped>

</style>