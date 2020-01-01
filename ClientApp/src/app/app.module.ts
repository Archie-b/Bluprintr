import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ComponentListComponent } from './component-list/component-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueprintListComponent as BlueprintList } from './blueprint-list/blueprint-list.component';
import { AddBlueprint } from './add-blueprint/add-blueprint.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ViewBlueprint } from './view-blueprint/view-blueprint.component';
import { ViewComponentComponent } from './view-component/view-component.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './shared/HttpInterceptorService';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './Authentication.service';

const routes: Routes = [
  { path: 'blueprints', component: BlueprintList, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'add-blueprint', component: AddBlueprint, canActivate: [AuthGuard] },
  { path: 'blueprint/:id', component: ViewBlueprint, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    BlueprintList,
    ComponentListComponent,
    AddBlueprint,
    NavMenuComponent,
    ViewBlueprint,
    ViewComponentComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CommonModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  providers: [AuthGuard,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
