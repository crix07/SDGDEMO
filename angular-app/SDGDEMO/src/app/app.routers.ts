import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NopagefoundComponent } from './components/shared/nopagefound/nopagefound.component';
import { LoginGuard } from './services/guards/login.guard';
import { UnloginGuard } from './services/guards/unlogin.guard';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { DistanciaComponent } from './components/distancia/distancia.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add_product', component: AddProductComponent, canActivate: [ LoginGuard ] },
    { path: 'login', component: LoginComponent, canActivate: [ UnloginGuard ] },
    { path: 'register', component: RegisterComponent, canActivate: [ UnloginGuard ] },
    { path: 'edit/:id', component: EditProductComponent, canActivate: [ LoginGuard ] },
    { path: 'view/:id', component: ViewProductComponent },
    { path: 'distancias', component: DistanciaComponent },
    { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes );
