import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  login(form: NgForm): void {
    if (form.valid) {
      this.authService.login(this.user.email, this.user.password)
        .pipe(
          tap(response => {
            if (response) {
              alert('Login successfully!');
              this.router.navigate(['/inventory/home']);
            } else {
              this.errorMessage = 'Invalid email or password.';
            }
          })
        )
        .subscribe({
          next: () => {},
          error: (error) => {
            this.errorMessage = 'Invalid email or password.';
            console.error('Login error:', error);
          }
        });
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}
