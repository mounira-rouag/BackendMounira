import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDevComponent } from './gestion-dev.component';

describe('GestionDevComponent', () => {
  let component: GestionDevComponent;
  let fixture: ComponentFixture<GestionDevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDevComponent]
    });
    fixture = TestBed.createComponent(GestionDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
