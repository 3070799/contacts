export const onInputArrowUpDown = (countInputs, inputName, inputIndex, event) => {
    if (inputIndex !== 0) {
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            if (inputIndex === countInputs) {
                document.querySelector(
                    `input[name=${inputName}-${1}]`
                ).focus()
            } else {
                document.querySelector(
                    `input[name=${inputName}-${inputIndex + 1}]`
                ).focus()
            }
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault()
            if (inputIndex === 1) {
                document.querySelector(
                    `input[name=${inputName}-${countInputs}]`
                ).focus()
            } else {
                document.querySelector(
                    `input[name=${inputName}-${inputIndex - 1}]`
                ).focus()
            }
        }
    }
}