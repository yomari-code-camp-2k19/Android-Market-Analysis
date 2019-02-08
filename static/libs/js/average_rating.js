d3.csv('/static/toplot/mean_rating_in_category.csv', function (data) {
  // Variables
  data.forEach(function(element){
    element.Rating = Math.round(element.Rating * 10) / 10;
})
  var averageBody = d3.select('#average-layout')
	var averageMargin = { top: 50, right: 50, bottom: 50, left: 50 }
	var h = 500 - averageMargin.top - averageMargin.bottom
	var w = 1000 - averageMargin.left - averageMargin.right
  var averageFormatPercentX = d3.format('1')
  var averageFormatPercentY = d3.format('100')
	// Scales
  // var colorScale = d3.scale.category20()
  var averageXscale = d3.scaleLinear()
    .domain([0,1800])
    .range([0,w])
  var yScale = d3.scaleLinear()
    .domain([0,5])
    .range([h,0])
	// averageSvg
	var averageSvg = averageBody.append('svg')
	    .attr('height',h + averageMargin.top + averageMargin.bottom)
	    .attr('width',w + averageMargin.left + averageMargin.right)
	  .append('g')
	    .attr('transform','translate(' + averageMargin.left + ',' + averageMargin.top + ')')
	// X-axis
	var xAxis = d3.axisBottom()
	  .scale(averageXscale)
	  .tickFormat(averageFormatPercentX)
	  .ticks(5)
  // Y-axis
	var yAxis = d3.axisLeft()
	  .scale(yScale)
	  .tickFormat(averageFormatPercentY)
    .ticks(5)
    
  //color
  var randomColor = (function(){
    var golden_ratio_conjugate = 0.618033988749895;
    var h = Math.random();
  
    var hslToRgb = function (h, s, l){
        var r, g, b;
  
        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }
  
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
  
        return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
    };
    
    return function(){
      h += golden_ratio_conjugate;
      h %= 1;
      return hslToRgb(h, 0.5, 0.60);
    };
  })();
  // Circles
  var circles = averageSvg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return averageXscale(d.Number) })
      .attr('cy',function (d) { return yScale(d.Rating) })
      .attr('r','10')
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',randomColor)
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
      })
    .append('title') // Tooltip
      .text(function (d) { return d.Category +
                           '\nRating: ' + d.Rating +
                           '\nNumber of apps: ' + d.Number })
  // X-axis
  averageSvg.append('g')
      .attr('class','axis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
      .append('text') // X-axis Label
      .attr('class','label')
      .attr('y',-10)
      .attr('x',w/2)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Average Rating')
  // Y-axis
  averageSvg.append('g')
      .attr('class', 'axis')
      .call(yAxis)
    .append('text') // y-axis Label
      .attr('class','label')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Number of Apps')
})