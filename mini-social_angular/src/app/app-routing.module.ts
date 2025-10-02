import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { AuthGuard } from "./utils/auth.guard";
import { routerLinks } from "./utils/endPoints";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  // {
  //   path: "dashboard",
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard],
  // },
  { path: "", redirectTo: routerLinks.login, pathMatch: "full" },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
