import {$authHost} from "./index";
import {CONTACTS_IMAGES_ROOT, CONTACTS_ROOT, LOGOUT, UPDATE_CONTACT_AND_IMAGE} from "../utils/RestConstants";

export const fetchContacts = async () => {
    const {data} = await $authHost.get(CONTACTS_ROOT)
    return data
}

export const fetchOneContact = async (id) => {
    const {data} = await $authHost.get(CONTACTS_ROOT + '/' + id)
    return data
}

export const saveContact = async (formData) => {
    const {data} = await $authHost.post(CONTACTS_ROOT, formData)
    return data
}

export const deleteContact = async (id) => {
    const {data} = await $authHost.delete(CONTACTS_ROOT + '/' + id)
    return data
}

export const updateContactReq = async ( contact) => {
    const {data} = await $authHost.put(CONTACTS_ROOT + '/' + contact.id, contact)
    return data
}

export const updateContactAndImageReq = async (id, formDate) => {
    const {data} = await $authHost.put(UPDATE_CONTACT_AND_IMAGE + '/' + id, formDate)
    return data
}