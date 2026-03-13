import { Component, OnInit, NgModule } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductInterface } from '../../interfaces/ProductInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-product',
  imports: [CommonModule, NgbModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {

  products: ProductInterface[] = [];
  selectedProduct : ProductInterface | null = null;
  viewProductModal: boolean = false;
  addModal: boolean = false;
  newProduct: Partial<ProductInterface> = {
      id: 0,
      title: '',
      description: '',
      price: 0
    };

  loading: Boolean = true;

  constructor (private productService: ProductService, private cd: ChangeDetectorRef) {
    // no statements required
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next : (data) => {
        this.products = data;
        this.loading = false;
        this.cd.detectChanges();
        console.log(data);
      },
      error : (err) => {
        console.log('Error loading products', err);
        this.loading = false;
      }
    });
  }

  viewProduct(id:number) {
    const product = this.products.find(p => p.id === id);

    if (product) {
      this.selectedProduct = product;
      this.viewProductModal = true;
      return;
    }

    this.productService.viewProduct(id).subscribe({
      next : (data) => {
        this.selectedProduct = data;
        this.loading = false;
        this.cd.detectChanges();
        console.log(data);
      },
      error : (err) => {
        console.log('Error loading products', err);
        this.loading = false;
      }
    })
  }
  closeModal() {
    this.viewProductModal = false;
  }

  deleteProduct(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        this.cd.detectChanges();
      }
    });
  }

    // Open modal
  openAddModal() {
    this.addModal = true;
  }

  // Close modal
  closeAddModal() {
    this.addModal = false;
  }

  addNewProduct() {
    if (this.newProduct.title != ''&& this.newProduct.description != ''&& this.newProduct.price != 0) {
      const maxId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) : 0;
      this.newProduct.id = maxId + 1;
      this.productService.addProduct(this.newProduct as ProductInterface).subscribe({
      next: (product) => {
        this.addModal = true;
        alert(`Product "${product.title}" added successfully!`);
        this.products.push(product); 
        this.cd.detectChanges();
        this.newProduct = { title: '', description: '', price: 0 }; 
        this.closeAddModal();
      },
      error: (err) => console.error('Error adding product', err)
    });
    }
  }
}
