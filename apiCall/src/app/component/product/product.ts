import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductInterface } from '../../interfaces/ProductInterface';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-product',
  imports: [CommonModule, NgbModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {

  products: ProductInterface[] = [];
  loading: Boolean = true;

  constructor (private productService: ProductService, private cd: ChangeDetectorRef) {
    // no statements required
  }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next : (data) => {
        this.products = data;
        this.loading = true;
        this.cd.detectChanges();
        console.log(data);
      },
      error : (err) => {
        console.log('Error loading products', err);
        this.loading = false;
      }
    });
  }

}
