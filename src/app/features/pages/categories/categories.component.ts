import { Component, inject } from '@angular/core';
import { Icategorie } from '../../../shared/interfaces/icategorie';
import { CategorieService } from '../../../shared/services/Categorie/categorie.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
 private readonly _categoriesService = inject(CategorieService);

  categories!: Icategorie[];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;
      },
      error: (err) => {
        console.log('err');
      },
      complete: () => {
        console.log('complete categories');
      },
    });
  }
}
