<template>
  <div class="message-input">
    <b-form-input
      v-model="messageInput"
      type="text"
      placeholder="Enter your message"
      @keyup.enter.native="sendMessage"
    >
    </b-form-input>
  </div>
</template>
    
<script>
  export default {
    name: 'MessageInput',
    data() {
      return {
        messageInput: '',
      }
    },
    methods: {
      sendMessage() {
        // alert(this.messageInput)
        this.$emit('sendMessage', this.messageInput)
        this.messageInput = ''
      },
    },
  }
</script>
    
<style scoped>
  .message-input {
    position: absolute;
    bottom: 0px;
    width: 100%;
  }
</style>