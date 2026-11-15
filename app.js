/* FritzAnto Tax Services — site configuration + booking form.
   UPDATE ALL BUSINESS DETAILS HERE: one place, whole site updates.
   The form opens the visitor's email app addressed to the email below,
   and the "Email us" button uses the same address. */
var CONFIG = {
  businessName: "FritzAnto Tax Services",
  phoneDisplay: "786-443-5515",
  phoneHref: "tel:+17864435515",
  email: "fgerald68@yahoo.com", // Dad's email — form + "Email us" both use this
  addressLines: ["8269 NE 2nd Ave", "Miami, FL 33138"],
  addressOneLine: "8269 NE 2nd Ave, Miami, FL 33138",
  hours: "Available 7 AM - 7 PM",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=8269+NE+2nd+Ave+Miami+FL+33138",
  services: ["Life Insurance", "Health Insurance", "Notary Services", "Tax Services"]
};

(function () {
  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Wire email + map links from config
  var emailLink = document.getElementById("emailLink");
  if (emailLink) {
    emailLink.href = "mailto:" + CONFIG.email;
    emailLink.textContent = CONFIG.email;
  }
  var mapLink = document.getElementById("mapLink");
  if (mapLink) mapLink.href = CONFIG.mapUrl;

  // Service quick links pre-select the service in the form
  var serviceLinks = document.querySelectorAll("[data-service]");
  serviceLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      var select = document.getElementById("fService");
      if (select) select.value = link.getAttribute("data-service");
    });
  });

  // Consultation date/time fields show only for consultation requests
  var consultFields = document.getElementById("consultFields");
  var dateInput = document.getElementById("fDate");
  var timeSelect = document.getElementById("fTime");
  var typeRadios = document.querySelectorAll('input[name="requestType"]');

  // No past dates: earliest selectable date is today
  if (dateInput) {
    var today = new Date();
    var iso = today.getFullYear() + "-" +
      String(today.getMonth() + 1).padStart(2, "0") + "-" +
      String(today.getDate()).padStart(2, "0");
    dateInput.min = iso;
  }

  function syncRequestType() {
    var selected = document.querySelector('input[name="requestType"]:checked');
    var isConsult = selected && selected.value === "consultation";
    if (consultFields) consultFields.hidden = !isConsult;
  }
  typeRadios.forEach(function (r) { r.addEventListener("change", syncRequestType); });
  syncRequestType();

  // Submit: validate, then open the visitor's email app with everything filled in
  var form = document.getElementById("consultForm");
  var errorEl = document.getElementById("formError");
  var successEl = document.getElementById("bookSuccess");
  var successText = document.getElementById("successText");
  var retryMail = document.getElementById("retryMail");

  function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.hidden = false;
    errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function buildMailto(data) {
    var isConsult = data.requestType === "consultation";
    var subject = "New " + data.service + " " +
      (isConsult ? "consultation request" : "message") + " from " + data.name;
    var lines = [
      "Name: " + data.name,
      "Phone: " + data.phone,
      "Email: " + (data.email || "(not provided)"),
      "Service: " + data.service,
      "Request: " + (isConsult ? "Book a free consultation" : "Send a message")
    ];
    if (isConsult) {
      lines.push("Preferred date: " + data.date);
      lines.push("Preferred time: " + data.time);
    }
    if (data.message) lines.push("", "Message:", data.message);
    lines.push("", "— Sent from the FritzAnto Tax Services website");
    return "mailto:" + CONFIG.email +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (errorEl) errorEl.hidden = true;

      var name = document.getElementById("fName").value.trim();
      var phone = document.getElementById("fPhone").value.trim();
      var email = document.getElementById("fEmail").value.trim();
      var service = document.getElementById("fService").value;
      var requestType = (document.querySelector('input[name="requestType"]:checked') || {}).value;
      var date = dateInput ? dateInput.value : "";
      var time = timeSelect ? timeSelect.value : "";
      var message = document.getElementById("fMessage").value.trim();

      if (!name) return showError("Please add your name so we know who is reaching out.");
      if (!phone) return showError("Please add your phone number so we can confirm your request.");
      if (!service) return showError("Please choose the service you need.");
      if (requestType === "consultation") {
        if (!date) return showError("Please pick a preferred date for your consultation.");
        if (!time) return showError("Please pick a preferred time for your consultation.");
      }

      var data = {
        name: name, phone: phone, email: email, service: service,
        requestType: requestType, date: date, time: time, message: message
      };
      var mailto = buildMailto(data);
      window.location.href = mailto;
      if (retryMail) retryMail.href = mailto;

      var summary = requestType === "consultation"
        ? "Thanks, " + name + ". Your email asks for a free " + service +
          " consultation on " + date + " at " + time + ". We will confirm your time by phone or email."
        : "Thanks, " + name + ". Your email about " + service + " is ready to send.";
      if (successText) successText.textContent = summary;
      form.hidden = true;
      if (successEl) {
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
})();
