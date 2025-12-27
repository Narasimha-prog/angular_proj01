import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCom } from './login-com';

describe('LoginCom', () => {
  let component: LoginCom;
  let fixture: ComponentFixture<LoginCom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
