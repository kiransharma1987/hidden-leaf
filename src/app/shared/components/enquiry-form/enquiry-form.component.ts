import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevealDirective, MagneticDirective } from '../../directives';

@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealDirective, MagneticDirective],
  templateUrl: './enquiry-form.component.html',
  styleUrls: ['./enquiry-form.component.scss']
})
export class EnquiryFormComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: ''
  };

  eventTypes = [
    'Wedding',
    'Pre-Wedding (Mehendi/Sangeet)',
    'Engagement',
    'Reception',
    'Corporate Event',
    'Conference/Seminar',
    'Team Building',
    'Birthday Party',
    'Anniversary',
    'Private Gathering',
    'Other'
  ];

  isSubmitting = false;
  isSubmitted = false;

  onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Build WhatsApp message
    const message = this.buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/917483069231?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    this.isSubmitting = false;
    this.isSubmitted = true;
    
    // Reset form after delay
    setTimeout(() => {
      this.resetForm();
    }, 3000);
  }

  private buildWhatsAppMessage(): string {
    let message = `Hi, I'm interested in hosting an event at Hidden Leaf.\n\n`;
    message += `*Name:* ${this.formData.name}\n`;
    if (this.formData.email) message += `*Email:* ${this.formData.email}\n`;
    message += `*Phone:* ${this.formData.phone}\n`;
    message += `*Event Type:* ${this.formData.eventType}\n`;
    if (this.formData.eventDate) message += `*Preferred Date:* ${this.formData.eventDate}\n`;
    if (this.formData.guestCount) message += `*Expected Guests:* ${this.formData.guestCount}\n`;
    if (this.formData.message) message += `\n*Additional Details:*\n${this.formData.message}`;
    
    return message;
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      guestCount: '',
      message: ''
    };
    this.isSubmitted = false;
  }
}
