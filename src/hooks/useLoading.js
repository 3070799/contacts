import {useContext} from "react";
import {Context} from "../context";

export const useLoading = () => {
    const {loading} = useContext(Context)
    return loading
}