<template>
    <vue-plotly :data="traces" :layout="layout" :options="options" />
</template>

<script>
    let d3 = require("d3");
    import VuePlotly from '@statnett/vue-plotly';

    export default {
        name: "residualsPlot",
        components:{
            VuePlotly,
        },
        props: {
            file: String,
            name: String,
            title: String
        },
        data() {
            return {
                traces: [],
                data: [],
                layout:{
                    title: {
                        text:''
                    },
                    font: {
                        family: 'Roboto, sans-serif',
                        size: 12,
                        color: '#444'
                    },
                    margin:{'t': 35, 'l': 60, 'r': 20,'b': 50},
                    xaxis:{
                        title: '',
                        zeroline: false,
                        fixedrange: true //disable zoom
                    },
                    yaxis:{
                        zeroline: false,
                        title: '',
                        fixedrange: true //disable zoom
                    }
                },
                options:{
                    'displayModeBar':false,
                    'responsive': true
                }

            }
        },
        mounted() {
            d3.csv(this.file).then((res) => {
                var reports = res.map((d) => {
                    const r = {
                        residuals: +d.residuals,
                        dependent_var: +d.dependent_var
                    };
                    return r;
                });
                let step;
                this.data[0] = [];
                this.data[1] = [];
                for (step=0; step<reports.length; step++) {
                    let elem = reports[step];
                    this.data[0].push(elem.dependent_var);
                    this.data[1].push(elem.residuals);
                }
                this.createPlot();
            });
        },
        methods: {
            createPlot() {
                var results = {
                    x: this.data[0], //dependent variable
                    y: this.data[1], //residuals
                    mode: 'markers',
                    type: 'scatter'
                };
                this.traces.push(results);
                this.layout.title = 'Residuals for ' + this.title;
                this.layout.xaxis.title = this.name;
                this.layout.yaxis.title = 'Residuals of ' + this.name;
            }
        },
        watch: {
            file: {
                handler() {
                    this.traces = [];
                    this.data = [];
                },
                deep: true,
            },
            name: {
                handler() {
                    this.layout.title = '';
                    this.layout.xaxis.title = '';
                    this.layout.yaxis.title = '';
                },
                deep: true,
            }
        }
    }
</script>

<style scoped>

</style>
