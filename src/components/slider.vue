<template>
  <div>
    <div id="dataviz_Slider" style="margin-top: 10px;" />
  </div>
</template>

<script>
let d3 = require("d3");
export default {
    name: "slider",
    props: {
        data: Number
    },
    data() {
        return {
            errorMsg: '',
            margin: {},
            width: 0,
            height: 0,
            values: [
                {x: 1.2, i: 4, text:"729", color:"rgb(0, 180, 216, 0.8)"},
                {x: 2, i: 5, text:"59 Thousand", color:"rgb(0, 150, 199, 0.8)"},
                {x: 12, i:6, text:"14 Million", color:"rgb(0, 119, 182, 0.8)" },
                {x: 30, i:7, text:"10 Billion", color: "rgb(2, 62, 138, 0.8)"},
                {x: 100, i:8, text:"22 Trillion", color:"rgb(3, 4, 94, 0.8)"}
            ]
        }
    },
    mounted() {
        this.margin = {top: 10, right: 10, bottom: 10, left: 10};
        this.width = 400 - this.margin.left - this.margin.right;
        this.height = 250 - this.margin.top - this.margin.bottom;
        d3.select("#dataviz_Slider")
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);
        this.drawNested();
    },
    methods: {
        drawNested() {
            let svg = d3.select("#dataviz_Slider svg");
            let size = d3.scaleSqrt()
                .domain([1, 100])
                .range([1, 100]);

            // Add legend: circles
            let valuesToShow = this.values;
            let xCircle = 130;
            let xLabel = 330;
            let yCircle = 210;
            svg
                .selectAll("legend")
                .data(valuesToShow)
                .enter()
                .append("circle")
                .attr("class", "circle_slider")
                .attr("cx", xCircle)
                .attr("cy", function(d){ return yCircle - size(d.x) } )
                .attr("r", function(d){ return size(d.x) })
                .attr("id", function (d) {
                    return "circle" + d.i;
                })
                .style("fill", function (d) {
                    if (d.i === 4) {
                        return d.color;
                    }else {
                        return "none";
                    }
                })
                .attr("stroke", "black");

            svg
                .selectAll("legend")
                .data(valuesToShow)
                .enter()
                .append("line")
                .attr("class", "line_slider")
                .attr("id", function (d) {
                    return "line" + d.i;
                })
                .attr('x1', function(d){ return xCircle + size(d.x) } )
                .attr('x2', xLabel)
                .attr('y1', function(d){ return yCircle - size(d.x) } )
                .attr('y2', function(d){ return yCircle - size(d.x) } )
                .attr('stroke', function(d) {
                    if (d.i === 4) {
                        return "black";
                    }else {
                        return "none";
                    }
                })
                .style('stroke-dasharray', ('2,2'));

            // Add legend: labels
            svg
                .selectAll("legend")
                .data(valuesToShow)
                .enter()
                .append("text")
                .attr("class", "text_slider")
                .attr("id", function (d) {
                    return "text" + d.i;
                })
                .attr('x', xLabel)
                .attr('y', function(d){ return yCircle - size(d.x) })
                .text(function(d) {
                    if (d.i === 4) {
                        return d.text;
                    } else {
                        return "";
                    }
                })
                .style("font-size", 12)
                .attr('alignment-baseline', 'middle')
        },
        changeSize(value) {
            let circle = d3.select("#circle" + value);
            let line = d3.select("#line" + value);
            let label = d3.select("#text" + value);
            circle.style("fill", function (d) {
                return d.color;
            });
            line.style("stroke", "black");
            label.text(function (d) {return d.text});
        }

    },
    watch: {
        data: {
            handler(value) {
                d3.selectAll(".circle_slider").style("fill", "none");
                d3.selectAll(".line_slider").style("stroke", "none");
                d3.selectAll(".text_slider").text("");
                this.changeSize(value);
            },
            deep:true,
        }
    }
}
</script>
