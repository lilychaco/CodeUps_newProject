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
			$(this).next().slideToggle(300);
			$(this).toggleClass("is-close");
		});

		// モーダルの開閉
		$(".js-modal-open").click(function () {
			var target = $(this).data("target");
			var innerWidth = $(".inner").width(); // .inner要素の現在の幅を取得
			var modalWidth = innerWidth * 0.85; // 幅の85%を計算
			$("#" + target)
				.find(".modal__content")
				.css("width", modalWidth + "px"); // 計算した幅をモーダルのコンテンツに設定
			$("#" + target).fadeIn();
			$("body").css("overflow", "hidden"); // スクロール禁止
			return false;
		});

		$(".js-modal-close").click(function () {
			$(".js-modal").fadeOut();
			$("body").css("overflow", "auto"); // スクロールを許可
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
				window.location.href = "page-error.html";
			}
		});
	});

	// 画面の高さを取得してCSS変数として設定
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
	var box = $(".colorbox"),
		speed = 700;

	//.colorboxの付いた全ての要素に対して下記の処理を行う
	box.each(function () {
		$(this).append('<div class="color"></div>');
		var color = $(this).find($(".color")),
			image = $(this).find("img");
		var counter = 0;
		image.css('opacity', '0');
		color.css('width', '0%');

		//inviewを使って背景色が画面に現れたら処理をする
		color.on('inview', function () {
			if (counter == 0) {
				$(this).delay(200).animate({ 'width': '100%' }, speed, function () {
					image.css('opacity', '1');
					$(this).css({ 'left': '0', 'right': 'auto' });
					$(this).animate({ 'width': '0%' }, speed);
				})
				counter = 1;
			}
		});
	});





});
