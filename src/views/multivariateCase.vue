<template>
    <mdb-container class="mb">
        <!--Introduction-->
        <div class="header d-flex justify-content-center">
            <h2 class="indigo-text"><strong>Multivariate Case</strong></h2>
        </div>
        <div class="d-flex justify-content-center">
            <p class="mt-4">Nonlinear Causal Discovery with ANM procedure could be generalized
                to an arbitrary number N of observed variables. <br>
            </p>
        </div>

        <!--Exponential Search + Slider-->
        <div class="container mt-3 pt-3 px-0">
            <div class="row d-flex justify-content-between">
                <div class="col-md-7">
                    <h4 class="h4-responsive font-weight-bold mb-1 pb-2">Exponential Search</h4>
                    <p class="text-left pr-5" style="line-height: 1.8">
                        Given more than two variables, one way to estimate the causal model is to use exhaustive search.
                        <br>However, as we can see exploring the chart, just by adding a single variable, <strong>the complexity of the procedure
                        increases exponentially along with the number of variables.</strong>
                        <br>
                        Taking that into consideration, ANM method is <strong>feasible only for very small networks</strong> (roughly N &#8804; 7 or so).
                        <br>An important future improvement would be to take this properly into account.
                    </p>
                </div>
                <div class="col-md-5">
                    <p class="font-weight-bold mb-1">Number of variables</p>
                    <vue-slider
                            v-model="value"
                            :min="min"
                            :max="max"
                            :tooltip-placement="'bottom'"
                            :marks="[4, 8]"
                    ></vue-slider>
                    <p class="font-weight-bold mt-3 mb-1 pt-3">Number of possible combinations</p>
                    <slider :data="value"/>
                </div>
            </div>
        </div>

        <!--Practical Estimation Method-->
        <div class="container px-0 pb-2 mt-0 mb-1" >
            <h5 style="margin-top: 15px; display: inline !important;
            margin-block-start: unset; margin-block-end: unset" class="font-weight-bold">ANM Method</h5>
                <mdb-tooltip class="ml-2" trigger="hover" :options="{placement: 'top'}">
                      <span slot="tip">P. O. Hoyer, D. Janzing, J. M. Mooij, J. Peters, and B. Scholkopf.
                        <i>Nonlinear causal discovery with additive noise models.</i>
                        In Advances in Neural Information Processing Systems 21 (NIPS*2008), pages 689-696, 2009.</span>
                <mdb-icon slot="reference" icon="info-circle" id="paper"/></mdb-tooltip>
            <div class="d-inline pl-2">
                <b-button class="info_button p-2" style="font-size: 12px; border-radius: unset; font-family: 'Segoe UI';"
                          v-b-toggle href="#description" @click.prevent>More Information</b-button>
            </div>

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

            <p class="pt-1">
                For each DAG G<sub>i</sub> over the observed variables:</p>
                <ol type="i" style="line-height: 1.8">
                    <li>test whether it is consistent with the data by
                        constructing a nonlinear regression of each variable on its parents</li>
                    <li> testing whether
                        the resulting residuals are mutually independent</li>
                </ol>
            <p>If any independence test is rejected, G<sub>i</sub> is rejected.
                <br>On the other hand, <strong>if none of the independence tests are rejected,
                    G<sub>i</sub> is consistent with the data.</strong>

            </p>
        </div>

        <!--Synthetic Data + Matrix-->
        <div class="container pl-0">
            <h5 class="h5-responsive font-weight-bold">Synthetic Data</h5>
            <div class="row pb-3 justify-content-between">
                <div class="col-lg-7">
                    <p>Applying the method on simulated data, we can control the data-generating process. Knowing the ground truth
                        <strong>allows us to develop a better understanding of the resulting graphs.</strong>
                        <br> We did experiments for four variables <i>w, x, y</i> and <i>z</i> with a diamond-like causal
                        structure. </p>

                    <ul>
                        <li>w &#126; <i>U</i>(3, -3)</li>
                        <li>x = w<sup>2</sup>+n<sub>x</sub> with n<sub>x</sub> &#126; <i>U</i>(-1, 1)</li>
                        <li>y = 4 <span style="white-space: nowrap;">
                        &radic;<span style="text-decoration:overline;">&nbsp;abs(w)&nbsp;</span>
                        </span>+n<sub>y</sub> with n<sub>y</sub> &#126; <i>U</i>(-1, 1)</li>
                        <li>z = 2sin<i>x</i>+2sin<i>y</i>+n<sub>z</sub> with n<sub>z</sub> &#126; <i>U</i>(-1, 1)</li>
                    </ul>
                </div>
                <div class="col-lg-5">
                    <img src="./icons/diamond.png" alt="diamond_structure_graph" style="width: 250px; margin-left: 40px;"/>
                </div>
            </div>
            <div class="container pl-0 pb-2">
                <p><strong>The simplest DAG that was consistent with the data turned out to be precisely the true causal structure.
                </strong>
                    To explore dynamically experiments results on the causal relations, you can examine the matrix below.</p>
            </div>
            <div class="row justify-content-between">
                <div class="col-lg-4">
                    <p class="mb-1">Alpha (Significance level)</p>
                    <select v-model="selected_alpha" class="browser-default custom-select">
                        <option v-for="item in alpha"
                                :key="item.id"
                        >{{item.value}}</option>
                    </select>
                    <p class="pt-4 mb-1">Number of points (of the distributions)</p>
                    <select  v-model="selected_nPoints" class="browser-default custom-select">
                        <option v-for="item in points"
                                :key="item.id"
                        >{{item.value}}</option>
                    </select>
                    <p class="pt-4 mb-1">Percentage of Split Train/test</p>
                    <select v-model="selected_split"  class="browser-default custom-select">
                        <option v-for="item in split"
                                :key="item.id"
                        >{{item.value}}</option>
                    </select>
                    <mdb-btn class="mt-5 p-2 btn btn-default btn-lg btn-block" style="background-color: rgb(2, 62, 138) !important;
                    color: white; letter-spacing: 1.5px;" @click="handleClick" >Run new settings</mdb-btn>

                </div>
                <div class="col-lg-6">
                    <adjacencyMatrix :zValues="zvaluesData[0]"/>
                </div>
            </div>
        </div>
    </mdb-container>
</template>

<script>
    let d3 = require("d3");
    import Vue from 'vue';
    import {mdbContainer, mdbBtn, mdbTooltip, mdbIcon} from 'mdbvue';
    import slider from "../components/slider";
    import adjacencyMatrix from "../components/adjacencyMatrix";
    import VueSlider from 'vue-slider-component';
    import 'vue-slider-component/theme/default.css'
    import { BootstrapVue} from 'bootstrap-vue';
    Vue.use(BootstrapVue);
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';


    export default {
        name: "general",
        components: {
            mdbContainer,
            slider,
            VueSlider,
            adjacencyMatrix,
            mdbBtn,
            mdbIcon,
            mdbTooltip
        },
        data() {
            return {
                value: 4,
                min: 4,
                max: 8,
                alpha: [{
                    id: 1,
                    value: "0.01"
                }, {
                    id: 2,
                    value: "0.02",
                }, {
                    id: 3,
                    value: "0.05",
                }],
                points: [{
                    id: 1,
                    value: "1000"
                }, {
                    id: 2,
                    value: "1500",
                }],
                split: [{
                    id: 1,
                    value: "70% train, 30% test"
                }, {
                    id: 2,
                    value: "80% train, 20% test",
                }],
                options: [
                    /*1000 p 70 split*/
                    {
                    alpha: "0.01",
                    n_points: "1000",
                    split: "70% train, 30% test" ,
                    matrix: [
                        [0, 0.48347487, 0.72662093, 0],
                        [0, 0, 0, 0.24480808],
                        [0, 0, 0, 0.24480808],
                        [0, 0, 0, 0]
                    ]
                },
                    {
                    alpha: "0.02",
                    n_points: "1000",
                    split: "70% train, 30% test" ,
                    matrix: [
                        [0, 0.52744069, 0.31206296, 0],
                        [0, 0, 0, 0.03405467],
                        [0, 0, 0, 0.03405467],
                        [0, 0, 0, 0]
                    ]
                },
                    {
                    alpha: "0.05",
                    n_points: "1000",
                    split: "70% train, 30% test" ,
                    matrix: [
                        [0, 0.66711179, 0.17881815, 0],
                        [0, 0, 0, 0.29991121],
                        [0, 0, 0, 0.29991121],
                        [0, 0, 0, 0]
                    ]
                },
                    /*1500 70 split*/
                    {
                    alpha: "0.01",
                    n_points: "1500",
                    split: "70% train, 30% test" ,
                    matrix: [
                        [0, 0.80678658, 0.08345665, 0],
                        [0, 0, 0, 0.12875822],
                        [0, 0, 0, 0.12875822],
                        [0, 0, 0, 0]
                    ]
                },
                    {
                    alpha: "0.02",
                    n_points: "1500",
                    split: "70% train, 30% test" ,
                    matrix: [
                        [0, 0.66711179, 0.17881815, 0],
                        [0, 0, 0, 0.29991121],
                        [0, 0, 0, 0.29991121],
                        [0, 0, 0, 0]
                    ]
                },
                    {
                    alpha: "0.05",
                    n_points: "1500",
                    split: "70% train, 30% test" ,
                    matrix: [
                        [0, 0.80678658, 0.08345665, 0],
                        [0, 0, 0, 0.12875822],
                        [0, 0, 0, 0.12875822],
                        [0, 0, 0, 0]
                    ]
                },
                    /*1000 80 split*/
                    {
                    alpha: "0.01",
                    n_points: "1000",
                    split: "80% train, 20% test" ,
                    matrix: [
                        [0, 0.66677961, 0.5450204 , 0],
                        [0, 0, 0, 0.41593303],
                        [0, 0, 0, 0.41593303],
                        [0, 0, 0, 0]
                    ]
                },
                    {
                    alpha: "0.02",
                    n_points: "1000",
                    split: "80% train, 20% test" ,
                    matrix: [
                        [0, 0.66677961, 0.5450204 , 0],
                        [0, 0, 0, 0.41593303],
                        [0, 0, 0, 0.41593303],
                        [0, 0, 0, 0]
                    ]},
                    {
                    alpha: "0.05",
                    n_points: "1000",
                    split: "80% train, 20% test" ,
                    matrix: [
                        [0, 0.66711179, 0.17881815, 0],
                        [0, 0, 0, 0.29991121],
                        [0, 0, 0, 0.29991121],
                        [0, 0, 0, 0]
                    ]
                },
                    /*1500 80 split*/
                    {
                    alpha: "0.01",
                    n_points: "1500",
                    split: "80% train, 20% test" ,
                    matrix: [
                        [0, 0.38692599, 0.2469315, 0],
                        [0, 0, 0, 0.58549877],
                        [0, 0, 0, 0.58549877],
                        [0, 0, 0, 0]
                    ]
                },
                    {
                    alpha: "0.02",
                    n_points: "1500",
                    split: "80% train, 20% test",
                    matrix: [
                        [0, 0.38692599, 0.2469315, 0],
                        [0, 0, 0, 0.58549877],
                        [0, 0, 0, 0.58549877],
                        [0, 0, 0, 0]
                    ]
                },
                    {
                    alpha: "0.05",
                    n_points: "1500",
                    split: "80% train, 20% test" ,
                    matrix: [
                        [0, 0.66677961, 0.5450204 , 0],
                        [0, 0, 0, 0.41593303],
                        [0, 0, 0, 0.41593303],
                        [0, 0, 0, 0]
                    ]
                }
                ],
                selected_alpha: "0.01",
                selected_nPoints: "1000",
                selected_split: "70% train, 30% test",
                zvaluesData: [[
                    [0, 0.48347487, 0.72662093, 0],
                    [0, 0, 0, 0.24480808],
                    [0, 0, 0, 0.24480808],
                    [0, 0, 0, 0]
                ]]
            }
        },
        methods: {
            handleClick(){
                this.zvaluesData = [];
                for (var i = 0; i < this.options.length; i++) {
                    if (this.selected_alpha === this.options[i].alpha &&
                    this.selected_nPoints === this.options[i].n_points
                        && this.selected_split === this.options[i].split){
                        this.zvaluesData.push(this.options[i].matrix);
                    }
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
    .info_button {
        background-color: #0077b6 !important;
    }
    #paper {
        color: #929fba;
    }
</style>
