/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { RecentBlueprintsComponent } from './recent-blueprints.component';

let component: RecentBlueprintsComponent;
let fixture: ComponentFixture<RecentBlueprintsComponent>;

describe('recent-blueprints component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RecentBlueprintsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(RecentBlueprintsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});