import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionInfoComponent } from './action-info.component';

describe('ActionInfoComponent', () => {
  let component: ActionInfoComponent;
  let fixture: ComponentFixture<ActionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
