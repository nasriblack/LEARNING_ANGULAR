import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { routerLinks } from "src/app/utils/endPoints";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ["emilys", Validators.required],
      password: ["emilyspass", Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log("Form Value:", this.loginForm.value);
      this.isLoading = true;
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          complete: () => {
            this.isLoading = false;
          },
          next: (res) => {
            const token: string = res.accessToken;
            const jwtData: any = jwtDecode(token);

            console.log("checking the jwtData", jwtData);

            if (jwtData.firstName === "Emily") {
              this.router.navigate([routerLinks.dashboard]);
            } else {
              this.router.navigate(["/home"]);
            }
            // this.isLoading = false;
          },
          error: (err) => {
            alert("Invalid Credentials. Please try again.");

            // this.isLoading = false;
          },
        });
    }
  }
}
