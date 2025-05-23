/* This code From dawards.js of Digitaling.com, Use in index.html*/

var domain  = "https://" + location.host;
var fileUrl = "https://jqd.tobe.host";
var editor;
//公用方法
var initModules = (function($){
    /*dw头部公用*/
    function dwNav(){
        $('#js_dw_nav li').hover(function(){
			$(this).children('.menu').stop(true,true).slideDown(100);
		},function(){
			$(this).children('.menu').stop(true,true).slideUp(100);
		})
    }
    
    return {
        dwNav:dwNav
    }
})(jQuery);

/*首页*/
var dwIndex = {
    init:function(){
        initModules.dwNav();
        this.swiperKv();
    },
    swiperNewPro:function(){
        var npSwiper = new Swiper('#np_swiper', {
            slidesPerView: 3,
            slidesPerColumn: 2,
            spaceBetween: 20
        });
    },
    swiperMsg:function(){
        var newData = fqsDatas.getData(),
            $fqList = $('#fqs_list'),
            itemHtml = $('#js_fqs_tpl').html();
        function renderFq(){
            var optionHtmlList = renderOption(newData);
            $fqList.empty().append(optionHtmlList);
        }
        //娓叉煋閫夋嫨鍒楄〃
        function renderOption(data){
            var list = '';
            data.forEach(function(item, index) {
                var userLink = item.userId ? 'target="_blank" href="'+domain+'/people/'+item.userId+'"':'';
                var companyTitle = item.companyId ? '<a target="_blank" href="'+domain+'/company/'+item.companyId+'">'+item.title+'</a>':item.title;
                list += initTools.tplReplace(itemHtml,{
                    id: index,
                    nickname: item.nickname,
                    userLink:userLink,
                    title: item.title,
                    companyTitle:companyTitle,
                    avatar: item.avatar,
                    message: item.message
                })
            });
            return list;
        }
        //鍏堟覆鏌揾tml
        renderFq();
        //鎵ц杞挱
        var swiperMsg = new Swiper('#famous_quotes', {
            effect: 'fade',
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: {
                delay: 4000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            roundLengths:true,
            speed:1000,
            loop:true
        });
        // //榧犳爣瑕嗙洊鍋滄鑷姩鍒囨崲
        // $('.famous_quotes').mouseover(function() {
        //     swiperMsg.stopAutoplay();
        // })
        // $('.famous_quotes').mouseout(function() {
        //     //some code
        //     swiperMsg.startAutoplay();
        // })
        //榧犳爣瑕嗙洊鍋滄鑷姩鍒囨崲
        swiperMsg.el.onmouseover = function(){
            swiperMsg.autoplay.stop();
        }
        //榧犳爣绂诲紑寮€濮嬭嚜鍔ㄥ垏鎹�
        swiperMsg.el.onmouseout = function(){
            swiperMsg.autoplay.start();
        }
    },
    //kv 杞挱
    // swiperKv:function(){
    //     // /*杞挱鏂伴椈*/
    //     var swiper = new Swiper('#kv_swiper', {
    //         effect: 'fade',
    //         pagination: {
    //             el: '.swiper-pagination',
    //             clickable :true
    //         },
    //         spaceBetween: 0,
    //         centeredSlides: true,
    //         autoplay: {
    //             delay: 4000,
    //             stopOnLastSlide: false,
    //             disableOnInteraction: true,
    //         },
    //         roundLengths:true,
    //         speed:800,
    //         loop:true
    //     });
    //     // //榧犳爣瑕嗙洊鍋滄鑷姩鍒囨崲
    //     // $('#kv_swiper').mouseover(function() {
    //     //     swiper.stopAutoplay();
    //     // })
    //     // $('#kv_swiper').mouseout(function() {
    //     //     //some code
    //     //     swiper.startAutoplay();
    //     // })
    //     //榧犳爣瑕嗙洊鍋滄鑷姩鍒囨崲
    //     swiper.el.onmouseover = function(){
    //         swiper.autoplay.stop();
    //     }
    //     //榧犳爣绂诲紑寮€濮嬭嚜鍔ㄥ垏鎹�
    //     swiper.el.onmouseout = function(){
    //         swiper.autoplay.start();
    //     }
    // },
    swiperDiqi:function(){
        var newData = fqsDatas.getPosterData(),
            $fqList = $('#diqi_list'),
            itemHtml = $('#js_diqi_tpl').html();
        function renderDiqi(){
            var optionHtmlList = renderOption(newData);
            $fqList.empty().append(optionHtmlList);
        }
        //娓叉煋閫夋嫨鍒楄〃
        function renderOption(data){
            var list = '';
            data.forEach(function(item, index) {
                list += initTools.tplReplace(itemHtml,{
                    id: index,
                    nickname: item.nickname,
                    poster:item.poster
                })
            });
            return list;
        }
        //鍏堟覆鏌揾tml
        renderDiqi();

        var diqiSwiper = new Swiper ('#diqi_swiper', {
            loop: true, // 寰幆妯″紡閫夐」
            // preloadImages:false,
            spaceBetween: 0,
            roundLengths:true,
            autoplay: {
                delay: 4000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 7
            },
            slideToClickedSlide: true,
            on:{
                click: function(){
                    diqiSwiper.autoplay.start();
                }
            },
            // slide鐨勫垏鎹㈡晥鏋滐紝榛樿涓�"slide"锛堜綅绉诲垏鎹級锛屽彲璁剧疆涓�'slide'锛堟櫘閫氬垏鎹€€侀粯璁わ級,"fade"锛堟贰鍏ワ級"cube"锛堟柟鍧楋級"coverflow"锛�3d娴侊級"flip"锛�3d缈昏浆锛夈€�
            effect: 'coverflow',
            slidesPerView: 3,// 璁剧疆slider瀹瑰櫒鑳藉鍚屾椂鏄剧ず鐨剆lides鏁伴噺(carousel妯″紡)
            centeredSlides: true, // 璁惧畾涓簍rue鏃讹紝active slide浼氬眳涓紝鑰屼笉鏄粯璁ょ姸鎬佷笅鐨勫眳宸︺€�
            initialSlide: 3,
            mousewheel:false,
            coverflowEffect: {
                rotate: 0,
                stretch: 123, // 鎸囩殑鏃跺悗闈竴寮犲浘鐗囪鍓嶄竴寮犲浘鐗囬伄鎸＄殑閮ㄥ垎
                depth: 80, // 鍥剧墖缂╁皬鐨勯儴鍒�
                modifier: 2,
                slideShadows:true
            }
        });
        
        //榧犳爣瑕嗙洊鍋滄鑷姩鍒囨崲
        diqiSwiper.el.onmouseover = function(){
            diqiSwiper.autoplay.stop();
        }
        //榧犳爣绂诲紑寮€濮嬭嚜鍔ㄥ垏鎹�
        diqiSwiper.el.onmouseout = function(){
            diqiSwiper.autoplay.start();
        }
    },
    //breakthrough slider
    swiperBki:function(){
        var bkiSwiper = new Swiper('#bki_swiper', {
            slidesPerView: 4,
            // slidesPerGroup: 4,
            spaceBetween: 12,
            loop: true,
            loopFillGroupWithBlank: true,
            autoplay: {
                delay: 2500,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            speed:700,
        });

        //榧犳爣瑕嗙洊鍋滄鑷姩鍒囨崲
        bkiSwiper.el.onmouseover = function(){
            bkiSwiper.autoplay.stop();
        }
        //榧犳爣绂诲紑寮€濮嬭嚜鍔ㄥ垏鎹�
        bkiSwiper.el.onmouseout = function(){
            bkiSwiper.autoplay.start();
        }
    },
    //jmt XXX邀请赛
    jmtSilde:function() {
        var $jmtSilder = $('#jmt_silder'),
            number = $jmtSilder.find('.jmt_control_list li'),
            bodies = $jmtSilder.find('.jmt_silder_list li'),
            defaultOpts = { interval: 4000 },
            _count = $(number).length,
            _current = 0,
            _intervalID = null;
        var stop = function () { window.clearInterval(_intervalID); };
        var slide = function (opts) {
            if (opts) {
                _current = opts.current || 0;
            } else {
                _current = (_current >= (_count - 1)) ? 0 : (++_current);
            };
            $(bodies).fadeOut('200').eq(_current).fadeIn('500');
            $(number).removeClass("act").eq(_current).addClass("act");
            if(_current){
                $jmtSilder.find('.light_sweep_bar').addClass('movedone');
                $('.dw_rate_show .star_precent').animate({width:"0"},50);
            }else{
                $jmtSilder.find('.light_sweep_bar').removeClass('movedone');
                $('.dw_rate_show .star_precent').animate({width:"100%"},1000);
            }
        };
        var go = function () {
            stop();
            _intervalID = window.setInterval(function () { if (_count > 1) { slide(); } }, defaultOpts.interval);
        };
        var itemMouseOver = function (target, items) {
            stop();
            var i = $.inArray(target, items);
            slide({ current: i });
        };
        $(number).on('click',function () {
            if (!$(this).hasClass('act')) {
                itemMouseOver(this, $(number)); 
            } else {
                stop();
            } 
        });
        $(bodies).hover(stop, go);
        $(number).hover(stop, go);
        go();
    },
    //陈家军+俱乐部 文字动画
    solgenAn:function(){
        var $bodies = $('#daoy_solgen_list li');
        var _count = $bodies.length;
        var defaultOpts = { interval: 4000 };
        var _current = 0;
        var _intervalID = null;
        var stop = function () { window.clearInterval(_intervalID); };
        var slides = function () {
            _current = (_current >= (_count - 1)) ? 0 : (++_current);
            $bodies.eq(_current).siblings('li').removeClass('fadeIn').addClass('fadeOut');
            setTimeout(function(){
                $bodies.eq(_current).removeClass('fadeOut').addClass('fadeIn');
            }, 500);
        };
        var go = function () {
            stop();
            _intervalID = window.setInterval(function () { if (_count > 1) { slides(); } }, defaultOpts.interval);
        };
        // $bodies.hover(stop, go);
        go();
    }
}