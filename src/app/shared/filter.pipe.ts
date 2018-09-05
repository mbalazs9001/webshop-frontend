import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], productCategoryId: number, supplierId: number): Product[] {
    if (productCategoryId && supplierId) {
      return products.filter(p => p.productCategoryId === productCategoryId && p.supplierId === supplierId);
    } else if (productCategoryId) {
      return products.filter(p => p.productCategoryId === productCategoryId);
    } else if (supplierId) {
      return products.filter(p => p.supplierId === supplierId);
    }
    return products;
  }

}
