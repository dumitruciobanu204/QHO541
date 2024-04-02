document.addEventListener("DOMContentLoaded", () => {
    const addToBasketForms = document.querySelectorAll(".add-to-basket-form");

    addToBasketForms.forEach(form => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: form.method,
                body: formData
            });

            if (!response.ok) {
                console.error("Error adding item to basket:", response.statusText);
                return;
            }
        });
    });
});
