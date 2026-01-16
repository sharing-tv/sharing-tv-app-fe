import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PalinsestoFfmpegComponent } from './palinsesto-ffmpeg.component';

describe('PalinsestoFfmpegComponent', () => {
  let component: PalinsestoFfmpegComponent;
  let fixture: ComponentFixture<PalinsestoFfmpegComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PalinsestoFfmpegComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PalinsestoFfmpegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
