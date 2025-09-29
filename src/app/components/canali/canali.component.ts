import { Component, Input } from '@angular/core';

export interface Channel {
  name: string;
  route: string;
  logo: string;
  cssClass?: string;
}

@Component({
  selector: 'app-canali',
  templateUrl: './canali.component.html',
  styleUrls: ['./canali.component.scss']
})
export class CanaliComponent {
  @Input() channels: Channel[] = [];
}

