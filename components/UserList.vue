 <template>
  <div style="margin-top: 0px">
    <div v-for="(user, index) in users" :key="index">
      <div
        role="button"
        :class="[activeUser == user._id ? 'user active' : 'user']"
        @click="chat(user._id) "
      >
        {{ user.username }}
        <span v-if="user.hasNewMsg" class="has_new_message"
          >New message</span
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserList',
    props: {
      users: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        activeUser: null,
      }
    },
    created() {

    },
    mounted() {

    },

    methods: {
      chat(id) {
        this.activeUser = id
        this.$emit('chat', id)
      },
    },
  }
</script>

<style scoped>
  .user {
    margin: 0px !important;
    padding: 10px 4px 10px 8px;
    border-bottom: 1px solid gray;
  }
  .active {
    background: #17a2b8;
    color: white;
  }
  .has_new_message {
    background-color: #17a2b8;
    border-radius: 4px;
    display: inline-block;
    color: white;
    margin-bottom: -4px;
    font-size: 10px;
    margin: 4px;
    padding: 3px;
    font-weight: bolder;
  }
</style>
