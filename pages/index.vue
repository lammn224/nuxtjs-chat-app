<template>
  <div>
    <div id="app">
      <login-view v-if="!authenticated" @authenticated="setAuthenticated" />
      <b-container v-else>
        <nav-bar :logged-user="loggedUserUsername" />
        <b-row class="main-area">
          <b-col cols="4" class="users">
            <user-list :users="users" @chat="chat" />
          </b-col>
          <b-col cols="8" class="messages-area">
            <div class="messages-main">
              <div v-if="!currentConversation" class="select-chat text-center">
                Select a user to start chatting...
              </div>
              <message-view
                v-else
                :active-chat="activeChatId"
                :messages="messages[currentConversation]"
              />
            </div>
            <message-input v-if="currentConversation" @sendMessage="sendMessage" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>


<script>
  import socket from '~/plugins/socket.io.js'

  export default {
    name: 'IndexPage',
    data() {
      return {
        messages: {},
        users: [],
        activeChatId: null,
        activeChatIndex: null,
        loggedUserId: null,
        loggedUserUsername: null,
        currentConversation: null,
        authenticated: false,
        token: '',
      }
    },

    created() {

    },

    methods: {
      async sendMessage(text) {
        const res = await this.$axios.post('/messages', {
          sender: this.loggedUserId,
          reciever: this.activeChatId,
          conversation: this.currentConversation,
          message: text
        })

        const { data } = res
        this.messages[this.currentConversation].push(data)
        socket.emit('msgToServer', data)
      },

      // eslint-disable-next-line require-await
      async receiveMessage(data) {
        if(data.sender !== this.loggedUserId) {
          const index = this.users.findIndex(user => user.id === data.sender)

          this.$set(this.users, index, {
            ...this.users[index],
            hasNewMsg: true
          })

          this.messages[data.conversation].push({
            message: data.message,
            sender: data.sender,
            reciever: data.reciever,
            conversation: data.conversation
          })
        }
      },

      async getMessage(conversationId) {
        try {
          const res = await this.$axios.get('/messages/get-messages-by-conversation-id/' + conversationId)
          const { data } = res
          this.$set(this.messages, conversationId, data)

        } catch (error) {
          
        }
      },

      async chat(userId) {
        this.activeChatId = userId

        this.activeChatIndex = this.users.findIndex(user => 
          user.id === this.activeChatId
        )

        this.$set(this.users, this.activeChatIndex, {
          ...this.users[this.activeChatIndex],
          hasNewMsg: false
        })

        const res = await this.$axios.post('/conversations/request-conversation', {
          participants: [this.loggedUserId, this.activeChatId]
        })

        const { data } = res

        this.users[this.activeChatIndex].conversationId = data._id
        this.currentConversation = data._id

        this.getMessage(data._id)

        socket.on('msgToClient', (msg) => {
          this.receiveMessage(msg)
        })

      },

      async setAuthenticated(loginStatus, userData) {
        this.loggedUserId = userData.id
        this.loggedUserUsername = userData.username
        this.authenticated = loginStatus
        this.token = userData.access_token

        try {
          const res = await this.$axios.get('/users')
          const { data } = res

          this.users = data.filter(user => user.username !== userData.username)

        } catch (error) {
          
        }


      },
    }
  }
</script>

<style>
.messages-main {
  overflow-y: scroll;
  height: 90%;
}
.users {
  padding: 0px !important;
  border: 1px solid gray;
}
.no-margin {
  margin: 0px;
}
.messages-area {
  border: 1px solid gray;
  padding: 0px !important;
  max-height: calc(100vh - 4em) !important;
}
.input-message {
  height: 40px;
}
.active {
  background: #17a2b8 !important;
  border: #17a2b8 !important;
}
.select-chat {
  margin-top: 35vh;
  padding: 8px;
}
.main-area {
  margin: 0px;
  min-height: calc(100vh - 5em) !important;
}
.logged_user {
  color: white;
}
</style>
