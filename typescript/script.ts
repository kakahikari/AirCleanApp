declare var $: any;

$(function() {
  $(".container").touchwipe({
     wipeLeft: function() {
       if(!$('.container').hasClass('js-left'))
        rightContentToggle();
     },
     wipeRight: function() {
       if($('.container').hasClass('js-left'))
        rightContentToggle();
    },
     wipeUp: function() {
       if($('.container').hasClass('js-bottom'))
        bottomContentToggle();
    },
     wipeDown: function() {
       if(!$('.container').hasClass('js-bottom'))
        bottomContentToggle();
    },
     min_move_x: 200,
     min_move_y: 200,
     preventDefaultEvents: true
  });
  $(document).on('click', '.index-header .menu-button', function(){
    rightContentToggle();
  });
  $(document).on('click', '.group .group__name', function(){
    bottomContentToggle();
  });
});

function rightContentToggle() {
  $('.container').toggleClass('js-left');
  $('.right-container').toggleClass('js-active');
}
function bottomContentToggle() {
  $('.container').toggleClass('js-bottom');
  $('.bottom-container').toggleClass('js-active');
}
