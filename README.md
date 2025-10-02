# Progress Log
- **20/09/2025**: Started the readme file, make the structure of the readme file.
- **21/09/2025**: Implement the gitignore , understand observarble , input and output
- **22/09/2025**: Begin the first-app , revert the app because it using inline template
- **29/09/2025**: Taking notes and understanding the DI , routing , binding data, reactive form, canActivate
- **30/09/2025**: Taking notes and understanding canDeactivate , advanced DI , control flow , interceptors
- **01/10/2025**: Begin the mini social angular app , implement the auth , canActivate routing , modules , routing ...


I will Start with Angular 16 because in this angular version have the basics 

# Websites

https://v16.angular.io/docs
https://rxjs.dev/guide/overview

# Repository
https://github.com/mryenagandula/dailycoding-app
https://github.com/0xdeee/edrk-ng-prj-fbook/tree/main
https://github.com/DevashishPathrabe/CapstoneProject_01/tree/main *
https://github.com/valerisuleo/angular


# VIDEO'S

https://www.youtube.com/watch?v=3qBXWUpoPHo&t=26683s => very long video (17h)!
nvm 

# Bug and Fix

- Can't bind to 'formGroup' since it isn't a known property of 'form'
  - You need to import this in the module
  ```
  import { ReactiveFormsModule } from '@angular/forms';
  ```
  - 

# Notes

- install Angular CLI / Create project / run project
```
npm install -g @angular/cli@16
ng new my-app
cd my-app
ng serve --open
```


- In Angular.json there is "polyfills": ["zone.js"], => this is for angular detect change properly , and update the DOM

- (click)="share() => the function share() it will implmented inside the ts file
- In Angular every component ts is a class , we don't talk here about the html and css , so you need to make a speciphication about the nature of the component like this example 

```
@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent {


}
```
it's a <b>decorator</b>  will tell  class ProductAlertsComponent is a component 

- You can add route in app.module.ts in this section **RouterModule.forRoot** and you add this line
```
  { path: "products/:productId", component: ProductDetailsComponent },
```

- RouteLink directive in html [routerLink]="['/products', product.id]" => the 2 arguments is the **productId**

- Standalone component : component dosen't need to be declared in a module .


- To make a module ( folder , organization) in angular
```
ng g module auth --routing
```
=> this give you a folder which give you the module with routing

- To generate a **guard** you need this **command**
  ```
  ng g guard auth
  ```

# Tasks

- [X] Make this tutorial https://v16.angular.io/start
- [ ] Search an api with sign in , roles , CRUD endpoint to work a project with angular
- [ ] Make this tutorial https://www.w3schools.com/angular/default.asp


# TOPIC

## Must Know



### Control flow (if / else)
```
@if (score > 90) { <p>A</p> } @else if (score > 75) { <p>B</p> } @else { <p>C</p> }

<ul>
  @for (it of items; track it.id) { <li>{{ it.label }}</li> } @empty { <li>No items</li> }
</ul>

@switch (status) {
  @case ('pending') { <p>Pending</p> }
  @case ('done') { <p>Done</p> }
  @default { <p>Unknown</p> }
}
```

### Lifecycle

- Setup: Use **ngOnInit** after inputs are set.
- React: Handle input changes in **ngOnChanges**.
- DOM ready: Use **ngAfterViewInit** to access @ViewChild refs.
- Cleanup: Release timers/subscriptions/listeners in **ngOnDestroy**.


#### ngOnInit
- Starts action when the component is created !

#### ngOnDestroy
Clean up timers/listeners to prevent leaks.!


### HttpClient
=> is a package that we need to import it in modules / Provide the provideHttpClient() at bootstrap
- it use to fetch data and send JSON
- it return an **Observarbles** either we use **subscribe** in ts file or **sync** pipe in html
- **Single subscription**: Avoid using | async multiple times on the same Observable in the same template area; use | async as value once and reuse value.
- **Auto-unsubscribe**: The async pipe cleans up when the view is destroyed.

- The difference between the Subscribe and Pipe in the Observarble 
  - The Subscribe give us a way to implement code in case of success and in case of error 
  ```ts
  onLogin() {
  if (this.loginForm.valid) {
    console.log('Form Value:', this.loginForm.value);
    
    // ✅ This actually triggers the HTTP request
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (res) => {
          console.log('Login successful:', res); // This runs when server responds
        },
        error: (err) => {
          console.error('Login failed:', err); // This runs if request fails
        }
      });
  }
}
  ```
  - Otherwise the pipe is more complicated it give us these function and methods to implement it in the response, and it use .subscribe in the other way
  ```
  .pipe(
  tap(),        // Side effects (logging, setting variables)
  map(),        // Transform data
  filter(),     // Filter out unwanted values
  catchError(), // Handle errors gracefully
  retry(),      // Retry on failure
  delay(),      // Add delays
  timeout(),    // Set timeouts
  finalize(),   // Cleanup (always runs)
  switchMap(),  // Switch to another Observable
)
  ```
  - a fully example with the pipe example
  ```ts
  onLogin() {
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;
    
    this.authService.login(username, password)
      .pipe(
        tap(() => this.isLoading = true),
        tap(res => this.tokenService.saveToken(res.token)),
        map(res => res.user),
        catchError(err => {
          this.showErrorMessage('Invalid credentials');
          return EMPTY; // Complete the stream without emitting
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(user => {
        if (user) {
          this.userService.setCurrentUser(user);
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
  ```

#### GET

```ts
load() {
    this.loading = true;
    this.error = '';
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => { this.users = data; this.loading = false; },
        error: () => { this.error = 'Failed to load users'; this.loading = false; }
      });
  }
```

#### POST

```ts
createPost() {
    this.loading = true;
    this.error = '';
    this.result = null;
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1
    }).subscribe({
      next: (res) => { this.result = res; this.loading = false; },
      error: () => { this.error = 'Failed to create post'; this.loading = false; }
    });
  }
```

#### Http Interceptors
- Runn cross-cutting logic on every request / response !
```ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({ setHeaders: { Authorization: 'Bearer TOKEN' } });
  return next(cloned);
};

bootstrapApplication(App, {
  providers: [provideHttpClient(withInterceptors([authInterceptor]))]
});
```


### Forms
```html
<h3>Forms</h3>
    <form #f="ngForm" (ngSubmit)="onSubmit()">
      <label>
        Name:
        <input name="name" [(ngModel)]="name" placeholder="Enter your name">
      </label>
      <button type="submit">Submit</button>
    </form>
    <p>Value: {{ name }}</p>
    <p *ngIf="submitted">Submitted!</p>
```

=>
- [(ngModel)]="name": Two-way binds the input to the name field.
- #f="ngForm": Exports the form state (e.g., f.valid, f.invalid).
- (ngSubmit)="onSubmit()": Handles submit using the component method.
- Display: {{ name }} shows the current value; a flag shows the submitted state.
- **Avoid [(ngModel)] on controls that also use formControlName**

=>This is how we use formControlName , **html**
```html
form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        Name
        <input formControlName="name" placeholder="Your name">
      </label>
      <div *ngIf="form.controls.name.invalid && (form.controls.name.dirty || form.controls.name.touched || submitted)" style="color:crimson">
        <small *ngIf="form.controls.name.errors && form.controls.name.errors['required']">Name is required.</small>
        <small *ngIf="form.controls.name.errors && form.controls.name.errors['minlength']">Min 3 characters.</small>
      </div>

      <label>
        Email
        <input formControlName="email" placeholder="you@example.com">
      </label>
      <div *ngIf="form.controls.email.invalid && (form.controls.email.dirty || form.controls.email.touched || submitted)" style="color:crimson">
        <small *ngIf="form.controls.email.errors && form.controls.email.errors['required']">Email is required.</small>
        <small *ngIf="form.controls.email.errors && form.controls.email.errors['email']">Email must be valid.</small>
      </div>

      <label>
        <input type="checkbox" formControlName="newsletter">
        Subscribe to newsletter
      </label>

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
```

**ts**
```ts
export class App {
  fb = new FormBuilder();
  submitted = false;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    newsletter: [false],
  });

  onSubmit() { this.submitted = true; }
}
```

### Directives & Pipes

- [X] Built-in pipes (async, date, currency …).

- [X] async pipe + Observables is used everywhere.

- Observarble is like async but more power ! how ? => by giving you the data anytime it will be ( streaming power )
- The observarble is returnin an Observable type , and this you can subscribe to it !
- Async pipe => when you are working with async data or observarble you need to put this async pipe **| async**

- [ ] Custom directives & pipes for company-specific logic.

### Dependecies Injection

*DI => it's for the service part , we can inject service inside a component in the constructeur with the visibilty private*

- [X] Services Injected via DI
- the service must always be in the constructeur 
**Avoid circular dependencies**: Two services injecting each other will fail; extract common logic into a third service or redesign.

- **InjectionToken**: for non-class dependencies (config objects, feature flags, strings, arrays).

- **inject()**: when you can’t use constructor injection (e.g. in providers, helper functions, or top-level code).
- We can use **@Optional()** when a dependency is not required


## RxJS & Observarbles
<b> If you're used to React with hooks , RxJS will be the biggest learning curves! </b>

- What is BehaviorSubject and which case i need to it ?
    - I need BehaviorSubject when i need to change something in html that is not render like sign in to sign out ! so based on IA this fix my problem
    - it's most similar to useState + useEffect , it's most similar to share state with the app.
    - You need to subscribe to it ! because it's Observarble , when you subscribe on it , it give the current value !
      ```
        # This is in service
        # Here i create the behaviorSubject and i initialite the state based on the returning function hasToken which return true or false
        private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
        # Second i create a function that hold this value as Observarble to subscribe to it later !
        isAuthenticated(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
        }
      # In ngOnInit we should subscribe to this Observarble like this example, we create the isLoggedIn as boolean and private authSubscription?: Subscription; => those 2 are initialisation
      ngOnInit(): void {
      this.authService.isAuthenticated().subscribe(
        (authStatus: boolean) => {
          this.isLoggedIn = authStatus; // Updates immediately!
          console.log('Auth status changed:', this.isLoggedIn);
        }
      );
      }
      ```

- [ ]  Creating Observables (of, from, interval, etc.).
- [ ]  Operators map, filter, switchMap, mergeMap, concatMap, tap, catchError.
- [X]  async pipe to auto-subscribe/unsubscribe in templates.

## Data & Communication

- [ ] Interceptors & handling errors
- [ ] Using RxJS operators with API calls

### Component Communication

In angular we talk about the one way binding and two way binding when we found this 
[id] → property binding => which mean the id is dynamic property => 
(click) → event binding => the parentheses is for the function here => (click)="sayMessage()"
[(ngModel)] → two-way binding


- [X] @Input & @Output =>child communication
    - **Input**
- the @Input property value passes in from the component parent ( parent -> child)
- <app-product-alerts [product]="product"> </app-product-alerts> => we are passing the product in props ( input )

    - **Ouput**
- When we passing a data or function from the child to parent we need to use @Output() and EventEmitter() -> this allow when the property notify change it will emit an event !
- In the child component you need to this step ts file
    ```
      @Output() notify = new EventEmitter();
    ```
    - html file 
    ```
    (click)="notify.emit()
    ```
    when we click we gonna emit this function ( add the notify function to event emitter) so in the parent component we do this


    -html parent

    ```
    <app-product-alerts [product]="product" (notify)="onNotify()"> </app-product-alerts>
    ```
    - so this (notify)="onNotify() will see the event when it emit it will fire or dispatch the onNotify() function which is inside the ts file of parent component

- Data Binding
```
 Interpolation: {{ value }} prints text.
 Property binding: [prop]="value" sets element/DOM properties.
 Event binding: (event)="handler($event)" listens to user actions.
 [(ngModel)] to read and update form values => Two-way binds
```

- Attribute Binding
```
[attr.colspan]="span"
[class.active]="isActive"
[style.color]="color"
```

- [ ] EventEmitter vs RxJS
- [ ] Sharing data with services

## State Management

- [ ] See an example of services +  RxJS 
- [ ] Try NgRx 

## Advanced Topics


### ROUTING
- [ ] Routing ( guard , resolvers , child routes)
- ActivatedRoute from the Angular Code contains information about the route and route params! => it should injected in the constructeur of the class
- Route Guard **canActivate** => guards decide if navigation is allowed !
```
export const authGuard = () => isLoggedIn ? true : inject(Router).createUrlTree(['/']);
{ path: 'protected', component: Protected, canActivate: [authGuard] }
```

```
import { inject } from '@angular/core';
import { Router, Routes, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';

function canActivate() {
  const router = inject(Router);
  return isLoggedIn() || router.createUrlTree(['/']);
}

const routes: Routes = [
  { path: 'feature', loadComponent: () => import('./feature').then(m => m.Feature), data: { title: 'Feature' }, canActivate: [canActivate] },
  { path: 'inbox', loadComponent: () => import('./inbox').then(m => m.Inbox) },
  { path: 'compose', outlet: 'modal', loadComponent: () => import('./compose').then(m => m.Compose) }
];

provideRouter(routes, withPreloading(PreloadAllModules));
```


- **CanDeactivateFn**: Decide if navigation away is allowed (e.g., confirm dialog).
- Here we can see data for static route which hold metadata


- [ ] Guards ( CanActivate , CanDeactivate )
- [ ] Performance optimization (onPush , trackBy, lazy modules)
