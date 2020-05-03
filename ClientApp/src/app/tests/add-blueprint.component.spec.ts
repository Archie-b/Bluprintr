/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AddBlueprintComponent } from '../add-blueprint/add-blueprint.component';
import { BlueprintService } from '../services/blueprint.service';
import { ImageService } from '../services/image.service';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { InjectionToken } from '@angular/core';

let component: AddBlueprintComponent;
let fixture: ComponentFixture<AddBlueprintComponent>;
export const BASE_URL = new InjectionToken<string>('BASE_URL');
describe('The Add Blueprint Component can', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBlueprintComponent],
      imports: [BrowserModule,
        FormsModule,
        CommonModule,
        MDBBootstrapModule.forRoot(),
        HttpClientModule],
      providers: [
        BlueprintService,
        ImageService,
        HttpClient,
        HttpHandler,]
    });
    fixture = TestBed.createComponent(AddBlueprintComponent);
    component = fixture.componentInstance;
  }));

  it('Add a new layer', async(() => {
    component.addLayer();
    expect(component.layers.length).toBe(1);
  }));

  it('Make a layer top', async(() => {
    component.addLayer();
    component.addLayer();
    component.makeLayerTop('test1');
    expect(document.getElementById('CanvasContainer').lastElementChild.id).toBe('test1');
  }));

  it('Can change the colour of a layer', function () {
    component.addLayer();
    let preChangeColour = component.layers.filter(layer => layer.getCanvas().id == "test1")[0].component.Colour;
    component.changeComponentColour('test1');
    expect(component.layers.filter(layer => layer.getCanvas().id == "test1")[0].component.Colour).not.toEqual(preChangeColour);
  })

  it('Can delete a layer', function () {
    component.layers = [];
    component.addLayer();
    component.deleteLayer('test1');
    expect(component.layers.length).toBe(0);
  })
});
