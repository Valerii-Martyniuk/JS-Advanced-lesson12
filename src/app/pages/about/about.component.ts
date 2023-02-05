import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  public askBtn: boolean = false;

  maxHeight(event: any) {
    event.target.parentElement.parentElement.classList.toggle('maxHeight');
    event.target.classList.toggle('rotate');
  }
}
