import { Component, inject, DOCUMENT } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  private document = inject(DOCUMENT);

  voltaTopo(): void {
    const htmlElement = this.document.documentElement;

    const bodyElement = this.document.body;
    if (htmlElement) {
      htmlElement.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (bodyElement) {
      bodyElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
