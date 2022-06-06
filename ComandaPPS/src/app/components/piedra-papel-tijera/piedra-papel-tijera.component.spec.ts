import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PiedraPapelTijeraComponent } from './piedra-papel-tijera.component';

describe('PiedraPapelTijeraComponent', () => {
  let component: PiedraPapelTijeraComponent;
  let fixture: ComponentFixture<PiedraPapelTijeraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PiedraPapelTijeraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PiedraPapelTijeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
