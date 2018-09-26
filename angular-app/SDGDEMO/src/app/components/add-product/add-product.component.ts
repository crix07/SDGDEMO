import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styles: []
})
export class AddProductComponent implements OnInit {
  public product: FormGroup;
  public searchForm: FormGroup;
  public name_address: string;

  public latitude: number = 18.4860575;
  public longitude: number = -69.9312117;
  locationChosen = false;

  public locationActived: boolean = true;

  public data: any;

  constructor(public router: Router, public fb: FormBuilder, public activateRoute: ActivatedRoute, 
              public _userservice: UsersService, public _http: HttpClient) {

              }

  
  ngOnInit() {
    this.product = new FormGroup({
      'nombre': new FormControl('', Validators.required ),
      'marca': new FormControl('', Validators.required),
      'color': new FormControl('', Validators.required ),
      'precio': new FormControl('', Validators.required),
      'region': new FormControl({value: '', disabled: true}, Validators.required),
      'provincia': new FormControl({value: '', disabled: true}, Validators.required),
      'municipio': new FormControl({value: '', disabled: true}, Validators.required ),
      'ciudad': new FormControl({value: '', disabled: true}, Validators.required),
      'sector': new FormControl({value: '', disabled: true}, Validators.required ),
      'calle': new FormControl({value: '', disabled: true}, Validators.required),
      'georeferencia': new FormControl({value: '', disabled: true}, Validators.required),
    });
  }

  siguiente() {
    if (this.name_address) {
      this.locationActived = false;
    } else {
      swal('Importante', 'Tienes que selecionar una ubicación', 'warning');
    }
  }

  onChoseLocation(event) {

    this.product.controls['region'].reset();
    this.product.controls['provincia'].reset();
    this.product.controls['municipio'].reset();
    this.product.controls['ciudad'].reset();
    this.product.controls['sector'].reset();
    this.product.controls['calle'].reset();

    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationActived = true;
    let uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=
    ${event.coords.lat},${event.coords.lng}&key=AIzaSyDCw0sfl5bgpped8RgqUfbCfaeqP875YpA`;
    this._http.get(uri).subscribe((response: any) => {
      response.results.length > 0 ? this.name_address = response.results[0].formatted_address : null;
      let region = [];
      let municipio = [];
      let ciudad = [];
      let sector = [];
      response.results.length > 0 ? region = response.results[0].address_components.filter(res => res.types[0] === 'locality') : null;
      response.results.length > 0 ? municipio = response.results[0].address_components.filter((res: any) => {
        return res.types[0] === 'administrative_area_level_1';
      }) : null;
      response.results.length > 0 ? ciudad = response.results[0].address_components.filter(res => res.types[1] === 'sublocality') : null;
      response.results.length > 0 ? sector = response.results[0].address_components.filter(res => res.types[0] === 'route') : null;

      region.length > 0 ? this.product.controls['region'].setValue(region[0].long_name) : null;
      municipio.length > 0 ? this.product.controls['provincia'].setValue(municipio[0].long_name) : null;
      municipio.length > 0 ? this.product.controls['municipio'].setValue(municipio[0].long_name) : null;
      ciudad.length > 0 ? this.product.controls['ciudad'].setValue(ciudad[0].long_name) : null;
      sector.length > 0 ? this.product.controls['sector'].setValue(sector[0].long_name) : null;
      response.results.length > 0 ? this.product.controls['calle'].setValue(response.results[0].formatted_address) : null;
       this.product.controls['georeferencia']
              .setValue(`${String(event.coords.lat).substring(0, 7)}, ${String(event.coords.lng).substring(0, 8)}`)
    });    
  }

  agregarProduct() {
    if (!this.name_address) {
      swal('Advertencia', 'Por favor selecciona una ubicación', 'error');
    }
    if ( this.name_address ) {
      let productObject: Object = {
        nombre: this.product.controls['nombre'].value,
        marca: this.product.controls['marca'].value,
        color: this.product.controls['color'].value,
        precio: this.product.controls['precio'].value,
        region: this.product.controls['region'].value,
        provincia: this.product.controls['provincia'].value,
        municipio: this.product.controls['municipio'].value,
        ciudad: this.product.controls['ciudad'].value,
        sector: this.product.controls['sector'].value,
        calle: this.product.controls['calle'].value,
        georeferencia: this.product.controls['georeferencia'].value,
        latitude: this.latitude,
        longitude: this.longitude
      }
      if (this.product.valid) {
        this._userservice.addProduct(productObject).subscribe((data) => {
          this.router.navigate(['/']);
          swal('Bien', 'Has agregado un producto correctamente', 'success');
        }, err => console.log(err));
      } else {
        swal('Importante', 'Tienes que Llenar el formulario', 'warning');
      }
    }
  }

}
