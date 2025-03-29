import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = 'http://localhost:8080/user';  

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginState());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  private checkLoginState(): boolean {
    return !!localStorage.getItem('userEmail');
  }
  constructor(private http: HttpClient, private router: Router) { }

  register(userDetails: User): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/register`, userDetails);
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.post<boolean>(`${this.userUrl}/login`, { email, password }).subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            localStorage.setItem('userEmail', email); 
            this.isLoggedInSubject.next(true);
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        },
        error: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  logout(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.http.post<string>(`${this.userUrl}/logout`, { email: userEmail }).subscribe(() => {
        localStorage.removeItem('userEmail'); 
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/inventory']);
      });
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
