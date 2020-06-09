$(document).ready(function(){

 /*****************************************
*     menu bottom border animation
*****************************************/


  function NavUnderline(){
     $('.navbar-nav >li:not(.menu-underline)').hover(function(){
        goToNavItem($(this));
     },function(){
      //find li a.active
        var parent = $('.navbar-nav a.active').parent();
        //goToNavItem($(this).siblings('.active'));
        goToNavItem(parent);
     });
     //also trigger function when scrollspy works
      // $('.navbar-nav >li').find('a').on('activate.bs.scrollspy', function () {
      //   alert($(this));
      //   console.log($(this));
      //   //goToNavItem( $(this).parent() );
      // })
      $(window).on('activate.bs.scrollspy', function () {
        var parent = $('.navbar-nav a.active').parent();
        goToNavItem( parent );
      })

     function goToNavItem($item){
        if($item.length == 0) return;
        var parent_left = $item.parent().length ? $item.parent().offset().left : 0;
        var offset = $item.offset().left - parent_left;
        $item.siblings('.menu-underline').css({left: offset, width: $item.width()});
     }

     // function navOffset()
  }
  NavUnderline();


/***************************
*       sticky nav          *
****************************/
$(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $('body').addClass("nav-is-sticky");
        $('#header').addClass("slideFromTop");
    } else {
        $('body').removeClass("nav-is-sticky");
        $('#header').removeClass("slideFromTop");

    }
});

windowHeight = $(window).height();
navHeight = $('#header-sticky-wrapper').height();
showcaseHeight = windowHeight - navHeight;
/*$("#showcase").css('height', showcaseHeight);*/


/******************************************
*      Scrollspy & Menu offset target      *
*******************************************/
//set offset
  offset = $('#nav-primary').height();
    // offset = 150;
  // $("body").scrollspy({target: "#navbar", offset: offset});
  $('body').scrollspy({ target: '#navbar',  offset: offset});
  $("#navbar .nav-link").on('click', function(event) {
    // Prevent default anchor click behavior
    event.preventDefault();
    $('.navbar-collapse').collapse('hide');

    var hash = this.hash;
    scrollPos = $(hash).offset().top - (offset - 1);
    $('html, body').animate({
      scrollTop: scrollPos
    }, 800);
  });

  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh')
  })

  // $('#navbar .nav-link').on('activate.bs.scrollspy', function () {
  //   alert('Huh');
  // })
/****************************
*        Explore button anim  *
*****************************/
  $("#explore span").on("click", function(e) {
      e.preventDefault();
      $("html,body").animate({scrollTop: 570}, 1500);
  });

/********************************
*         back to top           *
*********************************/
  $("#toTop").on("click", function(e) {
      e.preventDefault();
      $("html,body").animate({scrollTop: 0}, 800);
  });

/***********************************
*           Home slider            *
***********************************/
  $(".slides").owlCarousel({
      // animateOut: 'bounceOut',
      animateOut: 'fadeOutDown',
      animateIn: 'fadeIn',
      items:1,
      margin:0,
      stagePadding:0,
      smartSpeed:450,
      autoplay: true,
      autoplaySpeed:500, 
      loop:true,
      dots:false,
      lazyLoad: true
      // autoHeight: true
      // autoWidth:true
  });

/***********************************
*             Reviews              *
***********************************/
  $("#review-list").owlCarousel({
    items:1,
    margin:0,
    stagePadding:0,
    smartSpeed:450,
    autoplay: true,
    autoplaySpeed:500,
    loop:true
    // autoHeight:true
  });

/***********************************
*               Team               *
***********************************/
  $("#members").owlCarousel({
    autoPlay: true,//3000, //Set AutoPlay to 3 seconds
    stopOnHover: true,
    // items : 4,
    // margin:0,
    stagePadding:0,
    smartSpeed:450,
    // responsiveClass:true,
    responsive:{
          0:{
              items:1,
          },
          480 : {
              items:2,
          },
          768:{
              items:3,
          },
          992:{
              items:4,
          }
      }
  });

/************************************
*         Light Gallery             *
************************************/
  // var options = {
  //   'download': false,
  //   'actualSize': false
  // };
  // $("#gallery").lightGallery(options);
  $("#gallery").lightGallery({
      'download': false,
    'actualSize': false
    });

/************************************
*         Portfolio/isotope         *
************************************/
  if (typeof Isotope == 'function') {
     /* init Isotope*/
    // var $container = $('.portfolio-list').isotope({
    //   itemSelector: '.item',
    //   layoutMode: 'fitRows',
    //   // filter: ':nth-child(-n+10)'
    //   // fitRows: {
    //   //   gutter: 15
    //   // }
    // });

    var container = $('.portfolio-list')
    // initialize Isotope
    container.isotope({
      itemSelector: 'li',
      gutter: 0,
      transitionDuration: "0.5s"
    });
   
    /* bind filter button click*/
    $('.portfolio-filter').on( 'click', 'button', function() {
      var filterValue = $( this ).attr('data-filter');
      container.isotope({ filter: filterValue });
    });

    /* change is-checked class on buttons*/
    $('.button-group').each( function( i, buttonGroup ) {
      var buttonGroup = $( buttonGroup );
      buttonGroup.on( 'click', 'button', function() {
        buttonGroup.find('.btn-primary').removeClass('btn-primary');
        $( this ).addClass('btn-primary');
      });
    });

    // layout Isotope after each image loads
    container.imagesLoaded().progress( function() {
      container.isotope('layout');
    }); 
  };

/***********************************
*             Skillbars/skills             *
*  start skill bar when appeared   *
***********************************/
  $('[data-percent]').each(function() {
    $(this).appear().on("appear", function() {
      $(this).find('.skillbar-bar').animate({
        width:$(this).attr('data-percent')
      },1000);
    });

  });

/***********************************
*             Counts               *
*     start count when appeared    *
***********************************/
  $('.counts').each(function() {
    $(this).appear().on('appear', function() {
      if( $(this).html() == 0 ) {
        $(this).countTo({
            speed: 3000
        });
      }
      // $(this).removeAttr("data-form").removeAttr("data-to");
    });
  });

/**********************************
*         WOW script init         *
**********************************/
  new WOW({
      animateClass: 'animated',
      // offset:       100,
      mobile:       true,
      live:         true,
      callback:     function(box) {
        // console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
      }
    }
  ).init();

/********************************
*       Contact form            *
********************************/
$( '#contactForm' ).on( 'submit', function(e) {
      e.preventDefault();
      $('input#submit').attr('value', 'Processing..');
      var name = $("input#name").val();
      var email = $("input#email").val();
      var company = $("input#company").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var route = "process.php";


        function validate(nm,em,msg,com,phn) {
            if(nm==""){
                $("input#name").parent('div').addClass('has-error');
                $("input#name").focus();
                resetSubmit();
                return false;
            }
            $("input#name").parent('div').removeClass('has-error');

            if(em==""){
                $("input#email").parent('div').addClass('has-error');
                $("input#email").focus();
                resetSubmit();
                return false;
            }
            $("input#email").parent('div').removeClass('has-error');

            if(com==""){
                $("input#company").parent('div').addClass('has-error');
                $("input#company").focus();
                resetSubmit();
                return false;
            }
            if(phn==""){
                $("input#phone").parent('div').addClass('has-error');
                $("input#phone").focus();
                resetSubmit();
                return false;
            }

            if(msg==""){
                $("textarea#message").parent('div').addClass('has-error');
                $("textarea#message").focus();
               resetSubmit();
               return false;
             //check message length
            } else if(msg.length<10){
                resetSubmit();
                alert("Message is too small");
                $("textarea#message").focus();
                return false;
            }
            $("#message").parent('div').removeClass('has-error');

            return true;
        }
      if( validate(name,email,message,company, phone )==true){
        /*process the form*/
        var jqxhr = $.ajax({
              type: "POST",
              dataType: 'json',
              url: route,//formAction,
              // data: {"name":name,"email":email,"message":message,"id":id,"_token":token },
              data: JSON.stringify({
                  "name": name,
                  "email": email,
                  "company": company,
                  "phone": phone
              }),
              error: function(jqXHR, textStatus, errorThrown) {
                  alert('Something went wrong.Please Try again later...');
              }

          })
          // using the done promise callback
          .success(function(response, textStatus, jqXHR) {
              // // log data to the console so we can see
              // //console.log(data);
              // //alert(data);
              // if (response.status){
              //     $(".comment-success").show();
              // }else{
              //     alert("not DONE");
              // }
              console.log(response);

              // here we will handle errors and validation messages
          })
          .error(function(jqXHR, textStatus, errorThrown) {
                // alert("Sorry. Server unavailable. ");
                console.log(response);
          })
//            .always(function(jqXHROrData, textStatus, jqXHROrErrorThrown)     { alert("complete"); })
          ;
//            // stop the form from submitting the normal way and refreshing the page
//            event.preventDefault();
      }
    });
    function resetSubmit(){
      $('input#submit').attr('value', 'Submit');
    }

    /********************************
    *       Google Map Script       *
********************************/
    if (typeof google === 'object' && typeof google.maps === 'object'){
      var mapDom = $('#map');
      var cord = mapDom.data('cord');
      var lat = -27.3051870;
      var lang = 152.9888670 ;
      if(cord !=='undefined'){
        var cordArray = cord.split(',');
        var lat = parseFloat(cordArray[0]);
        var lang = parseFloat(cordArray[1]);
      }
      // console.log(lat);

    var myGeoLocation = new google.maps.LatLng( lat,lang );
    // var mapMarker = 'http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png';
    var mapMarker = 'images/marker.png';
    var businessName = 'Comapany Inc';
    var infoWindowText = '<h5>Comapany Inc</h5><p>370 Gympie Rd, Strathpine, QLD, 4500, Australia</p>';
    var zoomLevel = 16;
    var markerStatus = "off";//on

    //Set Map
    function initMap() {
        // Create an array of styles.
        var styles = [
          // {
          //   stylers: [
          //     // { hue: "#283C4F" },
          //     { saturation: 20 }
          //   ]
          // },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              { lightness: 100 },
              { visibility: "simplified" }
            ]
          },
          {
            featureType: "all",
            elementType: "labels",
            stylers: [
              { visibility: "http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png" }
            ]
          }
        ];

        // // Create a new StyledMapType object, passing it the array of styles,
        // // as well as the name to be displayed on the map type control.
        // var styledMap = new google.maps.StyledMapType(styles,
        //   {name: "Styled Map"});


        var mapOptions = {
          zoom: zoomLevel,
          // zoomControl: false,
          // scaleControl: false,
          scrollwheel: false,
          center: myGeoLocation,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles : styles
        }

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        //Callout Content
        // var infoWindowText = '<h4>Amviro, Chowliapatty</h4><p>Hello there</p>';
        //Set window width + content
        var infowindow = new google.maps.InfoWindow({
          content: infoWindowText,
          maxWidth: 500
        });

        //Add Marker
        var marker = new google.maps.Marker({
          position: myGeoLocation,
          map: map,
          icon: mapMarker,
          title: businessName
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        //Resize Function
        google.maps.event.addDomListener(window, "resize", function() {
          var center = map.getCenter();
          google.maps.event.trigger(map, "resize");
          map.setCenter(center);
        });
      }

      google.maps.event.addDomListener(window, 'load', initMap);
    }
});
/******************************
*         Preloader           *
******************************/

$(window).load(function() { 
  $('.loader').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');
  $('body').delay(350).css({'overflow':'visible'});
});