import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionserviceService } from 'src/app/shared/services/action/actionservice.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import {
  ActionRequest,
  ActionResponse,
} from 'src/app/shared/interfaces/action.interface';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  public adminActions: Array<ActionResponse> = [];
  public textAction: boolean = true;
  public isUploaded: boolean = false;
  public uploadPercentage!: any;
  public editStatus: boolean = false;

  public currentActionId!: number;

  public actionsForm!: FormGroup;

  constructor(
    private actionService: ActionserviceService,
    private imageService: ImageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadActions();
    this.initActionForm();
  }

  initActionForm(): void {
    this.actionsForm = this.fb.group({
      date: new Date(),
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  loadActions(): void {
    this.actionService.getAll().subscribe((data) => {
      this.adminActions = data;
    });
  }

  /////////////ADD ACTION

  addAction(): void {
    if (this.editStatus) {
      this.actionService
        .update(this.actionsForm.value, this.currentActionId)
        .subscribe(() => {
          this.loadActions;
        });
    } else {
      this.actionService.create(this.actionsForm.value).subscribe(() => {
        this.loadActions();
      });
    }
    this.textAction = true;
    this.actionsForm.reset();
    this.actionsForm.patchValue({
      date: new Date(),
    });
  }
  //////////////// DELETE ACTION

  deleteAction(action: ActionResponse): void {
    if (action.imagePath) {
      this.imageService.deleteUploadFile(action.imagePath).then(() => {
        console.log('File deleted');
      });
    }
    this.actionService.delete(action.id).subscribe(() => {
      this.loadActions();
    });
  }

  ///////// EDIT ACTION

  editAction(action: ActionResponse): void {
    this.actionsForm.patchValue({
      date: action.date,
      name: action.name,
      title: action.title,
      description: action.description,
      imagePath: action.imagePath,
    });
    this.currentActionId = action.id;
    this.textAction = false;
    this.isUploaded = true;
    this.editStatus = true;
  }

  ///////// UPLOAD IMG

  upload(event: any) {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('actionsImg', file.name, file)
      .then((data) => {
        this.actionsForm.patchValue({
          imagePath: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.isUploaded = true;
  }

  valueByControl(control: string): string {
    return this.actionsForm.get(control)?.value;
  }

  //////// DELETE IMG
  deleteImg(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        console.log('File deleted');
        this.isUploaded = false;
        this.uploadPercentage = 0;
        this.actionsForm.patchValue({
          imagePath: null,
        });
      });
  }
}
