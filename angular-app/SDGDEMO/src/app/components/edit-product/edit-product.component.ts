import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styles: []
})
export class EditProductComponent implements OnInit {

  public product: FormGroup;
  public name_address: string;
  public latitude: number = 18.4860575;
  public longitude: number = -69.9312117;
  locationActived = false;
  private key;

  constructor(public router: Router, public fb: FormBuilder, public activateRoute: ActivatedRoute, 
    public _userservice: UsersService, public _http: HttpClient) { }

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
 
    this.setValues()

  }

  
  // setValuesAgencia () {
  //   this.selectAgencia.length > 0 ? this.agencia.controls['distanciaRef']
  //   .setValue(`A ${this.selectAgencia[0].distancia} METROS DE LA AGENCIA ${this.agencia.controls['idterminal'].value ?
  //   this.agencia.controls['idterminal'].value : null} ${this.agencia.controls['empresa'].value
  //   ? this.agencia.controls['empresa'].value : null}, POR LA ${this.selectAgencia[0].agencia.calle}`) : null;

  //   this.selectAgencia.length > 0 ? this.agencia.controls['georeferencia']
  //   .setValue(`${String(this.selectAgencia[0].agencia.latitude).substring(0, 7)}, ${String(this.selectAgencia[0]
  //     .agencia.longitude).substring(0, 8)}`) : null;
  // }

  setValues() {
    this.activateRoute.params.subscribe(params => {
      this._userservice.getProducto(params['id']).subscribe((data: any) => {
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.key = params['id'];
        data.region ? this.product.controls['region'].setValue(data.region) : null;
        data.municipio ? this.product.controls['provincia'].setValue(data.municipio) : null;
        data.municipio ? this.product.controls['municipio'].setValue(data.municipio) : null;
        data.ciudad ? this.product.controls['ciudad'].setValue(data.ciudad) : null;
        data.sector ? this.product.controls['sector'].setValue(data.sector) : null;
        data.nombre ? this.product.controls['nombre'].setValue(data.nombre) : null;
        data.marca ? this.product.controls['marca'].setValue(data.marca) : null;
        data.color ? this.product.controls['color'].setValue(data.color) : null;
        data.precio ? this.product.controls['precio'].setValue(data.precio) : null;
        data.calle ? this.product.controls['calle'].setValue(data.calle) : null;
        data.calle ? this.name_address = data.calle : null;

        data.georeferencia ? this.product.controls['georeferencia'].setValue(data.georeferencia) : null;
        this.locationActived = true;
      });
    });
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

  siguiente() {
    if (this.latitude && this.longitude) {
      this.locationActived = true;
    } else {
      swal('Importante', 'Tienes que selecionar una ubicación', 'warning');
    }
  }



  actualizarProduct() {
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
        this._userservice.editProduct(productObject, this.key).subscribe((data) => {
          this.router.navigate(['/']);
          swal('Bien', 'Has actualizado un producto correctamente', 'success');
        }, err => console.log(err));
      } else {
        swal('Importante', 'Tienes que Llenar el formulario', 'warning');
      }
  }

}
