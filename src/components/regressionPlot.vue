<template>
    <vue-plotly :data="result" :layout="layout" :options="options" />
</template>

<script>
    let d3 = require("d3");
    import VuePlotly from '@statnett/vue-plotly';

    export default {
        name: "regressionPlot",
        components:{
            VuePlotly,
        },
        props: {
            folder: String,
            xaxis: String,
            yaxis: String,
            title: String
        },
        data() {
            return {
                data: [],
                predictions: [],
                confidence: [],
                result: [],
                layout:{
                    title: {
                        text:''
                    },
                    font: {
                        family: 'Roboto, sans-serif',
                        size: 12,
                        color: '#444'
                    },
                    showlegend: true,
                    legend: {
                        'orientation': 'h',
                    },
                    margin:{'t': 35, 'l': 40, 'r': 20,'b': 0},
                    xaxis:{
                        title: {
                            text: '',
                            standoff: 8
                        },
                        zeroline: false,
                        automargin: true,
                        fixedrange: true
                    },
                    yaxis:{
                        zeroline: false,
                        title: '',
                        fixedrange: true
                    }
                },
                options:{
                    'displayModeBar':false,
                    'responsive': true,
                    'scrollZoom': true
                }

            }
        },
        mounted() {
            d3.csv(this.folder + '/observations.csv').then((res) => {
                var reports = res.map((d) => {
                    const r = {
                        x: +d.x,
                        y: +d.y
                    };
                    return r;
                });
                let step;
                this.data[0] = [];
                this.data[1] = [];
                for (step=0; step<reports.length; step++) {
                    let elem = reports[step];
                    this.data[0].push(elem.x);
                    this.data[1].push(elem.y);
                }
            });
            d3.csv(this.folder + '/prediction.csv' ).then((res) => {
                var reports = res.map((d) => {
                    const r = {
                        x: +d.x,
                        y: +d.y
                    };
                    return r;
                });
                let step;
                this.predictions[0] = [];
                this.predictions[1] = [];
                for (step=0; step<reports.length; step++) {
                    let elem = reports[step];
                    this.predictions[0].push(elem.x);
                    this.predictions[1].push(elem.y);
                }
            });
            d3.csv(this.folder + '/confidence.csv' ).then((res) => {
                var reports = res.map((d) => {
                    const r = {
                        x: +d.x,
                        y1: +d.y1,
                        y2: +d.y2
                    };
                    return r;
                });
                let step;
                this.confidence[0] = [];
                this.confidence[1] = [];
                this.confidence[2] = [];
                for (step=0; step<reports.length; step++) {
                    let elem = reports[step];
                    this.confidence[0].push(elem.x);
                    this.confidence[1].push(elem.y1);
                    this.confidence[2].push(elem.y2);
                }
                this.createPlot();
            });
        },
        methods: {
            createPlot() {
                var result1 = {
                    x: this.data[0], //variable 1
                    y: this.data[1], //variable 2
                    mode: 'markers',
                    name: "Observations",
                    marker: {
                        size: 5,
                        color: '#80b1d3'
                        //'#80b1d3'
                    },
                    type: 'scatter'
                };
                var result2 = {
                    x: this.predictions[0], //coordinates-x
                    y: this.predictions[1], //coordinates-y
                    name: "Prediction",
                    hoverinfo: 'skip',
                    mode: 'lines',
                    line: {
                        color: 'rgb(31, 119, 180)'
                    },
                    type: 'scatter'
                };
                var trace1 = {
                    x: this.confidence[0],
                    y: this.confidence[1],
                    showlegend: false,
                    hoverinfo: 'skip',
                    line: {
                        color: 'rgb(217, 217, 217, 0.5)'
                    },
                    type: "scatter"
                };
                var trace2 = {
                    x: this.confidence[0],
                    y: this.confidence[2],
                    name: "95% Confidence Interval",
                    hoverinfo: 'skip',
                    fill: 'tonexty',
                    fillcolor: "rgb(230, 230, 230, 0.2)",
                    line: {
                        color: 'rgb(217, 217, 217, 0.5)'
                    },
                    type: "scatter"
                };

                this.result = [trace1, trace2, result1, result2];

                this.layout.title.text = this.title;
                this.layout.xaxis.title.text = this.xaxis;
                this.layout.yaxis.title = this.yaxis;
            }
        },
        watch: {
            file: {
                handler() {
                    this.data= [];
                    this.predictions= [];
                    this.confidence= [];
                    this.result = [];
                },
                deep: true,
            },
            title: {
                handler() {
                    this.layout.xaxis.title.text = '';
                    this.layout.title.text = ''
                }
            },
            xaxis: {
                handler() {
                    this.layout.xaxis.title.text = '';
                }
            },
            yaxis: {
                handler(){
                    this.layout.title.text = '';
                }
            }
        }
    }
</script>

<style scoped>

</style>
