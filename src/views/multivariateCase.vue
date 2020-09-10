<template>
    <mdb-container class="mb">
        <div class="header d-flex justify-content-center">
            <h2 class="indigo-text"><strong>Multivariate Case</strong></h2>
        </div>
        <div id="arc_graph"/>
    </mdb-container>
</template>

<script>
    let d3 = require("d3");
    import {mdbContainer} from 'mdbvue';

    export default {
        name: "general",
        components: {
            mdbContainer
        },
        data() {
            return {
                margin: {},
                height: 0,
                width: 0,
                links: [{
                    "source": 1,
                    "target": 2
                    }, {
                    "source": 1,
                    "target": 3
                    },{
                    "source": 2,
                    "target": 4
                    }, {
                    "source": 3,
                    "target": 4
                    }
                ],
                nodes: [
                    {
                        "id": 1,
                        "name": "X"
                    },{
                        "id": 2,
                        "name": "Y"
                    },{
                        "id": 3,
                        "name": "W"
                    },{
                        "id": 4,
                        "name": "Z"
                    }
                ]
            }
        },
        mounted() {
            this.margin = {top: 20, right: 30, bottom: 20, left: 30};
            this.width = 450 - this.margin.left - this.margin.right;
            this.height = 300 - this.margin.top - this.margin.bottom;

            // append the svg object to the body of the page
            var svg = d3.select("#arc_graph")
                .append("svg")
                .attr("width", this.width + this.margin.left + this.margin.right)
                .attr("height", this.height + this.margin.top + this.margin.bottom);

            this.drawArcGraph();
        },
        methods: {
            drawArcGraph() {
                var svg = d3.select("#arc_graph svg");

                    // List of node names
                    var allNodes = this.nodes.map(function (d) {
                        return d.name
                    });

                    // A linear scale to position the nodes on the X axis
                    var x = d3.scalePoint()
                        .range([0, this.width])
                        .domain(allNodes);

                    // Add the circle for the nodes
                    var nodes = svg.selectAll("mynodes")
                        .data(this.nodes)
                        .enter()
                        .append("circle")
                        .attr("cx", function (d) {
                            return (x(d.name))
                        })
                        .attr("cy", this.height - 30)
                        .attr("r", 8)
                        .style("fill", "#69b3a2");

                    // And give them a label
                    var labels = svg
                        .selectAll("mylabels")
                        .data(this.nodes)
                        .enter()
                        .append("text")
                        .attr("x", function (d) {
                            return (x(d.name))
                        })
                        .attr("y", this.height - 10)
                        .text(function (d) {
                            return (d.name)
                        })
                        .style("text-anchor", "middle");

                    // Add links between nodes. Here is the tricky part.
                    // In my input data, links are provided between nodes -id-, NOT between node names.
                    // So I have to do a link between this id and the name
                    var idToNode = {};
                    this.nodes.forEach(function (n) {
                        idToNode[n.id] = n;
                    });
                    // Cool, now if I do idToNode["2"].name I've got the name of the node with id 2

                    // Add the links
                    var links = svg
                        .selectAll('mylinks')
                        .data(this.links)
                        .enter()
                        .append('path')
                        .attr('d', function (d) {
                            let start = x(idToNode[d.source].name);  // X position of start node on the X axis
                            let end = x(idToNode[d.target].name);      // X position of end node
                            return ['M', start, 230,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
                                'A',                            // This means we're gonna build an elliptical arc
                                (start - end) / 2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
                                (start - end) / 2, 0, 0, ',',
                                start < end ? 1 : 0, end, ',', 230] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
                                .join(' ');
                        })
                        .style("fill", "none")
                        .attr("stroke", "black");

                // Add the highlighting functionality
                nodes
                    .on('mouseover', function (d) {
                        // Highlight the nodes: every node is green except of him
                        nodes.style('fill', "#B8B8B8")
                        d3.select(this).style('fill', '#69b3b2')
                        // Highlight the connections
                        links
                            .style('stroke', function (link_d) { return link_d.source === d.id || link_d.target === d.id ? '#69b3b2' : '#b8b8b8';})
                            .style('stroke-width', function (link_d) { return link_d.source === d.id || link_d.target === d.id ? 4 : 1;})
                    })
                    .on('mouseout', function (d) {
                        nodes.style('fill', "#69b3a2");
                        links
                            .style('stroke', 'black')
                            .style('stroke-width', '1')
                    });
                svg
                    .append("text")
                    .attr("text-anchor", "middle")
                    .style("fill", "#B8B8B8")
                    .style("font-size", "17px")
                    .attr("x", 50)
                    .attr("y", 10);
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

</style>