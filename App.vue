<template>
  <div id="app">
    <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
      <template slot="header">
        Medical Heritage Library Word Analysis
      </template>
      <template slot="lead">
        Type a medical word in the search bar below and we will provide you with visualization of analyzed text data from medical library.
      </template>
      <hr class="my-4">
      <b-form-group>
        <b-col sm="6">
          <b-form-input v-model="word"
                        type="text"
                        placeholder="Search Word"
                        class="form-control col-sm-50"></b-form-input>
        </b-col>
      </b-form-group>
        <b-col sm="6">
          <b-button type="submit" @click="wordSearch()" variant="primary">Submit</b-button>
        </b-col>
    </b-jumbotron>
  </div>
</template>


<script>
import { eventBus } from './main.js';

export default {
  name: 'app',
  data(){
    return{
      word: null
    }
  },
  components: {
  },
  methods:{
    wordSearch: function(){
      let emit = this.word;
      eventBus.$emit('wordSearch', this.word);
    }
  }
}
</script>

<style>
</style>
