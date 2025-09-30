# Project Angular
<p> <b>Description : </b> Welcome to your Angular onboarding project!
You’ll build a Mini Social + Admin App using DummyJSON
.
This will help you practice Angular fundamentals and real-world concepts like authentication, guards, interceptors, and CRUD. </p>
<p>I'll be using Angular 16</p>

User -> Posts -> Comments -> users

- Each Posts have Comments
- Each Comments belong to users

## API

- https://dummyjson.com/posts
- https://dummyjson.com/comments

-If we want the api must be protected we add the auth before the posts or comments

- https://dummyjson.com/auth/posts

### Posts
```json
"posts":[{
      "id": 1,
      "title": "His mother had always taught him",
      "body": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
      "tags": [
        "history",
        "american",
        "crime"
      ],
      "reactions": {
        "likes": 192,
        "dislikes": 25
      },
      "views": 305,
      "userId": 121
}]
```

### User
```json
"comments":[{
      "id": 1,
      "body": "This is some awesome thinking!",
      "postId": 242,
      "likes": 3,
      "user": {
        "id": 105,
        "username": "emmac",
        "fullName": "Emma Wilson"
      }
}]
```

## Tasks

- [ ] Authentication
- Create a Login Page.

    - Endpoint: POST https://dummyjson.com/auth/login

    - Example user:
```json
    {
    "username": "kminchelle",
    "password": "0lelplR"
    }
```

    - Save returned JWT token in a service (or localStorage for training).

    - Redirect to /dashboard.

    - Create a User Profile component that displays:

        - firstName, lastName, username, image.

        2️⃣ Role-Based Access

- [ ] Simulate roles:

    - If username === "kminchelle" → Admin

    - Else → User

- Add Angular Guards:

    - Protect /admin route (only admin can access).

    - Redirect unauthorized users to /403.

- Navbar should adapt:

    - Admin sees Admin Panel.

    - User does not.


- [ ]Posts + Comments

- Create Posts List Page:

    - Endpoint: GET https://dummyjson.com/posts

    - Show: title, body, and author info (fetch /users/{id}).

- Create Post Details Page:

    - Route: /posts/:id

    - Fetch post details.

    - Fetch comments: GET https://dummyjson.com/comments/post/{id}

    - Display each comment with user avatar and text.

- Add Comment:

    - Endpoint: POST https://dummyjson.com/comments/add

    - Use Reactive Form.

    - On success → update comments list and show snackbar.

- [] Admin Panel – Products

- Create Products Table:

    - Endpoint: GET https://dummyjson.com/auth/products (or GET /products for non-auth)

    - Display in Angular Material Table.

- CRUD:

    - Add Product → POST https://dummyjson.com/products/add

    - Edit Product → PUT https://dummyjson.com/products/{id}

    - Delete Product → DELETE https://dummyjson.com/products/{id}

    - Use Reactive Forms with validations.

    - Show success/error via Angular Material Snackbar.

⚠️ Note: DummyJSON simulates POST/PUT/DELETE and returns mocked responses — data will not persist between requests. This is fine for learning.


- [ ]Advanced Angular Concepts

- HTTP Interceptors:

    - Attach Authorization: Bearer <token> to /auth/* requests.

    - Redirect to /login if 401 is returned.

    - Implement a loading spinner while requests are in progress.

- Global Error Handling:

    - Centralize API error handling in a service.

    - Show friendly error messages (snackbar/dialog).

- RxJS Practice:

    - Use forkJoin to fetch post + user + comments in parallel.

    - Use switchMap to fetch data sequentially (e.g., user → posts).

- State Management (Optional):

    - Store user session in a service with BehaviorSubject.

    - Later, explore NgRx for Redux-style state management.

## Notes

