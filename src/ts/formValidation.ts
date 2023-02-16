/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export {};

const form = document.querySelector("form") as HTMLFormElement;
const nameInput = document.querySelector("#name-input") as HTMLInputElement;
const emailInput = document.querySelector("#email-input") as HTMLInputElement;
const phoneInput = document.querySelector("#phone-input") as HTMLInputElement;
const nextButton = document.querySelector("#next-btn") as HTMLButtonElement;

const summary = {
    personalInfo: {} as { name: string; email: string; phone: string },
};

const showError = (input: HTMLInputElement, message: string) => {
    input.classList.add("error");
    input.classList.remove("success");
    input.parentNode?.querySelector(".error")?.classList.remove("hidden");
    input.parentNode!.querySelector<HTMLSpanElement>(".error")!.innerText = message;
};

const showSuccess = (input: HTMLInputElement) => {
    input.classList.add("success");
    input.classList.remove("error");
    input.parentNode?.querySelector(".error")?.classList.add("hidden");
};

const checkEmpty = (inputs: HTMLInputElement[]) => {
    inputs.forEach((input) => {
        if (input.value.trim() === "") {
            showError(input, `This field is required`);
        } else showSuccess(input);
    });
};

const checkEmail = (input: HTMLInputElement) => {
    if (input.value.trim() === "") {
        return;
    }
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.value)) {
        showSuccess(input);
    } else showError(input, `Email is incorrect`);
};

const checkPhone = (input: HTMLInputElement) => {
    if (input.value.trim() === "") {
        return;
    }
    if (/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/g.test(input.value)) {
        showSuccess(input);
    } else showError(input, `Phone is incorrect`);
};

const validateSingle = (input: HTMLInputElement) => {
    checkEmpty([input]);
};

const validationTimeout = (validations: (() => void)[]) => {
    setTimeout(() => {
        validations.forEach((validation) => {
            validation();
        });
    }, 1000);
};

const validate = () => {
    checkEmpty([nameInput, emailInput, phoneInput]);
    checkEmail(emailInput);
    checkPhone(phoneInput);
    if (!form.querySelector("input.error")) {
        summary.personalInfo.name = nameInput.value;
        summary.personalInfo.email = emailInput.value;
        summary.personalInfo.phone = phoneInput.value;
    }
};

nextButton.addEventListener("click", validate);
nameInput.addEventListener("keydown", () => validationTimeout([() => validateSingle(nameInput)]));
emailInput.addEventListener("keydown", () => {
    validationTimeout([() => validateSingle(emailInput), () => checkEmail(emailInput)]);
});
phoneInput.addEventListener("keydown", () => {
    validationTimeout([() => validateSingle(phoneInput), () => checkPhone(phoneInput)]);
});
