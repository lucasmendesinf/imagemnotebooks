const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const contactForm = document.querySelector("#contact-form");
const phoneInput = document.querySelector("#phone");
const year = document.querySelector("#year");

const formatPhone = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    return digits.length ? `(${digits}` : "";
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    phoneInput.value = formatPhone(phoneInput.value);
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = `Solicitacao de atendimento - ${service}`;
    const body = [
      "Ola, Imagem Notebooks. Gostaria de solicitar atendimento.",
      "",
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `Servico: ${service}`,
      `Descricao: ${message}`,
    ].join("\n");

    window.location.href = `mailto:contato@imagemnotebooks.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
