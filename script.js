document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });
  }

  document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  document.querySelectorAll(".prev-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  document.querySelectorAll(".category-option").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".category-option").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      document.getElementById("category").value = opt.dataset.value;

      if (opt.dataset.value === "Travel") {
        document.getElementById("travelModeStep").style.display = "block";
      } else {
        document.getElementById("travelModeStep").style.display = "none";
        document.getElementById("expenseDetailsStep").style.display = "block";
      }
    });
  });

  document.getElementById("travelMode").addEventListener("change", (e) => {
    const val = e.target.value;
    document.getElementById("ownCarFields").style.display = val === "own_car" ? "block" : "none";
    document.getElementById("publicTransportFields").style.display = val !== "own_car" ? "block" : "none";
  });

  showStep(currentStep);
});

  function updateProgress() {
    const percent = ((currentStep + 1) / steps.length) * 100;
    document.getElementById("progressIndicator").style.width = percent + "%";
  }

  const form = document.getElementById("expenseForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.style.display = "none";
    document.querySelector(".progress-bar").style.display = "none";
    document.getElementById("thankYou").style.display = "block";

    // optionally send to Formspree
    const formData = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });
  });

  // Ensure progress is updated on step change
  const originalShowStep = showStep;
  showStep = (index) => {
    originalShowStep(index);
    updateProgress();
  };
  updateProgress();
