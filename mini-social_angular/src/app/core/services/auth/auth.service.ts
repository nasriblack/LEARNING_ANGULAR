import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from 'src/app/models/ILogin';
import { authkey } from 'src/app/utils/constans';
import { endPoints } from 'src/app/utils/endPoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}



  login(username: string, password: string): Observable<LoginResponse> {
    console.log('AuthService login called with:', { username, password });
    return this.http
      .post<LoginResponse>(endPoints.login, { username, password,credentials: 'include' })
      .pipe(
        tap((res) => this.setToken(res.accessToken))
      );
  }

  private setToken(token: string): void {
    localStorage.setItem(authkey, token);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem(authkey);
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(authkey);
  }

}
