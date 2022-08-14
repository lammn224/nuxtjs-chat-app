<template>
  <div>
    <h1>{{ title }}</h1>
    <form>
      <input v-model="text" type="text">
      <button type="submit" @click.prevent="sendMessage">Send</button>
      <p>
        <ul>
          <li v-for="(msg, index) of messages" :key="index">{{ msg }}</li>
        </ul>
      </p>
    </form>
  </div>
</template>

<script>
import {io} from 'socket.io-client'

export default {
  name: 'ChatView',
  data()  {
    return {
      title: 'Websocket Tester',
      text: '',
      messages: ['Some msg', 'Another msg'],
      socket: null,
    }
  },
  created() {
    this.socket = io('http://localhost:3000/')
    this.socket.on('msgToClient', (msg) => {
      this.receiveMessage(msg)
    })
  },
  methods: {
    sendMessage() {
      // console.log('send', this.text)
      this.socket.emit('msgToServer', this.text)
      this.text = ''
    },
    receiveMessage(msg) {
      // console.log('recv:', msg)
      this.messages.push(msg)
    }
  }
}
</script>
