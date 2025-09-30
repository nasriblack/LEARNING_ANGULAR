# Progress Log
- **20/09/2025**: Started the readme file, make the structure of the readme file.
- **21/09/2025**: Implement the gitignore , understand observarble , input and output
- **22/09/2025**: Begin the first-app , revert the app because it using inline template
- **29/09/2025**: Taking notes and understanding the DI , routing , binding data, reactive form, canActivate

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


# Questions and Answers


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

- [ ] Guards ( CanActivate , CanDeactivate )
- [ ] Performance optimization (onPush , trackBy, lazy modules)
