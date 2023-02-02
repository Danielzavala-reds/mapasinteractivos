import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { enviroment } from 'src/enviroments/enviroments.prod';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = '09-maps';

  ngOnInit(): void {
    // console.log('appComponent')

    (mapboxgl as any).accessToken = enviroment.mapBoxToken;

  }
}
