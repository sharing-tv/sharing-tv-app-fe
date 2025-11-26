import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComitatoScientificoPage } from './comitato-scientifico.page';

describe('ComitatoScientificoPage', () => {
  let component: ComitatoScientificoPage;
  let fixture: ComponentFixture<ComitatoScientificoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComitatoScientificoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
