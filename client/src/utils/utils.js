import jBox from "jbox"

export const imgUrlFor = function (imagePath, url = process.env.REACT_APP_SERVER_URL, holder = null) {
    if (!url || !imagePath) return holder;
    return `${url}/${imagePath}`
}

export const showConfirmPopup = (callback, message = 'Do you really want to delete? You wont be able to revert it.', confirmText = "Delete", cancelText = "Cancel") => {
    return new jBox('Confirm', {
        confirmButton: confirmText, // Text for the submit button
        cancelButton: cancelText, // Text for the cancel button
        confirm: callback, // Function to execute when clicking the submit button. By default jBox will use the onclick or href attribute in that order if found
        cancel: null, // Function to execute when clicking the cancel button
        closeOnConfirm: true, // Close jBox when the user clicks the confirm button
        target: window,
        addClass: 'jBox-Modal',
        fixed: true,
        attach: '[data-confirm]',
        getContent: 'data-confirm',
        content: message,
        maxWidth: 360,
        blockScroll: true,
        closeOnEsc: true,
        closeOnClick: true,
        closeButton: false,
        overlay: true,
        animation: 'zoomIn',
        preventDefault: true,
    }).open();
}