import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: any = [];

  constructor( private http: HttpClient) { 

    this.cargarProductos();
    
  }

  private cargarProductos() {
    this.http.get("https://curso-angular-22b61-default-rtdb.firebaseio.com/productos_idx.json")
      .subscribe( (resp: ProductoInterface) => {
        this.cargando = false;
        this.productos = resp;
    });

  }
  
  getProducto( id: string){
    return this.http.get(`https://curso-angular-22b61-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

}
