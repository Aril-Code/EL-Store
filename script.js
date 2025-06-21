// Navigasi gambar
function nextSlide(btn) {
  const slider = btn.closest(".slider");
  const images = slider.querySelectorAll("img");
  let current = [...images].findIndex((img) =>
    img.classList.contains("active")
  );
  images[current].classList.remove("active");
  let next = (current + 1) % images.length;
  images[next].classList.add("active");
}

function prevSlide(btn) {
  const slider = btn.closest(".slider");
  const images = slider.querySelectorAll("img");
  let current = [...images].findIndex((img) =>
    img.classList.contains("active")
  );
  images[current].classList.remove("active");
  let prev = (current - 1 + images.length) % images.length;
  images[prev].classList.add("active");
}

// Swipe gesture
let xDown = null;
function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
}

function handleTouchEnd(evt) {
  if (!xDown) return;
  let xUp = evt.changedTouches[0].clientX;
  let diffX = xDown - xUp;
  const slider = evt.currentTarget;
  if (Math.abs(diffX) > 30) {
    const btn = slider.querySelector(diffX > 0 ? ".right" : ".left");
    btn.click();
  }
  xDown = null;
}

function openCheckout(name, price, waText) {
  document.getElementById("checkoutModal").classList.remove("hidden");
  document.getElementById("itemName").textContent = name;
  document.getElementById("itemPrice").textContent = price;
  document.getElementById(
    "waLink"
  ).href = `https://wa.me/6281299166176?text=${encodeURIComponent(waText)}`;
}

function closeModal() {
  document.getElementById("checkoutModal").classList.add("hidden");
}

function copyDana() {
  navigator.clipboard.writeText("081299166176").then(() => {
    alert("Nomor Dana telah disalin!");
  });
}

function openCSChat(text) {
  const waUrl = `https://wa.me/6281299166176?text=${encodeURIComponent(text)}`;
  window.open(waUrl, "_blank");
}

// Handle tombol checkout & sold
document.querySelectorAll(".btn, .btn-sold").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const isSold =
      btn.classList.contains("btn-sold") || btn.dataset.status === "sold";

    if (isSold) {
      e.preventDefault();
      alert("Maaf, akun ini sudah terjual!");
    } else {
      const card = btn.closest(".card");
      const name = card.querySelector("h2")?.textContent || "Akun";
      const price = card.querySelector(".price")?.textContent || "Rp -";
      const waText = `Halo min, saya telah checkout ${name} di EL Store.`;

      openCheckout(name, price, waText);
      // 🚫 Tidak ada alert di sini lagi
    }
  });
});

// ✅ Tambahkan alert khusus hanya saat klik "Lanjut ke WhatsApp"
document.getElementById("waLink").addEventListener("click", () => {
  alert("Kamu akan diarahkan ke WhatsApp.");
});
