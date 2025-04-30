(function ($) {

  "use strict";

  // init jarallax parallax
  var initJarallax = function () {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-img"), {
      keepImg: true,
    });
  }

  // input spinner
  var initProductQty = function(){

    $('.product-qty').each(function(){

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('.quantity').val());
          $el_product.find('.quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('.quantity').val());
          if(quantity>0){
            $el_product.find('.quantity').val(quantity - 1);
          }
      });

    });

  }

  // init Chocolat light box
	var initChocolat = function () {
		Chocolat(document.querySelectorAll('.image-link'), {
			imageSize: 'contain',
			loop: true,
		})
	}

  // Animate Texts
  var initTextFx = function () {
    $('.txt-fx').each(function () {
      var newstr = '';
      var count = 0;
      var delay = 0;
      var stagger = 10;
      var words = this.textContent.split(/\s/);
      
      $.each( words, function( key, value ) {
        newstr += '<span class="word">';

        for ( var i = 0, l = value.length; i < l; i++ ) {
          newstr += "<span class='letter' style='transition-delay:"+ ( delay + stagger * count ) +"ms;'>"+ value[ i ] +"</span>";
          count++;
        }
        newstr += '</span>';
        newstr += "<span class='letter' style='transition-delay:"+ delay +"ms;'>&nbsp;</span>";
        count++;
      });

      this.innerHTML = newstr;
    });
  }

  $(document).ready(function () {

    initProductQty();
    initJarallax();
    initChocolat();
    initTextFx();

    $(".user-items .search-item").click(function () {
      $(".search-box").toggleClass('active');
      $(".search-box .search-input").focus();
    });
    $(".close-button").click(function () {
      $(".search-box").toggleClass('active');
    });

    var breakpoint = window.matchMedia('(max-width:61.93rem)');

    if (breakpoint.matches === false) {
      
      var swiper = new Swiper(".main-swiper", {
        slidesPerView: 1,
        spaceBetween: 48,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          900: {
            slidesPerView: 2,
            spaceBetween: 48,
          },
        },
      });

      // homepage 2 slider
      var swiper = new Swiper(".thumb-swiper", {
        direction: 'horizontal',
        slidesPerView: 6,
        spaceBetween: 6,
        breakpoints: {
          900: {
            direction: 'vertical',
            spaceBetween: 6,
          },
        },
      });
      var swiper2 = new Swiper(".large-swiper", {
        spaceBetween: 48,
        effect: 'fade',
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        thumbs: {
          swiper: swiper,
        },
      });

    }

    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      slidesPerView: 5,
      spaceBetween: 10,
      // autoplay: true,
      direction: "vertical",
      breakpoints: {
        0: {
          direction: "horizontal"
        },
        992: {
          direction: "vertical"
        },
      },
    });

    // product large
    var large_slider = new Swiper(".product-large-slider", {
      slidesPerView: 1,
      // autoplay: true,
      spaceBetween: 0,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    // Función para manejar el carrito dinámico
    const initShoppingCart = function () {
      const cartContent = $('.shopping-cart-content');

      // Captura todos los botones "Add to Cart"
      $('.add-to-cart').on('click', function () {
        const button = $(this);
        const title = button.data('title');
        const price = button.data('price');
        const image = button.data('image');

        // Crea un nuevo elemento para el producto
        const cartItem = $(`
          <div class="mini-cart-item d-flex border-bottom pb-3">
            <div class="col-lg-2 col-md-3 col-sm-2 me-4">
              <a href="#" title="product-image">
                <img src="${image}" class="img-fluid" alt="${title}">
              </a>
            </div>
            <div class="col-lg-9 col-md-8 col-sm-8">
              <div class="product-header d-flex justify-content-between align-items-center mb-3">
                <h4 class="product-title fs-6 me-5">${title}</h4>
                <a href="#" class="remove" aria-label="Remove this item">
                  <svg class="close">
                    <use xlink:href="#close"></use>
                  </svg>
                </a>
              </div>
              <div class="quantity-price d-flex justify-content-between align-items-center">
                <div class="price-code">
                  <span class="product-price fs-6">${price}</span>
                </div>
              </div>
            </div>
          </div>
        `);

        // Añade el producto al carrito
        cartContent.append(cartItem);

        // Opción para eliminar el producto del carrito
        cartItem.find('.remove').on('click', function (e) {
          e.preventDefault();
          cartItem.remove();
        });
      });
    };

    // Inicializa la funcionalidad del carrito
    initShoppingCart();

  }); // End of a document

  $(window).load(function(){
    $('.preloader').fadeOut();
  });

})(jQuery);