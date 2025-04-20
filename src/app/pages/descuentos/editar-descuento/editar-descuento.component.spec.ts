import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDescuentoComponent } from './editar-descuento.component';

describe('EditarDescuentoComponent', () => {
  let component: EditarDescuentoComponent;
  let fixture: ComponentFixture<EditarDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDescuentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
