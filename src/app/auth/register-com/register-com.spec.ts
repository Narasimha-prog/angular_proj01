import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCom } from './register-com';

describe('RegisterCom', () => {
  let component: RegisterCom;
  let fixture: ComponentFixture<RegisterCom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
