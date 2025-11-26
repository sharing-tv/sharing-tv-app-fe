import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChiSiamoPage } from './chi-siamo.page';

describe('ChiSiamoPage', () => {
  let component: ChiSiamoPage;
  let fixture: ComponentFixture<ChiSiamoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiSiamoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
