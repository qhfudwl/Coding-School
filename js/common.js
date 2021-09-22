// 헤더
const logo = document.querySelector("#header h1 a")
let scrollState = 0;
function startLogo() {
    logo.style.opacity = 1;
    logo.style.transitionDuration = "3s";
}
startLogo()
// 메뉴
// 토글 버튼 / 메인 메뉴
const tglBtn = $("#gnbWrap button")
let menuState = 0;
tglBtn.on("mouseover", function() {
    $(this).addClass("on")
})
tglBtn.on("mouseout", function() {
    if (menuState != 1) $(this).removeClass("on")
})
tglBtn.on("click", function() {
    if (menuState == 0) {
        $("#gnbWrap").addClass("on")
        $("#gnb").css("display", "flex")
        setTimeout(function() {
            $("#gnb").css("opacity", "1")
        }, 0)
        menuState = 1;
    }
    else {
        $("#gnbWrap").removeClass()
        $("#gnb").css("opacity", "0")
        setTimeout(function() {
            $("#gnb").css("display", "none")
        }, 300)
        menuState = 0;
    }
})
// 보조 메뉴
$("#gnb > li").on("mouseenter", function() {
    $("> a", this).addClass("on")
    $("> .snb", this).css("display", "block")
    let _this = $(this)
    setTimeout(function() {
        $("> a + .snb", _this).css("opacity", "1")
    }, 0)
})
$("#gnb > li").on("mouseleave", function() {
    $("> a", this).removeClass()
    $("> .snb", this).css("opacity", "0")
    let _this = $(this)
    setTimeout(function() {
        $("> .snb", _this).css("display", "none")
    }, 300)
})
// 슬라이더
const sliderList = document.querySelector('#sliderList')
const sliderListLi = document.querySelectorAll('#sliderList > li')
const sliderBtn = document.querySelectorAll('#sliderMove a')
let moveState = 0;
let timer;
let num = 0;
// 기본 구조 1 2 3 -------------------------------------------------
sliderList.style.marginLeft = "0px"

// 특정 시간마다 이동
timer = setInterval(function() {
    moveLeft(1)
}, 5000)
// 위치 이동
let moveWidth = 1000;
function moveLeft(n) {
    moveState = 1;
    if (num == 2) num = -1;
    num += n;
    // let moveWidth = document.documentElement.clientWidth;
    sliderList.style.marginLeft = -moveWidth * n + "px";
    sliderList.style.transitionDuration = "0.5s";
    setTimeout(function() {
        slideLeft(n)
    }, 500)
}
function moveRight(n) {
    moveState = 1;
    if (num == 0) num = 3;
    num -= n;
    slideRight(n)
    setTimeout(function() {
        sliderList.style.marginLeft = "0px";
        sliderList.style.transitionDuration = "0.5s";
    }, 0)
    setTimeout(btnColor, 500)
}
// 구조 변경
function slideLeft(m) {
    for (let i=0; i<m; i++) {
        let firstChild = sliderList.children[0];
        sliderList.removeChild(firstChild)
        sliderList.appendChild(firstChild)
    }
    sliderList.style.marginLeft = "0px";
    sliderList.style.transitionDuration = "0s";
    moveState = 0;
    btnColor()
}
function slideRight(m) {
    for (let j=0; j<m; j++) {
        let lastChild = sliderList.children[2];
        sliderList.removeChild(lastChild)
        sliderList.prepend(lastChild)
    }
    // let moveWidth = document.documentElement.clientWidth;
    sliderList.style.marginLeft = -moveWidth * m + "px";
    sliderList.style.transitionDuration = "0s";
    moveState = 0;
}
// 나오는 이미지 순서에 따라 표시하기
btnColor()
function btnColor() {
    for (let i=0; i<sliderBtn.length; i++) {
        if (num == i) sliderBtn[i].style.backgroundColor = "orangered"
        else sliderBtn[i].style.backgroundColor = "#ccc"
    }
}
// 버튼 클릭 시 해당 슬라이드화면으로 이동
for (let j=0; j<sliderBtn.length; j++) {
    sliderBtn[j].addEventListener("click", function(e) {
        e.preventDefault();
        if (num > j && moveState == 0) moveRight(num-j)
        else if (num < j && moveState == 0) moveLeft(j-num)
        clearInterval(timer)
        timer = setInterval(function() {
            moveLeft(1)
        }, 5000)
    })
}
// 빌게이츠
$(document).on("scroll", function() {
    let scrollPos = $(this).scrollTop()
    if (scrollPos >= 1600) $("#quoteWrap").css("opacity", "1")
    else $("#quoteWrap").css("opacity", "0")
})
// 교육 프로그램
$("#articleWrap a").on("click",function(e) {
    e.preventDefault();
})
$("#articleWrap article span").eq(0).text("-")
$("#articleWrap article").eq(0).addClass("on")
$("#articleWrap article span").on("click", function() {
    if ($(this).text() == "+") {
        $(this).parents("#articleWrap").children().removeClass()
        $(this).parent().addClass("on")
        $(this).parents("#articleWrap").find("span").text("+")
        $(this).text("-")
    }
    else {
        $(this).parent().removeClass()
        $(this).text("+")
    }
})

