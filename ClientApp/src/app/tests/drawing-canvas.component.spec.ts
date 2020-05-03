/// <reference path="../../..//node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { DrawingCanvas } from '../shared/DrawingCanvas';

describe('Drawing Canvas', function () {
  let canvas: DrawingCanvas;
  it('Has a functioning constructor', function() {
    canvas = CanvasFactory();
    expect(canvas.getID()).toBe('TestIdentifier');
    expect(canvas.getCanvas().width).toEqual(100);
    expect(canvas.getCanvas().height).toEqual(100);
  })

  it('Can have it\'s colour changed', function() {
    canvas = CanvasFactory();
    expect(canvas.getContext().strokeStyle).toEqual('#000000');
    expect(canvas.component.Colour).toBeUndefined();
    canvas.setColour('#ffffff');
    expect(canvas.getContext().strokeStyle).toEqual('#ffffff');
    expect(canvas.component.Colour).toEqual('#ffffff');
  })
})


function CanvasFactory() : DrawingCanvas {
  return new DrawingCanvas('TestIdentifier', 100, 100);
}
