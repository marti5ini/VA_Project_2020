<template>
  <mdb-container class="mb">
    <div class="header d-flex justify-content-center">
      <h2 class="indigo-text"><strong>Bivariate Case</strong></h2>
    </div>
    <mdb-card class="model">
      <mdb-card-body>
        <p>
          The most elementary form of such a causal discovery problem is to decide
          whether X causes Y or, alternatively, Y causes X, given joint observations of two variables
          X, Y.
          We consider a two steps-approach to distinguishing cause from effect.
          For the nonlinear additive noise model(ANM),
          the function <i>f<sub>AN</sub></i> is estimated by performing Gaussian process (GP) regression.

          First, one fits the model on the data for both hypothetical causal directions. The second step is to do independence test
          between the estimated error term and hypothetical cause (Hoyer et al. 2009; Zhang and
          Hyvärinen 2009). If the independence condition holds for one and only one hypothetical
          direction, the causal relation between the two variables X and Y implied by the corresponding SEM has been successfully found.
          We adopted the Hilbert Schmidt information criterion (HSIC) for statistical independence test in the first step
        </p>
      </mdb-card-body>
    </mdb-card>
    <p><strong>Dataset</strong></p>
    <mdb-btn-group id="btn-dataset">
      <mdb-btn  v-for="(item, i) in options"
               :key="item.key"
                @click.native="childClick(i)"
               :class="{current: i === current}"
               color="primary"
      >{{item.key}}{{i}}{{current}}</mdb-btn>
    </mdb-btn-group>

    {{current}} {{options[current]}}
    <div class="card">
      <div class="card-body">
        <p class="title"><b>Description</b></p>
        <p>{{datasetInfo[current].description}} <br/>
           No. of instances: {{datasetInfo[current].instances}}<br/>
           Data Type: Continuous
        </p>

      </div>
    </div>
    <p><strong>Generating Directed Acyclic Graph for sample data </strong></p>
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

    <mdb-card class="model">
      <mdb-card-body>
        <p>
          The measure dependence of the two variables
          is the p value of independence test between X’ and the estimated residuals.
          We used a significance level of 2% for rejecting the null hypothesis of
          independence of residuals and cause. <br>
         The correct model <strong> {{options[current].nodes[0].name}} causes {{options[current].nodes[1].name}} </strong>
          leads a p value of <i>{{options[current].nodes[0].p_value}}</i>.
        </p>
      </mdb-card-body>
    </mdb-card>

    <div>
      <mdb-row class="mb-4">
        <mdb-col sm="6">
          <mdb-card v-animateOnScroll="'fadeInLeft'">
            <mdb-card-body>
              <regression-plot :folder="options[current].fwd" :xaxis="options[current].nodes[0].name"
                               :yaxis="options[current].nodes[1].name" :title="r1" :key="componentKey1"/>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>

        <mdb-col sm="6">
          <mdb-card v-animateOnScroll="'fadeInRight'">
            <mdb-card-body>
              <residualsPlot :file="options[current].path_resX"
                             :name="options[current].nodes[0].name"
                             :title="r1" :key="componentKey2"/>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </div>

    <mdb-card class="model">
      <mdb-card-body>
        <p>
          The reverse model <strong> {{options[current].nodes[1].name}} causes {{options[current].nodes[0].name}} </strong>
          leads a p value of <i>{{options[current].nodes[1].p_value[0]}} x 10<sup>-{{options[current].nodes[1].p_value[1]}}</sup></i>.
        </p>
      </mdb-card-body>
    </mdb-card>

    <div>
      <mdb-row class="mb-4">
        <mdb-col sm="6">
          <mdb-card class="animated fadeInLeft">
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
  import {mdbBtn, mdbBtnGroup, mdbContainer, mdbRow,
    mdbCol, mdbCard, mdbCardBody, mdbIcon, animateOnScroll} from "mdbvue";
  import { BootstrapVue} from 'bootstrap-vue';
  Vue.use(BootstrapVue);
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css';

  export default {
    name: 'binaryDep',
    components: {
      regressionPlot,
      graph,
      residualsPlot,
      mdbCard,
      mdbCardBody,
      mdbBtnGroup,
      mdbBtn,
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbIcon
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
              p_value: 0.25
            }, {
              name: "Temperature",
              x: 320,
              y: 100,
              p_value: [5.5, 12]
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
              name: "Age",
              x: 60,
              y: 100
            }, {
              name: "Latitude",
              x: 320,
              y: 100
            }],
            edges: [{
              source: 0,
              target: 1
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
                    'length of the shell. We show the results for a subsample of 500 datapoints.'
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
      }
    },
    methods: {
      // Triggered when `childToParent` event is emitted by the child.
      childClick(i) {
        this.current = i;
        this.forceRerender();
      },
      forceRerender() {
        this.componentKey1 += 1;
        this.componentKey2 += 1;
        this.componentKey3 += 1;
        this.componentKey4 += 1;
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
  .container {
    margin-top: 78px;
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

  #graph-params{
    padding-left: 0;
  }
  .card {
    border-color: #0069d9;
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
    color: #3f51b5;
  }
  #target_circle {
    color: #005cbf;
  }
</style>
