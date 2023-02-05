import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import {
  CategoryRequest,
  CategoryResponse,
} from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public adminCategory: Array<CategoryResponse> = [];
  public textAction: boolean = true;
  public isUploaded: boolean = false;
  public uploadPercentage!: any;
  public editStatus: boolean = false;

  public currentActionId!: number;

  public categoryForm!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private imageService: ImageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadActions();
    this.initActionForm();
  }

  initActionForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  loadActions(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategory = data;
    });
  }

  /////////////ADD ACTION

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService
        .update(this.categoryForm.value, this.currentActionId)
        .subscribe(() => {
          this.loadActions;
        });
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.loadActions();
      });
    }
    this.textAction = true;
    this.categoryForm.reset();
  }
  //////////////// DELETE ACTION

  deleteCategory(action: CategoryResponse): void {
    if (action.imagePath) {
      this.imageService.deleteUploadFile(action.imagePath).then(() => {
        console.log('File deleted');
      });
    }
    this.categoryService.delete(action.id).subscribe(() => {
      this.loadActions();
    });
  }

  ///////// EDIT ACTION

  editCategory(category: CategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
    });
    this.currentActionId = category.id;
    this.textAction = false;
    this.isUploaded = true;
    this.editStatus = true;
  }

  ///////// UPLOAD IMG

  upload(event: any) {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('categoryImg', file.name, file)
      .then((data) => {
        this.categoryForm.patchValue({
          imagePath: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

  //////// DELETE IMG
  deleteImg(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        console.log('File deleted');
        this.isUploaded = false;
        this.uploadPercentage = 0;
        this.categoryForm.patchValue({
          imagePath: null,
        });
      });
  }
}
