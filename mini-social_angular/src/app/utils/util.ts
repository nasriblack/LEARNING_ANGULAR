import jwtDecode from "jwt-decode";
import { authkey } from "./constans";

export const isUserLoggedIn = (): boolean => {
    return !!localStorage.getItem(authkey);
}

export const isUserAdmin = () => {
  if (isUserLoggedIn()) {
    const token = localStorage.getItem(authkey);
    if (token) {
      const jwtData: any = jwtDecode(token);
      if(jwtData.firstName === 'Emily'){
        return true;
      }
    }
    return false;
  }
  return false;
};