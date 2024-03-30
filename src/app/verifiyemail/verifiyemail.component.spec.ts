import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiyemailComponent } from './verifiyemail.component';

describe('VerifiyemailComponent', () => {
  let component: VerifiyemailComponent;
  let fixture: ComponentFixture<VerifiyemailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifiyemailComponent]
    });
    fixture = TestBed.createComponent(VerifiyemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
