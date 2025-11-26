import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharingLegalitaPage } from './sharing-legalita.page';

describe('SharingLegalitaPage', () => {
  let component: SharingLegalitaPage;
  let fixture: ComponentFixture<SharingLegalitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingLegalitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
