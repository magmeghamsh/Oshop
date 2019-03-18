import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/core/services/app-firebase/category/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  // tslint:disable-next-line:no-input-rename
  @Input('category') category: any;

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getAllCategories();
  }

  ngOnInit() {
  }

}
