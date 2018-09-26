import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  register: FormGroup
  constructor(public router: Router, public _userservice: UsersService) { }

  ngOnInit() {
    this.register = new FormGroup({
      'email': new FormControl('', [ Validators.required, Validators.email ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)]
      )
    })
  }

  registerForm () {
    if (this.register.invalid) {
      swal('Importante', 'Favor ingresar tus datos correctamente', 'warning');
      return;
    }

    this._userservice.crearUsuario(this.register.value)
      .subscribe((res: any) => {
        swal('Bien', res.message, 'success');
        this.router.navigate(['login'])
      }, err=>{
        swal('Importante', err.error.message, 'warning');
      })
  }


}
