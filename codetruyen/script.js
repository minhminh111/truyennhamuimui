window.addEventListener("DOMContentLoaded", function(){

  const modal = document.getElementById("modal");
  const story = document.getElementById("story");
  const unlockBtn = document.getElementById("unlockBtn");

  if(!modal || !story || !unlockBtn){
    return;
  }

  /* ===== LINK QUẢNG CÁO ===== */

  const links = [
    "https://s.shopee.vn/5L92lmNEck",
      "https://spf.shopee.vn/1qZCeQZKoe",
    "https://s.lazada.vn/s.NRNiY?c=b&t=p-i2uxEO7-sEI0GJy",
    "https://vt.tiktok.com/ZS9YwCNL1xbgF-WBIOS/"
  ];

  /* ===== 20 PHÚT ===== */

  const LOCK_TIME = 20 * 60 * 1000;

  /* ===== STORY ID ===== */

  const storyId = location.pathname;

  /* ===== NGÀY HÔM NAY ===== */

  const today =
    new Date().toDateString();

  /* ===== RESET QUẢNG CÁO MỖI NGÀY ===== */

  const savedDay =
    localStorage.getItem("adDay");

  if(savedDay !== today){

    // reset về Shopee
    localStorage.setItem("adIndex", 0);

    // lưu ngày mới
    localStorage.setItem("adDay", today);

  }

  /* ===== LẤY LINK ===== */

  function getLink(){

    let adIndex =
      parseInt(localStorage.getItem("adIndex") || 0);

    const link =
      links[adIndex];

    // tăng quảng cáo
    adIndex++;

    // quay vòng
    if(adIndex >= links.length){
      adIndex = 0;
    }

    localStorage.setItem(
      "adIndex",
      adIndex
    );

    return link;
  }

  /* ===== CHECK KHÓA ===== */

  function checkLock(){

    const unlockTime =
      localStorage.getItem("unlock_" + storyId);

    if(!unlockTime){

      lockStory();
      return;

    }

    const now = Date.now();

    const diff =
      now - parseInt(unlockTime);

    if(diff >= LOCK_TIME){

      lockStory();

    }else{

      unlockStory();

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

    const link = getLink();

    window.open(link, "_blank");

    localStorage.setItem(
      "unlock_" + storyId,
      Date.now()
    );

    unlockStory();

  });

  /* ===== START ===== */

  checkLock();

  /* ===== AUTO CHECK ===== */

  setInterval(checkLock, 5000);

});