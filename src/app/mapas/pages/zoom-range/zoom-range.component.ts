import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.scss']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{
  @ViewChild('map') divMapa!: ElementRef
  map!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] =[ -98.96837237409842, 19.679002840450423 ]

  constructor(){}


  // Cuando trabajemos con eventlisteners, como en este caso el on, tenemos que destruir los componentes al cambiar, para eso usamos .off
  ngOnDestroy(): void {
    this.map.off('zoom', () => {})
    this.map.off('zoomend', () => {})
    this.map.off('move', () => {})
  }
  
  ngAfterViewInit(): void {

    console.log('Afterview', this.divMapa)

    this.map = new mapboxgl.Map({
      // Tenemos que poner que el this.divmapa, es un nativeElement ya que el container no es asignable al tipo string o HTML ya que el divMapa es ElementRef
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      // En mapbox es primero la longitud y después la latitud, en google maps es viceversa
      center: this.center,
      zoom: this.zoomLevel,
    });

    // Creamos un eventListener para que se haga correctamente el zoomIn y zoomOut

    this.map.on('zoom', (e) => {
      // console.log(e)
      // console.log('zoom')
      // const zoomActual = this.map.getZoom();
      this.zoomLevel = this.map.getZoom();
    });

    this.map.on('zoomend', (e) => {
      if(this.map.getZoom() > 18){
        this.map.zoomTo(18)
      }
    });

    // Movimiento del mapa
    this.map.on('move', (e) => {
     const target = e.target;
     const {lng, lat} = target.getCenter()
     this.center = [lng, lat];
    })

  }

  zoomIn(){
    // console.log('zoomIn', this.divMapa)
    this.map.zoomIn();
    
  }

  zoomOut(){
    this.map.zoomOut();
    
  }

  zoomCambio( valor: string ){
    this.map.zoomTo( Number(valor) );
  }

}
