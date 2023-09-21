const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const contactForm = document.getElementById("contact-form");
const errorMessage = document.getElementsByClassName("error-message")[0];
const sentMessage = document.getElementsByClassName("sent-message")[0];
const loadingElement = document.getElementsByClassName("loading")[0];

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    loadingElement.style.display = "block";
    const data = {
        name : name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }
    
    const jsonData = JSON.stringify(data);
    console.log(typeof jsonData);

    fetch("https://cmrm.onrender.com/sendmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: jsonData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.success) {
            sentMessage.innerHTML = data.message;
            sentMessage.style.display = "block";
            setTimeout(()=>{
                sentMessage.style.display = "none";
            },5000)
          name.value = '';
          email.value = '';
          subject.value = '';
          message.value = '';
        } else {
            errorMessage.innerHTML = data.message;
            errorMessage.style.display = "block";
            setTimeout(()=>{
                errorMessage.style.display = "none";
            },5000);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while sending the email.");
    })
    .finally(() => {
        loadingElement.style.display = "none";
    });
});