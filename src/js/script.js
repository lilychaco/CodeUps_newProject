
jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  //ハンバーガーボタンクリックで、ドロワーメニューの開閉
  $("#js-hamburger").click(function () {
    //toggleClassでclassをつけたり外したりする
    $("body").toggleClass("is-drawerActive");

    // aria-expandedの状態を切り替える
    let isExpanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", !isExpanded);

    // メニューの可視性を切り替える
    let visibility = !isExpanded ? "visible" : "hidden";
    $("#js-global-menu").css("visibility", visibility);
    $("#js-global-menu").attr("aria-hidden", isExpanded);
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
  function setVh() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  // ページ読み込み時とウィンドウサイズ変更時に実行
  window.addEventListener("load", setVh);
  window.addEventListener("resize", setVh);

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
      nextEl: ".custom-swiper-button-next",
      prevEl: ".custom-swiper-button-prev",
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

  // タブメニュー
  $(function () {
    // 最初のコンテンツは表示
    $(".js-content:first-of-type").css("display", "block");
    // タブをクリックすると
    $(".js-tab").on("click", function () {
      // 現在選択されているタブからcurrentを外す
      $(".current").removeClass("current");
      // クリックされたタブにcurrentクラスを付与
      $(this).addClass("current");
      // クリックされた要素が何番目か取得（クリックしたタブのインデックス番号を取得）
      const index = $(this).index();
      // コンテンツを非表示にして、クリックしたタブのインデックス番号と同じコンテンツを表示
      $(".js-content").hide().eq(index).fadeIn(300);
    });
	});

//サイドバーのアーカイブ
	$(document).ready(function () {
    // 年度タイトルをクリックしたときのイベント
		$(".js-year-toggle").click(function () {
      // この要素の兄弟要素である月リストの表示/非表示を切り替えます
      var $monthList = $(this).next(".side-archive__month-list");
      // 他のすべての月リストを隠します
      $(".side-archive__month-list").not($monthList).slideUp();
			//月リストの表示/非表示を切り替えます
			$monthList.slideToggle();

			// 既にアクティブな状態であれば、クラスを削除し、それ以外の場合はアクティブクラスを追加
        if ($(this).parent(".side-archive__year").hasClass("active")) {
          // クリックされた要素が既にアクティブな場合、トグル動作後にクラスを削除
          $(this).parent(".side-archive__year").removeClass("active");
        } else {
          // 他のアクティブクラスを削除し、現在の要素にアクティブクラスを追加
          $(".side-archive__year").removeClass("active");
          $(this).parent(".side-archive__year").addClass("active");
        }
    });
	});

	//アコーデイオン
		$(".js-accordion-top").on("click", function () {
      // クリックした次の要素(コンテンツ)を開閉
      $(this).next().slideToggle(300);
      // topにopenクラスを付け外ししてcheckboxを
      $(this).toggleClass("is-open", 300);
    });

	//

  $('#campaign-select').change(function() {
    var wrapper = $(this).closest('.form__row-select-wrapper');
    if ($(this).val() === "") {
      // デフォルトの「キャンペーン内容を選択」が選択されている場合は、三角を表示する
      wrapper.removeClass('no-triangle');
    } else {
      // それ以外の項目が選択された場合は、三角を非表示にする
      wrapper.addClass('no-triangle');
    }
  });


	//モーダル
	$(".js-modal-open").each(function () {
		$(this).on("click", function () {
      var target = $(this).data("target");
      var modal = document.getElementById(target);
      $(modal).fadeIn();
      return false;
    });
  });
  $(".js-modal-close").on("click", function () {
		$(".js-modal").fadeOut();
		// $("body,html").stop().animate({ scrollTop: winScrollTop }, 100);
    return false;
	});

	//問い合わせフォームの未入力時の対応
$(document).ready(function () {
  $("form").submit(function (e) {
    var isFormValid = true;

    // 必須フィールドをチェック
    $(
      'input[type="text"], input[type="email"], input[type="phone"], textarea'
    ).each(function () {
      if ($.trim($(this).val()).length == 0) {
        $(this).addClass("input-error"); // エラークラスを追加
        isFormValid = false;
      } else {
        $(this).removeClass("input-error"); // エラークラスを削除
      }
    });

    // ラジオボタンのチェック
    var radioGroups = $('input[type="radio"]')
      .map(function () {
        return $(this).attr("name");
      })
      .get();

    $.each($.unique(radioGroups), function (i, name) {
      if ($('input[name="' + name + '"]:checked').length == 0) {
        isFormValid = false;
        // ここでは、ラジオボタンの視覚的フィードバックを特に設定していませんが、必要に応じて追加できます
      }
    });

    // チェックボックスの検証（例: プライバシーポリシー同意チェックボックス）
    if (!$('input[type="checkbox"][name="privacy"]').is(":checked")) {
      isFormValid = false;
      // ここでも視覚的フィードバックを追加できます
    }

    if (!isFormValid) {
      e.preventDefault(); // フォームの送信を阻止
      window.location.href = "page-contact-error.html"; // エラーページへリダイレクト
    }
  });
});

});
