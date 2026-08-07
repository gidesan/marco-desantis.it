// Mobile nav toggle
document.querySelectorAll("[data-nav-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const mobile = document.querySelector("[data-nav-mobile]");
    mobile.classList.toggle("is-open");
    const isOpen = mobile.classList.contains("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.querySelector("[data-icon-menu]").style.display = isOpen ? "none" : "block";
    btn.querySelector("[data-icon-close]").style.display = isOpen ? "block" : "none";
  });
});

// Hero scroll-to
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.getAttribute("data-scroll-to"));
    target?.scrollIntoView({ behavior: "smooth" });
  });
});

// Contact form -> mailto
const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const subject = data.get("subject") || "";
    const message = data.get("message") || "";
    const body = `Nome: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:marcoignazio.desantis@gmail.com?subject=${encodeURIComponent(
      String(subject)
    )}&body=${encodeURIComponent(body)}`;
  });
}
