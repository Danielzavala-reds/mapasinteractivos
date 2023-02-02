import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor{
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.scss']
})
export class MarcadoresComponent implements AfterViewInit{

  @ViewChild('map') divMapa!: ElementRef
  map!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] =[ -98.96837237409842, 19.679002840450423 ];

  // Arreglo de marcadores
  marcadores: MarkerColor[] = [];

  constructor(){}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      // Tenemos que poner que el this.divmapa, es un nativeElement ya que el container no es asignable al tipo string o HTML ya que el divMapa es ElementRef
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      // En mapbox es primero la longitud y después la latitud, en google maps es viceversa
      center: this.center,
      zoom: this.zoomLevel,
      
    });

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML= 'Hola Mundo';

    // const marker = new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.map);

    this.leerLocalStorage();
  }


  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    console.log(color)

    /* Esta constante es opcional pero la utilizamos así para tener una referencia directa a la instancia/objeto */ 
    const nuevoMarcador = new mapboxgl.Marker({
      // Esta config es para poder mover el marker de lugar
      draggable: true,
      color,
      
    })
    .setLngLat( this.center)
    .addTo(this.map)

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    // console.log(this.marcadores)
    this.guardarMarcadoresLs();

    
    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLs();
    })
  }

  irMarcador(marker?: mapboxgl.Marker){
    console.log(marker);
    this.map.flyTo({
      center: marker!.getLngLat()
    })


  };

  guardarMarcadoresLs(){

    const lngLatArr: MarkerColor[] = []

    this.marcadores.forEach( m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [ lng, lat ]

      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));

  }

  leerLocalStorage(){
    
    if(!localStorage.getItem('marcadores')){
      return;
    }

    const lngLatArr: MarkerColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    console.log(lngLatArr);

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
      .setLngLat(m.centro!)
      .addTo(this.map)

      this.marcadores.push({
        marker: newMarker,
        color: m.color,
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLs();
      })

    });

  }

  borrarMarcador(i:number){
    // console.log('borrando marcador')

    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLs();

  }

}
