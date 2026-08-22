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
    "https://s.shopee.vn/2LXhVBfjRB",
    "https://shopeefood.vn/now-food/presale-deals-detail/3177136171493376?brandId=4097&merchantId=0&restaurantId=1215674&shareChannel=copy_link&stm_medium=referral&stm_source=rw&storeId=null&uls_trackid=56er2ke7013c&utm_source=an_17303480046&utm_medium=affiliate_food&utm_campaign=-&utm_content=501283-a-0af2747833ce",
    "https://www.tiktok.com/t/ZSVaYMpBn/",
    "https://s.lazada.vn/s.MPUXo?c=d&t=p-i27Oaj3-s9iwh3K&sub_aff_id=longhousee&sub_id1=501283&sub_id2=a&sub_id3=bc83be96bc59"
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