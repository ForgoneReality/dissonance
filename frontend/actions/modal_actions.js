export const DISPLAY_MODAL = "DISPLAY_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const RESET_ALL_MODALS = "RESET_ALL_MODALS";
export const DISPLAY_FULL_MODAL = "DISPLAY_FULL_MODAL";
export const HIDE_FULL_MODAL = "HIDE_FULL_MODAL";

export const displayModal = (name, payload) => ({
    type: DISPLAY_MODAL,
    name,
    payload
})

export const hideModal = () => ({
    type: HIDE_MODAL
})

export const resetModal = () => ({
    type: RESET_ALL_MODALS
})

export const displayFullModal = (modal) => ({
    type: DISPLAY_FULL_MODAL, 
    modal
})

export const hideFullModal = () => ({
    type: HIDE_FULL_MODAL
})