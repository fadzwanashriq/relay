import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const MapComponent = () => {
  const [geojson, setGeojson] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json');
      const json = await response.json();
      setGeojson(json);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (geojson) {
      initMenu();
      update();
    }
  }, [geojson]);

  let projectionTypes = [
    'AzimuthalEqualArea',
    'AzimuthalEquidistant',
    'Gnomonic',
    'Orthographic',
    'Stereographic',
    'Albers',
    'ConicConformal',
    'ConicEqualArea',
    'ConicEquidistant',
    'Equirectangular',
    'Mercator',
    'TransverseMercator'
  ];

  let projection;
  let geoGenerator = d3.geoPath().projection(projection);

  let graticule = d3.geoGraticule();

  let circles = [
    [-135, 0], [-90, 0], [-45, 0], [0, 0], [45, 0], [90, 0], [135, 0], [180, 0],
    [0, -70], [0, -35], [0, 35], [0, 70],
    [180, -70], [180, -35], [180, 35], [180, 70],
  ];
  let geoCircle = d3.geoCircle().radius(10).precision(1);

  let state = {
    type: 'AzimuthalEqualArea',
    scale: 120,
    translateX: 450,
    translateY: 250,
    centerLon: 0,
    centerLat: 0,
    rotateLambda: 0.1,
    rotatePhi: 0,
    rotateGamma: 0
  };

  const initMenu = () => {
    d3.select('#menu')
      .selectAll('.slider.item input')
      .on('input', function(d) {
        let attr = d3.select(this).attr('name');
        state[attr] = this.value;
        d3.select(this.parentNode.parentNode).select('.value').text(this.value);
        update();
      });

    d3.select('#menu .projection-type select')
      .on('change', function(d) {
        state.type = this.options[this.selectedIndex].value;
        update();
      })
      .selectAll('option')
      .data(projectionTypes)
      .enter()
      .append('option')
      .attr('value', function(d) { return d; })
      .text(function(d) { return d; });
  };

  const update = () => {
    // Update projection
    projection = d3[`geo${state.type}`]();
    geoGenerator.projection(projection);

    projection
      .scale(state.scale)
      .translate([state.translateX, state.translateY])
      .center([state.centerLon, state.centerLat])
      .rotate([state.rotateLambda, state.rotatePhi, state.rotateGamma]);

    // Update world map
    let u = d3.select('g.map')
      .selectAll('path')
      .data(geojson.features);

    u.enter()
      .append('path')
      .merge(u)
      .attr('d', geoGenerator);

    // Update projection center
    let projectedCenter = projection([state.centerLon, state.centerLat]);
    d3.select('.projection-center')
      .attr('cx', projectedCenter[0])
      .attr('cy', projectedCenter[1]);

    // Update graticule
    d3.select('.graticule path')
      .datum(graticule())
      .attr('d', geoGenerator);

    // Update circles
    u = d3.select('.circles')
      .selectAll('path')
      .data(circles.map(function(d) {
        geoCircle.center(d);
        return geoCircle();
      }));

    u.enter()
      .append('path')
      .merge(u)
      .attr('d', geoGenerator);
  };

  return (
    <div>
      <svg width="900" height="500">
        <g className="map" />
        <path className="graticule" />
        <g className="circles" />
        <circle className="projectioncenter" />
      </svg>
      <div id="menu">
        {/* Add your menu HTML here */}
      </div>
    </div>
  );
};

export default MapComponent;