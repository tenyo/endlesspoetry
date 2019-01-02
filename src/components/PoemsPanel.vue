<template>
  <div class="container px-5">
    <div class="row justify-content-left" v-for="(poem, pid) in poems" :key="pid">
      <div class="col">
        <h3>{{ poem.title }}</h3>
        <h4 class="mb-3">{{ poem.author }}</h4>
        <div v-for="(line, lid) in poem.lines" :key="lid">{{ line }}</div>
      </div>
    </div>
    <div class="row" v-if="loadingPoems">
      <div class="col">
        <img src="@/assets/images/moving_quill.gif" alt="Loading...">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      // the base url of the API where we're getting the poems from
      // using a CORS hack since the API doesn't Access-Control-Allow-Origin: *
      api: 'https://cors.io/?http://poetrydb.org',
      // length cutoff for poems - anything longer than maxLines won't be displayed
      maxLines: 100,
      // internal variables to hold all the loaded poems/titles
      poems: [],
      titles: [],
      bottom: false,
      counter: 0,
      loadingPoems: false
    }
  },
  methods: {
    // loads the poem(s) with the given titles
    loadPoem (...titles) {
      for (var title of titles) {
        console.debug('Getting poem', title)
        let self = this
        self.loadingPoems = true
        axios.get(this.api + '/title/' + title + ':abs')
          .then(response => {
            console.debug('Got', response.data[0].linecount, 'lines')
            self.loadingPoems = false
            if (response.data[0].linecount < self.maxLines) {
              self.poems.push(response.data[0])
            } else {
              self.loadPoem(self.titles[self.counter++])
            }
          })
          .catch(e => {
            console.error(e)
          })
      }
    },
    // loads all the available titles from the API
    loadTitles () {
      let self = this
      self.loadingPoems = true
      axios.get(this.api + '/title')
        .then(response => {
          self.titles = response.data.titles
          console.debug('Got', self.titles.length, 'titles')
          self.shuffle(self.titles)
          // let's load 3 poems initially
          self.loadPoem(self.titles[self.counter++], self.titles[self.counter++], self.titles[self.counter++])
        })
        .catch(e => {
          console.error(e)
        })
    },
    // shuffles the items in the given array
    shuffle (a) {
      var j, x, i
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
      }
      return a
    },
    // return true if the bottom of the page is visible
    bottomVisible () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    }
  },
  watch: {
    bottom (bottom) {
      if (bottom && !this.loadingPoems) {
        this.loadPoem(this.titles[this.counter++])
      }
    }
  },
  created () {
    this.loadTitles()
  },
  mounted () {
    // infinite scroll
    window.onscroll = () => {
      this.bottom = this.bottomVisible()
    }
  }
}
</script>

<style>
.container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 100px;
  margin-bottom: 50px;
}
.row {
  margin-top: 50px;
  margin-bottom: 100px;
}
</style>
