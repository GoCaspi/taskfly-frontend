import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateListDialogComponent } from './update-list-dialog.component';

describe('UpdateListDialogComponent', () => {
  let component: UpdateListDialogComponent;
  let fixture: ComponentFixture<UpdateListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
