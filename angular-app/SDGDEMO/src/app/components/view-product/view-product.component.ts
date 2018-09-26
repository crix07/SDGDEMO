import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styles: []
})
export class ViewProductComponent implements OnInit {
  public product: any;
  locationChosen = false;


  constructor(public activateRoute: ActivatedRoute, public _userservice: UsersService,
     public _http: HttpClient) {}

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this._userservice.getProducto(params['id']).subscribe((data: any) => {
        this.product = data;
        this.locationChosen = true;
      });
    });
  }

}
