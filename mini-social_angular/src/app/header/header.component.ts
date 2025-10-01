import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';
import { routerLinks } from '../utils/endPoints';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  authPath = routerLinks.login;
  private authSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.isAuthenticated().subscribe(
      (authStatus: boolean) => {
        this.isLoggedIn = authStatus;
        console.log('Auth status changed:', this.isLoggedIn);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate([routerLinks.login]);
  }
}
