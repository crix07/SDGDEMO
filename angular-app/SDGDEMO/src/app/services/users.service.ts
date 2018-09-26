import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { Observable, Observer } from 'rxjs';
import swal from 'sweetalert2';
import global from '../global';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public id: string;
  public usuario: any;
  public token: string;
  public productos: any = [];
  public socket;
  public dangerDress;


  constructor(public router: Router, public http: HttpClient) {
    this.cargarStorage();
  }
  
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = localStorage.getItem('usuario');
      this.id = localStorage.getItem('id');
    } else {
      this.token = '';
      this.usuario = null;
      this.id = '';
    }
  }

  guardarStorage(id: string, token: string, usuario: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
    this.id = id;
  }

  logOut() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  crearUsuario(user) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(global.apiURL + '/register', body, {headers})
  }

  ingresar(user) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(global.apiURL + '/login', body, {headers})
        .pipe(map((data: any) => {
          this.guardarStorage(data.user._id, data.token, data.user)
          return true;
        }))
  }


  getProductos() {
    this.productos = [];
    return this.http.get( global.apiURL + '/all_products' )
      .pipe(map((data) => {
        this.productos = data;
      }));
  }

  addProduct(product: any) {
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post( global.apiURL + '/add_product' , product, {headers} )
            .pipe(map(data => {
              return data;
      }));
  }

  editProduct(product: any, id) {
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put( global.apiURL + '/edit_product/' + id, product, {headers} )
            .pipe(map(data => {
              this.getProductos();
              return data;
      }));
  }

  deleteProduct(key$: any) {
    return this.http.delete( global.apiURL + '/delete_product/' + key$ )
            .pipe(map((data: any) => {
              this.getProductos()
              swal('Bien', data.message, 'success');
              return data;
            }));
  }

  getProducto(key$) {
    return this.http.get( global.apiURL + '/one_product/' + key$ )
      .pipe(map((data) => {
        return data;
      }));
  }


  public initSocket(): void {
    this.socket = io(global.apiURL);
    this.socket.emit('connect', this.token);
  }

public NewProduct(): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on('newProduct', (data: any) => {
          console.log('this works');
          // this.getProductos();
          observer.next(data);
        });
    });
}

public onEvent(event: any): Observable<any> {
    return new Observable<Event>(observer3 => {
        this.socket.on(event, () => observer3.next());
    });
}

}
