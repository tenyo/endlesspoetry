<template>
  <div id="app">
    <app-header :settings="settings"></app-header>
    <poems-panel :api="settings.api" :maxLines="settings.maxLines"></poems-panel>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import PoemsPanel from './components/PoemsPanel.vue'

export default {
  name: 'app',
  components: {
    AppHeader,
    PoemsPanel
  },
  data () {
    return {
      settings: {
        // the base url of the API where we're getting the poems from
        api: 'https://poetrydb.org',
        // api: 'http://127.0.0.1:9292',
        // length cutoff for poems - anything longer than maxLines won't be displayed
        maxLines: 100
      }
    }
  }
}
</script>

<style>
</style>
