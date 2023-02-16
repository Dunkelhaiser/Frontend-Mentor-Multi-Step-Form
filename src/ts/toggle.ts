/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export {};

const toggleBtn = document.querySelector(".toggle input") as HTMLInputElement;
const monthly = document.querySelector("#monthly_cycle") as HTMLSpanElement;
const yearly = document.querySelector("#yearly_cycle") as HTMLSpanElement;

const toggle = () => {
    if (toggleBtn.checked) {
        monthly.classList.remove("active");
        yearly.classList.add("active");
    } else {
        monthly.classList.add("active");
        yearly.classList.remove("active");
    }
};

toggleBtn.addEventListener("click", toggle);
toggle();
