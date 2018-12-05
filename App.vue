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
          <b-col sm="6">
            <b-alert variant="danger"
                         dismissible
                         :show="showDismissibleAlert"
                         @dismissed="showDismissibleAlert=false">
                  Word does not exist. Try another word!
                </b-alert>
          </b-col>
          <hr id="divide"></hr>
          <b-col sm="6">
            <b-collapse id="collapse2">
                <b-card>
                  <b-form-input v-model="secondWord"
                                type="text"
                                placeholder="Search Word"
                                class="form-control col-sm-50"></b-form-input>

                  <div class="dropdown-divider" id="divide"></div>
                  <b-button @click="addSearch()" variant="secondary">Add</b-button>

                </b-card>
              </b-collapse>
          </b-col>
      </b-form-group>
      <b-col sm="6">
        <b-button type="submit" @click="wordSearch()" variant="primary">Submit</b-button>
        <b-btn v-b-toggle="'collapse2'" class="m-1">Add Query</b-btn>
      </b-col>
      
    </b-jumbotron>
  </div>
</template>


<script>
import { eventBus, database } from './main.js';
import mhl from './data.json';

export default {
  name: 'app',
  data(){
    return{
      word: null,
      points: null,
      newSeries: null,
      secondWord: null,
      showDismissibleAlert: false
    }
  },
  components: {
  },
  methods:{
    getData: async function(word) {
      // console.log(mhl)
      // let data = mhl;
      //let value;



      let rootRef = database.ref("words/" + word)
      let value = await rootRef.once("value")
      if(!value.exists()) {
        this.showDismissibleAlert = true;
      } else {
        //console.log(val);
        let data = value.val()
        //console.log(data);
        // .then(function(snapshot) {
        //   let value = snapshot.val();
        //   console.log(value);
        // })

        let arrayPoints = [];
        for(let key in data) {
          let tmpArray = [];
          tmpArray.push(Number(key));
          tmpArray.push(data[key]);
          arrayPoints.push(tmpArray);
        }
        //console.log(arrayPoints);
        this.points = arrayPoints;
        console.log(this.points);
        eventBus.$emit('getData', this.points);
      }
      
    },
    addData: async function (word) {
      // let data = mhl;
      // let value = data[word];

      let rootRef = database.ref("words/" + word)
      let value = await rootRef.once("value")
      if(!value.exists()) {
        this.showDismissibleAlert = true;
      } else {

        //console.log(val);
        let data = value.val()

        let arrayPoints = [];
        for(let key in data) {
          let tmpArray = [];
          console.log(key);
          tmpArray.push(Number(key));
          tmpArray.push(data[key]);
          arrayPoints.push(tmpArray);
        }
        this.newSeries = {
            name: this.secondWord,
            data: arrayPoints,
            //color: '#ff0000'
        };
        //console.log(this.newSeries)
        eventBus.$emit('addData', this.newSeries);
      }
    },
    wordSearch: function(){
      let emit = this.word;
      eventBus.$emit('wordSearch', this.word);
      this.getData(this.word);
    },
    addSearch: function() {
      this.addData(this.secondWord);
    }
  }
}
</script>

<style>
#divide{
  border-top: 0px rgba(0, 0, 0 ,0);
}

</style>
