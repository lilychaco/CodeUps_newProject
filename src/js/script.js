
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

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


  //campaignのスライダー用
  let campaignSlider = new Swiper(".js-campaign-swiper", {
		loop: true,
    autoplay: {
      delay: 2000,
    },
		speed: 2000,
		slidesPerView: 'auto', // スライドの数を自動調整
    breakpoints: {
        769: { // 769px以上のデバイスでの設定
            slidesPerView: 3.5, // PCでは3枚半表示
        }
    }
  });


















});
