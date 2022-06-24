import {updateContactAndImageReq, updateContactReq} from "../http/contactsAPI";

export const updateContact = (id, contact, contactImage) => {

    if (contactImage) {
        let formData = new FormData()
        formData.append('request', new Blob([JSON.stringify(
            contact
        )], {type: "application/json"}))
        formData.append('file', contactImage)
        return updateContactAndImageReq(id, formData)
    }

    return updateContactReq(contact)

}