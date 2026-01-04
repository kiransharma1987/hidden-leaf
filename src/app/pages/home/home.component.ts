import { Component } from '@angular/core';
import {
  RevealDirective,
  MagneticDirective
} from '../../shared/directives';
import { EnquiryFormComponent, WhatsappButtonComponent, GalleryComponent } from '../../shared/components';
import { HasiruComponent } from '../../sections/hasiru/hasiru.component';
import { UsiruComponent } from "../../sections/usiru/usiru.component";
import { KudliComponent } from "../../sections/kudli/kudli.component";
import { TungaBhadraComponent } from "../../sections/tunga-bhadra/tunga-bhadra.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RevealDirective,
    MagneticDirective,
    HasiruComponent,
    UsiruComponent,
    KudliComponent,
    TungaBhadraComponent,
    EnquiryFormComponent,
    WhatsappButtonComponent,
    GalleryComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
