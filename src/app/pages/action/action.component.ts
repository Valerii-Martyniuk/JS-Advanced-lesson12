import { Component, OnInit } from '@angular/core';
import { ActionResponse } from 'src/app/shared/interfaces/action.interface';
import { ActionserviceService } from 'src/app/shared/services/action/actionservice.service';
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  public allActions!: Array<ActionResponse>;

  constructor(private actionService: ActionserviceService) {}
  ngOnInit(): void {
    this.loadAction();
  }
  loadAction(): void {
    this.actionService.getAll().subscribe((data) => {
      this.allActions = data;
    });
  }
}
