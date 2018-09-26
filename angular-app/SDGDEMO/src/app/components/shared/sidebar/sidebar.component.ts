import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  searchterm: string;

  @Output() AgenciaClick = new EventEmitter();
  constructor(public _userservice: UsersService, public router: Router) { }

  ngOnInit() {
  }

  addProduct() {
    this.router.navigate(['/add_product'])
  }

  onSignOut() {
    this._userservice.logOut();
  }

  clickProduct(key$) {
    this.AgenciaClick.emit(key$);
  }



}
