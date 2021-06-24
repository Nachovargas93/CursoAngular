import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: any = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor( private http: HttpClient) { 

    this.cargarProductos();
  }


  private cargarProductos() {
    return new Promise<void>( (resolve, reject) =>{
      this.http.get("https://curso-angular-22b61-default-rtdb.firebaseio.com/productos_idx.json")
        .subscribe( (resp: ProductoInterface) => {
          this.cargando = false;
          this.productos = resp;
          resolve();
      });
    } );
  }
  

  getProducto( id: string){
    return this.http.get(`https://curso-angular-22b61-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto( termino: string){

    if (this.productos.length === 0){
      //cargar productos
      this.cargarProductos().then(()=>{
        // ejecutar despues de tener los productos
        this.filtrarProductos( termino);
      })
    } else{
      //aplicar el filtro
      this.filtrarProductos( termino);
    }
    // this.productosFiltrado = this.productos.filter( (producto : any[]) =>{
    //   return true;
    // });
    // console.log( this.productosFiltrado)
  }


  private filtrarProductos( termino: string ){
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( (prod: any)  => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push(prod);
      }
    });
  }
}
