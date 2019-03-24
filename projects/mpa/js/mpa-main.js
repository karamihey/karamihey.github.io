window.onload = function () {

  //progress bar animation
  wow = new WOW;
  wow.init();


  //'Business type' page
  //setting active element on click
  var bizTypes = document.getElementById('bizTypes');
  if (bizTypes) {
    for (var i = 0; i < bizTypes.children.length; i++) {
      bizTypes.children[i].addEventListener('click', setActiveElem);
    }
  }


  //'Cable Configuration' page
  //setting active element on click
  var outputCables = document.getElementById('outputCables');
  var inputCables = document.getElementById('inputCables');
  if(outputCables && inputCables) {
    for (var i = 0; i < outputCables.children.length; i++) {
      outputCables.children[i].addEventListener('click', setActiveElem);
      inputCables.children[i].addEventListener('click', setActiveElem);
    }
  }


  //'Email Error' popup
  //showing additional note on click
  var emailQue = document.getElementById('emailQue');
  var emailNote = document.getElementById('emailNote');
  if (emailQue && emailNote) {
    emailQue.addEventListener('click', function () {
      emailNote.classList.toggle('show');
    });
  }


  //'Venue Registration' page
  //toggle attr 'disabled' on checkbox click
  var licenseExist = document.getElementById('licenseExist');
  var licenseNum = document.getElementById('licenseNum');
  if (licenseExist && licenseNum) {
    licenseExist.addEventListener('click', function () {
      setRemoveAttr(this.checked, licenseNum, 'disabled');
    })
  }


  // play/pause video
  var video = document.getElementById('video');
  var videoDescription = document.getElementById('video-description');
  var playPauseBtn = document.getElementById('playPauseBtn');
  if (video) {
    playPauseBtn.addEventListener('click', function () {
      if (videoDescription) {
        videoDescription.setAttribute('hidden', '');
      }

      playPauseBtn.classList.add('playing');

      video.classList.add('visible');

      if(video.paused) {
        video.play();
        this.classList.toggle('play');
        this.classList.toggle('pause');
      }
      else {
        video.pause();
        this.classList.toggle('play');
        this.classList.toggle('pause');
      }
    });
  }
};

function setActiveElem() {
  for (var i = 0; i < this.parentNode.children.length; i++) {
    if (this.parentNode.children[i] !== this) {
      this.parentNode.children[i].classList.add('disabled');
      this.parentNode.children[i].classList.remove('active');
    }
    else {
      this.parentNode.children[i].classList.remove('disabled');
      this.parentNode.children[i].classList.add('active');
    }
  }
}

function setRemoveAttr(condition, elem, attr) {
  if (condition) {
    elem.removeAttribute(attr);
  }
  else {
    elem.setAttribute(attr, '');
  }
}


$(document).ready(function() {
  // Hamburger Menu
  $('.mobile-menu').on('show.bs.collapse hide.bs.collapse', function (e) {
    $('html').toggleClass('is-open-menu');
    if (e.type === 'show') {
      $(e.target)
        .removeClass('hideMenu')
        .addClass('showMenu');
    }
    else {
      $(e.target)
        .removeClass('showMenu')
        .addClass('hideMenu');
    }
  });

  // Custom select
  var $customSelect = $('.dropdown-toggle');

  $customSelect.dropdown();

  $('.dropdown-menu .link').click(function() {
    var $select = $(this).parents('.dropdown');
    $select.find($customSelect).html($(this).text());
    $select.find('.link.is-selected').removeClass('is-selected');
    $(this).addClass('is-selected');
  });

  // Scrolling to the selected value
  $('.dropdown').on('shown.bs.dropdown', function(e) {
    var $selectBody = $(e.target).find('.dropdown-menu'),
        $selectedItem = $selectBody.find('.is-selected').parent();

    if ($selectedItem.length) {
      $selectBody.scrollTop($selectBody.scrollTop() - $selectBody.offset().top + $selectedItem.offset().top - 5);
    }
  });

  // Tooltips
  var tooltip = $('[data-toggle="tooltip"]');
  var tooltipBreakpoint = 1025;

  if ($(window).width() < tooltipBreakpoint) {
    tooltip.tooltip({
      placement: 'top'
    });
  }
  else {
    tooltip.tooltip();
  }

  // 'Mailing address' checkbox handler
  $('#multipleAddress').change(function () {
    $('#venueAddress').toggleClass('diverse');
    $('#mailingAddress').toggleClass('diverse');
  });

  // 'Multiple soundboards' checkbox handler
  var soundboardAmount = $('#soundboardAmount');
  $('#multipleSBExist').change(function () {
    soundboardAmount.prop('disabled', function (i, attr) {
      return !attr;
    });
    soundboardAmount.parent().prev().toggleClass('disabled-control');
  });

  // Increase/decrease padding depending on 'navigation steps' block height
  // needed for responsive design
  var navResponsiveBreakpoint = 1380;
  var popupBlock = $('.popup-parent');
  var changeableBlock = $('.active-step .venue-name');
  var defaultPadding = parseInt(popupBlock.css('padding-bottom'));

  var addVenueBtn = $('.add-venue-btn');
  var deleteVenueBtn = $('.delete-venue-btn');

  var changePadding = function () {
    if ($(window).width() <= navResponsiveBreakpoint) {
      popupBlock.css({
        'padding-bottom' : defaultPadding + changeableBlock.height() + 'px'
      });
    }
  };

  changePadding();

  $(window).resize(function () {
    popupBlock.css('padding-bottom', '');

    if ($(window).width() <= navResponsiveBreakpoint) {
      defaultPadding = parseInt(popupBlock.css('padding-bottom'));
      changePadding();
    }
  });

  deleteVenueBtn.click(function (e) {
    //start temporary code
    e.preventDefault();
    $(this).parent().parent().remove();
    //end temporary code

    changePadding();
  });

  addVenueBtn.click(function (e) {
    //start temporary code
    e.preventDefault();
    $(this).parent().prev().clone().insertBefore($(this).parent());
    //end temporary code

    changePadding();
  });
});
