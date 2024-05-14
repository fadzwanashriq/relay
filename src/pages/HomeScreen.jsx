import React, { useState } from 'react';
import * as d3 from 'd3';
import LinePlot from './LinePlot'; // Assuming you have a LinePlot component defined in a separate file

export default function HomeScreen() {
  let projection = d3.geoEquirectangular();
  // return projection([-3.0026, 16.7666])// return cartesian coordinates


  let geoGenerator = d3.geoPath()
    .projection(projection);

  let geoJson = {
    "type": "Feature",
    "properties":{
      "name": "Africa"
    },
    "geometry":{
      "type":"Polygon",
      "coordinates":[[[-6,36],[33,30],[-6,36]]]
    }
  }

  return geoGenerator(geoJson)
  
  // const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  // function onMouseMove(event) {
  //   const [x, y] = d3.pointer(event);
  //   setData(data.slice(-200).concat(Math.atan2(x, y)));
  // }

  // return (
  //   <>
  //     <h1>Here are the </h1>
  //     <div onMouseMove={onMouseMove}>
  //       <LinePlot data={data} />
  //     </div>
  //     <p>Here instead of using data we use mouse movement to depitcs real-time data</p>
  //   </>
  // );
}
