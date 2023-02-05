import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { CategoryResponse } from 'src/app/shared/interfaces/category.interface';
import {
  ProductRequest,
  ProductResponse,
} from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public adminCategorys: Array<CategoryResponse> = [];
  public adminProducts: Array<ProductResponse> = [];
  public textAction: boolean = true;
  public isUploaded: boolean = false;
  public uploadPercentage!: any;
  public editStatus: boolean = false;

  public currentProductId!: number;

  public productsForm!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private imageService: ImageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadActions();
    this.initActionForm();
    this.loadProducts();
  }

  initActionForm(): void {
    this.productsForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      weight: [null, Validators.required],
      consist: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1],
    });
  }

  loadActions(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategorys = data;
    });
  }
  loadProducts(): void {
    this.productsService.getAll().subscribe((data) => {
      this.adminProducts = data;
    });
  }

  // ///////////ADD PRODUCT

  addAction(): void {
    if (this.editStatus) {
      this.productsService
        .update(this.productsForm.value, this.currentProductId)
        .subscribe(() => {
          this.loadProducts();
          this.isUploaded = false;
          this.editStatus = false;
        });
    } else {
      this.productsService.create(this.productsForm.value).subscribe(() => {
        this.loadProducts();
      });
    }
    this.productsForm.reset({ count: 1 });
  }
  // ////////////// DELETE PRODUCT

  deleteAction(action: ProductResponse): void {
    if (action.imagePath) {
      this.imageService.deleteUploadFile(action.imagePath).then(() => {
        console.log('File deleted');
      });
    }
    this.productsService.delete(action.id).subscribe(() => {
      this.loadProducts();
    });
  }

  // /////// EDIT PRODUCT

  editAction(product: ProductResponse): void {
    this.productsForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      weight: product.weight,
      consist: product.consist,
      price: product.price,
      imagePath: product.imagePath,
    });
    this.currentProductId = product.id;
    this.textAction = false;
    this.isUploaded = true;
    this.editStatus = true;
  }

  // /////// UPLOAD IMG

  upload(event: any) {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('productsImg', file.name, file)
      .then((data) => {
        this.productsForm.patchValue({
          imagePath: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.productsForm.get(control)?.value;
  }

  // ////// DELETE IMG
  deleteImg(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        console.log('File deleted');
        this.isUploaded = false;
        this.uploadPercentage = 0;
        this.productsForm.patchValue({
          imagePath: null,
        });
      });
  }
}
