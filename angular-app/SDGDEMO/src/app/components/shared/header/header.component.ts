import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor( public userservice: UsersService) {}

  ngOnInit() {
    this.initIoConnection();
  }

  toggle() {
    let sidebar = document.getElementById('sidebar');

    if (sidebar.style.left === '-100%') {
      sidebar.style.left = '0';
      sidebar.style.visibility = 'visible';
    } else {
      sidebar.style.left = '-100%';
      sidebar.style.visibility = 'hidden';
    }
  }

  private initIoConnection(): void {
    this.userservice.initSocket();

    this.userservice.NewProduct()
      .subscribe((reserva: any) => {
        console.log('this works');
      });


    this.userservice.onEvent('connect')
      .subscribe(() => {
        console.log('connected');
      });

    this.userservice.onEvent('disconnect')
      .subscribe(() => {
        console.log('disconnected');
      });
  }

}
