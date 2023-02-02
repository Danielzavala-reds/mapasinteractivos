import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent implements OnInit {

  ngOnInit(): void {

   /* Establecimos el token de manera globarl en el componente principal de la aplicación, para que se renderice en los componentes que lo vamos a utilizar
   **revisa el app.component.ts** */
    
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      // En mapbox es primero la longitud y después la latitud, en google maps es viceversa
      center: [ -98.96837237409842, 19.679002840450423 ],
      zoom: 18,

    });
    
   
  }


}
