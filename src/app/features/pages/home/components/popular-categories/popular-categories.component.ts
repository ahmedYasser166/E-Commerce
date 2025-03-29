import { Component, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategorieService } from '../../../../../shared/services/Categorie/categorie.service';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent {
  private readonly categorieService = inject(CategorieService);

  // categories!:Category[]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 500,
    navText: [
      '<i class="fa-solid fa-left-long"></i>',
      '<i class="fa-solid fa-right-long"></i>',
    ],
    responsive: {
      0: { items: 1 },
      400: { items: 3 },
      740: { items: 5 },
      1024: { items: 7 },
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    slideTransition: 'ease-in-out',
  };
}
