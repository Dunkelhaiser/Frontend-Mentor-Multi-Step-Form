/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export {};

const toggleBtn = document.querySelector(".toggle input") as HTMLInputElement;
const planOptions = document.querySelector(".plan_options") as HTMLDivElement;
const checkedPlan = document.querySelector("input[type='radio']:checked") as HTMLInputElement;
let plans = document.querySelectorAll("input[type='radio']") as NodeListOf<HTMLInputElement>;
const nextButton = document.querySelector("#next-btn") as HTMLButtonElement;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let selectedPlan = checkedPlan;
const selectedPlanData = {} as { title: string; price: string };

const monthlyOptions = (newPlan: string) => {
    return `<label for="arcade">
                            <div class="option">
                                <input type="radio" name="plan" id="arcade" ${newPlan === "arcade" ? "checked" : ""}  />
                                <img src="./src/assets/images/icon-arcade.svg" alt="Arcade" />
                                <div class="details">
                                    <h3>Arcade</h3>
                                    <span>$9/mo</span>
                                </div>
                            </div>
                            </label>
                            <label for="advanced">
                            <div class="option">
                                <input type="radio" name="plan" id="advanced" ${newPlan === "advanced" ? "checked" : ""} />
                                <img src="./src/assets/images/icon-advanced.svg" alt="Advanced" />
                                <div class="details">
                                    <h3>Advanced</h3>
                                    <span>$12/mo</span>
                                </div>
                            </div>
                            </label>
                            <label for="pro">
                            <div class="option">
                                <input type="radio" name="plan" id="pro" ${newPlan === "pro" ? "checked" : ""} />
                                <img src="./src/assets/images/icon-pro.svg" alt="Pro" />
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
                                <img src="./src/assets/images/icon-arcade.svg" alt="Arcade" />
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
                                <img src="./src/assets/images/icon-advanced.svg" alt="Advanced" />
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
                                <img src="./src/assets/images/icon-pro.svg" alt="Pro" />
                                <div class="details">
                                    <h3>Pro</h3>
                                    <span>$150/yr</span>
                                    <span class="discount">2 months free</span>
                                </div>
                            </div>
                            </label>`;
};

const changePlan = (plan: HTMLInputElement) => {
    selectedPlan = plan;
};

const toggleCycle = () => {
    const reinitialize = () => {
        plans = document.querySelectorAll("input[type='radio']") as NodeListOf<HTMLInputElement>;
        plans.forEach((plan) => plan.addEventListener("change", () => changePlan(plan)));
        plans.forEach((plan) => {
            if (plan.id === selectedPlan.id) {
                changePlan(plan);
            }
        });
    };
    if (toggleBtn.checked) {
        planOptions.innerHTML = yearlyOptions(selectedPlan.id);
        reinitialize();
    } else {
        planOptions.innerHTML = monthlyOptions(selectedPlan.id);
        reinitialize();
    }
};

const validate = () => {
    selectedPlanData.title = selectedPlan.parentNode!.querySelector<HTMLHeadingElement>(".details h3")!.innerText;
    selectedPlanData.price = selectedPlan.parentNode!.querySelector<HTMLSpanElement>(".details span")!.innerText;
};

toggleBtn.addEventListener("click", toggleCycle);
plans.forEach((plan) => plan.addEventListener("change", () => changePlan(plan)));
nextButton.addEventListener("click", validate);
