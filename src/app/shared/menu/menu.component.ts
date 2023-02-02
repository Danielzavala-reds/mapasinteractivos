import { Component } from '@angular/core';

interface MenuItem{
  ruta: string;
  nombre: string;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

menuItems: MenuItem [] = [
  {
    ruta: '/mapas/fullscreen',
    nombre: 'Fullscreen'
  },

  {
    ruta: '/mapas/zoom-range',
    nombre: 'Zoom Range'
  },

  {
    ruta: '/mapas/marcadores',
    nombre: 'Marcadores'
  },

  {
    ruta: '/mapas/propiedades',
    nombre: 'Propiedades'
  },
];


}
