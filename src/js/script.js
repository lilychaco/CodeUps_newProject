
jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  //ハンバーガーボタンクリックで、ドロワーメニューの開閉
  $("#js-hamburger").click(function () {
    //toggleClassでclassをつけたり外したりする
    $("body").toggleClass("is-drawerActive");
    //attr()でaria-expandedがfalseの場合、thisはクリックした要素そのもの
    if ($(this).attr("aria-expanded") == "false") {
      $(this).attr("aria-expanded", true);
      //jQueryでcss操作、アニメーションにはdisplayではなく、visibilityを使う
      $("#js-global-menu").css("visibility", "visible");
      $("#js-global-menu").attr("aria-hidden", "false");
    } else {
      $(this).attr("aria-expanded", false);
      $("#js-global-menu").css("visibility", "hidden");
      $("#js-global-menu").attr("aria-hidden", "true");
    }
  });

  $("#js-global-menu a").click(function () {
    //ドロワーのリンクがクリックされたら
    $("body").toggleClass("is-drawerActive");
    $("#js-hamburger").attr("aria-expanded", false);
    $("#js-global-menu").css("visibility", "hidden");
    $("#js-global-menu").attr("aria-hidden", "true");
    $("#js-drawer-background").removeClass("is-drawerActive"); //ドロワーからis-activeクラスを外す
  });

  //ブラウザの高さを取得して、高さを指定する
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  //FVのスライダー用
  let fvSlider = new Swiper(".js-fv-swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    effect: "fade", //フェード切り替え
    autoplay: {
      delay: 4000, //4秒後に次のスライドへ
      disableOnInteraction: false, //ユーザーが操作しても自動再生を継続
    },
    speed: 2000,
  });

  //campaignのスライダー用
  let campaignSlider = new Swiper(".js-campaign-swiper", {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 2000,
    slidesPerView: "auto", // スライドの数を自動調整
    // 前後の矢印
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      769: {
        // 769px以上のデバイスでの設定
        slidesPerView: "auto", // PCでは3枚半表示
      },
    },
  });

	//画像に色背景がついてから、写真が出てくる
  //要素の取得とスピードの設定
  let box = $(".colorbox"),
    speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($(".color")),
      image = $(this).find("img");
    var counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  });

  const topBtn = $(".js-page-top-button");
  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      1000,
      "easeOutCubic"
    );
    return false;
  });
});
