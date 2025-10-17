import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel-logo',
  templateUrl: './channel-logo.component.html',
  styleUrls: ['./channel-logo.component.scss']
})
export class ChannelLogoComponent {
  @Input() name!: string;   // es: "news"
  @Input() label!: string;  // es: "News"

  constructor(private router: Router) {}

  goToChannel(): void {
    // 🔹 Se la rotta è del tipo '/canali/news' puoi modificare qui:
    this.router.navigate([`/${this.name}`]);
  }
}

