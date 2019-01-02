<template>
  <div id="app">
    <app-header></app-header>
    <poems-panel></poems-panel>
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
  }
}
</script>

<style>
</style>
