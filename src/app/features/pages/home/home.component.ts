import { Component } from '@angular/core';
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { RecentProductsComponent } from "./components/recent-products/recent-products.component";


@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, PopularCategoriesComponent, RecentProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
