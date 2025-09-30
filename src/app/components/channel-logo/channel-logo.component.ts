import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-channel-logo',
  templateUrl: './channel-logo.component.html',
  styleUrls: ['./channel-logo.component.scss']
})
export class ChannelLogoComponent {
  @Input() name!: string;   // es: "news"
  @Input() label!: string;  // es: "News"
}

