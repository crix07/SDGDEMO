import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(public router: Router, public _userservice: UsersService) { }

  ngOnInit() {
    this.login = new FormGroup({
      'email': new FormControl('', [ Validators.required, Validators.email ]),
      'password': new FormControl('', Validators.required)
    })
  }

  loginForm () {
    if (this.login.invalid) {
      swal('Importante', 'Favor ingresar tus datos correctamente', 'warning');
      return;
    }

    this._userservice.ingresar(this.login.value)
      .subscribe((res: any) => {
        this.router.navigate(['/'])
      }, err=>{
        swal('Importante', err.error.message, 'warning');
      })
  }

}
