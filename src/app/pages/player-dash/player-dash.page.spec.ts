import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerDashPage } from './player-dash.page';

describe('PlayerDashPage', () => {
  let component: PlayerDashPage;
  let fixture: ComponentFixture<PlayerDashPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
