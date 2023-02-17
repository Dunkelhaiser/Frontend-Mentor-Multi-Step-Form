/* eslint-disable @typescript-eslint/no-non-null-assertion */

// eslint-disable-next-line import/no-cycle
import { renderStepTwo } from "./secondStep";

const sidebar = document.querySelectorAll(".number");
let form: HTMLFormElement;
let nameInput: HTMLInputElement;
let emailInput: HTMLInputElement;
let phoneInput: HTMLInputElement;

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

export const personalInfo = {
    name: "",
    email: "",
    phone: "",
};

const validate = () => {
    checkEmpty([nameInput, emailInput, phoneInput]);
    checkEmail(emailInput);
    checkPhone(phoneInput);
    if (form.querySelector("input.error")) {
        return false;
    }
    personalInfo.name = nameInput.value;
    personalInfo.email = emailInput.value;
    personalInfo.phone = phoneInput.value;
    return true;
};

export const renderStepOne = () => {
    sidebar.forEach((number) => number.classList.remove("active"));
    sidebar[0].classList.add("active");
    const navigation = document.querySelector(".navigation") as HTMLDivElement;
    const formSection = document.querySelector(".form_section") as HTMLFormElement;
    formSection.innerHTML = `<h1>Personal info</h1>
                                <p>Please provide your name, email address, and phone number.</p>
                                <form>
                                    <div class="input_section">
                                        <div class="input_info">
                                            <label>Name</label>
                                            <span class="error hidden">This field is required</span>
                                        </div>
                                        <input type="text" placeholder="e.g. Stephen King" id="name-input" ${
                                            personalInfo.name ? `value=${personalInfo.name}` : ""
                                        } />
                                    </div>

                                    <div class="input_section">
                                        <div class="input_info">
                                            <label>Email Address</label>
                                            <span class="error hidden">This field is required</span>
                                        </div>
                                        <input type="email" placeholder="e.g. stephenking@lorem.com" id="email-input" ${
                                            personalInfo.email ? `value=${personalInfo.email}` : ""
                                        } />
                                    </div>

                                    <div class="input_section">
                                        <div class="input_info">
                                            <label>Phone Number</label>
                                            <span class="error hidden">This field is required</span>
                                        </div>
                                        <input type="tel" placeholder="e.g. +1 234 567 890" id="phone-input" ${
                                            personalInfo.phone ? `value=${personalInfo.phone}` : ""
                                        } />
                                    </div>
                                </form>`;
    navigation.innerHTML = `<button type="button" id="next_btn">Next Step</button>`;
    form = document.querySelector("form") as HTMLFormElement;
    nameInput = document.querySelector("#name-input") as HTMLInputElement;
    emailInput = document.querySelector("#email-input") as HTMLInputElement;
    phoneInput = document.querySelector("#phone-input") as HTMLInputElement;

    nameInput.addEventListener("keydown", () => validationTimeout([() => validateSingle(nameInput)]));
    emailInput.addEventListener("keydown", () => {
        validationTimeout([() => validateSingle(emailInput), () => checkEmail(emailInput)]);
    });
    phoneInput.addEventListener("keydown", () => {
        validationTimeout([() => validateSingle(phoneInput), () => checkPhone(phoneInput)]);
    });

    const nextBtn = document.querySelector("#next_btn") as HTMLButtonElement;
    nextBtn.addEventListener("click", () => {
        if (validate()) renderStepTwo();
    });
};
