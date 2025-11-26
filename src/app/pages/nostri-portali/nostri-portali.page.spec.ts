import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NostriPortaliPage } from './nostri-portali.page';

describe('NostriPortaliPage', () => {
  let component: NostriPortaliPage;
  let fixture: ComponentFixture<NostriPortaliPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NostriPortaliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
