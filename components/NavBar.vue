<template>
  <b-navbar toggleable="md" type="dark" variant="info" class="nav-bar">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">Demo Chat App - SocketIO</b-navbar-brand>
    <b-collapse id="nav_collapse" is-nav>
      <b-navbar-nav class="ml-auto logged_user">
        Welcome back {{ loggedUser }}
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
    
<script>
export default {
  name: 'NavBar',
  props: {
    loggedUser: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  }
}
</script>
    
<style scoped>
  .nav-bar {
    border-bottom: 1px solid #17a2b8;
  }
</style>