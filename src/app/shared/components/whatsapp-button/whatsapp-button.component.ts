import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent {
  isVisible = false;
  isExpanded = false;

  private phoneNumber = '917483069231';
  private defaultMessage = 'Hi, I would like to know more about hosting an event at Hidden Leaf.';

  @HostListener('window:scroll')
  onScroll() {
    // Show button after scrolling 300px
    this.isVisible = window.scrollY > 300;
  }

  openWhatsApp() {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.defaultMessage)}`;
    window.open(url, '_blank');
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
