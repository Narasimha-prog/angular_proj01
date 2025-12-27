import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCom } from './home-com';

describe('HomeCom', () => {
  let component: HomeCom;
  let fixture: ComponentFixture<HomeCom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
