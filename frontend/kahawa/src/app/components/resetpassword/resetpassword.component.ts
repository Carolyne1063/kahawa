import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  resetPasswordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = ''; 

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]  
    }, { validators: this.passwordMatchValidator });  
  }

  passwordMatchValidator(form: FormGroup) {
    const { newPassword, confirmPassword } = form.controls;
    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ notSame: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const { email, newPassword } = this.resetPasswordForm.value;
      this.userService.updateUser({ password: newPassword }, undefined, email).subscribe(
        response => {
          this.successMessage = 'Password reset successful. You can now log in.';
          this.router.navigate(['/login']);
        },
        error => {
          this.errorMessage = 'There was an error resetting your password. Please try again later.';
        }
      );
    }
  }
}