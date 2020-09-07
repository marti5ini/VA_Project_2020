<template>
    <div id="graph-viz"></div>
</template>

<script>
    let d3 = require("d3");

    export default {
        name: "binaryViz",
        props: {
            nodes: Array, //data passed through root component App.vue
            edges: Array
        },
        data() {
            return {
                margin: {},
                height: 0,
                width: 0
            }
        },
        mounted() {
            this.margin = {top: 0, right: 10, bottom: 10, left: 10};
            this.width = 400 - this.margin.left - this.margin.right;
            this.height = 200 - this.margin.top - this.margin.bottom;
            //svg
            var svg = d3.select("#graph-viz")
                .append("svg")
                .attr("width", this.width + this.margin.left + this.margin.right)
                .attr("height", this.height + this.margin.top + this.margin.bottom);
            this.initializeGraph();
        },
        methods: {
            initializeGraph() {
                this.drawGraph();
            },
            refreshGraph() {
                this.clearCircles();
                this.drawGraph();
            },
            clearCircles() {
                d3.selectAll("g").remove();
                d3.selectAll("line").remove();
                d3.selectAll("defs").remove();
            },
            drawGraph() {
                const nodes = this.nodes;
                const edges = this.edges;
                const markerBoxWidth = 4;
                const markerBoxHeight = 5;
                const refX = markerBoxWidth * 2;
                const refY = markerBoxHeight * 2;
                const arrowPoints = [[0, 0], [0, 20], [20, 10]];

                const svg = d3.select("#graph-viz svg");

                function dragstart() {
                    d3.select(this).raise().classed("active", true);
                }

                function dragged(d) {
                    d3.select(this).select("text")
                        .attr("x", d.x = d3.event.x)
                        .attr("y", d.y = d3.event.y);
                    d3.select(this).select("circle")
                        .attr("cx", d.x = d3.event.x)
                        .attr("cy", d.y = d3.event.y);
                }

                function dragend() {
                    d3.select(this).classed("active", false);
                }

                // Add the arrowhead marker definition to the svg element
                svg
                    .append('defs')
                    .append('marker')
                    .attr('id', 'arrow')
                    .attr('viewBox', [0, 0, markerBoxWidth * 5, markerBoxHeight * 4])
                    .attr('refX', refX)
                    .attr('refY', refY)
                    .attr('markerWidth', markerBoxWidth)
                    .attr('markerHeight', markerBoxHeight)
                    .attr('orient', 'auto-start-reverse')
                    .append('path')
                    .attr('d', d3.line()(arrowPoints))
                    .attr('stroke', 'black');

                // Add circles to the svg element
                const g = svg.selectAll('node')
                    .data(nodes)
                    .join(function (group) {
                        const circle = group.append("g").attr("class", "circles");
                        circle.append("circle").attr("class", "group_circle");
                        circle.append("text").attr("class", "group_text");
                        return circle;
                    })
                    .call(d3.drag()
                        .on("start", dragstart)
                        .on("drag", dragged)
                        .on("end", dragend));

                let colors = ["#3282b8", "#005cbf"]

                g.select(".group_circle")
                    .attr("cx", function (d) {
                        return d.x
                    })
                    .attr("cy", function (d) {
                        return d.y
                    })
                    .attr('r', 45)
                    .attr('fill', function(d, i) {
                        return colors[i]
                    })
                    .on("mouseover", function () {
                        d3.select(this).style("cursor", "move");
                    })
                    .on("mouseout", function () {
                        d3.select(this).style("stroke", 'none');
                    });

                g.select(".group_text")
                    .attr("x", function (d) {
                        return d.x;
                    })
                    .attr("y", function (d) {
                        return d.y;
                    })
                    .attr('alignment-baseline', 'middle')
                    .attr('text-anchor', 'middle')
                    .text(function (d) {
                        return d.name;
                    })
                    .style('font-size', d => 36 * 0.4 + 'px')
                    .attr("fill", "white");


                // Add link with arrowhead at the end
                svg.selectAll("line")
                    .data(edges)
                    .enter()
                    .append("line")
                    .attr("x1", function (l) {
                        let sourceNode = nodes.filter(function (d, i) {
                            return i === l.source
                        })[0];
                        d3.select(this).attr("y1", sourceNode.y);
                        if (sourceNode.x === 320) {return sourceNode.x - 45}
                        else {return sourceNode.x + 45}
                    })
                    .attr("x2", function (l) {
                        let targetNode = nodes.filter(function (d, i) {
                            return i === l.target
                        })[0];
                        d3.select(this).attr("y2", targetNode.y);
                        if (targetNode.x === 60) {return targetNode.x + 55}
                        else {return targetNode.x - 55}
                    })
                    .attr("fill", "none")
                    .attr("stroke", "black")
                    .attr("stroke-width", "4")
                    .attr("marker-end", "url(#arrow)");
            }
        },
        watch: {
            nodes: {
                handler() {
                    this.refreshGraph();
                },
                deep: true,
            }
        }
    }
</script>

<style scoped>
    #graph-viz {
        padding-left: 0;
    }
    html, body {
        height: 100%;
    }
    #graph-viz
    {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        flex-direction: column;

    }

</style>
