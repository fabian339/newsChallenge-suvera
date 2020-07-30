<template>
  <v-container grid-list-md fluid>
    <v-layout wrap>
      <div id="homeTitle" class="display-1">
        Showing you the {{ contentType }}
      </div>
      <v-flex md12>
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="search"
          label="Filter news by keyword. Advanced: use quotes ('') for exact matches, and the + / - symbols for needed / excluded words."
          class="hidden-sm-and-down"
          v-model="filterQuery"
          @input="loadFilter"
        ></v-text-field>
      </v-flex>
      <div id="filterContainer">
        <h3>Filter by:</h3>
        <div class="filterCategory">
          <span>Date: </span>
          <input
            v-model="date"
            @input="onDateChange"
            id="dateInput"
            type="date"
          />
        </div>
        <div class="filterCategory">
          <span>Topic: </span>
          <input
            id="topicInput"
            @input="onTopicChange"
            v-model="topic"
            placeholder="Topic"
          />
        </div>
        <div class="filterCategory">
          <span>Source: </span>
          <input
            id="sourceInput"
            @input="onSourceChange"
            v-model="source"
            placeholder="Source"
          />
        </div>
      </div>
      <v-flex
        xs12
        sm12
        md12
        v-for="(article, index) in articles"
        :key="index + 15"
      >
        <Article :article="article" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import debounce from 'lodash/debounce'
import axios from 'axios'
import Article from '../components/Article'

axios.defaults.baseURL = `http://localhost:3000/dev`
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'
export default {
  components: {
    Article
  },
  data: () => ({
    articles: [],
    date: '',
    topic: '',
    source: '',
    filterQuery: '',
    contentType: 'top UK headlines'
  }),
  created() {
    this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
  },
  methods: {
    loadFilter: debounce(function loadFilter(input) {
      if (input) {
        this.contentType = `search results for: ${input}`
        this.loadArticles('search', JSON.stringify({ q: input }))
      } else {
        this.contentType = 'top UK headlines'
        this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
      }
    }, 500),
    loadArticles(type, params) {
      axios
        .post(`/articles?type=${type}`, params)
        .then(response => {
          this.articles = response.data.articles
        })
        .catch(error => console.log({ error }))
    },
    // handles the change of source
    onSourceChange: function(evt) {
      if (!this.source) {
        this.contentType = 'top UK headlines'
        this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
      } else {
        this.contentType = `search results for: ${evt.target.value}`
        this.loadArticles(
          'search',
          JSON.stringify({ sources: evt.target.value })
        )
      }
      this.date = ''
      this.topic = ''
    },
    // handles the change of topic
    onTopicChange: function(evt) {
      if (!this.topic) {
        this.contentType = 'top UK headlines'
        this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
      } else {
        this.contentType = `search results for: ${evt.target.value}`
        this.loadArticles('search', JSON.stringify({ q: evt.target.value }))
      }
      this.source = ''
      this.date = ''
    },
    // handles the change of date
    onDateChange: function(evt) {
      if (!evt.target.value) {
        this.contentType = 'top UK headlines'
        this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
      } else {
        const params = {
          from: evt.target.value,
          to: evt.target.value,
          q: 'technology',
          sortBy: 'popularity'
        }
        this.contentType = `search results for date: ${evt.target.value}`
        this.loadArticles('search', JSON.stringify(params))
      }
      this.topic = ''
      this.source = ''
    }
  }
}
</script>

<style scoped>
#homeTitle {
  margin: auto;
  margin-bottom: 2.5vh;
}
#dateInput {
  width: 135px;
  border-bottom: 2px solid steelblue;
}
#filterContainer {
  position: absolute;
  margin: 125px 5px;
}

.filterCategory {
  margin: 10px auto;
}

#topicInput {
  width: 130px;
  border-bottom: 2px solid steelblue;
}
#sourceInput {
  width: 121px;
  border-bottom: 2px solid steelblue;
}
</style>
