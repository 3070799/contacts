import {$authHost, $host} from "./index";
import {CHECK, LOGIN, LOGOUT, ME, REGISTER_USER} from "../utils/RestConstants";

export const registration = async (login, password) => {
    const {data} = await $host.post(REGISTER_USER, {login, password})
    return data
}

export const login = async (login, password) => {
    const {data} = await $host.post(LOGIN, {login, password})
    return data
}

export const logout = async () => {
    const {data} = await $authHost.post(LOGOUT)
    return data
}

export const check = async () => {
    const {data} = await $authHost.post(CHECK)
    return data
}

export const me = async () => {
    const {data} = await $authHost.get(ME)
    return data
}
