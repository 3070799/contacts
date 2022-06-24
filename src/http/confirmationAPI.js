import {$host} from "./index";
import {CONFIRM_EMAIL, RESEND_CONFIRM_EMAIL} from "../utils/RestConstants";

export const confirmEmail = async (confirmationId) => {
    const {data} = await $host.get(CONFIRM_EMAIL + '/' + confirmationId)
    return data
}

export const resendConfirmEmail = async (userId) => {
    await $host.get(RESEND_CONFIRM_EMAIL + '/' + userId)
}
