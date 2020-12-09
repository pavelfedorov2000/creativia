$(document).ready(function() {
    let hamburger = document.querySelector('.hamburger'),
        mobileMenu = document.querySelector('.header__menu'),
        menuLink = document.querySelectorAll('.header__menu-link'),
        slideIndex = 1,
        slides = document.querySelectorAll('.clients__item'),
        dotsWrap = document.querySelector('.clients__carousel-dots'),
        dots = document.querySelectorAll('.clients__carousel-dot');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('hamburger_active');
        mobileMenu.classList.toggle('header__menu_active');
    });

    menuLink.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.toggle('hamburger_active');
            mobileMenu.classList.toggle('header__menu_active');
        });
    });

// Slider (client's reviews)
showSlides(slideIndex);

function showSlides(n) {

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('clients__carousel-dot_active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('clients__carousel-dot_active');
    }

    function currentSlide(n) {
        showSlides(slideIndex = n); // текущий слайд
    }

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('clients__carousel-dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    // Tabs
    $('ul.portfolio__menu').on('click', 'li:not(.portfolio__menu-item_active)', function() {
        $(this)
            .addClass('portfolio__menu-item_active').siblings().removeClass('portfolio__menu-item_active')
            .closest('div.portfolio__wrapper').find('div.portfolio__content').removeClass('portfolio__content_active').eq($(this).index()).addClass('portfolio__content_active');
    });

    // Accordion
    $(document).ready(function() {
        $('.about__accordion-header').on('click', function(){
            $('.about__accordion-item .hidden').not($(this).next());
            $(this).next().toggleClass('active');
            $(this).parent().toggleClass('about__accordion-item_active');   
        });
    });

    //E-mail Ajax Send
	$("form").submit(function() {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
    });
    
    // Validation
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name:  {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите минимум {0} cимвола!")
                },
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    validateForms('.form');

    // Mask input
    $('input[name=phone]').mask("+375 (99) 999-99-99");

    // Pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 900) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // Smooth scroll
    $("a[href^='#']").click(function(){
        const href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(href).offset().top+"px"}); // плавный скролл по ссылкам
        return false;
    });

    // Animations
    new WOW().init();
});