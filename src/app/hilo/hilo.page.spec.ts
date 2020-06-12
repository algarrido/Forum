import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HiloPage } from './hilo.page';

describe('HiloPage', () => {
  let component: HiloPage;
  let fixture: ComponentFixture<HiloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HiloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
