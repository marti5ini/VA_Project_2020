<template>
    <div id="scatter_plot"/>
</template>

<script>
    let d3 = require("d3");

    export default {
        name: "scatterplotExample",
        data() {
            return {
                margin: {},
                height: 0,
                width: 0
            }
        },
        props: {
            current: Number,
            data: Array
        },
        mounted() {
            this.margin = {top: 10, right: 30, bottom: 30, left: 60};
            this.width = 460 - this.margin.left - this.margin.right;
            this.height = 400 - this.margin.top - this.margin.bottom;
            const svg = d3.select("#scatter_plot")
                .append("svg")
                .attr("width", this.width + this.margin.left + this.margin.right)
                .attr("height", this.height + this.margin.top + this.margin.bottom)
                .append('g')
                .attr("transform",
                    "translate(" + this.margin.left + "," + this.margin.top + ")");
            this.initializeScatter();
        },
        methods:{
            initializeScatter() {
                this.drawScatter();
            },
            refresh() {
                d3.selectAll("#scatter_plot g").remove();
                const svg = d3.select("#scatter_plot svg")
                    .append('g')
                    .attr("transform",
                        "translate(" + this.margin.left + "," + this.margin.top + ")");

                const data = this.data;

                var x = d3.scaleLinear()
                    .domain([0, 15])
                    .range([ 0, this.width ]);
                svg.append("g")
                    .attr("transform", "translate(0," + this.height + ")")
                    .call(d3.axisBottom(x));

                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([0, 2500])
                    .range([ this.height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Add dots
                svg
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) { return x(d.temperature);} )
                    .attr("cy", function (d) { return y(d.altitude);})
                    .attr("r", 3)
                    .style("fill", "#3282b8");

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

            },
            drawScatter() {
                const svg = d3.select("#scatter_plot svg")
                    .append('g')
                    .attr("transform",
                        "translate(" + this.margin.left + "," + this.margin.top + ")");

                const data = this.data;

                var x = d3.scaleLinear()
                    .domain([0, 15])
                    .range([ 0, this.width ]);
                svg.append("g")
                    .attr("transform", "translate(0," + this.height + ")")
                    .call(d3.axisBottom(x));

                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([0, 2500])
                    .range([ this.height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Add dots
                svg
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) { return x(d.temperature);} )
                    .attr("cy", function (d) { return y(d.altitude);})
                    .attr("r", 3)
                    .style("fill", "#3282b8");

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
            current: {
                handler() {
                    this.refresh();
                },
                deep: true,
            },
            data: {
                handler() {
                    this.refresh();
                },
                deep: true,
            }
        }
    }
</script>

<style scoped>
#scatter_plot {
    display: block;
    box-sizing: border-box;
}
</style>
