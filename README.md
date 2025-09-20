# Progress Log
- **20/09/2025**: Started the readme file, make the structure of the readme file.

I will Start with Angular 16 because in this angular version have the basics 

# Websites

https://v16.angular.io/docs
https://rxjs.dev/guide/overview


# VIDEO'S

https://www.youtube.com/watch?v=3qBXWUpoPHo&t=26683s => very long video (17h)!


# Questions and Answers


# Notes

install Angular CLI / Create project / run project
```
npm install -g @angular/cli@16
ng new my-app
cd my-app
ng serve --open
```

# Tasks

[ ] Make this tutorial https://v16.angular.io/start
[ ] Make this tutorial https://v16.angular.io/tutorial/first-app
[ ] Make this tutorial https://v16.angular.io/tutorial/tour-of-heroes



# TOPIC

## Must Know

[ ] Lifecycle

### Directives & Pipes

[ ] Built-in pipes (async, date, currency …).

[ ] async pipe + Observables is used everywhere.

[ ] Custom directives & pipes for company-specific logic.

### Dependecies Injection

*DI => it's for the service part , we can inject service inside a component in the constructeur with the visibilty private*

[ ] Services Injected via DI 

## RxJS & Observarbles
<b> If you're used to React with hooks , RxJS will be the biggest learning curves! </b>

[ ]  Creating Observables (of, from, interval, etc.).
[ ]  Operators map, filter, switchMap, mergeMap, concatMap, tap, catchError.
[ ]  async pipe to auto-subscribe/unsubscribe in templates.

## Data & Communication

[ ] Interceptors & handling errors
[ ] Using RxJS operators with API calls

### Component Communication

In angular we talk about the one way binding and two way binding when we found this 
[id] → property binding => which mean the id is dynamic property => 
(click) → event binding => the parentheses is for the function here => (click)="sayMessage()"
[(ngModel)] → two-way binding => it's input ( we gonna affect to this variable in html and ts)


[ ] @Input & @Output =>child communication
[ ] EventEmitter vs RxJS
[ ] Sharing data with services

## State Management

[ ] See an example of services +  RxJS 
[ ] Try NgRx 

## Advanced Topics

[ ] Routing ( guard , resolvers , child routes)
[ ] Interceptors
[ ] Guards ( CanActivate , CanDeactivate )
[ ] Performance optimization (onPush , trackBy, lazy modules)