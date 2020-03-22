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
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ViewBlueprint } from './view-blueprint/view-blueprint.component';
import { ViewComponentComponent } from './view-component/view-component.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './shared/HttpInterceptorService';
import { AuthGuard } from './auth.guard';
import { UserService } from './services/user.service';
import { RecentBlueprintsComponent } from './recent-blueprints/recent-blueprints.component';
import { AddBlueprintComponent } from './add-blueprint/add-blueprint.component';
import { BlueprintService } from './services/blueprint.service';
import { AddProjectComponent } from './add-project/add-project.component';
import { BlueprintSelectorComponent } from './blueprint-selector/blueprint-selector.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';
import { ProjectService } from './services/project.service';
import { ImageService } from './services/image.service';

const routes: Routes = [
  { path: '', component: RecentBlueprintsComponent, canActivate: [AuthGuard] },
  { path: 'blueprints', component: BlueprintList, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'add-blueprint', component: AddBlueprintComponent, canActivate: [AuthGuard] },
  { path: 'add-project/:id', component: AddProjectComponent, canActivate: [AuthGuard] },
  { path: 'add-project', component: BlueprintSelectorComponent, canActivate: [AuthGuard] },
  { path: 'blueprint/:id', component: ViewBlueprint, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'user-projects', component: UserProjectsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: UserInfoComponent, canActivate : [AuthGuard] },  
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    BlueprintList,
    ComponentListComponent,
    AddProjectComponent,
    NavMenuComponent,
    ViewBlueprint,
    ViewComponentComponent,
    LoginComponent,
    AddBlueprintComponent,
    RecentBlueprintsComponent,
    BlueprintSelectorComponent,
    UserInfoComponent,
    UserProjectsComponent
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
  providers: [AuthGuard,
    UserService,
    BlueprintService,
    ProjectService,
    ImageService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
