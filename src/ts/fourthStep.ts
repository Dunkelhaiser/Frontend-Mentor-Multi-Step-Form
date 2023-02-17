/* eslint-disable @typescript-eslint/no-non-null-assertion */

// eslint-disable-next-line import/no-cycle
import { renderStepTwo, selectedPlanData } from "./secondStep";
import { renderSuccess } from "./success";
// eslint-disable-next-line import/no-cycle
import { addonsList, renderStepThree } from "./thirdStep";

const sidebar = document.querySelectorAll(".number");

export const renderStepFour = () => {
    sidebar.forEach((number) => number.classList.remove("active"));
    sidebar[3].classList.add("active");
    const additional = addonsList
        .map((addon) => {
            return `<div class="confirm_additional">
                        <h3>${addon.title}</h3>
                        <span>+${addon.price}</span>
                        </div>`;
        })
        .join("");
    let addonsPrice = 0;
    for (let i = 0; i < addonsList.length; i++) {
        addonsPrice += Number(addonsList[i].price.match(/\d+/)![0]);
    }
    const finalPrice = Number(selectedPlanData.price.match(/\d+/)![0]) + addonsPrice;
    console.log(finalPrice);
    const navigation = document.querySelector(".navigation") as HTMLDivElement;
    const formSection = document.querySelector(".form_section") as HTMLFormElement;
    formSection.innerHTML = `<h1>Finishing up</h1>
                                <p>Double-check everything looks OK before confirming.</p>
                                <section class="confirm_section">
                                    <div class="confirm_separate">
                                        <div class="confirm_details">
                                            <div class="details">
                                                <h3>${selectedPlanData.title}(${
        selectedPlanData.cycle === "yr" ? "Yearly" : "Monthly"
    })</h3>
                                                <span>Change</span>
                                            </div>
                                            <span>${selectedPlanData.price}</span>
                                        </div>
                                        <hr />
                                        ${additional}
                                    </div>
                                    <div class="confirm_total">
                                        <h3>Total(per month)</h3>
                                        <span>+${finalPrice}/${selectedPlanData.cycle}</span>
                                    </div>
                                </section>`;
    navigation.innerHTML = `<button type="button" class="text_btn" id="back_btn">Go Back</button>
                                <button type="button" id="next_btn">Confirm</button>`;
    const changeBtn = document.querySelector(".details span") as HTMLSpanElement;
    const backBtn = document.querySelector("#back_btn") as HTMLButtonElement;
    const nextBtn = document.querySelector("#next_btn") as HTMLButtonElement;
    changeBtn.addEventListener("click", renderStepTwo);
    backBtn.addEventListener("click", renderStepThree);
    nextBtn.addEventListener("click", renderSuccess);
};
