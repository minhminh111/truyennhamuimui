window.addEventListener("DOMContentLoaded", function () {
  const facebookRead = document.getElementById("facebook-read");

  if(facebookRead){

      let ref = document.referrer.toLowerCase();

      if(
          ref.includes("facebook.com") ||
          ref.includes("m.facebook.com") ||
          ref.includes("l.facebook.com")
      ){

          facebookRead.style.display="block";

      }

  }
  const modal = document.getElementById("modal");
  const story = document.getElementById("story");
  const unlockBtn = document.getElementById("unlockBtn");

  if (!modal || !story || !unlockBtn) return;

  /* ===== LINK QUẢNG CÁO ===== */

  const links = [
    "https://s.shopee.vn/8pkHCDFJyN",
    "https://spf.shopee.vn/5VTmfNL2aW",
    "https://vt.tiktok.com/ZS9MKTCuDLMjp-APqdd/",
    "https://s.lazada.vn/s.nL1hz?c=t&t=p-iuZyNd-s2X6cwV"
  ];

  /* ===== KEY ===== */

  const today = new Date().toDateString();

  const unlockKey = "unlock_all_day";
  const stepKey = "ad_step";
  const waitKey = "waiting_return";

  /* ===== MỞ KHÓA ===== */

  function unlockStory() {
    modal.style.display = "none";
    story.style.display = "block";
  }

  /* ===== KHÓA ===== */

  function lockStory() {
    modal.style.display = "flex";
    story.style.display = "none";
  }

  /* ===== ĐÃ MỞ HÔM NAY ===== */

  if (localStorage.getItem(unlockKey) === today) {
    unlockStory();
    return;
  }

  lockStory();

  let step = parseInt(localStorage.getItem(stepKey) || "0");

  /* ===== CẬP NHẬT NÚT ===== */

  function updateButton() {

    if (step >= links.length) {

      localStorage.setItem(unlockKey, today);
      localStorage.removeItem(stepKey);
      localStorage.removeItem(waitKey);

      unlockStory();

      return;
    }

    unlockBtn.disabled = false;

    unlockBtn.textContent =
      `Xem quảng cáo ${step + 1}/${links.length}`;
  }

  updateButton();

  /* ===== CLICK ===== */

  unlockBtn.addEventListener("click", function () {

    if (step >= links.length) return;

    localStorage.setItem(waitKey, "1");

    unlockBtn.disabled = true;
    unlockBtn.textContent = "Quay lại trang để tiếp tục...";

    window.open(links[step], "_blank");

  });

  /* ===== PHÁT HIỆN QUAY LẠI ===== */

  document.addEventListener("visibilitychange", function () {

    if (!document.hidden) {

      const waiting =
        localStorage.getItem(waitKey);

      if (waiting === "1") {

        step++;

        localStorage.setItem(stepKey, step);
        localStorage.removeItem(waitKey);

        updateButton();
      }
    }
  });
  

});