import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerProjectComponent } from './owner-project.component';

describe('OwnerProjectComponent', () => {
  let component: OwnerProjectComponent;
  let fixture: ComponentFixture<OwnerProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
