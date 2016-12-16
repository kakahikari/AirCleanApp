declare let $ :any
let group :Object[]

$('.container').touchwipe({
   wipeLeft: function() {
     if(!$('.container').hasClass('js-left'))
      rightContentToggle()
   },
   wipeRight: function() {
     if($('.container').hasClass('js-left'))
      rightContentToggle()
  },
   wipeUp: function() {
     if($('.container').hasClass('js-bottom'))
      bottomContentToggle()
  },
   wipeDown: function() {
     if(!$('.container').hasClass('js-bottom'))
      bottomContentToggle()
  },
   min_move_x: 200,
   min_move_y: 200,
   preventDefaultEvents: true
})
$(document).on('click', '.index-header .menu-button', function(){
  rightContentToggle()
})
$(document).on('click', '.group .group__name', function(){
  bottomContentToggle()
})
$(document).on('click', '.right-menu .header .switch', function(){
  $(this).toggleClass('on')
})

// components
// item__switch
$(document).on('click', '.item__switch', function(){
  $(this).toggleClass('--on')
})
// data__range
$(document).on('input', '.data__range', function(){
  let target = $(this).children('input')
  let total = target.attr('max')
  let fill = target.val() / total * 100
  target.css('background-image','-webkit-linear-gradient(left, white, white '+fill+'%, transparent '+fill+'%, transparent)')
})
$('.data__range').trigger('input')

// UI function
function rightContentToggle() {
  $('.container').toggleClass('js-left')
  $('.right-container').toggleClass('--js-active')
}
function bottomContentToggle() {
  $('.container').toggleClass('js-bottom')
  $('.bottom-container').toggleClass('--js-active')
}
