<template>
  <div class="container px-5">
    <div
      v-for="(poem, pid) in poems"
      :key="pid"
      class="row justify-content-left"
    >
      <div class="col">
        <h3>{{ poem.title }}</h3>
        <h4 class="mb-3">
          {{ poem.author }}
        </h4>
        <div
          v-for="(line, lid) in poem.lines"
          :key="lid"
        >
          {{ line }}
        </div>
      </div>
    </div>
    <div
      v-if="loadingPoems"
      class="row"
    >
      <div class="col">
        <img
          src="@/assets/images/moving_quill.gif"
          alt="Loading..."
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['api', 'maxLines'],
  data () {
    return {
      poems: [],
      titles: [],
      bottom: false,
      counter: 0,
      loadingPoems: false
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
  },
  methods: {
    // loads the poem(s) with the given titles
    loadPoem (...titles) {
      for (const title of titles) {
        console.debug('Getting poem', title)
        this.loadingPoems = true
        axios.get(this.api + '/title/' + title + ':abs')
          .then(response => {
            console.debug('Got', response.data[0].linecount, 'lines')
            this.loadingPoems = false
            if (response.data[0].linecount < this.maxLines) {
              this.poems.push(response.data[0])
            } else {
              this.loadPoem(this.titles[this.counter++])
            }
          })
          .catch(e => {
            console.error(e)
          })
      }
    },
    // loads all the available titles from the API
    loadTitles () {
      this.loadingPoems = true
      axios.get(this.api + '/title')
        .then(response => {
          this.titles = response.data.titles
          console.debug('Got', this.titles.length, 'titles')
          this.shuffle(this.titles)
          // let's load 3 poems initially
          this.loadPoem(this.titles[this.counter++], this.titles[this.counter++], this.titles[this.counter++])
        })
        .catch(e => {
          console.error(e)
        })
    },
    // shuffles the items in the given array
    shuffle (a) {
      let j, x, i
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
  }
}
</script>

<style scoped>
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
