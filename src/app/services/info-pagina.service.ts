import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any = [];

  constructor( private http: HttpClient) {
    //Leer el archivo JSON
    this.cargarInfo();
    this.cargarEquipo();
  
   }
   private cargarInfo(){
   
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
      console.log(resp);
  });

   }
   private cargarEquipo(){

    this.http.get('https://curso-angular-22b61-default-rtdb.firebaseio.com/equipo.json')
    .subscribe( resp => {
      this.equipo = resp;
  });
   }
}
