<template>
    <mdb-container class="mb">
        <div class="header d-flex justify-content-center">
            <h2 class="indigo-text"><strong>Multivariate Case</strong></h2>
        </div>

        <div class="d-flex justify-content-center">
            <p class="mt-4">Nonlinear Causal Discovery with ANM procedure could be generalized
                to an arbitrary number N of observed variables. <br>
            </p>
        </div>
        <!--<div class="container my-3 py-4 z-depth-1" style="border: 2px solid #005cbf;">
        <section class="text-center">
            <div class="row d-flex justify-content-center">
                <div class="col-lg-7">
                    <p>
                        Nonlinear Causal Discovery with ANM procedure could be generalized to an arbitrary number N of observed variables.
                    </p>
                </div>
            </div>
        </section>


        </div>-->
        <div class="container mt-3 py-3 px-5">
            <div class="row d-flex justify-content-around">
                <div class="col-md-6">
                    <h4 class="h4-responsive font-weight-bold mb-1 pb-2">Exponential Search</h4>
                    <p class="text-left pr-5" style="line-height: 1.8">
                        Given more than two variables, one way to estimate the causal model based is to use exhaustive search.
                        <br>However, as we can see exploring the chart, just by adding a single variable, <strong>the complexity of the procedure
                        increases exponentially along with the number of variables.</strong>
                        <br>
                        Taking that into consideration, ANM method is <strong>feasible only for very small networks</strong> (roughly N &#8804; 7 or so).
                        <br>An important future improvement would be to take this properly into account.
                    </p>
                </div>
                <div class="col-md-4">
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

        <div class="container mx-5 px-5 py-4 my-3 z-depth-1" >
            <h5 style="margin-top: 15px; display: inline !important;" class="font-weight-bold">Practical Estimation Method</h5>
                <div class="mb-3 ml-3 d-inline">
                    <b-button class="info_button p-2" style="font-size: 12px; border-radius: unset; font-family: 'Segoe UI';"
                              v-b-toggle href="#description" @click.prevent>More Information</b-button>
                </div>

                <b-sidebar id="description" title="Approach Details" shadow>
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
        <div class="container mx-5 px-5 py-4 my-3">
            <h5 class="h5-responsive font-weight-bold ">Synthetic Data</h5>
            <div class="row justify-content-between">
                <div class="col-lg-4">
                    <p class="mb-1">Alpha</p>
                    <select class="browser-default custom-select">
                        <option value="0.01">0.01</option>
                        <option value="0.02">0.02</option>
                        <option selected value="0.05">0.05</option>
                    </select>
                    <p class="pt-4 mb-1">Number of points (of the distributions)</p>
                    <select class="browser-default custom-select">
                        <option selected value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="1500">1500</option>
                    </select>
                    <p class="pt-4 mb-1">Percentage of Split Train/test</p>
                    <select class="browser-default custom-select">
                        <option selected value="0.7">70% train, 30% test</option>
                        <option value="0.8">80% train, 20% test</option>
                    </select>
                </div>
                <div class="col-lg-6">
                    <adjacencyMatrix :zValues="options[0].matrix"/>
                </div>
            </div>
        </div>


    </mdb-container>
</template>

<script>
    let d3 = require("d3");
    import Vue from 'vue';
    import {mdbContainer} from 'mdbvue';
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
            adjacencyMatrix
        },
        data() {
            return {
                value: 4,
                min: 4,
                max: 8,
                options: [{
                    alpha: 0.2,
                    n_points: 1500,
                    percentage_split: 0.7,
                    matrix: [
                        [0, 0.89085578, 0.25787964, 0],
                        [0, 0, 0, 0.51288999],
                        [0, 0, 0, 0.51288999],
                        [0, 0, 0, 0]
                    ]
                }],
                links: [{
                    source: 1,
                    target: 2
                    }, {
                    source: 1,
                    target: 3
                    },{
                    source: 2,
                    target: 4
                    }, {
                    source: 3,
                    target: 4
                    }
                ],
                nodes: [
                    {
                        name: "W",
                        x: 60,
                        y: 100
                    },{
                        name: "X",
                        x: 160,
                        y: 100
                    },{
                        name: "Y",
                        x: 260,
                        y: 100
                    },{
                        name: "Z",
                        x: 300,
                        y: 100
                    }
                ]
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
</style>
