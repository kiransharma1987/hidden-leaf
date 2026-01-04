import { Component, HostListener, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RevealDirective } from '../../directives';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface GalleryCategory {
  id: string;
  name: string;
  folder: string;
  images: { filename: string; alt: string }[];
}

interface GalleryConfig {
  categories: GalleryCategory[];
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() previewCount: number = 8; // Show only 8 images by default on homepage
  
  categories: string[] = ['All'];
  activeCategory = 'All';
  
  lightboxOpen = false;
  lightboxIndex = 0;
  isLoading = true;
  showFullGallery = false;
  private savedScrollPosition = 0;

  images: GalleryImage[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadGalleryConfig();
  }

  private loadGalleryConfig(): void {
    this.http.get<GalleryConfig>('assets/data/gallery.json').subscribe({
      next: (config) => {
        // Build categories array
        this.categories = ['All', ...config.categories.map(cat => cat.name)];
        
        // Build images array from all category folders
        this.images = [];
        config.categories.forEach(category => {
          category.images.forEach(img => {
            this.images.push({
              src: `${category.folder}/${img.filename}`,
              alt: img.alt,
              category: category.name
            });
          });
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load gallery config:', err);
        this.isLoading = false;
      }
    });
  }

  get filteredImages(): GalleryImage[] {
    if (this.activeCategory === 'All') {
      return this.images;
    }
    return this.images.filter(img => img.category === this.activeCategory);
  }

  get previewImages(): GalleryImage[] {
    return this.filteredImages.slice(0, this.previewCount);
  }

  get hasMoreImages(): boolean {
    return this.filteredImages.length > this.previewCount;
  }

  get remainingCount(): number {
    return this.filteredImages.length - this.previewCount;
  }

  setCategory(category: string): void {
    this.activeCategory = category;
  }

  openFullGallery(): void {
    this.savedScrollPosition = window.scrollY;
    this.showFullGallery = true;
    document.body.style.overflow = 'hidden';
  }

  closeFullGallery(): void {
    this.showFullGallery = false;
    document.body.style.overflow = '';
    window.scrollTo(0, this.savedScrollPosition);
  }

  openLightbox(index: number): void {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    if (!this.showFullGallery) {
      document.body.style.overflow = '';
    }
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    this.lightboxIndex = (this.lightboxIndex + 1) % this.filteredImages.length;
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    this.lightboxIndex = (this.lightboxIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.lightboxOpen) {
        this.closeLightbox();
      } else if (this.showFullGallery) {
        this.closeFullGallery();
      }
    } else if (this.lightboxOpen) {
      if (event.key === 'ArrowRight') {
        this.lightboxIndex = (this.lightboxIndex + 1) % this.filteredImages.length;
      } else if (event.key === 'ArrowLeft') {
        this.lightboxIndex = (this.lightboxIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
      }
    }
  }
}
