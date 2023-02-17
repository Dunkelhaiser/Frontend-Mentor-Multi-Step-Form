const sidebar = document.querySelectorAll(".number");

export const renderSuccess = () => {
    sidebar.forEach((number) => number.classList.remove("active"));
    sidebar[3].classList.add("active");
    const mainSection = document.querySelector(".main_section") as HTMLFormElement;
    mainSection.innerHTML = `<section class="success_screen">
                                <img src="./src/assets/images/icon-thank-you.svg" alt="Thank you" />
                                <h1>Thank you!</h1>
                                <p>
                                    Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support,
                                    please feel free to email us at support@loremgaming.com.
                                </p>
                            </section>`;
};
