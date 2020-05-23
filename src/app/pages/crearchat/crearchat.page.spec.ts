import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearchatPage } from './crearchat.page';

describe('CrearchatPage', () => {
  let component: CrearchatPage;
  let fixture: ComponentFixture<CrearchatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearchatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
