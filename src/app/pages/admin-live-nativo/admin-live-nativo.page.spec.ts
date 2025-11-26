import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLiveNativoPage } from './admin-live-nativo.page';

describe('AdminLiveNativoPage', () => {
  let component: AdminLiveNativoPage;
  let fixture: ComponentFixture<AdminLiveNativoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLiveNativoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
