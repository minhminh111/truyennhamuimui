window.addEventListener("DOMContentLoaded", function(){

  const modal = document.getElementById("modal");
  const story = document.getElementById("story");
  const unlockBtn = document.getElementById("unlockBtn");

  if(!modal || !story || !unlockBtn){
    console.log("missing element");
    return;
  }

  /* ===== LINK XOAY ===== */
  const links = [
    "https://s.shopee.vn/10zkRbGJLm",
    "https://s.lazada.vn/s.NcuoU?c=b",
    "https://vt.tiktok.com/ZS9FvVXpLV"
  ];

  /* ===== TIME ===== */
  const ONE_HOUR = 3600000;

  function getStartTime(){
    let t = localStorage.getItem("start_time");

    if(!t){
      t = Date.now();
      localStorage.setItem("start_time", t);
    }

    return parseInt(t);
  }

  function getHourIndex(){
    const start = getStartTime();
    const now = Date.now();

    return Math.floor((now - start) / ONE_HOUR);
  }

  function getLink(){
    const index = getHourIndex();
    return links[index % links.length];
  }

  /* ===== CHECK LOCK ===== */
  function checkLock(){

    const start = getStartTime();
    const now = Date.now();

    const diff = now - start;

    // CHƯA MỞ HOẶC HẾT 1 GIỜ → KHÓA
    if(diff >= ONE_HOUR || !localStorage.getItem("start_time")){
      modal.style.display = "flex";
      story.style.display = "none";
    } else {
      modal.style.display = "none";
      story.style.display = "block";
    }
  }

  checkLock();

  /* ===== UNLOCK ===== */
  unlockBtn.addEventListener("click", function(){

    const link = getLink();
    window.open(link, "_blank");

    // reset timer mỗi lần unlock
    localStorage.setItem("start_time", Date.now());

    story.style.display = "block";
    modal.style.display = "none";
  });

  /* ===== AUTO CHECK ===== */
  setInterval(checkLock, 5000);

});