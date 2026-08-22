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
    "https://s.shopee.vn/an_redir?origin_link=https%3A%2F%2Fshopee.vn%2Fproduct%2F1702240532%2F56564192697%3Fd_id%3Df5be0%26uls_trackid%3D56eplqjt010s%26utm_content%3D4Ma6q62CzT4gcmfeDDKqg1j7JZWf&affiliate_id=17335630645&sub_id=peeback-golu8ixd8mo9",
    "https://shopeefood.vn/now-food/dish/1173193/290603806?restaurantId=1173193&shareChannel=copy_link+l&utm_source=an_17303480046&utm_medium=affiliate_food&utm_campaign=-&utm_content=501283-a-9d95a7e6ae71",
    "https://www.tiktok.com/t/ZSV5pNW9V/",
    "https://s.lazada.vn/s.M9XK6?c=c&t=p-i27OO7q-s9ixZDr&sub_aff_id=longhousee&sub_id1=501283&sub_id2=a&sub_id3=39aff1723b20"
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