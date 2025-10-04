import { environment } from "src/environments/environment";

export const apiUrl = environment.apiUrl;

export const endPoints = {
  login: `${apiUrl}/auth/login`,
  users: "https://dummyjson.com/users",
  posts: "https://dummyjson.com/posts",
  comments: "https://dummyjson.com/comments",
};

export const routerLinks = {
  dashboard: "/admin/home",
  login: "/auth/login",
  home: "/home",
};

export const adminRouter = ["/admin/home"];
