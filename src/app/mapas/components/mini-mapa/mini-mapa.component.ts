import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styleUrls: ['./mini-mapa.component.scss']
})
export class MiniMapaComponent implements AfterViewInit{

  @Input() lngLat:[number, number] = [0,0]
  @ViewChild('mapa') divMapa!: ElementRef

  ngAfterViewInit(): void {
    
    const map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      // En mapbox es primero la longitud y después la latitud, en google maps es viceversa
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new mapboxgl.Marker()
      .setLngLat(this.lngLat)
      .addTo(map)
    
    
  }
}
