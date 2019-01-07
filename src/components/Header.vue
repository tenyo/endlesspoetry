<template>
  <div class="container">
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <span class="navbar-brand mr-auto">
        <img src="@/assets/images/quill.png" width="30" height="30" class="d-inline-block align-top" alt="">
        Endless Poetry
      </span>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item mr-2 my-auto">
          <app-settings :settings="settings"></app-settings>
        </li>
        <li class="nav-item">
          <div class="navbar-text small">
            <span class="d-none d-md-block">Powered by</span>
            <a href="https://github.com/thundercomb/poetrydb" target="_blank">PoetryDB</a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import AppSettings from './Settings.vue'

export default {
  props: {
    settings: Object
  },
  components: {
    AppSettings
  }
}
</script>

<style scoped>
.navbar-nav {
  flex-direction: row;
}
</style>
