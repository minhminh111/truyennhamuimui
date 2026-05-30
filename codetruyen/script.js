window.addEventListener("DOMContentLoaded", function(){

  const modal = document.getElementById("modal");
  const story = document.getElementById("story");
  const unlockBtn = document.getElementById("unlockBtn");

  if(!modal || !story || !unlockBtn){
    return;
  }

  /* ===== LINK QUẢNG CÁO ===== */

  const links = [
    "https://s.shopee.vn/6VL5AJCNcX",
    "https://spf.shopee.vn/2BC60QHzMm",
    "https://s.lazada.vn/s.NkFXz?c=b&t=p-i26A0Np-s9b4OGl",
    "https://www.tiktok.com/@zyl000111?_r=1&_t=ZS-96n1OkqTmLZ"
  ];

  /* ===== NGÀY HÔM NAY ===== */

  const today = new Date().toDateString();

  /* ===== KEY MỞ KHÓA ===== */

  const unlockKey = "unlock_all_day";

  /* ===== CHECK KHÓA ===== */

  function checkLock(){

    const unlockedDay =
      localStorage.getItem(unlockKey);

    if(unlockedDay === today){

      unlockStory();

    }else{

      lockStory();

    }

  }

  /* ===== KHÓA ===== */

  function lockStory(){

    modal.style.display = "flex";
    story.style.display = "none";

  }

  /* ===== MỞ KHÓA ===== */

  function unlockStory(){

    modal.style.display = "none";
    story.style.display = "block";

  }

  /* ===== CLICK MỞ KHÓA ===== */

  unlockBtn.addEventListener("click", function(){

    links.forEach(link => {
      window.open(link, "_blank");
    });

    localStorage.setItem(
      unlockKey,
      today
    );

    unlockStory();

  });

  /* ===== START ===== */

  checkLock();

});