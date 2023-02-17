/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/no-cycle
import { renderStepFour } from "./fourthStep";
// eslint-disable-next-line import/no-cycle
import { renderStepTwo, selectedPlanData } from "./secondStep";

let addons: NodeListOf<HTMLDivElement>;

const sidebar = document.querySelectorAll(".number");
let selectedCycle: string;
const pricesMo = ["$1/mo", "$2/mo", "$2/mo"];
const pricesYr = ["$10/yr", "$20/yr", "$20/yr"];
export const addonsList = [] as { title: string; price: string }[];

const monthly = () => {
    addons.forEach((addon, index) => {
        addon.querySelector<HTMLSpanElement>(".option > span")!.innerText = pricesMo[index];
    });
};
const yearly = () => {
    addons.forEach((addon, index) => {
        addon.querySelector<HTMLSpanElement>(".option > span")!.innerText = pricesYr[index];
    });
};

const changePricing = () => {
    if (selectedCycle === "yr") {
        yearly();
    } else {
        monthly();
    }
};

let checked: NodeListOf<HTMLDivElement> = [] as unknown as NodeListOf<HTMLDivElement>;
const addAddon = () => {
    checked = document.querySelectorAll<HTMLDivElement>(".option:has(input[type=checkbox]:checked)");
    while (addonsList.length > 0) {
        addonsList.pop();
    }
    checked.forEach((checkedEl) => {
        const title = checkedEl.querySelector<HTMLHeadingElement>("h3")!.innerText!;
        const price = checkedEl.querySelector<HTMLHeadingElement>(".option > span")!.innerText!;
        addonsList.push({ title, price });
    });
};

const checkCheked = (id: string) => {
    let found = false;
    checked.forEach((checkedEl) => {
        if (checkedEl.querySelector("input")!.id === id) found = true;
    });
    return found;
};

export const renderStepThree = () => {
    sidebar.forEach((number) => number.classList.remove("active"));
    sidebar[2].classList.add("active");
    selectedCycle = selectedPlanData.cycle;
    const navigation = document.querySelector(".navigation") as HTMLDivElement;
    const formSection = document.querySelector(".form_section") as HTMLFormElement;
    formSection.innerHTML = `<h1>Pick add-ons</h1>
    <p>Add-ons help enchance your gaming experience.</p>
    <section class="addons_options">
        <label for="online_service">
            <div class="option">
                <input type="checkbox" id="online_service" ${checkCheked("online_service") ? "checked" : ""}/>
                <div class="details">
                    <h3>Online service</h3>
                    <span>Access to multiplayer games</span>
                </div>
                <span>+$1/mo</span>
            </div>
        </label>
        <label for="larger_storage">
            <div class="option">
                <input type="checkbox" id="larger_storage" ${checkCheked("larger_storage") ? "checked" : ""}/>
                <div class="details">
                    <h3>Larger storage</h3>
                    <span>Extra 1TB of cloud save</span>
                </div>
                <span>+$2/mo</span>
            </div>
        </label>
        <label for="customizable_profile">
            <div class="option">
                <input type="checkbox" id="customizable_profile" ${checkCheked("customizable_profile") ? "checked" : ""}/>
                <div class="details">
                    <h3>Customizable Profile</h3>
                    <span>Custom theme on your profile</span>
                </div>
                <span>+$3/mo</span>
            </div>
        </label>`;
    navigation.innerHTML = `<button type="button" class="text_btn" id="back_btn">Go Back</button>
                                <button type="button" id="next_btn">Next Step</button>`;
    addons = document.querySelectorAll(".addons_options .option");
    changePricing();
    const backBtn = document.querySelector("#back_btn") as HTMLButtonElement;
    const nextBtn = document.querySelector("#next_btn") as HTMLButtonElement;
    backBtn.addEventListener("click", renderStepTwo);
    nextBtn.addEventListener("click", renderStepFour);
    const options = document.querySelectorAll("input") as NodeListOf<HTMLInputElement>;
    options.forEach((option) => option.addEventListener("change", addAddon));
};
