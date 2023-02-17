export const toggle = (toggleBtn: HTMLInputElement, optionOne: HTMLSpanElement, optionTwo: HTMLSpanElement) => {
    if (toggleBtn.checked) {
        optionOne.classList.remove("active");
        optionTwo.classList.add("active");
    } else {
        optionOne.classList.add("active");
        optionTwo.classList.remove("active");
    }
};
