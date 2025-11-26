import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CosaFacciamoPage } from './cosa-facciamo.page';

describe('CosaFacciamoPage', () => {
  let component: CosaFacciamoPage;
  let fixture: ComponentFixture<CosaFacciamoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CosaFacciamoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
