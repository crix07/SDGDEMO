import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NopagefoundComponent } from './components/shared/nopagefound/nopagefound.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { APP_ROUTES } from './app.routers';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { UsersService } from './services/users.service';
import { LoginGuard } from './services/guards/login.guard';
import { UnloginGuard } from './services/guards/unlogin.guard';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { DistanciaComponent } from './components/distancia/distancia.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent,
    HomeComponent,
    AddProductComponent,
    EditProductComponent,
    ViewProductComponent,
    DistanciaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    APP_ROUTES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCw0sfl5bgpped8RgqUfbCfaeqP875YpA',
      libraries: ['geometry']
    }),
  ],
  providers: [
    UsersService,
    LoginGuard,
    UnloginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
