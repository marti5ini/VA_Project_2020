<template>
    <vue-plotly :data="traces" :layout="layout" :options="options"/>
</template>

<script>
    let d3 = require("d3");
    import VuePlotly from '@statnett/vue-plotly';

    export default {
        name: "adjacencyMatrix",
        components: {
            VuePlotly,
        },
        props: {
            zValues: Array
        },
        data() {
            return {
                traces: [],
                xValues: ["W", "X", "Y", "Z"],
                yValues: ["W", "X", "Y", "Z"],
                layout: {
                    font: {
                        family: 'Roboto, sans-serif',
                        size: 12,
                        color: '#444'
                    },
                    annotations: [],
                    xaxis: {
                        ticks: ''
                    },
                    yaxis: {
                        ticks: '',
                        ticksuffix: ' ',
                        width: 700,
                        height: 700,
                        autosize: false
                    },
                    margin: {
                        l: 30,
                        r: 100,
                        b: 40,
                        t: 0,
                        pad: 4
                    },
                },
                options:{
                    'displayModeBar':false,
                    'responsive': true,
                }
            }
        },
        mounted() {
            this.createMatrix();
        },
        methods: {
            createMatrix() {
                var colorValue = [
                    [0, '#dfeefd'],
                    [1, 'rgb(2, 62, 138, 0.8)']
                ];
                var data = {
                    x: this.xValues,
                    y: this.yValues,
                    z: this.zValues,
                    type: 'heatmap',
                    colorscale: colorValue,
                    showscale: true
                };
                this.traces.push(data);

                var textColor = "";

                for (var i = 0; i < this.yValues.length; i++) {
                    for (var j = 0; j < this.xValues.length; j++) {
                        var currentValue = this.zValues[i][j];
                        if (currentValue !== 0.0) {
                            textColor = 'white';
                        } else {
                            textColor = 'black';
                        }
                        var result = {
                            xref: 'x1',
                            yref: 'y1',
                            x: this.xValues[j],
                            y: this.yValues[i],
                            text: this.zValues[i][j],
                            font: {
                                family: 'Arial',
                                size: 12,
                                color: textColor
                            },
                            showarrow: false
                        };
                        this.layout.annotations.push(result);
                    }
                }
            }
        },
        watch: {
            zValues: {
                handler() {
                    this.layout.annotations = [];
                    this.traces = [];
                    this.createMatrix();
                }
            }
        }
    }
</script>

<style scoped>

</style>
