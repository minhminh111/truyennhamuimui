window.addEventListener("DOMContentLoaded", function(){

  const modal = document.getElementById("modal");
  const story = document.getElementById("story");
  const unlockBtn = document.getElementById("unlockBtn");

  if(!modal || !story || !unlockBtn){
    return;
  }

  /* ===== LINK QUẢNG CÁO ===== */

  const links = [
    "https://s.shopee.vn/2Vof7lPU48",
    "https://s.lazada.vn/s.N4XIF?c=a&t=p-iEXBsm1-s22q1ZAN",
    "https://vt.tiktok.com/ZS9FvVXpLV"
  ];

  /* ===== 20 PHÚT ===== */

  const LOCK_TIME = 20 * 60 * 1000;

  /* ===== STORY ID ===== */

  const storyId = location.pathname;

  /* ===== LẤY LINK QUẢNG CÁO ===== */

  function getLink(){

    // lấy vị trí quảng cáo hiện tại
    let adIndex =
      parseInt(localStorage.getItem("adIndex") || 0);

    // lấy link
    const link = links[adIndex];

    // tăng index
    adIndex++;

    // quay lại từ đầu
    if(adIndex >= links.length){
      adIndex = 0;
    }

    // lưu lại
    localStorage.setItem("adIndex", adIndex);

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

    // hết thời gian → khóa lại
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

    // lấy quảng cáo
    const link = getLink();

    // mở quảng cáo
    window.open(link, "_blank");

    // lưu thời gian mở khóa
    localStorage.setItem(
      "unlock_" + storyId,
      Date.now()
    );

    // hiện truyện
    unlockStory();

  });

  /* ===== BẮT ĐẦU ===== */

  checkLock();

  /* ===== AUTO CHECK ===== */

  setInterval(checkLock, 5000);

});