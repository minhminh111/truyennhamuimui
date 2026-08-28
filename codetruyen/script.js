window.addEventListener("DOMContentLoaded", function () {


  /* ==================================================
     CẤU HÌNH SẢN PHẨM
     CHỈ CẦN SỬA PHẦN NÀY
  ================================================== */

  const products = {

    shopee: {

    link: "https://s.shopee.vn/2gAfLCySns",

    image: "../imgqc/vn-11134207-81ztc-mo57bqj5k54y41.jpg",

    name: "Combo 2 Nước giặt OMO Matic Hương Nước Hoa Comfort 4.1KG (túi)",

    description:"Tê cay đậm vị, ăn là mê 🌶️💕"

  },


    shopeefood: {

    link: "https://spf.shopee.vn/AAGaJBRoWV",

    image: "../imgqc/52188e11-928e-42f8-a1fe-c608def7959d.jpg",

    name: "Deal Best Seller 1K",

    description: "Deal siêu hời, giá chỉ từ 1K 🔥💕"

  }

  };


  /* ==================================================
     FACEBOOK
  ================================================== */

  const facebookRead =
    document.getElementById("facebook-read");

  if (facebookRead) {

    const ref =
      document.referrer.toLowerCase();

    if (
      ref.includes("facebook.com") ||
      ref.includes("m.facebook.com") ||
      ref.includes("l.facebook.com")
    ) {

      facebookRead.style.display = "block";

    }

  }


  /* ==================================================
     ELEMENTS
  ================================================== */

  const modal =
    document.getElementById("modal");

  const story =
    document.getElementById("story");

  const step1Box =
    document.getElementById("step1Box");

  const step2Box =
    document.getElementById("step2Box");


  if (
    !modal ||
    !story ||
    !step1Box ||
    !step2Box
  ) {

    console.error(
      "Không tìm thấy thành phần popup."
    );

    return;

  }


  /* ==================================================
     ĐIỀN SẢN PHẨM BƯỚC 1
  ================================================== */

  const step1Link =
    document.getElementById("step1Link");

  const step1Image =
    document.getElementById("step1Image");

  const step1Name =
    document.getElementById("step1Name");

  const step1Desc =
    document.getElementById("step1Desc");


  if (step1Link) {

    step1Link.href =
      products.shopee.link;

  }


  if (step1Image) {

    step1Image.src =
      products.shopee.image;

    step1Image.alt =
      products.shopee.name;

  }


  if (step1Name) {

    step1Name.textContent =
      products.shopee.name;

  }


  if (step1Desc) {

    step1Desc.textContent =
      products.shopee.description;

  }


  /* ==================================================
     ĐIỀN SẢN PHẨM BƯỚC 2
  ================================================== */

  const step2Link =
    document.getElementById("step2Link");

  const step2Image =
    document.getElementById("step2Image");

  const step2Name =
    document.getElementById("step2Name");

  const step2Desc =
    document.getElementById("step2Desc");


  if (step2Link) {

    step2Link.href =
      products.shopeefood.link;

  }


  if (step2Image) {

    step2Image.src =
      products.shopeefood.image;

    step2Image.alt =
      products.shopeefood.name;

  }


  if (step2Name) {

    step2Name.textContent =
      products.shopeefood.name;

  }


  if (step2Desc) {

    step2Desc.textContent =
      products.shopeefood.description;

  }


  /* ==================================================
     LOCAL STORAGE
  ================================================== */

  const stepKey =
    "reader_step";

  const waitKey =
    "waiting_return";


  let step =
    parseInt(
      localStorage.getItem(stepKey) || "0",
      10
    );


  /* ==================================================
     HIỆN TRUYỆN
  ================================================== */

  function showStory() {

    modal.style.display = "none";

    story.style.display = "block";

  }


  /* ==================================================
     BƯỚC 1
  ================================================== */

  function showStep1() {

    modal.style.display = "flex";

    story.style.display = "none";

    step1Box.style.display = "block";

    step2Box.style.display = "none";

  }


  /* ==================================================
     BƯỚC 2
  ================================================== */

  function showStep2() {

    modal.style.display = "flex";

    story.style.display = "none";

    step1Box.style.display = "none";

    step2Box.style.display = "block";

  }


  /* ==================================================
     TRẠNG THÁI BAN ĐẦU
  ================================================== */

  if (step >= 2) {

    showStory();

  }

  else if (step === 1) {

    showStep2();

  }

  else {

    showStep1();

  }


  /* ==================================================
     CLICK BƯỚC 1
  ================================================== */

  if (step1Link) {

    step1Link.addEventListener(
      "click",
      function () {

        localStorage.setItem(
          waitKey,
          "1"
        );

      }
    );

  }


  /* ==================================================
     CLICK BƯỚC 2
  ================================================== */

  if (step2Link) {

    step2Link.addEventListener(
      "click",
      function () {

        localStorage.setItem(
          waitKey,
          "2"
        );

      }
    );

  }


  /* ==================================================
     QUAY LẠI TRANG
  ================================================== */

  document.addEventListener(
    "visibilitychange",
    function () {

      if (document.hidden) {
        return;
      }


      const waiting =
        localStorage.getItem(waitKey);


      /* BƯỚC 1 → BƯỚC 2 */

      if (
        waiting === "1" &&
        step === 0
      ) {

        step = 1;

        localStorage.setItem(
          stepKey,
          "1"
        );

        localStorage.removeItem(
          waitKey
        );

        showStep2();

      }


      /* BƯỚC 2 → HIỆN TRUYỆN */

      else if (
        waiting === "2" &&
        step === 1
      ) {

        step = 2;

        localStorage.setItem(
          stepKey,
          "2"
        );

        localStorage.removeItem(
          waitKey
        );

        showStory();

      }

    }
  );

});
