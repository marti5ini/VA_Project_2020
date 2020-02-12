<template>
  <div class="container">
    <h2 class="h2-responsive indigo-text flex-center">Binary Dependency</h2>
    <div class="container my-5 p-5 z-depth-1">
      <h5>Choose a dataset</h5>
      <!-- Basic dropdown -->
      <div class="col-md-10">
        <mdb-btn-group v-model="selected">
          <mdb-btn v-for="(item, i) in dataset.options"
                   :key="item.key"
                   :label="item.label"
                   :value="item.key"
                   @click.native="current = i"
                   :class="{current: i === current}"
                   color="primary"
          >{{item.label}}</mdb-btn>
        </mdb-btn-group>
        <div>
          {{dataset.options[current].nodes}}
        </div>
        <div class="block">
          <div id="graph-viz" class="col-md-12">
            <svg width='100%' height='430'></svg>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mdbBtn, mdbBtnGroup } from 'mdbvue';
  //import binaryViz from "../components/binaryViz";
  const d3 = require('d3');

  export default {
    name: 'binaryDep',
    components: {
      mdbBtn,
      mdbBtnGroup,
      //binaryViz
    },
    data() {
      return {
        current: 0,
        selected: 'dataset1',
        dataset: {
          options: [
            {
              key: 'dataset1',
              label: 'abalone',
              nodes: ['rings', 'length'],
              path: 'public/data/abalone.csv',
            },
            {
              key: 'dataset2',
              label: 'faithful',
              nodes: ['eruptions', 'waiting'],
              path: 'public/data/faithful.csv',
            },
            {
              key: 'dataset3',
              label: 'climate',
              nodes: ['altitude', 'temperature'],
              path: 'public/data/climate.csv',
            },
            {
              key: 'dataset4',
              label: 'undata',
              nodes: ['age', 'capital_latitude'],
              path: 'public/data/undata.csv',
            }
          ]
        },
      }
    },
    mounted() {
      const svg = d3.select("#graph-viz svg");
      const radius = 32;
      const height = 200;
      const width = 200;

      svg.selectAll("circle")
              .enter()
              .data(this.dataset.options[this.current].nodes)
              .join("circle")
              .attr('cx', '250')
              .attr('cy', '150')
              .attr('r', '100')



    }
  }
</script>

<style>
  .about h2{
    margin-top: 2em;
    font-weight: bold;
  }
  mdb-btn {
    text-decoration-color: white;
  }
  button.btn.btn-primary.ripple-parent.current {
    background-color: #0069d9 !important;
    border-color: #005cbf !important;
  }
</style>
