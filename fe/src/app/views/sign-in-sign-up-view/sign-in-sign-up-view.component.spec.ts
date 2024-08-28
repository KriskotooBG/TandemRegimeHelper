import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInSignUpViewComponent } from './sign-in-sign-up-view.component';

describe('SignInSignUpViewComponent', () => {
  let component: SignInSignUpViewComponent;
  let fixture: ComponentFixture<SignInSignUpViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInSignUpViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInSignUpViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
