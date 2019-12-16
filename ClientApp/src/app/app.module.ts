import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ComponentListComponent } from './component-list/component-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueprintList } from './blueprint-list/blueprint-list.component';
import { AddBlueprint } from './add-blueprint/add-blueprint.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const routes: Routes = [
  { path: 'blueprints', component: BlueprintList },
  { path: 'add-blueprint', component: AddBlueprint }
];

@NgModule({
  declarations: [
    AppComponent,
    BlueprintList,
    ComponentListComponent,
    AddBlueprint,
    NavMenuComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
