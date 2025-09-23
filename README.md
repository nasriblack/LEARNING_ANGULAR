# Progress Log
- **20/09/2025**: Started the readme file, make the structure of the readme file.
- **21/09/2025**: Implement the gitignore , understand observarble , input and output
- **22/09/2025**: Begin the first-app , revert the app because it using inline template

I will Start with Angular 16 because in this angular version have the basics 

# Websites

https://v16.angular.io/docs
https://rxjs.dev/guide/overview


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


# TOPIC

## Must Know

- [ ] Lifecycle

### Directives & Pipes

-[X] Built-in pipes (async, date, currency …).

- [X] async pipe + Observables is used everywhere.

- Observarble is like async but more power ! how ? => by giving you the data anytime it will be ( streaming power )
- The observarble is returnin an Observable type , and this you can subscribe to it !
- Async pipe => when you are working with async data or observarble you need to put this async pipe **| async**

- [ ] Custom directives & pipes for company-specific logic.

### Dependecies Injection

*DI => it's for the service part , we can inject service inside a component in the constructeur with the visibilty private*

- [X] Services Injected via DI
- the service must always be in the constructeur 

## RxJS & Observarbles
<b> If you're used to React with hooks , RxJS will be the biggest learning curves! </b>

- [ ]  Creating Observables (of, from, interval, etc.).
- [ ]  Operators map, filter, switchMap, mergeMap, concatMap, tap, catchError.
- [ ]  async pipe to auto-subscribe/unsubscribe in templates.

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

- [ ] EventEmitter vs RxJS
- [ ] Sharing data with services

## State Management

- [ ] See an example of services +  RxJS 
- [ ] Try NgRx 

## Advanced Topics

- [ ] Routing ( guard , resolvers , child routes)
- ActivatedRoute from the Angular Code contains information about the route and route params! => it should injected in the constructeur of the class
- [ ] Interceptors
- [ ] Guards ( CanActivate , CanDeactivate )
- [ ] Performance optimization (onPush , trackBy, lazy modules)
