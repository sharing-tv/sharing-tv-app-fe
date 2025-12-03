import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerHlsPage } from './player-hls.page';

describe('PlayerHlsPage', () => {
  let component: PlayerHlsPage;
  let fixture: ComponentFixture<PlayerHlsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerHlsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
