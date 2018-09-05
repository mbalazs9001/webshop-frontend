import { Component, OnInit } from '@angular/core';
import {ProductCategoryService} from '../../services/product-category.service';
import {SupplierService} from '../../services/supplier.service';
import {ProductCategory} from '../../models/productCategory.model';
import {Supplier} from '../../models/supplier.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categories: ProductCategory[] = [];
  suppliers: Supplier[] = [];

  constructor(public productCategoryService: ProductCategoryService, public supplierService: SupplierService) { }

  ngOnInit() {
    this.productCategoryService.getCategories().subscribe(
      categories => this.categories = categories
    );
    this.supplierService.getSuppliers().subscribe(
      suppliers => this.suppliers = suppliers
    );
  }

}
