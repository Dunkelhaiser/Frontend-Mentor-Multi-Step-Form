/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export {};

const nextButton = document.querySelector("#next-btn") as HTMLButtonElement;
const addons = document.querySelectorAll(".addons_options .option") as NodeListOf<HTMLDivElement>;

let selectedCycle = "mo";
const pricesMo = ["$1/mo", "$2/mo", "$2/mo"];
const pricesYr = ["$10/yr", "$20/yr", "$20/yr"];
const addonsList = [] as { title: string; price: string }[];

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
changePricing();

const validate = () => {
    const checked = document.querySelectorAll<HTMLDivElement>(".option:has(input[type=checkbox]:checked)");
    while (addonsList.length > 0) {
        addonsList.pop();
    }
    checked.forEach((checkedEl) => {
        const title = checkedEl.querySelector<HTMLHeadingElement>("h3")!.innerText!;
        const price = checkedEl.querySelector<HTMLHeadingElement>(".option > span")!.innerText!;
        addonsList.push({ title, price });
    });
    console.log(addonsList);
};

nextButton.addEventListener("click", validate);
