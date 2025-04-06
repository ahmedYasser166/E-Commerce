import { Component, inject } from '@angular/core';
import { BtandsService } from './services/btands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  brandsService = inject(BtandsService)
brands!:any[];

ngOnInit(): void {
this.getBrands()
}

getBrands(){
  this.brandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res);
      
      this.brands=res.data
    }
  })
}

}
