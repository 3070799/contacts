import {useContext} from "react";
import {Context} from "../context";

export const useAuth = () => {
    const {user} = useContext(Context)
    return user.isAuth
}