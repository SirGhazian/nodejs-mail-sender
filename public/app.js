document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regForm");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin w-6 h-6 text-slate-900" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      Memproses...
    `;

    const formData = {
      fullName: form.fullName.value,
      email: form.email.value,
      membershipType: form.membershipType.value,
      goals: form.goals.value,
    };

    try {
      const res = await fetch("/api/getbill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: formData.email }),
      });

      if (!res.ok) throw new Error("Gagal mengirim email");

      const emailContent = {
        subject: "Selamat datang di UNP-GYM",
        body: `Halo ${formData.fullName}. Terima kasih sudah mendaftar dengan paket ${formData.membershipType}.`,
      };

      sessionStorage.setItem("userData", JSON.stringify(formData));
      sessionStorage.setItem("emailContent", JSON.stringify(emailContent));

      window.location.href = "/success.html";
    } catch (error) {
      alert("Terjadi kesalahan. Coba lagi.");
      console.error(error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        Daftar Sekarang 
        <i data-lucide="arrow-right" class="w-5 h-5"></i>
      `;
      lucide.createIcons();
    }
  });
});
