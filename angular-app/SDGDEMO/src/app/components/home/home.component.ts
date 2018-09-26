import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  public latitude: number = 18.4860575;
  public longitude: number = -69.9312117;
  public selectAgen: any;
  public productos: any = [];

  openedWindow: number = 0;
  constructor( public router: Router, public _userservice: UsersService ) { }

  ngOnInit() {
    this._userservice.getProductos().subscribe((res: any) => {
      
    })
  }
 
  VerProducto(event) {
    this.openedWindow = event;
  }

  openWindow(id) {
    this.openedWindow = id;
  }

  isInfoWindowOpen(id) {
    return this.openedWindow == id;
  }

  viewProduct(product) {
    this.router.navigate(['/view/', product]);
  }

  editProduct(product) {
    this.router.navigate(['/edit/', product]);
  }

  deleteProduct(product) {
    swal({
      title: '¿Estas Segudo?',
      text: 'Esta a punto de borrar un Producto',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    })
    .then( (borrar) => {
      if (borrar.value) {
          this._userservice.deleteProduct(product).subscribe((data) => {
        })
      }
    });
  }

  addAgen() {
    this.router.navigate(['/add_product'])
  }

}
