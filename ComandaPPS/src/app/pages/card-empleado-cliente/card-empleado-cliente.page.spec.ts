import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardEmpleadoClientePage } from './card-empleado-cliente.page';

describe('CardEmpleadoClientePage', () => {
  let component: CardEmpleadoClientePage;
  let fixture: ComponentFixture<CardEmpleadoClientePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEmpleadoClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardEmpleadoClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
