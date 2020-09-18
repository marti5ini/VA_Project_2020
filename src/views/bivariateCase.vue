<template>
  <mdb-container class="mb">
    <!-- Header-->
    <div class="header d-flex justify-content-center">
      <h2 class="indigo-text"><strong>Bivariate Case</strong></h2>
    </div>
    <!-- Scatter plot + overview-->
    <mdb-row>
      <mdb-col sm="6">
        <mdb-card class="intro">
          <div id="scatter_plot" v-if="selected" :visible="visible"/>
          <scatterplotExample v-if="!selected" :data="climateData" :current="current"/>
        </mdb-card>
      </mdb-col>

      <mdb-col sm="6">
        <mdb-card class="intro">
          <mdb-card-body>
            <h5 class="font-weight-bold">Overview</h5>
            <p class="text-justify">
              The most elementary form of such a causal discovery problem is to decide
              whether X causes Y or, alternatively, Y causes X, given joint observations of two variables
              X, Y.<br>
              Examine the scatter plot of values of variable B plotted
              as a function of values of variable A.<br>
              <strong>Can you guess which one is a cause of the other?</strong>
              <mdb-btn id="message" block @click="toggle()">Show answer</mdb-btn>
              <span v-if="visible">The data consists of measurements of altitude and mean annual
                   temperature of more than 300 weather stations in Germany. It should be obvious that
                   altitude causes temperature rather than the other way around.
                     <br> So, the right answer is B causes A.
                    </span>

            </p>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
    <!-- Description of the procedure-->
    <br>
    <section>
      <h5 class="section_title">Model Description</h5>
      <p>Hoyer et al.  <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
          <span slot="tip">P. O. Hoyer, D. Janzing, J. M. Mooij, J. Peters, and B. Scholkopf.
            <i>Nonlinear causal discovery with additive noise models.</i>
            In Advances in Neural Information Processing Systems 21 (NIPS*2008), pages 689-696, 2009.</span>
        <mdb-icon slot="reference" icon="info-circle" id="paper"/>
      </mdb-tooltip>  showed that nonlinearity of the functional relationships aids
        in identifying the causal direction, as long as the in
        influence of the noise is additive. More precisely, they consider the following class of models:<br>
        A bivariate Additive Noise Model (ANM) X&rarr;Y is defined as</p>
      <p class="text-center">Y &ratio;= &#402;<sub>Y</sub>(X) + N<sub>Y</sub> with X &perp; N<sub>Y</sub><br>
        &#402;<sub>Y</sub> &ratio;  &#8477; &rarr;  &#8477; is a Borel measurable function
      </p>
      <h5 class="section_title">Identifiability</h5>
      <p>We are especially interested in cases for which the additivity requirement introduces an
        <strong>asymmetry between X and Y</strong>.</p>
      <div class="definition font-italic">If the joint density p(x,y) satisfies an Additive Noise Model X&rarr;Y, but does
        not satisfy any Additive Noise Model Y &larr; X, then we call the ANM X&rarr;Y
        <strong>identifiable</strong> (from the observational distribution).</div>
      <h5 class="section_title">Inference Procedure</h5>
      <span>We provide an interactive visualization that enables non-advanced users
             to <strong>explore step-by-step</strong> the causal discovery algorithm implemented.
             This setting helps create an in-depth understanding of the exact casual model that
             governs the relations between pairwise variables from real-world dataset.
             <br>More specifically, this visual interface allows to:</span>
    </section>
    <mdb-row class="row justify-content-center">
      <mdb-col sm="4">
        <mdb-card class="intro"  v-animateOnScroll="'fadeIn'">
          <mdb-card-body>
            <img alt="one" src="./icons/number-1.png" style="width: 50px"/>
            <p style="clear:right">Recognize the intuition behind the asymmetries</p>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
      <mdb-col sm="4" class="align-content-around">
        <mdb-card class="intro" v-animateOnScroll="{animation: 'fadeIn', delay:600}">
          <mdb-card-body>
            <img alt="two" src="./icons/number-2.png" style="width: 50px"/>
            <p style="clear:right">Show the ability of ANM method to find the correct model when all the assumptions hold</p>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
      <mdb-col sm="4">
        <mdb-card class="intro" v-animateOnScroll="{animation: 'fadeIn', delay:900}">
          <mdb-card-body class="justify-content-center">
            <img alt="three" src="./icons/numbre-3.png" style="width: 50px"/>
            <p style="clear:right">Visualize the inferred causal (directed) graph.</p>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>

    <!-- Button dataset + descriptions-->
    <p>
      <span id="approach1"><strong>Case Studies -  Dataset </strong></span>
      <mdb-tooltip trigger="hover" :options="{placement: 'right'}">
          <span slot="tip">The data sets were selected such that <br>we expect common agreement on the ground
                truth.</span>
        <mdb-icon slot="reference" icon="info-circle" id="info"/>
      </mdb-tooltip>
    </p>
    <mdb-btn-group id="btn-dataset">
      <mdb-btn  v-for="(item, i) in options"
                :key="item.key"
                @click.native="childClick(i)"
                :class="{current: i === current}"
                color="primary"
      >{{item.key}}</mdb-btn>
    </mdb-btn-group>

    <div class="card">
      <div class="card-body">
        <p class="title"><b>Description</b></p>
        <p>{{datasetInfo[current].description}} <br/>
          No. of instances: {{datasetInfo[current].instances}}<br/>
          Data Type: Continuous
        </p>

      </div>
    </div>

    <!--Implementation SideBar-->
    <div class="my-3">
      <h5 style="margin-top: 15px; display: inline !important; margin-block-start: unset; margin-block-end: unset"
          class="font-size: 1.25rem; font-weight-bold">Practical Estimation Method</h5>
      <div class="d-inline pl-3">
        <b-button class="info_button p-2" style="font-size: 10px; border-radius: unset;
         font-family: 'Segoe UI';" v-b-toggle href="#description" @click.prevent>More Information</b-button>
      </div>
      <p>
        This section allows for exploring the procedure used to learn the underlying causal graph.
        The framework visualizes the causal relations as an interactive spatial 2D layout
        in which each edge connecting two variables implies a causal relation and the direction of an edge identifies
        the effect from the cause.<br>
        It also examines mathematical measurements of causal relations in the form of regression analysis
        to provide an exhaustively understanding of causalities.
      </p>

      <b-sidebar id="description" title="Implementation" shadow>
        <div class="px-3 py-2">
          <p>
            <strong>Regressor</strong><br>
            For the regression, we used the Gaussian Process Regressor using a Gaussian kernel
            and independent Gaussian noise, optimizing the hyperparameters for each regression individually.
          </p>
          <p>
            <strong>Independence Test</strong><br>
            For the independence test, we implemented the Hilbert Schmidt
            Independence Criterion (HSIC) with
            a Gaussian kernel, where we used the gamma distribution as an approximation for the distribution
            of the HSIC under the null hypothesis of independence in order to calculate the p-value of the test
            result.
          </p>
        </div>
      </b-sidebar>
    </div>


    <!--DAG-->
    <p><strong>Directed Acyclic Graph for sample data</strong></p>
    <graph :edges="options[current].edges" :nodes="options[current].nodes"/>
    <mdb-row class="justify-content-center" v-animateOnScroll="'fadeIn'">
      <mdb-col sm="2" class="text-center"><mdb-icon id="key_circle" icon="circle"/></mdb-col>
      <mdb-col sm="2" class="text-center"><mdb-icon id="target_circle" icon="circle"/></mdb-col>
      <mdb-col sm="2" class="text-center"><mdb-icon icon="circle"/></mdb-col>
      <div class="w-100 d-none d-md-block"></div>
      <mdb-col sm="2" class="text-center "><p>Key Factor</p></mdb-col>
      <mdb-col sm="2" class="text-center"><p>Target Factor</p></mdb-col>
      <mdb-col sm="2" class="text-center"><p>Direction of <br/> causal relationship</p></mdb-col>
    </mdb-row>

    <!--Description Forward Fit-->
    <mdb-card class="model" v-if="options[current].edges[0].source === 0">
      <mdb-card-body>
        <p>
          The correct model <strong> {{options[current].nodes[0].name}} causes {{options[current].nodes[1].name}} </strong>
          leads a p value of <i>{{options[current].nodes[0].p_value}}</i>.
        </p>
      </mdb-card-body>
    </mdb-card>
    <mdb-card class="model" v-else>
      <mdb-card-body>
        <p>
          The correct model <strong> {{options[current].nodes[1].name}} causes {{options[current].nodes[0].name}} </strong>
          leads a p value of <i>{{options[current].nodes[1].p_value}}</i>.
        </p>
      </mdb-card-body>
    </mdb-card>


    <!--Forward fit-->
    <div>
      <mdb-row class="mb-4">
        <mdb-col sm="6">
          <mdb-card>
            <mdb-card-body>
              <regression-plot :folder="options[current].fwd" :xaxis="options[current].nodes[0].name"
                               :yaxis="options[current].nodes[1].name" :title="r1" :key="componentKey1"/>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>

        <mdb-col sm="6">
          <mdb-card>
            <mdb-card-body>
              <residualsPlot :file="options[current].path_resX"
                             :name="options[current].nodes[0].name"
                             :title="r1" :key="componentKey2"/>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </div>

    <!--Description Backward Fit-->
    <mdb-card class="model" v-if="options[current].edges[0].target === 1">
      <mdb-card-body>
        <p>
          The reverse model <strong> {{options[current].nodes[1].name}} causes {{options[current].nodes[0].name}} </strong>
          leads a p value of <i>{{options[current].nodes[1].p_value[0]}} x 10<sup>-{{options[current].nodes[1].p_value[1]}}</sup></i>.
        </p>
      </mdb-card-body>
    </mdb-card>
    <mdb-card class="model" v-else>
      <mdb-card-body>
        <p>
          The reverse model <strong> {{options[current].nodes[0].name}} causes {{options[current].nodes[1].name}} </strong>
          leads a p value of <i>{{options[current].nodes[0].p_value[0]}} x 10<sup>-{{options[current].nodes[0].p_value[1]}}</sup></i>.
        </p>
      </mdb-card-body>
    </mdb-card>

    <!--Backward Fit-->
    <div>
      <mdb-row class="mb-4">
        <mdb-col sm="6">
          <mdb-card>
            <mdb-card-body>
              <regression-plot :folder="options[current].bwd" :xaxis="options[current].nodes[1].name"
                               :yaxis="options[current].nodes[0].name" :title="r2" :key="componentKey3"/>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>

        <mdb-col sm="6">
          <mdb-card class="animated fadeInRight">
            <mdb-card-body>
              <residualsPlot :file="options[current].path_resY"
                             :name="options[current].nodes[1].name"
                             :title="r2" :key="componentKey4"/>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </div>

  </mdb-container>
</template>

<script>
  import Vue from 'vue';
  import graph from "../components/graph";
  import residualsPlot from "../components/residualsPlot";
  import regressionPlot from "../components/regressionPlot";
  import scatterplotExample from "../components/scatterplotExample";
  import {mdbBtn, mdbBtnGroup, mdbContainer, mdbRow,
    mdbCol, mdbCard, mdbCardBody, mdbIcon, animateOnScroll, mdbTooltip} from "mdbvue";
  import { BootstrapVue} from 'bootstrap-vue';
  Vue.use(BootstrapVue);
  let d3 = require("d3");
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css';

  export default {
    name: 'binaryDep',
    components: {
      regressionPlot,
      graph,
      residualsPlot,
      scatterplotExample,
      mdbCard,
      mdbCardBody,
      mdbBtnGroup,
      mdbBtn,
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbIcon,
      mdbTooltip
    },
    directives: {
      animateOnScroll
    },
    data() {
      return {
        current: 0,
        options: [
          {
            key: 'abalone',
            nodes: [{
              name: "Age",
              x: 60,
              y: 100,
              p_value: 0.14
            }, {
              name: "Length",
              x: 320,
              y: 100,
              p_value: [4.1, 5]
            }],
            edges: [{
              source: 0,
              target: 1
            }],
            path_resX: './data/abalone/residuals/residuals_x.csv',
            path_resY: './data/abalone/residuals/residuals_y.csv',
            fwd: './data/abalone/gpr/fwd',
            bwd: './data/abalone/gpr/bwd'
          },
          {
            key: 'faithful',
            nodes: [{
              name: "Duration",
              x: 60,
              y: 100,
              p_value: 0.6
            }, {
              name: "Interval",
              x: 320,
              y: 100,
              p_value: [4.4, 9]
            }],
            edges: [{
              source: 0,
              target: 1
            }],
            path_resX: './data/faithful/residuals/residuals_x.csv',
            path_resY: './data/faithful/residuals/residuals_y.csv',
            fwd: './data/faithful/gpr/fwd',
            bwd: './data/faithful/gpr/bwd'
          },
          {
            key: 'climate',
            nodes: [{
              name: "Altitude",
              x: 60,
              y: 100,
              p_value: 0.02
            }, {
              name: "Temperature",
              x: 320,
              y: 100,
              p_value: [1.3, 12]
            }],
            edges: [{
              source: 0,
              target: 1
            }],
            path_resX: './data/climate/residuals/residuals_x.csv',
            path_resY: './data/climate/residuals/residuals_y.csv',
            fwd: './data/climate/gpr/fwd',
            bwd: './data/climate/gpr/bwd'
          },
          {
            key: 'undata',
            nodes: [{
              name: "Female Age",
              x: 60,
              y: 100,
              p_value: [1.2, 3]
            }, {
              name: "Latitude",
              x: 320,
              y: 100,
              p_value: 0.01
            }],
            edges: [{
              source: 1,
              target: 0
            }],
            path_resX: './data/undata/residuals/residuals_x.csv',
            path_resY: './data/undata/residuals/residuals_y.csv',
            fwd: './data/undata/gpr/fwd',
            bwd: './data/undata/gpr/bwd'
          }
        ],
        datasetInfo: [
          {
            instances: '4177',
            description: 'The Abalone dataset, from the UCI ML repository, contains measurements\n' +
                    'of the number of rings in the shell of abalone (a group of shellfish), which indicate their age, and the\n' +
                    'length of the shell. We show results for a subsample of 500 datapoints.'
          },
          {
            instances: '194',
            description: 'This is the geyser data set supplied with the MASS package of the computing language R\n' +
                    '(Venables and Ripley, 2002). It is originally described in (Azzalini and Bowman, 1990) and\n' +
                    'contains data about the duration of an eruption and the time interval between subsequent\n' +
                    'eruptions of the Old Faithful geyser in Yellowstone National Park, USA. The data consists\n' +
                    'of 194 samples and was collected in a single continuous measurement from August 1 to\n' +
                    'August 15, 1985'
          },
          {
            instances: '349',
            description: 'The following data regard the altitude above sea level (in meters) ' +
                    'and the local yearly average outdoor temperature in centigrade, for 349 \n' +
                    'weather stations in Germany, collected over the time period of 1961–1990. \n' +
                    'The altitudes in the DWD data set range from 0 m to 2960 m, which is sufficiently large to\n' +
                    'detect significant statistical dependencies.'
          },
          {
            instances: '277',
            description: 'The data were taken from the "UNdata" database of the United Nations Statistics Division.\n' +
                    'It consists of female life expectancy (in years) at birth versus latitude of the country’s capital, for various countries over the period 2000–2005.\n' +
                    'The location of a country (encoded in the latitude of its capital) has an influence on how\n' +
                    'poor or rich a country is, hence affecting the quality of the health care system and ultimately\n' +
                    'life expectancy.'
          }
        ],
        r1: 'Forward Fit',
        r2: 'Backward Fit',
        componentKey1: 0,
        componentKey2: 0,
        componentKey3: 0,
        componentKey4: 0,
        climateData: [],
        margin: {},
        height: 0,
        width: 0,
        selected: true,
        visible: false
      }
    },
    mounted() {
      this.margin = {top: 10, right: 30, bottom: 30, left: 60};
      this.width = 460 - this.margin.left - this.margin.right;
      this.height = 400 - this.margin.top - this.margin.bottom;
      d3.select("#scatter_plot")
              .append("svg")
              .attr("width", this.width + this.margin.left + this.margin.right)
              .attr("height", this.height + this.margin.top + this.margin.bottom);
      d3.csv("./data/climate/climate.csv").then((res) => {
        var reports = res.map((d) => {
          const r = {
            altitude: +d.altitude,
            temperature: +d.temperature
          };
          return r;
        });
        let step;
        for (step = 0; step < reports.length; step++) {
          let elem = reports[step];
          this.climateData.push(elem);
        }
        this.drawScatter();
      });
    },
    methods: {
      childClick(i) {
        this.selected = false;
        this.current = i;
        this.forceRerender();
      },
      forceRerender() {
        this.componentKey1 += 1;
        this.componentKey2 += 1;
        this.componentKey3 += 1;
        this.componentKey4 += 1;
      },
      toggle(){
        this.visible = !this.visible;
      },
      drawScatter() {
        const svg = d3.select("#scatter_plot svg")
                .append('g')
                .attr("class", "gScatter")
                .attr("transform",
                        "translate(" + this.margin.left + "," + this.margin.top + ")");
        const data = this.climateData;

        // Add X axis
        var x = d3.scaleLinear()
                .domain([0, 0])
                .range([0, 0]);

        svg.append("g")
                .attr("class", "myXaxis")   // Note that here we give a class to the X axis, to be able to call it later and modify it
                .attr("transform", "translate(0," + this.height + ")")
                .call(d3.axisBottom(x))
                .attr("opacity", "0");

        // Add Y axis
        var y = d3.scaleLinear()
                .domain([0, 2500])
                .range([this.height, 0]);

        svg.append("g")
                .call(d3.axisLeft(y));

        // Add dots
        svg.append("g")
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "mylabel")
                .attr("cx", function (d) { return x(d.temperature); } )
                .attr("cy", function (d) { return y(d.altitude); } )
                .attr("r", 3)
                .style("fill", "#3282b8");

        // new X axis
        x.domain([0, 15]);
        x.range([0, this.width]);
        svg.select(".myXaxis")
                .transition()
                .duration(3000)
                .attr("opacity", "1")
                .call(d3.axisBottom(x));

        svg.selectAll("circle")
                .transition()
                .delay(function(d,i){return(i*3)})
                .duration(3000)
                .attr("cx", function (d) { return x(d.temperature);} )
                .attr("cy", function (d) { return y(d.altitude);});

        // X axis label
        svg.append("text")
                .attr("class", "axislabel")
                .attr("text-anchor", "end")
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr("x", this.width/2)
                .attr("y", this.height + this.margin.top + 20)
                .text("Variable A");

        // Y axis label:
        svg.append("text")
                .attr("class", "axislabel")
                .attr("text-anchor", "end")
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr("transform", "rotate(-90)")
                .attr("y", -this.margin.left + 20)
                .attr("x", -this.margin.top - this.height/2 + 20)
                .text("Variable B");
      }
    },
    watch: {
      visible: {
        handler() {
          if (this.visible === true) {
            const svg = d3.select("#scatter_plot svg g");
            d3.selectAll("text.axislabel").remove();
            // X axis label
            svg.append("text")
                    .attr("class", "axislabel")
                    .attr("text-anchor", "end")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "12px")
                    .attr("x", this.width / 2)
                    .attr("y", this.height + this.margin.top + 20)
                    .text("Var A: Temperature");

            // Y axis label:
            svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("class", "axislabel")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "12px")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -this.margin.left + 20)
                    .attr("x", -this.margin.top - this.height / 2 + 20)
                    .text("Var B: Altitude");
          }
          else {
            const svg = d3.select("#scatter_plot svg g");
            d3.selectAll("text.axislabel").remove();
            // X axis label
            svg.append("text")
                    .attr("class", "axislabel")
                    .attr("text-anchor", "end")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "12px")
                    .attr("x", this.width / 2)
                    .attr("y", this.height + this.margin.top + 20)
                    .text("Variable A");

            // Y axis label:
            svg.append("text")
                    .attr("class", "axislabel")
                    .attr("text-anchor", "end")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "12px")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -this.margin.left + 20)
                    .attr("x", -this.margin.top - this.height / 2 + 20)
                    .text("Variable B");

          }
        }
      },
      current: {
        handler() {
          d3.selectAll(".gScatter").remove();
        }
      }
    }
  }
</script>

<style scoped>
  /* Responsive */
  @media (max-width: 575px) {
    button {
      font-size: 0.55em;
    }
    h2 {
      font-size: 1.3em;
      margin-top: 0;
    }
  }
  @media (min-width: 576px) {
    button {
      font-size: 0.65em;
    }
    h2 {
      font-size: 1.5rem;
      margin-top: 0;
    }

  }
  @media (min-width: 768px) {
    button {
      font-size: 0.7em;
    }
    h2 {
      font-size: 1.75rem;
    }
    .header h2 {
      margin-top: 15px;
    }

  }
  @media (min-width: 992px) {
    .header h2 {
      margin-top: 15px;
    }
  }
  @media (min-width: 1200px) {
    .header h2 {
      margin-top: 15px;
    }
  }

  mdb-btn {
    text-decoration-color: white;
  }
  button {
    white-space: nowrap;
    padding: 1.2em;
    height: fit-content;
    border-radius: unset;
    margin: 0;
  }
  button.btn.btn-primary.ripple-parent.current {
    background-color: #0069d9 !important;
    border-color: #005cbf !important;
  }

  .card {
    border-color: #005cbf;
    border-radius: unset;
    margin-top: 10px;
    border-width: 2px;
  }
  .model {
    border-color: #ffffff;
    border-radius: unset;
    margin-top: 10px;
    border-width: 2px;
  }
  .model p {
    margin: 0;
    padding:0
  }
  #btn-dataset{
    width: inherit;
  }
  .title {
    text-align: center;
  }
  #key_circle{
    color: #3282b8;
  }
  #target_circle {
    color: #005cbf;
  }

  .intro {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    border-color: #ffffff;
    border-radius: unset;
    margin-top: 10px;
    border-width: 2px;

  }

  #info {
    color: #929fba;
  }

  #message{
    background-color: #3282b8 !important;
    margin-top: 10px;
  }

  .btn {
    color: white !important;
  }
  #approach1 {
    font-size: 1.25rem;
  }
  .section_title {
    font-weight: bold;
  }
  .definition {
    border-left: 3px solid #3282b8;
    padding: 8px;
    margin-bottom: 15px;
  }
  img {
    float: left;
  }
  .info_button {
    background-color: #005cbf !important;
  }
  #paper {
    color: #929fba;
  }

</style>
