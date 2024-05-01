jQuery(function ($) {
  // ドキュメントが読み込まれた時に実行される
  $(document).ready(function () {
    // ハンバーガーボタンクリックで、ドロワーメニューの開閉
    $("#js-hamburger").click(function () {
      $("body").toggleClass("is-drawerActive");

      let isExpanded = $(this).attr("aria-expanded") === "true";
      $(this).attr("aria-expanded", !isExpanded);
      $("#js-global-menu")
        .css("visibility", isExpanded ? "hidden" : "visible")
        .attr("aria-hidden", isExpanded);
    });

    // ドロワーのリンクがクリックされたらメニューを閉じる
    $("#js-global-menu a").click(function () {
      $("body").toggleClass("is-drawerActive");
      $("#js-hamburger").attr("aria-expanded", false);
      $("#js-global-menu")
        .css("visibility", "hidden")
        .attr("aria-hidden", "true");
      $("#js-drawer-background").removeClass("is-drawerActive");
    });

    // ボタンをクリックしてページトップに戻る
    $(".js-page-top-button").click(function () {
      $("body,html").animate({ scrollTop: 0 }, 1000, "swing");
      return false;
    });

    // タブメニューの初期設定
    $(".js-content:first-of-type").show();
    $(".js-tab").on("click", function () {
      $(".current").removeClass("current");
      $(this).addClass("current");
      const index = $(this).index();
      $(".js-content").hide().eq(index).fadeIn(300);
    });

    // アーカイブメニューの動作
    $(".js-year-toggle").click(function () {
      var $monthList = $(this).next(".side-archive__month-list");
      $(".side-archive__month-list").not($monthList).slideUp();
      $monthList.slideToggle();
      $(this).parent(".side-archive__year").toggleClass("active");
    });

    // アコーディオンの動作
    $(".js-accordion-top").click(function () {
      $(this).next().slideToggle(-300);
      $(this).toggleClass("is-close");
    });

    // モーダルの開閉
    $(".js-modal-open").click(function () {
      var target = $(this).data("target");
      $("#" + target).fadeIn();
      return false;
    });

    $(".js-modal-close").click(function () {
      $(".js-modal").fadeOut();
      return false;
    });

    // フォーム送信時の検証
    $("form").submit(function (e) {
      var isFormValid = true;

      $('input[type="text"], input[type="email"], textarea').each(function () {
        if ($.trim($(this).val()) === "") {
          $(this).addClass("input-error");
          isFormValid = false;
        } else {
          $(this).removeClass("input-error");
        }
      });

      $.each(
        $.unique(
          $('input[type="radio"]')
            .map(function () {
              return $(this).attr("name");
            })
            .get()
        ),
        function (i, name) {
          if ($('input[name="' + name + '"]:checked').length === 0) {
            isFormValid = false;
          }
        }
      );

      if (!$('input[type="checkbox"][name="privacy"]').is(":checked")) {
        isFormValid = false;
      }

      if (!isFormValid) {
        e.preventDefault();
        window.location.href = "page-contact-error.html";
      }
    });
  });

  // 画面の高さを取得してCSS変数として設定
  function setVh() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  window.addEventListener("load", setVh);
  window.addEventListener("resize", setVh);
});
