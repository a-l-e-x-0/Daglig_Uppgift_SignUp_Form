const form = document.querySelector("#signupForm");
const step1 = document.querySelector("#step1");
const step2 = document.querySelector("#step2");
const step3 = document.querySelector("#step3");
const indicator1 = document.querySelector("#stepIndicator1");
const indicator2 = document.querySelector("#stepIndicator2");
const indicator3 = document.querySelector("#stepIndicator3");

let currentStep = 1;

function validateEmail(email) {
  return email !== "" && email.includes("@");
}

function validatePassword(password) {
  return password.length >= 8;
}

function validateName(name) {
  return name.trim().length >= 2;
}

function validateAge(age) {
  return age >= 18 && age <= 120;
}

function showStep(step) {
  step1.classList.remove("active");
  step2.classList.remove("active");
  step3.classList.remove("active");

  indicator1.classList.remove("active");
  indicator2.classList.remove("active");
  indicator3.classList.remove("active");

  if (step === 1) {
    step1.classList.add("active");
    indicator1.classList.add("active");
  }

  if (step === 2) {
    step2.classList.add("active");
    indicator2.classList.add("active");
  }

  if (step === 3) {
    step3.classList.add("active");
    indicator3.classList.add("active");
  }

  currentStep = step;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  document.querySelector("#error1").textContent = "";
  document.querySelector("#error2").textContent = "";
  document.querySelector("#error3").textContent = "";

  if (currentStep === 1) {
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    if (!validateEmail(email)) {
      document.querySelector("#error1").textContent =
        "Enter a valid email containing @.";
      return;
    }

    if (!validatePassword(password)) {
      document.querySelector("#error1").textContent =
        "Password must be at least 8 characters.";
      return;
    }

    if (password !== confirmPassword) {
      document.querySelector("#error1").textContent = "Passwords do not match.";
      return;
    }

    showStep(2);
  } else if (currentStep === 2) {
    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();
    const age = Number(document.querySelector("#age").value);

    if (!validateName(firstName)) {
      document.querySelector("#error2").textContent =
        "First name must be at least 2 characters.";
      return;
    }

    if (!validateName(lastName)) {
      document.querySelector("#error2").textContent =
        "Last name must be at least 2 characters.";
      return;
    }

    if (!validateAge(age)) {
      document.querySelector("#error2").textContent =
        "Age must be between 18 and 120.";
      return;
    }

    document.querySelector("#summaryEmail").textContent = document
      .querySelector("#email")
      .value.trim();

    document.querySelector("#summaryFirstName").textContent = firstName;

    document.querySelector("#summaryLastName").textContent = lastName;

    document.querySelector("#summaryAge").textContent = age;

    showStep(3);
  } else if (currentStep === 3) {
    const customer = {
      id: 1,
      email: document.querySelector("#email").value.trim(),
      firstName: document.querySelector("#firstName").value.trim(),
      lastName: document.querySelector("#lastName").value.trim(),
      age: Number(document.querySelector("#age").value),
    };

    const json = JSON.stringify(customer);

    console.log(customer);
    console.log(json);

    document.querySelector("#jsonOutput").textContent = json;

    localStorage.setItem("customer", json);

    document.querySelector("#success").textContent = "Account created!";

    form.reset();

    showStep(1);
  }
});

document.querySelector("#backButton").addEventListener("click", function () {
  showStep(1);
});

document.querySelector("#backButton2").addEventListener("click", function () {
  showStep(2);
});
