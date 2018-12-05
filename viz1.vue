<template>
  <div v-if="displayed" id="viz1" v-on:>
    <h2 style="text-align:center;">Frequency of word across time: </h2>
    <hr>
    <div class="button-grp" style="text-align:center;">
      <!-- <b-button @click="chartclick()" variant="secondary">Chart</b-button> -->
      <div class="divider"/>
    </div>
    <highcharts v-if="displayed_chart" :options="chartOptions" class="chart"></highcharts>
  </div>
</template>


<script>
import { eventBus } from './main.js';

export default {
  name: 'viz1',
  data(){
    return{
      displayed: false,
      displayed_chart: false,
      displayed_map: false,
      word: null,
      colorInputIsSupported: null,
      //points: null,
      chartOptions: {
        chart: {
          type: 'spline'
        },
        title: {
          text: null
        },
        // rangeSelector: {
        //     enabled: true,
        //     floating: true,
        //     verticalAlign: 'top',
        //     inputDateFormat: '%Y',
        // },
        // xAxis: {
        //     type:'dateTime',
        //     dateTimeLabelFormats: {
        //         year: '%Y'

        //     }
        // },
        // subtitle:{
        //   text: 'Something'
        // },
        //pointStart: null,
        series: [{
            name: null,
            data: null,
            color: '#6fcd98',
            
        }],
        // plotOptions: {
        //     series: {
        //         pointInterval: 24*3600*1000000
        //         //pointStart: Date.UTC(this.stockOptions.series[0].data, 0, 0)
        //     }
        // }
      }
    }
  },
  methods:{
    chartclick: function(){
      if (this.displayed_chart == false){
        this.displayed_chart = true;
      } else {
        this.displayed_chart = false;
      }
      if (this.displayed_map == true){
        this.displayed_map = false;
      }
    }
  },
  mounted() {
    eventBus.$on('wordSearch', (server) => {
      this.word = server;
      if (this.word != null){
        this.displayed = true;
        this.displayed_chart = true;
        //this.chartOptions.title.text = this.word;
        //this.mapOptions.title.text = this.word;
      }
    }),
    eventBus.$on('getData', (server) => {
        //console.log(server);
        this.chartOptions.series[0].data = server;
        this.chartOptions.series[0].name = this.word;
        //console.log(this.points);
        //console.log(this.chartOptions.series);
        //this.chartOptions.pointStart = server[0][0];
        //console.log(this.chartOptions.pointStart);
    }),
    eventBus.$on('addData',(server) => {
        console.log(server);
        this.chartOptions.series.push(server);
    })
  }
}


</script>

<style>
.divider{
    width:10px;
    height:auto;
    display:inline-block;
}

.chart{
  margin-top:20px;
}
</style>
