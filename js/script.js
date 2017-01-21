var group;
function airCleaner() { }
airCleaner.prototype = {
    power: '0',
    co2: '0',
    resetPm25: '0',
    resetPm10: '0',
    resetFilter: '0',
    timer: '0',
    timerStartH: '00',
    timerStartM: '00',
    timerEndH: '00',
    timerEndM: '00',
    shutdownH: '00',
    shutdownM: '00',
    speed: '0',
    timeH: 'FF',
    timeM: 'FF',
    timeS: 'FF',
    value: '',
    getValue: function () {
        var value = this.power + ',' +
            this.co2 + ',' +
            this.resetPm25 + ',' +
            this.resetPm10 + ',' +
            this.resetFilter + ',' +
            this.timer + ',' +
            this.timerStartH + ',' +
            this.timerStartM + ',' +
            this.timerEndH + ',' +
            this.timerEndM + ',' +
            this.shutdownH + ',' +
            this.shutdownM + ',' +
            this.speed + ',' +
            this.timeH + ',' +
            this.timeM + ',' +
            this.timeS;
        return value;
    }
};
// time loop
setInterval(function () {
    var now = moment().format("YYYY.MM.DD ddd hh:mm:ss a");
    $('.index-header .time').html(now);
}, 100);
// layout
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
    $(this).toggleClass('js--on');
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
var chrome;
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    // 處理 Cordova 暫停與繼續事件
    document.addEventListener('pause', onPause, false);
    document.addEventListener('resume', onResume, false);
    // TODO: Cordova 已載入。請在這裡執行任何需要 Cordova 的初始化作業。
    //var parentElement = document.getElementById('deviceready');
    //var listeningElement = parentElement.querySelector('.listening');
    //var receivedElement = parentElement.querySelector('.received');
    //listeningElement.setAttribute('style', 'display:none;');
    //receivedElement.setAttribute('style', 'display:block;');
    // tcp
    var ip = window.prompt("ip", "192.168.43.158");
    var airCleaner1 = new airCleaner;
    airCleaner1.getValue();
    var pow = 0;
    var power = "00";
    //chrome.sockets.tcp.onReceive.addListener(function (ret) {
    //console.log('get' + ab2str(ret.data));
    //});
    // data contol
    $(document).on('click', '.bottom__item.air-cleaner .item__switch', function () {
        if ($(this).hasClass('--on')) {
            // off->on
            pow = 1;
        }
        else {
            // on->off
            pow = 0;
        }
        chrome.sockets.tcp.create({}, function (info) {
            chrome.sockets.tcp.connect(info.socketId, ip, 7890, function (result) {
                var data = str2ab("WRAF=" + pow + ",0,0,0,0,0,00,00,00,00,00,00," + power + ",FF,FF,FF\r\n");
                chrome.sockets.tcp.send(info.socketId, data, function (ret) {
                    console.log('send');
                });
            });
        });
    });
    $(document).on('input', '.bottom__item.air-cleaner .data .data__range input', function () {
        power = '0' + $(this).val();
        chrome.sockets.tcp.create({}, function (info) {
            chrome.sockets.tcp.connect(info.socketId, ip, 7890, function (result) {
                var data = str2ab("WRAF=" + pow + ",0,0,0,0,0,00,00,00,00,00,00," + power + ",FF,FF,FF\r\n");
                chrome.sockets.tcp.send(info.socketId, data, function (ret) {
                    console.log('send');
                });
            });
        });
    });
}
;
function ab2str(buffer) {
    var arr = new Uint8Array(buffer);
    var str = String.fromCharCode.apply(String, arr);
    if (/[\u0080-\uffff]/.test(str)) {
        throw new Error("this string seems to contain (still encoded) multibytes");
    }
    return str;
}
function str2ab(str) {
    if (/[\u0080-\uffff]/.test(str)) {
        throw new Error("this needs encoding, like UTF-8");
    }
    var arr = new Uint8Array(str.length);
    for (var i = str.length; i--;)
        arr[i] = str.charCodeAt(i);
    return arr.buffer;
}
function onPause() {
    // TODO: 這個應用程式已暫停。請在這裡儲存應用程式狀態。
}
function onResume() {
    // TODO: 這個應用程式已重新啟動。請在這裡還原應用程式狀態。
}
