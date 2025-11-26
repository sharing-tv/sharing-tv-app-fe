import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistratiPage } from './registrati.page';

describe('RegistratiPage', () => {
  let component: RegistratiPage;
  let fixture: ComponentFixture<RegistratiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistratiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
