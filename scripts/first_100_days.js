// namespace
post = window.post || {};
window.post = post;

// document ready
$(document).ready(function() {
  // configure charts
  post.userTop10LocChart = new post.BarChart('#user-top-10-loc');
  post.activityPeakTop10Summits = new post.BarChart('#activity-peak-top-10-summits');
  post.userListsTop10 = new post.BarChart('#user-lists-top-10');
  post.userCStyles = new post.PieChart('#user-c-styles');
  // load data
  d3.json('/data/first_100_days.json', function(error, data) {
    if (error) return console.warn(error);
    // set activity stats data
    post.units = 'imperial';
    post.distance_km = data.total_activity_distance_km;
    post.elevation_m = data.total_activity_elevation_gain_m;
    // update text
    d3.select('#user-count').text(data.user_count);
    d3.select('#user-us-states').text(data.user_us_states);
    d3.select('#user-countries').text(data.user_countries);
    d3.select('#peaks-then').text(data.peaks_then);
    d3.select('#peaks-now').text(post.noDecimalNum(data.peaks_now));
    d3.select('#activity-peaks').text(post.noDecimalNum(data.activity_peaks));
    d3.select('#lists-then').text(data.lists_then);
    d3.select('#lists-now').text(data.lists_now);
    d3.select('#non-all-season-c-styles').text(data.non_all_season_c_styles);
    d3.select('#activity-count').text(post.noDecimalNum(data.activity_count));
    d3.select('#activities-with-stats').text(data.activities_with_stats);
    d3.select('#us-distance-multiple').text(data.us_distance_multiple);
    d3.select('#everest-elevation-multiple').text(data.everest_elevation_multiple);
    d3.select('#total-activity-distance').text(
      post.noDecimalNum(data.total_activity_distance_km * 0.621371)
    );
    d3.select('#total-activity-elevation-gain').text(
      post.noDecimalNum(data.total_activity_elevation_gain_m * 3.28084)
    );
    // waypoints
    $('#user-top-10-loc').waypoint(function() {
      post.userTop10LocChart.draw(data.user_top_10_loc, false, 'users');
    }, {
      offset: '90%'
    });
    $('#activity-peak-top-10-summits').waypoint(function() {
      post.activityPeakTop10Summits.draw(data.activity_peak_top_10_summits,
      true, 'summits');
    }, {
      offset: '60%'
    });
    $('#user-lists-top-10').waypoint(function() {
      post.userListsTop10.draw(data.user_lists_top_10, true, 'pursuers');
    }, {
      offset: '60%'
    });
    $('#user-c-styles').waypoint(function() {
      $(window).resize(); // IE
      post.userCStyles.draw(data.user_c_styles);
    }, {
      offset: '60%'
    });
    $('#activity-stats-container').waypoint(function() {
      post.animateDistance(post.distance_km, post.units);
      post.animateElevation(post.elevation_m, post.units);
      this.destroy();
    }, {
      offset: '90%'
    });
  });
});

// window resize
$(window).resize(function() {
  var chartWidth = $('.chart').width();
  $('.chart').attr('width', chartWidth);
  $('.chart').attr('height', chartWidth * 0.49);
});

// chart colors
post.grays = ['#ffffff','#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373',
  '#525252','#252525','#000000'];

// bar chart class
post.BarChart = function(element) {
  this.margin = {top: -10, right: 5, bottom: 65, left: 25};
  this.viewBoxWidth = 348 - this.margin.left - this.margin.right;
  this.viewBoxHeight = (this.viewBoxWidth * 0.49) - this.margin.top
    - this.margin.bottom;
  this.chartWidth = $('.chart').width();
  this.chartHeight = this.chartWidth * 0.49;
  this.svg = d3.select(element)
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight)
    .attr('width', this.chartWidth)
    .attr('height', this.chartHeight)
    .append('g')
      .attr('transform', 'translate(' + this.margin.left + ','
        + this.margin.top + ')');
}

post.BarChart.prototype.draw = function(data, rotateXLabels, name) {
  var colorScale = d3.scale.quantile()
    .domain(data.map(function(d){return d.count}))
    .range(post.grays);
  this.x = d3.scale.ordinal()
    .domain(data.map(function(d) {return d.short;}))
    .rangeRoundBands([0, this.viewBoxWidth * .9], .1);
  this.y = d3.scale.linear()
    .domain([0, d3.max(data.map(function(d){return d.count}))])
    .rangeRound([this.viewBoxHeight, 0])
    .nice();
  this.xAxis = d3.svg.axis()
    .scale(this.x)
    .orient('bottom');
  this.yAxis = d3.svg.axis()
    .scale(this.y)
    .orient('left')
    .ticks(5)
    .tickFormat(d3.format('d'));
  this.svg.append('g')
    .attr('class', 'x axis ' + name)
    .attr('transform', 'translate(0,' + this.viewBoxHeight + ')')
    .call(this.xAxis);
  if(rotateXLabels) {
    d3.selectAll('.x.axis.' + name + ' text')
      .attr('transform', 'rotate(-30)')
      .attr('dx','-.8em')
      .attr('dy','.3em')
      .style('text-anchor', 'end');
  }
  this.svg.append('g')
    .attr('class', 'y axis')
    .call(this.yAxis);
  var x = this.x;
  var y = this.y;
  this.bars = this.svg.selectAll('rect')
    .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) {return x(d.short);})
      .attr('y', this.viewBoxHeight)
      .attr('width', this.x.rangeBand())
      .attr('height', 0)
      .style('fill','white')
      .style('stroke','white')
      .on('mouseover', function(d) {
        var header = d.long;
        var body = d.count + ' ' + name;
        post.tooltipShow(header, body);
      })
      .on('mouseout', function() {
        post.tooltipHide();
      })
    .transition()
      .duration(750)
        .attr('height', function(d) {return y(0) - y(d.count);})
        .attr('y', function(d) {return y(d.count);})
        .style('fill', function(d) {return colorScale(d.count);})
        .style('stroke','#222');
}

// pie chart class
post.PieChart = function(element) {
  this.viewBoxWidth = 440;
  this.viewBoxHeight = this.viewBoxWidth * 0.49;
  this.chartWidth = $('.chart').width();
  this.chartHeight = this.chartWidth * 0.49;
  this.radius = Math.min(this.viewBoxWidth, this.viewBoxHeight) / 2;
  this.arc = d3.svg.arc()
    .outerRadius(this.radius - 17);
  this.pie = d3.layout.pie()
    .value(function(d){return d.count;});
  this.svg = d3.select(element)
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight)
    .attr('width', this.width)
    .attr('height', this.height)
    .append('g')
    .attr('transform', 'translate(' + this.viewBoxWidth  / 2 + ','
      + this.viewBoxHeight / 2 + ')');
}

post.PieChart.prototype.draw = function(data) {
  var colorScale = d3.scale.quantile()
    .domain(data.map(function(d){return d.count}))
    .range(post.grays);
  this.path = this.svg.datum(data).selectAll('path')
    .data(this.pie)
    .enter().append('path')
      .attr('class','slice')
      .style('stroke','white')
      .each(function() { this._current = {startAngle: 0, endAngle: 0}; });
  this.path
    .on('mouseover', function(d) {
      var header = d.data.name;
      var footer = post.oneDecimalPct(d.data.count/d.data.total);
      post.tooltipShow(header, footer);
    })
    .on('mouseout', function() {
      post.tooltipHide();
    })
    .transition()
    .duration(750)
    .style('fill', function(d){return colorScale(d.data.count)})
    .style('stroke','#222')
    .attrTween('d', post.arcTween);
}

post.arcTween = function(a) {
  var arc = d3.svg.arc()
    .outerRadius(90.8);
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

// tooltips
post.tooltipShow = function(header, body) {
  //create tooltip
  var tooltip = d3.select('body').append('div')
    .attr('id', 'chart-tooltip')
    .attr('class', 'tooltip');
  tooltip
    .html('<h4>' + header + '</h4>' + '<p>' + body + '</p>');
  //position tooltip
  var mouse = d3.mouse(d3.select('body').node()).map( function(d) {
    return parseInt(d);
  });
  var screenWidth = $('body').width();
  var tooltipWidth = $('#chart-tooltip').width();
  if((mouse[0] + tooltipWidth) > screenWidth) {
    tooltip
      .style('left', (mouse[0] + (screenWidth - (mouse[0] + tooltipWidth + 5)))
        + 'px')
      .style('top', (mouse[1] + 20) + 'px');
  } else {
    tooltip
      .style('left', mouse[0] + 'px')
      .style('top', (mouse[1] + 20) + 'px');
  }
  //show tooltip
  tooltip
    .transition()
    .duration(300)
    .style('opacity', .95);
}

post.tooltipHide = function() {
  d3.selectAll('.tooltip')
    .remove();
}

// activity stats
post.animateDistance = function(value, units) {
  var measure = 'Kilometers';
  if(units == 'imperial') {
    // convert km to mi
    measure = 'Miles'
    value = value * 0.621371;
  }
  d3.select('#distance-units').text(measure);
  $({n: 0}).animate({n: value},{
    duration: 800,
    step: function(now,fx){
      $('#total-activity-distance').text(post.noDecimalNum(now));
    }
  });
}

post.animateElevation = function(value, units) {
  var measure = 'Meters';
  if(units == 'imperial') {
    // convert m to ft
    measure = 'Feet';
    value = value * 3.28084;
  }
  d3.select('#elevation-units').text(measure);
  $({n: 0}).animate({n: value},{
    duration: 800,
    step: function(now,fx){
      $('#total-activity-elevation-gain').text(post.noDecimalNum(now));
    }
  });
}

post.handleUnitSelection = function(newUnits) {
  d3.selectAll('.select-btn').classed('active', false);
  if(newUnits == 'imperial') {
    post.units = 'metric';
    d3.select('#select-imperial').classed('active', true);
  } else {
    post.units = 'imperial';
    d3.select('#select-metric').classed('active', true);
  }
  post.animateDistance(post.distance_km, newUnits);
  post.animateElevation(post.elevation_m, newUnits);
}

// helpers
post.noDecimalNum = d3.format(',.0f');
post.oneDecimalPct = d3.format('.1%');
