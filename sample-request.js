const sampleForm = document.getElementById("sample-request-form");

if (sampleForm) {
  const submitButton = document.getElementById("sample-submit");
  const status = document.getElementById("sample-status");
  const unlocked = document.getElementById("sample-unlocked");

  sampleForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = "Preparing your sample…";
    status.textContent = "";

    const formData = new FormData(sampleForm);
    const payload = {
      email: formData.get("email"),
      name: formData.get("name"),
      company: formData.get("company"),
      website: formData.get("website"),
      source: "bimigrate.com/sample",
    };

    try {
      const response = await fetch(
        "https://bimigrate-666564541749.asia-south1.run.app/api/v1/sample-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || "Unable to process your request.");
      }

      document.getElementById("sample-zip").href = result.sample_zip;
      document.getElementById("sample-pdf").href = result.sample_pdf;
      unlocked.hidden = false;
      status.textContent = "Your sample is ready. Choose the ZIP or PDF below.";
      submitButton.hidden = true;
    } catch (error) {
      status.textContent =
        error.message ||
        "Please try again, or email sales@bimigrate.com and we’ll send it.";
      submitButton.disabled = false;
      submitButton.textContent = "Get the sample pack";
    }
  });
}
