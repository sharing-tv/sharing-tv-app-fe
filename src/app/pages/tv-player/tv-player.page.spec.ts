import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvPlayerPage } from './tv-player.page';

describe('TvPlayerPage', () => {
  let component: TvPlayerPage;
  let fixture: ComponentFixture<TvPlayerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TvPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
