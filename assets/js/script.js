(function(html) {

    const ssPreloader = function() {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');
        
        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');

            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

        // window.addEventListener('beforeunload' , function() {
        //     siteBody.classList.remove('ss-show');
        // });

    };

    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#intro');
        let triggerHeight;

        if (!(hdr && hero)) return;

        setTimeout(function() {
            triggerHeight = hero.offsetHeight - 170;
        }, 300);

        window.addEventListener('scroll', function () {

            let loc = window.scrollY;

            if (loc > triggerHeight) {
                hdr.classList.add('sticky');
            } else {
                hdr.classList.remove('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.classList.add('offset');
            } else {
                hdr.classList.remove('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.classList.add('scrolling');
            } else {
                hdr.classList.remove('scrolling');
            }

        });

    };

    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {

            link.addEventListener("click", function(event) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    };


    const ssLightbox = function() {
 
        // video lightbox
        const videoLightbox = function() {

            const videoLink = document.querySelector('.s-intro__content-video-btn');
            if (!videoLink) return;
    
            videoLink.addEventListener('click', function(event) {
    
                const vLink = this.getAttribute('href');
                const iframe = "<iframe src='" + vLink + "' frameborder='0'></iframe>";
    
                event.preventDefault();
    
                const instance = basicLightbox.create(iframe);
                instance.show()
    
            });
    
        };

        // portfolio lightbox
        const folioLightbox = function() {

            const folioLinks = document.querySelectorAll('.brick .entry__link');
            const modals = [];
    
            folioLinks.forEach(function(link) {
                let modalbox = link.getAttribute('href');
                let instance = basicLightbox.create(
                    document.querySelector(modalbox),
                    {
                        onShow: function(instance) {
                            //detect Escape key press
                            document.addEventListener("keydown", function(event) {
                                event = event || window.event;
                                if (event.key === "Escape") {
                                    instance.close();
                                }
                            });
                        }
                    }
                )
                modals.push(instance);
            });
    
            folioLinks.forEach(function(link, index) {
                link.addEventListener("click", function(event) {
                    event.preventDefault();
                    modals[index].show();
                });
            });
    
        };

        videoLightbox();
        folioLightbox();
 
     };

    (function Init() {

        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssLightbox();

    })();

})(document.documentElement);