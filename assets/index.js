var cssfiles = [
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.theme.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/featherlight/1.5.0/featherlight.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css',
    'assets/style.css'

];
var jsfiles = [ 
    'https://code.jquery.com/jquery-2.2.4.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/featherlight/1.5.0/featherlight.min.js',
    'assets/jquery.waypoints.min.js', //-- scroll to view
    'assets/inview.min.js',  //-- scroll to view
    // 'assets/index.js', 
];

function loadAll(){
    LazyLoad.css(cssfiles, function(){});
    LazyLoad.js(jsfiles, function(){
        $(document).ready(function(){
            initAll();
        });
    });   
}
   
function initAll(){
    // from setting
    var COLOR = chooseColor; 
    var FB_APP_ID = Page.facebookAppId;
    var GOOGLE_ANALYTIC_ID = Page.GoogleAnalyticId;
    var KEYWORDS = Page.longKeyWords;

    setColor(COLOR);
    styleControls();
    setText();

    animateToView(".tada","tada");
    animateToView(".lightSpeedIn","lightSpeedIn");
    animateToView(".rubberBand","rubberBand");
    animateToView(".bounceOut","bounceOut");
    animateToView(".bounceIn","bounceIn");

    // animationHover(".btn","tada");

    initFacebook(FB_APP_ID);
    // initTwitter();
    initGoogleAnalytic(GOOGLE_ANALYTIC_ID);
    setKeyword(KEYWORDS);
}
//-----------------------------------------------------------------
function setText(){
    //======== Page ===============//
    if (Page.logoText)
        $(".logo-text").html(Page.logoText);
    if (Page.subHeading)
        $("h2.sub-heading").html(Page.subHeading);
    if (Page.mainHeading)
        $("h1.main-heading").html(Page.mainHeading);
    if (Page.CTA)
        $(".cta").html(Page.CTA);
    if (Page.brief)
        $(".brief").html(Page.brief);
    if (Page.formId)
        $("iframe").attr("src",Page.formId);
    //========Social ===============//
    if (Social.email)
        $("a.email").attr("href",Social.email);
    if (Social.facebook)
        $("a.facebook").attr("href",Social.facebook);
    if (Social.twitter)
        $("a.twitter").attr("href",Social.twitter);
    if (Social.google)
        $("a.google").attr("href",Social.google);
    //========Personal ===============//
    if (Person.logoText)
        $(".per-logo-text").html(Person.logoText);
    if (Person.fullname)
        $("h1.fullname, li.fullname, a.fullname").html(Person.fullname);
    if (Person.slogan)
        $("span.slogan").html(Person.slogan);
    if (Person.sex)
        $("span.sex").html(Person.sex);
    if (Person.phone)
        $("a.phone, li.phone").attr("href",Person.phone);
    if (Person.facebook)
        $("a.facebook").attr("href",Person.facebook);
    if (Person.google)
        $("a.google").attr("href",Person.google);
    if (Person.twitter)
        $("a.twitter").attr("href",Person.twitter);
    if (Person.linkedin)
        $("a.linkedin").attr("href",Person.linkedin);
    if (Person.instagram)
        $("a.instagram").attr("href",Person.instagram);
    if (Person.pinterest)
        $("a.pinterest").attr("href",Person.pinterest);
    if (Person.message)
        $(".message").html(Person.message);
    
}

function setColor(COLOR){
    $("body").addClass(COLOR + " lighten-5");
    $("nav#nav").addClass(COLOR + " darken-2 center-align");
    $(".main-color-text").addClass(COLOR + "-text text-darken-4");
    $(".main-color").addClass(COLOR + " darken-4");
    $(".progress, .indeterminate").addClass(COLOR + " lignten-1");
    $("li#avatar").addClass(COLOR + " darken-4 white-text center-align");
    $("ul#dropdown-1").addClass(COLOR + " darken-3");
    $("div#report").addClass(COLOR + " darken-4 white-text z-depth-1");
    $(".prefix").addClass(COLOR + "-text darken-4");
    $("ul.dropdown-content li a").addClass(COLOR + "-text");
    // $(".btn").addClass("waves-effect waves-light"); //- chua lam duoc
}

function animateToView(classname,anim){
    var $elem = $(classname);
    for(i=0;i<$elem.length;i++){
        var in_view = new Waypoint.Inview({
        element: $elem[i],
        enter: function() {
                $elem.addClass("animated "+ anim);    
        },
        exit: function() {  // optionally
            $elem.removeClass("animated "+ anim);
        }
    }); 
    }
    
}

function setKeyword(KEYWORDS){
    $('img').attr("alt", KEYWORDS);
    $('img').attr("title", KEYWORDS);
}


function styleControls(){
    $(".dropdown-button").dropdown();
    $('.parallax').parallax();
    $("#owl-example").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items : 3,
        margin: 20,
        autoHeight : true,
        lazyLoad : true,
    });

    $('ul.tabs').tabs();

    $('.modal-trigger').leanModal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        opacity: .7, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        starting_top: '4%', // Starting top style attribute
        ending_top: '10%', // Ending top style attribute
        // ready: function() { alert('Ready'); }, // Callback for Modal open
        // complete: function() { alert('Closed'); } // Callback for Modal close
    });

    $("#your-fb.fb-comments").attr('data-href', Page.url); //set truoc
    $("span#current-color").html(chooseColor.toUpperCase());
}

function checkLicense(url){
    var res = false; 
    
    //-- ajax call to check lic
    res = true;
    return res;
}

function fbComment(URL) {
    //- console.log('Found FB: Loading comments.');
    // var url = $("#club").val();
    $("#your-fb.fb-comments").attr('data-href', URL);
    FB.XFBML.parse();
}

//-----------------------------------------------------------------
//-- animate.css
function animationHover(element, animation){
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);        
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);         
        });
}

function animationClick(element, animation){
    element = $(element);
    element.click(
        function() {
            element.addClass('animated ' + animation);        
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);         
  
        });
}

function animation(element, animation){
    element.addClass('animated ' + animation);        
    //wait for animation to finish before removing classes
    window.setTimeout( function(){
        element.removeClass('animated ' + animation);
    }, 2000);         

}

//- Google Analytics
function initGoogleAnalytic(ID){

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    // ID = "UA-82197343-1";
    ga('create', ID, 'auto');
    ga('send', 'pageview');

}

function initFacebook(FB_APP_ID){
    window.fbAsyncInit = function() {
        FB.init({
          appId      : FB_APP_ID,
          xfbml      : true,
          version    : 'v2.7'
        });

        // *** here is my code ***
        if (typeof fbComment == 'function') {
            fbComment();
        }
    };    

    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     // js.src = "https://connect.facebook.net/en_VN/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

function initTwitter(){
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
}
