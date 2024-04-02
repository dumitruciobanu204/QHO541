// document.addEventListener("DOMContentLoaded", () => {
//     const increaseButtons = document.querySelectorAll(".increase");

//     increaseButtons.forEach(button => {
//         button.addEventListener("click", async (event) => {
//             // event.preventDefault();

//             const form = event.target.closest(".increase-quantity-form");
//             const formData = new FormData(form);
//             const response = await fetch(form.action, {
//                 method: form.method,
//                 body: formData
//             });

//             console.log(response);

            

//             if (!response.ok) {
//                 const responseData = await response.json(); 
//                 if (response.status === 400) {
//                     alert(responseData.error);
//                 } else {
//                     console.error("Error increasing item quantity:", response.statusText);
//                 }
//             } else {
//                 window.location.resume(); // Reload the page to reflect changes
//             }
//         });
//     });
// });
