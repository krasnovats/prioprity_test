//Burger
$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
});

$(document).ready(function () {
	$('.header__list').click(function (event) {
		$('.header__burger,.header__menu').removeClass('active');
		$('body').removeClass('lock');
	});
});







//Main banner animate start

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


const RESOLUTION = 1;

let w = canvas.width = window.innerWidth * RESOLUTION;
let h = canvas.height = window.innerHeight * RESOLUTION;

const PARTICLE_COUNT = 500;
const CONNECT_DISTANCE = w * 0.05;
const FORCE_DISTANCE = w * 0.1;


const r = (n = 1) => Math.random() * n;
const PI = Math.PI;
const TAU = PI * 2;

let time = new Date;

const lerp = (start, end, amt) => {
	return (1 - amt) * start + amt * end
};

const distance = (x1, y1, x2, y2) => {
	const a = x1 - x2;
	const b = y1 - y2;
	return Math.sqrt(a * a + b * b);
};

const angle = (cx, cy, ex, ey) => {
	return Math.atan2(ey - cy, ex - cx);
};

const particlePrototype = () => ({
	x: w * 0.5 + (Math.cos(r(TAU)) * r(w * 0.5)),
	y: h * 0.5 + (Math.sin(r(TAU)) * r(h * 0.5)),
	angle: r(TAU),
	speed: r(0.15),
	normalSpeed: r(0.05),
	oscAmplitudeX: r(2),
	oscSpeedX: 0.001 + r(0.008),
	oscAmplitudeY: r(2),
	oscSpeedY: 0.001 + (r(0.008)),
	connectDistance: r(CONNECT_DISTANCE),
	color: {
		r: Math.round(200 + r(55)),
		g: Math.round(150 + r(105)),
		b: Math.round(200 + r(55))
	}
});

const particles = (new Array(PARTICLE_COUNT))
	.fill({})
	.map(particlePrototype);

const update = () => {
	particles.forEach(p1 => {
		p1.x += (Math.cos(p1.angle) + (Math.cos(time * p1.oscSpeedX) * p1.oscAmplitudeX)) * p1.speed;
		p1.y += (Math.sin(p1.angle) + (Math.cos(time * p1.oscSpeedY) * p1.oscAmplitudeY)) * p1.speed;

		p1.speed = lerp(p1.speed, p1.normalSpeed * RESOLUTION, 0.1);

		if (p1.x > w || p1.x < 0) {
			p1.angle = PI - p1.angle;
		}
		if (p1.y > h || p1.y < 0) {
			p1.angle = -p1.angle;
		}

		if (r() < 0.005)
			p1.oscAmplitudeX = r(2);
		if (r() < 0.005)
			p1.oscSpeedX = 0.001 + (r(0.008));
		if (r() < 0.005)
			p1.oscAmplitudeY = r(2);
		if (r() < 0.005)
			p1.oscSpeedY = 0.001 + r(0.008);

		p1.x = Math.max(-0.01, Math.min(p1.x, w + 0.01));
		p1.y = Math.max(-0.01, Math.min(p1.y, h + 0.01));
	});
};

const render = () => {

	ctx.clearRect(0, 0, w, h);

	particles.map(p1 => {
		particles
			.filter(p2 => {
				if (p1 == p2)
					return false;
				if (distance(p1.x, p1.y, p2.x, p2.y) > p1.connectDistance)
					return false;
				return true;
			})
			.map(p2 => {
				const dist = distance(p1.x, p1.y, p2.x, p2.y);
				p1.speed = lerp(p1.speed, p1.speed + (0.05 / p1.connectDistance * dist), 0.2);
				return {
					p1,
					p2,
					color: p1.color,
					opacity: Math.floor(100 / p1.connectDistance * (p1.connectDistance - dist)) / 100
				};
			})
			.forEach((line, i) => {
				const colorSwing = Math.sin(time * (line.p1.oscSpeedX));
				ctx.beginPath();
				ctx.globalAlpha = line.opacity;
				ctx.moveTo(line.p1.x, line.p1.y);
				ctx.lineTo(line.p2.x, line.p2.y);
				ctx.strokeStyle = `rgb(
					${Math.floor(line.color.r * colorSwing)},
					${Math.floor((line.color.g * 0.5) + ((line.color.g * 0.5) * colorSwing))},
					${line.color.b}
				)`
				ctx.lineWidth = (line.opacity * 4);
				ctx.stroke();
				ctx.closePath();
			});
	});

};

const loop = () => {
	time = new Date;
	update();
	render();
	window.requestAnimationFrame(loop);
};

loop();

window.addEventListener('mousemove', e => {

	const mouseX = e.layerX * RESOLUTION;
	const mouseY = e.layerY * RESOLUTION;

	particles.forEach(p => {
		const dist = distance(mouseX, mouseY, p.x, p.y);

		if (dist < FORCE_DISTANCE && dist > 0) {
			p.angle = angle(mouseX, mouseY, p.x, p.y)
			const force = (FORCE_DISTANCE - dist) * 0.1;
			p.speed = lerp(p.speed, force, 0.2);
		}
	});

});

window.addEventListener('resize', e => {
	w = canvas.width = window.innerWidth * RESOLUTION;
	h = canvas.height = window.innerHeight * RESOLUTION;
});

//Main banner animate еnd





//Infographic


$(document).ready(function () {
	let $element = $('.infographic');
	let counter = 0;
	$(window).scroll(function () {
		let scroll = $(window).scrollTop() + $(window).height();
		//Если скролл до конца елемента
		//var offset = $element.offset().top + $element.height();
		//Если скролл до начала елемента
		let offset = $element.offset().top

		if (scroll > offset && counter == 0) {
			$('.progressone').animate({ width: '14%' }, 2000);
			$('.progresstwo').animate({ width: '36%' }, 2000);
			$('.progressthree').animate({ width: '80%' }, 2000);
		}
	});
});




//Accordion
jQuery(document).ready(function(){

	var data = jQuery(".accordion").attr("data-accordion");

	jQuery(".accordion-header").on("click", function () {
	  if (data === "close") {
		jQuery(".accordion-body").slideUp();
		if (jQuery(this).hasClass("active")) {
		 jQuery(this).toggleClass("active");
		}
		else {
		  jQuery("accordion-header").removeClass("active");
		  jQuery(this).toggleClass("active");
		}
	  }
	  else {
		jQuery(this).toggleClass("active");
	  }
	  jQuery(this).next(".accordion-body").not(":animated").slideToggle();
	});
});


//Best practice

$(".tab-list").on("click", ".tab", function (event) {
	event.preventDefault();

	$(".tab").removeClass("active");
	$(".tab-content").removeClass("show");

	$(this).addClass("active");
	$($(this).attr('href')).addClass("show");
});





//Slider_2022

$(function () {

	let slideCount = $(".slider ul li").length;
	let slideWidth = $(".slider ul li").width();
	let slideHeight = $(".slider ul li").height();
	let slideUlWidth = slideCount * slideWidth;

	$(".slider").css({ "max-width": slideWidth, "height": slideHeight });
	$(".slider ul").css({ "width": slideUlWidth, "margin-left": - slideWidth });
	$(".slider ul li:last-child").prependTo($(".slider ul"));

	function moveLeft() {
		$(".slider ul").stop().animate({
			left: + slideWidth
		}, 700, function () {
			$(".slider ul li:last-child").prependTo($(".slider ul"));
			$(".slider ul").css("left", "");
		});
	}

	function moveRight() {
		$(".slider ul").stop().animate({
			left: - slideWidth
		}, 700, function () {
			$(".slider ul li:first-child").appendTo($(".slider ul"));
			$(".slider ul").css("left", "");
		});
	}

	$(".next").on("click", function () {
		moveRight();
	});

	$(".prev").on("click", function () {
		moveLeft();
	});


});




//Slider_2023

$(function () {

	let slideCounttwo = $(".slidertwo ul li").length;
	let slideWidthtwo = $(".slidertwo ul li").width();
	let slideHeighttwo = $(".slidertwo ul li").height();
	let slideUlWidthtwo = slideCounttwo * slideWidthtwo;

	$(".slidertwo").css({ "max-width": slideWidthtwo, "height": slideHeighttwo });
	$(".slidertwo ul").css({ "width": slideUlWidthtwo, "margin-left": - slideWidthtwo });
	$(".slidertwo ul li:last-child").prependTo($(".slidertwo ul"));

	function moveLeft() {
		$(".slidertwo ul").stop().animate({
			left: + slideWidthtwo
		}, 700, function () {
			$(".slidertwo ul li:last-child").prependTo($(".slidertwo ul"));
			$(".slidertwo ul").css("left", "");
		});
	}

	function moveRight() {
		$(".slidertwo ul").stop().animate({
			left: - slideWidthtwo
		}, 700, function () {
			$(".slidertwo ul li:first-child").appendTo($(".slidertwo ul"));
			$(".slidertwo ul").css("left", "");
		});
	}


	$(".next").on("click", function () {
		moveRight();
	});

	$(".prev").on("click", function () {
		moveLeft();
	});


});




//Pop-up
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth -'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock_');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock_');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}



