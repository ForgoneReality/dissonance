export const CLEAR_ERRORS = "CLEAR_ERRORS"

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});

export const removeErrors = () => (dispatch) => {
    dispatch(clearErrors())
}