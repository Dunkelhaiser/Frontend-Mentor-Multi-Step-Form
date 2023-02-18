/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/no-cycle
import { renderStepOne } from "./firstStep";
// eslint-disable-next-line import/no-cycle
import { renderStepThree } from "./thirdStep";
import { toggle } from "./toggle";
import arcadeSvg from "../assets/images/icon-arcade.svg";
import advancedSvg from "../assets/images/icon-advanced.svg";
import proSvg from "../assets/images/icon-pro.svg";

const sidebar = document.querySelectorAll(".number");
let toggleBtn: HTMLInputElement;
let planOptions: HTMLDivElement;
let checkedPlan: HTMLInputElement;
let plans: NodeListOf<HTMLInputElement>;

export const selectedPlanData = {} as { title: string; price: string; cycle: string };

const monthlyOptions = (newPlan: string) => {
    return `<label for="arcade">
                            <div class="option">
                                <input type="radio" name="plan" id="arcade" ${newPlan === "arcade" ? "checked" : ""}  />
                                <img src=${arcadeSvg} alt="Arcade" />
                                <div class="details">
                                    <h3>Arcade</h3>
                                    <span>$9/mo</span>
                                </div>
                            </div>
                            </label>
                            <label for="advanced">
                            <div class="option">
                                <input type="radio" name="plan" id="advanced" ${newPlan === "advanced" ? "checked" : ""} />
                                <img src=${advancedSvg} alt="Advanced" />
                                <div class="details">
                                    <h3>Advanced</h3>
                                    <span>$12/mo</span>
                                </div>
                            </div>
                            </label>
                            <label for="pro">
                            <div class="option">
                                <input type="radio" name="plan" id="pro" ${newPlan === "pro" ? "checked" : ""} />
                                <img src=${proSvg} alt="Pro" />
                                <div class="details">
                                    <h3>Pro</h3>
                                    <span>$15/mo</span>
                                </div>
                            </div>
                            </label>`;
};

const yearlyOptions = (newPlan: string) => {
    return `<label for="arcade">
                            <div class="option">
                                <input type="radio" name="plan" id="arcade" ${newPlan === "arcade" ? "checked" : ""} />
                                <img src=${arcadeSvg} alt="Arcade" />
                                <div class="details">
                                    <h3>Arcade</h3>
                                    <span>$90/yr</span>
                                    <span class="discount">2 months free</span>
                                </div>
                            </div>
                            </label>
                            <label for="advanced">
                            <div class="option">
                                <input type="radio" name="plan" id="advanced"  ${newPlan === "advanced" ? "checked" : ""} />
                                <img src=${advancedSvg} alt="Advanced" />
                                <div class="details">
                                    <h3>Advanced</h3>
                                    <span>$120/yr</span>
                                    <span class="discount">2 months free</span>
                                </div>
                            </div>
                            </label>
                            <label for="pro">
                            <div class="option">
                                <input type="radio" name="plan" id="pro"  ${newPlan === "pro" ? "checked" : ""} />
                                <img src=${proSvg} alt="Pro" />
                                <div class="details">
                                    <h3>Pro</h3>
                                    <span>$150/yr</span>
                                    <span class="discount">2 months free</span>
                                </div>
                            </div>
                            </label>`;
};

const changePlan = (plan: HTMLInputElement) => {
    checkedPlan = plan;
};

const toggleCycle = () => {
    const reinitialize = () => {
        plans = document.querySelectorAll("input[type='radio']") as NodeListOf<HTMLInputElement>;
        plans.forEach((plan) => plan.addEventListener("change", () => changePlan(plan)));
        plans.forEach((plan) => {
            if (plan.id === checkedPlan.id) {
                changePlan(plan);
            }
        });
    };
    if (toggleBtn.checked) {
        planOptions.innerHTML = yearlyOptions(checkedPlan.id);
        reinitialize();
    } else {
        planOptions.innerHTML = monthlyOptions(checkedPlan.id);
        reinitialize();
    }
};

const validate = () => {
    selectedPlanData.title = checkedPlan.parentNode!.querySelector<HTMLHeadingElement>(".details h3")!.innerText;
    selectedPlanData.price = checkedPlan.parentNode!.querySelector<HTMLSpanElement>(".details span")!.innerText;
    selectedPlanData.cycle = toggleBtn.checked ? "yr" : "mo";
};

export const renderStepTwo = () => {
    const navigation = document.querySelector(".navigation") as HTMLDivElement;
    const formSection = document.querySelector(".form_section") as HTMLFormElement;
    sidebar.forEach((number) => number.classList.remove("active"));
    sidebar[1].classList.add("active");
    formSection.innerHTML = `<h1>Select your plan</h1>
                                <p>You have the option of mounthly or yearly billing.</p>
                                <section class="plan_options">
                                    <label for="arcade">
                                        <div class="option">
                                            <input type="radio" name="plan" id="arcade" checked />
                                            <img src=${arcadeSvg} alt="Arcade" />
                                            <div class="details">
                                                <h3>Arcade</h3>
                                                <span>$9/mo</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label for="advanced">
                                        <div class="option">
                                            <input type="radio" name="plan" id="advanced" />
                                            <img src=${advancedSvg} alt="Advanced" />
                                            <div class="details">
                                                <h3>Advanced</h3>
                                                <span>$12/mo</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label for="pro">
                                        <div class="option">
                                            <input type="radio" name="plan" id="pro" />
                                            <img src=${proSvg} alt="Pro" />
                                            <div class="details">
                                                <h3>Pro</h3>
                                                <span>$15/mo</span>
                                            </div>
                                        </div>
                                    </label>
                                </section>
                                <div class="cycle">
                                    <span id="monthly_cycle">Monthly</span>
                                    <div class="toggle">
                                        <input type="checkbox" id="cycle" />
                                        <label for="cycle" aria-label="Cycle"></label>
                                    </div>
                                    <span id="yearly_cycle">Yearly</span>
                                </div>`;

    navigation.innerHTML = `<button type="button" class="text_btn" id="back_btn">Go Back</button>
                                <button type="button" id="next_btn">Next Step</button>`;

    const backBtn = document.querySelector("#back_btn") as HTMLButtonElement;
    const nextBtn = document.querySelector("#next_btn") as HTMLButtonElement;
    const monthly = document.querySelector("#monthly_cycle") as HTMLSpanElement;
    const yearly = document.querySelector("#yearly_cycle") as HTMLSpanElement;
    toggleBtn = document.querySelector(".toggle input") as HTMLInputElement;
    planOptions = document.querySelector(".plan_options") as HTMLDivElement;
    checkedPlan = document.querySelector("input[type='radio']:checked") as HTMLInputElement;
    plans = document.querySelectorAll("input[type='radio']") as NodeListOf<HTMLInputElement>;
    backBtn.addEventListener("click", renderStepOne);
    nextBtn.addEventListener("click", () => {
        validate();
        renderStepThree();
    });
    toggle(toggleBtn, monthly, yearly);
    toggleBtn.addEventListener("click", () => {
        toggleCycle();
        toggle(toggleBtn, monthly, yearly);
    });
    plans.forEach((plan) => plan.addEventListener("change", () => changePlan(plan)));
};
