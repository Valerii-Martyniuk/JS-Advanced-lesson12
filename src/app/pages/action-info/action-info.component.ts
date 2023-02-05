import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionResponse } from 'src/app/shared/interfaces/action.interface';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss'],
})
export class ActionInfoComponent implements OnInit {
  public action!: ActionResponse;
  public description!: Array<string>;

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.action = response['actionInfo'];
    });
    this.description = this.action.description.split('<br>');
  }
}
