
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ViewComponentComponent } from './view-component.component';

let component: ViewComponentComponent;
let fixture: ComponentFixture<ViewComponentComponent>;

describe('view-component component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ViewComponentComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ViewComponentComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
