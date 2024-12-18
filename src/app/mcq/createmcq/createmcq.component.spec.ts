import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemcqComponent } from './createmcq.component';

describe('CreatemcqComponent', () => {
  let component: CreatemcqComponent;
  let fixture: ComponentFixture<CreatemcqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatemcqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatemcqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
