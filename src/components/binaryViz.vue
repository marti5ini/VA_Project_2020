<template>
    <div class="block">
        <div id="graph-viz" class="col-md-12">
            <svg width='100%' height='430'></svg>
        </div>
    </div>
</template>

<script>
    const d3 = require('d3')

    export default {
        name: "binaryViz",
        props: {
            nodesNames: Array
        },
        mounted() {
            const svg = d3.select("#graph-viz svg")
            const radius = 32
            const height = 200
            const width = 200
            const x = Math.random() * (width - radius * 2) + radius
            const y = Math.random() * (height - radius * 2) + radius
            svg
                .append("circle")
                .attr('r', radius)
                .attr("cx", x)
                .attr("cy", y)
        }
    }
    console.log(this.nodesNames);
</script>

<style scoped>

</style>
