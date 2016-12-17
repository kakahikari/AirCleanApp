var group;
$('.container').touchwipe({
    wipeLeft: function () {
        if (!$('.container').hasClass('js-left'))
            rightContentToggle();
    },
    wipeRight: function () {
        if ($('.container').hasClass('js-left'))
            rightContentToggle();
    },
    wipeUp: function () {
        if ($('.container').hasClass('js-bottom'))
            bottomContentToggle();
    },
    wipeDown: function () {
        if (!$('.container').hasClass('js-bottom'))
            bottomContentToggle();
    },
    min_move_x: 200,
    min_move_y: 200,
    preventDefaultEvents: true
});
$(document).on('click', '.index-header .menu-button', function () {
    rightContentToggle();
});
$(document).on('click', '.group .group__name', function () {
    bottomContentToggle();
});
$(document).on('click', '.right-menu .header .switch', function () {
    $(this).toggleClass('on');
});
// components
// item__switch
$(document).on('click', '.item__switch', function () {
    $(this).toggleClass('--on');
});
// data__range
$(document).on('input', '.data__range', function () {
    var target = $(this).children('input');
    var total = target.attr('max');
    var fill = target.val() / total * 100;
    target.css('background-image', '-webkit-linear-gradient(left, white, white ' + fill + '%, transparent ' + fill + '%, transparent)');
});
$('.data__range').trigger('input');
// UI function
function rightContentToggle() {
    $('.container').toggleClass('js-left');
    $('.right-container').toggleClass('--js-active');
}
function bottomContentToggle() {
    $('.container').toggleClass('js-bottom');
    $('.bottom-container').toggleClass('--js-active');
}
// cordova
document.addEventListener('deviceready', onDeviceReady.bind(this), false);
function onDeviceReady() {
    // 處理 Cordova 暫停與繼續事件
    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);
    // TODO: Cordova 已載入。請在這裡執行任何需要 Cordova 的初始化作業。
    var parentElement = document.getElementById('deviceready');
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');
    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
}
;
function onPause() {
    // TODO: 這個應用程式已暫停。請在這裡儲存應用程式狀態。
}
;
function onResume() {
    // TODO: 這個應用程式已重新啟動。請在這裡還原應用程式狀態。
}
;
