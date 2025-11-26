import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharingIaPage } from './sharing-ia.page';

describe('SharingIaPage', () => {
  let component: SharingIaPage;
  let fixture: ComponentFixture<SharingIaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingIaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
