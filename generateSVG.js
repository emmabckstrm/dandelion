
// **************************************************
// Legend

var legendSvg = d3.select("#legend")
  .append("svg")
  .attr("width", 90)
  .attr("height", 50);

var legendBubbles = legendSvg.selectAll("circle.legend")
  .data(legendData)

legendBubbles.enter().append("circle")
  .attr("class", "legend")
  .attr("r", function(d) {
      return d.radius;
  })
  .attr("cx", function(d) {
      return d.posX;  // Circle's X
  })
  .attr("cy", function(d) {  // Circle's Y
      return d.posY;
  })
  .style("fill", function(d) {
      return d.fill;
  })

// **************************************************


// Create SVG element
var svg = d3.select("#svg")  // This is where we put our vis
    .append("svg")
    .attr("width", canvas_width)
    .attr("height", canvas_height);


var data = randomData;

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    var labels = svg.selectAll("text.label")
      .data(labelData)

    labels.enter().append('text')
      .attr("class", function(d){
          return "label";
      })
      .attr("x", function(d) {
          return d.posX;  // Circle's X
      })
      .attr("y", function(d) {  // Circle's Y
          return d.posY;
      })
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.label
      })

var bubbles = svg.selectAll("circle.bubble")  // Add circle svg
    .data(bubbleData)

bubbles.enter().append('circle')
        .attr("class", function(d){
            if (d.num == daysToShow-1) {
              return "bubble bubble-visible bubble-today bubble-category-" + String(d.layer);
            } else if (d.num < daysToShow-1) {
              return "bubble bubble-visible bubble-category-" + String(d.layer);
            } else {
              return "bubble bubble-opacity bubble-category-" + String(d.layer);
            }
            /*
            if (d.radialX == daysToShow && d.radialY == dayOfWeek-1) {
                return "bubble bubble-visible bubble-today bubble-category-" + String(d.layer);
            } else if (d.radialX == daysToShow && d.radialY < dayOfWeek) {
                return "bubble bubble-visible bubble-category-" + String(d.layer);
            } else if (d.radialX < daysToShow) {
                return "bubble bubble-visible bubble-category-" + String(d.layer);
            } else {
                return "bubble bubble-opacity bubble-category-" + String(d.layer);
            }*/
        })
        .attr("id", function(d) {
            return "bubble_id_" + String(d.radialX) + "_" + String(d.radialY);
        })
        .attr("cx", function(d) {
            return d.posX;  // Circle's X
        })
        .attr("cy", function(d) {  // Circle's Y
            return d.posY;
        })
        .attr("r", function(d) {
            currMaxRadius = interpolatedRadius((d.radialY+1)/numberOfLayers);
            return ((d.values['initial'])*currMaxRadius) + minBubbleRadius;
        })
        .style("fill", function(d) {
            return interpolate(d.values['initial']);
        })
        /*
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(categoryLabels[d.layer] + ": " + String(Math.round(d.values.initial*100)) + "% ekologiskt")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        })*/
        .transition()
            .delay(function(d) { return getRandomArbitrary(0,1)*1000; })
            .duration(0)
            .on("start", function repeat() {
                d3.active(this)
                    .transition()
                        .duration(1300)
                        .ease(bubbleEase)
                        .attr("cx", function(d) {
                             return d.posX + ((getRandomArbitrary(0,1)*moveX)-(moveX/2));
                         })
                        .attr("cy", function(d) {  // Circle's Y
                            return d.posY + ((getRandomArbitrary(0,1)*moveY)-(moveY/2));
                        })
                    .transition()
                        .duration(1300)
                        .ease(bubbleEase)
                        .attr("cx", function(d) {
                             return d.posX + ((getRandomArbitrary(0,1)*moveX)-(moveX/2));
                         })
                        .attr("cy", function(d) {  // Circle's Y
                            return d.posY + ((getRandomArbitrary(0,1)*moveY)-(moveY/2));
                        })
                    .transition()
                        .duration(0)
                        .on("start", repeat);
                });

var forceStrength = 0.03;
var force = d3.forceCenter([origin.x, origin.y]);



var categoryBubbles = svg.selectAll(".category")  // Add circle svg
    .data(categoryData);

var categoryGroupBubbles = categoryBubbles.enter().append('g')
        .attr("class", function(d){
            return "category category-" + String(d.layer);
        })
        .attr("id", function(d) {
            return "category_id_" + String(d.layer) + "_" + String(d.layer);
        })
        .attr("cx", function(d) {
            return d.x;  // Circle's X
        })
        .attr("cy", function(d) {  // Circle's Y
            return d.y;
        })
        .style("opacity", 0)
        /*
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(categoryLabels[d.layer] + ": " + String(Math.round(d.value*100)) + "% ekologiskt")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        })
        */


categoryGroupBubbles.append('circle')
        .attr("cx", function(d) {
            return d.x;  // Circle's X
        })
        .attr("cy", function(d) {  // Circle's Y
            return d.y;
        })
        .attr("r", function(d) {
            return 0;//((d.value)*maxBubbleRadius) + minBubbleRadius;
        })
        .style("fill", function(d) {
            return colors[d.layer];
        })

categoryGroupBubbles.append('text')
    .attr("x", function(d) {
            return d.x - ((d.value)*maxBubbleRadius*5)/2;  // Circle's X
        })
        .attr("y", function(d) {  // Circle's Y
            return d.y;
        })
    .attr("dy", ".35em")
    .text(function(d) {
        return String(Math.round(d.value*100)) + "%";
    });

    // @v4 Merge the original empty selection and the enter selection
    categoryBubbles = categoryBubbles.merge(categoryGroupBubbles);


svg.append('text')
  .attr("class", "middle")
  .attr("x", function(d) {
      return origin.x;  // Circle's X
  })
  .attr("y", function(d) {  // Circle's Y
      return origin.y+1;
  })
  .attr("text-anchor", "middle")
  .style("width", innerRadius*2)
  .text(function(d) {
      return currentYear;
  });

//var numDays = document.getElementById("numDaysLeft").innerHTML = numberOfArms-daysToShow;
