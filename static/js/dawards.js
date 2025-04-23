var domain  = "https://" + location.host;
var fileUrl = "https://jqd.tobe.host";
var editor;
var upload = {
    uploadBtn: function (id, folder, imgsrc, resize) {
        KindEditor.ready(function (K) {
            var uploadbutton = K.uploadbutton({
                button: K('#' + id)[0],
                fieldName: 'imgFile',
                url: domain + '/dawards_datas/eupload?dir=' + folder,
                afterUpload: function (data) {
                    if (data.error === 0) {
						if(id=="upload_avatar"){$('#' + imgsrc).removeAttr("src");}
                        var url = K.formatUrl(data.url, 'absolute');
                        K('#' + imgsrc).attr("src", url);
						K('#' + imgsrc).attr("width", 380);
                        if (resize) {
							if (data.w > data.h) {
                                K('#' + imgsrc).attr("width", 380);
								if(id=="upload_avatar"){K('#' + imgsrc).removeAttr("height");}
                            } else {
                                K('#' + imgsrc).attr("height", 380);
								if(id=="upload_avatar"){K('#' + imgsrc).removeAttr("width");}
                            }
                        }
                    } else {
                        // alert(data.message);
			            openCloseTips('涓婁紶鏍煎紡鏈夎', 'color_red', '280');
                    }
                },
                afterError: function (str) {
                    // alert('鑷畾涔夐敊璇俊鎭�: ' + str);
                    openCloseTips('涓婁紶鍑洪敊浜�', 'color_red', '280');
                }
            });
            uploadbutton.fileBox.change(function (e) {
                uploadbutton.submit();
            });
        });
    },
	simple: function (id,folder,listdom) {
		// if($('#' + listdom+" .pic_iteam").length<5){
			KindEditor.ready(function (K) {
				var uploadbutton = K.uploadbutton({
					button: K('#' + id)[0],
					fieldName: 'imgFile',
					url: domain + '/dawards_datas/eupload?dir=' + folder,
					afterUpload: function (data) {
						if (data.error === 0) {
							var url = K.formatUrl(data.url, 'absolute');
							$('#' + listdom).append('<div class="mg_b_10 pic_iteam"><div class="mg_b_10 h_180 clearfix"><a href="'+url+'" target="_blank"><img src="'+url+'" height="180" class="f_l"></a><a class="fw_b f_l mg_t_166 mg_l_10 fz_12 color_b58 del_line_btn">鍒犻櫎</a></div><div><input type="text" class="ntext" placeholder="璇疯緭鍏ョ礌鏉愭弿杩帮紝闈炲繀濉�"/></div></div>');
							
						} else {
							alert(data.message);
						}
					},
					afterError: function (str) {
						alert('鑷畾涔夐敊璇俊鎭�: ' + str);
					}
				});
				uploadbutton.fileBox.change(function (e) {
					uploadbutton.submit();
				});
			});
		// }else{
		// 	openCloseTips('鎮ㄤ笂浼犵殑澶浜�', 'color_red', '280');
	    // 	return false;
		// }
    }
}

//鍏敤宸ュ叿鍑芥暟
var initTools = (function(){
    function getTarget(ev){
        var e = ev || window.event;
        return e.target || e.srcElement;
    }
    function tplReplace (tpl, replaceObject){
        return tpl.replace(/{{(.*?)}}/g, function(node, key){
            return replaceObject[key];
        })
    }
    return {
        getTarget:getTarget,
        tplReplace:tplReplace
    }
})();
//鍏敤鏂规硶
var initModules = (function($){
    /*dw澶撮儴鍏敤*/
    function dwNav(){
        $('#js_dw_nav li').hover(function(){
			$(this).children('.menu').stop(true,true).slideDown(100);
		},function(){
			$(this).children('.menu').stop(true,true).slideUp(100);
		})
    }
    /*妯℃嫙select*/
    function vmSelect(target){
        var tar = $(target),
            tarOptions = $('.select_options');
            tarVal = tar.children('.select_val'),
            tarOptionsLi = tar.children('.select_options').children('li');
        //鐐瑰嚮灞曞紑 鍐嶇偣鍏抽棴
        tarVal.on('click',function(e){
            e.stopPropagation();
            var myTarOptions = $(this).next('.select_options');
            if(myTarOptions.hasClass('hide')){
                tarOptions.addClass('hide');
                myTarOptions.removeClass('hide');
            }else{
                myTarOptions.addClass('hide');
            }
        });
        //鐐瑰嚮閫夋嫨璧嬪€�
        tarOptionsLi.on('click', function(e){
            e.stopPropagation();
            var myTarOptions = $(this).parent('.select_options'),
                myTarVal = $(this).parent('.select_options').prev('.select_val');
            if(!myTarOptions.hasClass('hide')){
                var ttext = $(this).text(),
                    tval = $(this).attr('value');
                myTarVal.attr('data-option',tval);
                myTarVal.children('span').text(ttext);
                myTarVal.removeClass('color_cac').addClass('color_fff');
                myTarOptions.addClass('hide');
            }
        });
        //鐐瑰嚮鍏朵粬鍦版柟瑙﹀彂鍏抽棴
        $(document).on('click',function(){
            tarOptions.addClass('hide');
        });
    }
    /*璇勫垎star娓叉煋 renderListRate('9','$(this)');*/
    function renderStar(rate, $con){
        var $rateStar = $con,
            ow = $con.parent().width(),
            starWidth = 0,
            sp = 2, //star 闂撮殭
            shw = 6; //鍗婇star 瀹藉害
            rts = rate ? parseInt(rate) : 0;
        switch (rts) {
            case 0:  starWidth = 0;   break;
            case 1:  starWidth = shw; break;
            case 2:  starWidth = shw * 2 + sp; break;
            case 3:  starWidth = shw * 3 + sp; break;
            case 4:  starWidth = shw * 4 + sp * 2; break;
            case 5:  starWidth = shw * 5 + sp * 2; break;
            case 6:  starWidth = shw * 6 + sp * 3; break;
            case 7:  starWidth = shw * 7 + sp * 3; break;
            case 8:  starWidth = shw * 8 + sp * 4; break;
            case 9:  starWidth = shw * 9 + sp * 4; break;
            case 10: starWidth = ow; break;
        } 
        $rateStar.css('width', starWidth +'px'); //鏀瑰彉绾㈣壊star 瀹藉害
    }
    /*璇勫垎star娓叉煋 proListRate('#project_list');*/
    function renderListRateStar(id){
        $(id + ' .star_precent').each(function(){
            var liRate = ($(this).attr('data-rate') != '') ? $(this).attr('data-rate') : 0;
            /*璋冪敤娓叉煋鍒楄〃star*/
            renderStar(liRate, $(this));
        })
    }
    //璋冪敤
    return {
        dwNav:dwNav,
        vmSelect:vmSelect,
        renderListRateStar:renderListRateStar
    }
})(jQuery);
// 瑕嗗啓toFixed
Number.prototype.toFixed = function(s)
{
    return (parseInt(this * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString();
}
//绔嬪嵆鎵ц鎻愮ず妗�
/*
;(function(){
    var tipBox = $('#dw_handle_tip').next('.dw_header_tips');
    if(tipBox.length>0){
        $('#dw_handle_tip').on('click',function(){
            if(tipBox.hasClass('hide')){
                tipBox.fadeIn('fast').removeClass('hide');
            }else{
                tipBox.fadeOut('fast').addClass('hide');
            }
        });
        $(document).on('click',function(e){
            if(!$(e.target).closest("#dw_handle_item").length)聽{
                if(!tipBox.hasClass('hide')){
                    tipBox.fadeOut('fast').addClass('hide');
                }
            }
        });
    }
})();*/

//鏍￠獙鐧诲綍
var dwLogin = {
    //楠岃瘉鏄惁鐧诲綍
    checkUserLogin:function(){
        var userType = $("#userType").val() ? $("#userType").val() : "";
        if (userType != 1) {
            openPopup("420", "popup_login_user");
            //绂佹鍏抽棴
            $('#popupLayerScreenLocker').css('pointer-events','none');
            $('#popupLayerScreenLocker').on('click',function(e){
                e.stopPropagation();
                e.preventDefault();
            })
            return false;
        }
    }
}
/*棣栭〉*/
var dwIndex = {
    init:function(){
        initModules.dwNav();
        this.swiperKv();
        // this.swiperBki();
        // this.marqueeCon();
        // this.swiperNewPro();
        this.enterCat();
        this.renderShowImg();
        // this.sortWinners();
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
    swiperKv:function(){
        // /*杞挱鏂伴椈*/
        var swiper = new Swiper('#kv_swiper', {
            effect: 'fade',
            pagination: {
                el: '.swiper-pagination',
                clickable :true
            },
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: {
                delay: 4000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            roundLengths:true,
            speed:800,
            loop:true
        });
        // //榧犳爣瑕嗙洊鍋滄鑷姩鍒囨崲
        // $('#kv_swiper').mouseover(function() {
        //     swiper.stopAutoplay();
        // })
        // $('#kv_swiper').mouseout(function() {
        //     //some code
        //     swiper.startAutoplay();
        // })
        //榧犳爣瑕嗙洊鍋滄鑷姩鍒囨崲
        swiper.el.onmouseover = function(){
            swiper.autoplay.stop();
        }
        //榧犳爣绂诲紑寮€濮嬭嚜鍔ㄥ垏鎹�
        swiper.el.onmouseout = function(){
            swiper.autoplay.start();
        }
        /*杞挱璇勯€夊姙娉�*/
        // var jmtSwiper = new Swiper('#jmt_swiper', {
        //     effect: 'fade',
        //     spaceBetween: 0,
        //     freeMood:false,
        //     simulateTouch:false,
        //     shortSwipes:false,
        //     followFinger:false,
        //     centeredSlides: true,
        //     autoplay: {
        //         delay: 3000,
        //         stopOnLastSlide: false,
        //         disableOnInteraction: true,
        //     },
        //     roundLengths:true,
        //     speed:500,
        //     loop:true,
        //     on: {
        //         init: function(jmtSwiper){
        //             var $tabs = $('#jmt_swiper_tab');
        //             $tabs.find('li').removeClass('act');
        //             $tabs.find('li').eq(0).addClass('act');
        //         }, 
        //         slideChangeTransitionStart:function(jmtSwiper){
        //             var thisIndex = this.activeIndex;
        //             var $tabs = $('#jmt_swiper_tab');
        //             if(thisIndex ==3 || thisIndex ==4){
        //                 $tabs.find('li').removeClass('act');
        //                 $tabs.find('li').eq(1).addClass('act');
        //             }else{
        //                 $tabs.find('li').removeClass('act');
        //                 $tabs.find('li').eq(0).addClass('act');
        //             }
        //         }
        //     }
        // });
        // var $tabs = $('#jmt_swiper_tab');
        // $tabs.find('li').eq(0).on('click', function(){
        //     jmtSwiper.slideTo(1);
        //     jmtSwiper.autoplay.start();
        // });
        // $tabs.find('li').eq(1).on('click', function(){
        //     jmtSwiper.slideTo(3);
        //     jmtSwiper.autoplay.start();
        // });

    },
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
    //jmt
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
    enterCat:function(){
        var $enterCat = $('#js_entry_category'),
            $catIntro = $('#js_cat_intro');
        $enterCat.on('mouseover', 'li', function(){
            var fieldHtml = $(this).children('.cat_desc').html();
            // console.log(fieldHtml);
            if(fieldHtml != ''){$catIntro.html(fieldHtml)}
        });
    },
    goToWinner:function(){
        var wlPos = $('#js_winners_list').offset().top;
        $('html,body').animate({ scrollTop: wlPos }, 300);
    },
    // dwHandleTip:function(){
    //     var tipBox = $('#dw_handle_tip').next('.dw_header_tips');
    //     $('#dw_handle_tip').on('click',function(){
    //         if(tipBox.hasClass('hide')){
    //             tipBox.fadeIn('fast').removeClass('hide');
    //         }else{
    //             tipBox.fadeOut('fast').addClass('hide');
    //         }
    //     });
    //     $(document).on('click',function聽(e)聽{
    //         if(!$(e.target).closest("#dw_handle_item").length)聽{
    //             if(!tipBox.hasClass('hide')){
    //                 tipBox.fadeOut('fast').addClass('hide');
    //             }
    //         }
    //     });
    // },
    dwEnterTip:function(){
        var $tipBox = $('#dw_enter_item').next('.dw_header_tips');
        if($tipBox.hasClass('hide')){
            $tipBox.fadeIn('fast').removeClass('hide');
            timeEs = setTimeout(function(){
                if(!$tipBox.hasClass('hide')){
                    $tipBox.fadeOut('fast').addClass('hide');
                    clearTimeout(timeEs);
                }
            }, 5000);
        }else{
            $tipBox.fadeOut('fast').addClass('hide');
            clearTimeout(timeEs);
        }
        $(document).on('click',function(e){
            if(!$(e.target).closest("#dw_enter_item").length)聽{
                if(!$tipBox.hasClass('hide')){
                    $tipBox.fadeOut('fast').addClass('hide');
                    clearTimeout(timeEs);
                }
            }
        });
    },
    renderShowImg:function(){
        //娓叉煋鏄熸槦
        // if($('.dw_rate_show').length != 1){ return;}
        var nowSt = $(window).scrollTop(),
            $dwRateShow = $('.dw_rate_show').find('.star_precent'),
            targetHeight = $('.dw_rate_show').offset().top - 600,
            $sweepTarget = $('#jmt_silder'),
            sweepHeight = $('#jmt_silder').offset().top - 400;
        function checkPos(ast){
            //鍒ゆ柇鏄惁鍒板簳閮ㄤ笉瓒呰繃footer
            if(ast>=targetHeight && !$sweepTarget.hasClass('movedone')) {
                $dwRateShow.animate({width:"100%"},1000);
                // dwIndex.swiperMsg();
                dwIndex.sortWinners();
            }
        }
        function checkSweep(ast){
            //鍒ゆ柇鏄惁鍒板簳閮ㄤ笉瓒呰繃footer
            if(ast>=targetHeight) {
                if(!$sweepTarget.hasClass('movedone')){
                    $sweepTarget.addClass('movedone');
                    dwIndex.jmtSilde();//鍔犺浇鍔ㄧ敾silder
                }
            }
        }
        $(window).on('scroll', function () {			
            var scrollTop = $(this).scrollTop();
            checkPos(scrollTop);
            checkSweep(scrollTop);
        });
        
        checkPos(nowSt);
    },
    //2021璇勯€夊姙娉曟枃瀛楀姩鏁�
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
    },
    //daoy 鏃ユ湡鍊掕鏃�
    daoyChmap:function(){
        var today = new Date(),
            now = new Date('2025-12-31'),//寮€濮嬫椂闂�
            yearAgo = new Date('2024-12-31');//缁撴潫鏃堕棿
        function runAn(tp){
            var chartData = d3.time.days(yearAgo, now).map(function (dateElement) {
                var lflag = ((dateElement.getDate() > today.getDate() && dateElement.getMonth() == today.getMonth())||(dateElement.getMonth() > today.getMonth()));
                return {
                    date: dateElement,
                    count: lflag ? 0 : Math.floor(Math.random() * 60)
                };
            });
            var heatmap = calendarHeatmap().data(chartData).selector('.chm_box').tooltipEnabled(tp).colorRange(['#f9d9bb', '#bb8f62']).onClick(function (data) {});
            heatmap();
        }
        var $dsList = $('#daoy_solgen_list');
        var topSlen = $dsList.offset().top - $dsList.height();
        $(window).on('scroll', function () {
            var scrollTop = $(this).scrollTop();
            if(scrollTop>topSlen) {
                if(!$dsList.hasClass('movedone')){
                    $dsList.addClass('movedone');
                    var count = 0 ;
                    var loop = setInterval(function(){
                        if(count == 20){ clearInterval(loop); count = 0;runAn(1);} else{ count++; runAn(0);}
                    }, 500);
                }
            }
        });
        runAn(0);
    },
    //2022闅忔満鍓嶄竴骞磋幏濂栦綔鍝�
    sortWinners:function(){
        var $dwlyList = $('#daw_ly_list'),
            itemHtml = $('#js_dwly_tpl').html();
        $.ajax({
            type: "GET",
            url: domain + "/api/getDawardsProjectsRand",
            dataType: "json",
            success: function(data){
                // console.log(data);
                if(data.length != 0){
                    //鍏堟覆鏌揾tml
                    var optionHtmlList = renderOption(data);
                    $dwlyList.empty().append(optionHtmlList);
                }else{
                    // $dwlyList.empty();
                    console.log('鍑洪敊浜嗭紵娌℃湁鏁版嵁锛�');
                }
            },
            error:function(error){
                console.log(error);
            }
        });
        //娓叉煋閫夋嫨鍒楄〃
        function renderOption(data){
            var list = '';
            data.forEach(function(item, index) {
                list += initTools.tplReplace(itemHtml,{
                    id: index,
                    catLink: item.awards_category_link,
                    proTitle:item.dawards_title,
                    proImgSrc: item.cover,
                    catTypeName:item.awards_category_name
                })
            });
            return list;
        }
    },
    //present story 璺戦┈鐏�
    marqueeCon:function(){
		var m1 = $('#marquee_top').marquee({
            gap: 0,//闂撮殧
            delayBeforeStart: 0,//寤舵椂鍚姩锛屽崟浣嶏細姣
            direction: 'left',//婊氬姩鏂瑰悜锛屼笂涓嬪乏鍙筹紝
            pixels: 1,//姣忔婊氬姩姝ラ暱锛屽崟浣嶏細鍍忕礌
        });
    }
}
//寰俊浜岀淮鐮�2023-7-26
var dwxQrcImg = {
    init:function(){
        $('<div id="wxqrc_container" style="display:none;"></div>').appendTo($('body'));
        var tagDomLen = document.getElementById('wxqrc_container');
        if(!tagDomLen){return;}
        var qrcode = new QRCode('wxqrc_container', {
            text: domain,
            width: 88,
            height: 88,
            colorDark: '#333131',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
        });
        
        $('.sw_hover_btn').on('hover', function(){
            var $this = $(this),
                item_link = $this.attr('data-link'),
                $target_pop_pic = $this.parent('.share_wx_box').find('.target_pop_pic'),
                flag = $target_pop_pic.hasClass('loading');
            item_link = item_link.replace(/(www.)/g,'m.');//鏇挎崲鎴愬叧鎵嬫満閾炬帴
            if(flag){
                // console.log(item_link);
                setTimeout(()=>{
                    $target_pop_pic.empty();
                    qrcode.clear();
                    qrcode.makeCode(item_link);
                    var newPicHtml=$("#wxqrc_container").html();
                    newPicHtml=newPicHtml.replace(/<(canvas.*?)>/gi,"");
                    newPicHtml=newPicHtml.replace(/<(\/canvas.*?)>/gi,"");
                    $target_pop_pic.html(newPicHtml);
                    $target_pop_pic.removeClass('loading');
                },100);
            }
        });
    }
}

/*棣栭〉*/
var dwJudge = {
    init:function(){
        initModules.dwNav();
    },
    handleSwitch:function(){
        var $applyZone = $('#apply_zone');
        $('#switch_zone_btn').on('click',function(){
            var applyZoneOt = $('#js_sz_ot').offset().top;
            $('html,body').animate({ scrollTop: applyZoneOt }, 200);
            if($applyZone.hasClass('hide')){
                $applyZone.slideDown().removeClass('hide');
            }else{
                return;
            }
        });
        $('#goto_apply_zone').on('click',function(){
            var applyZoneOt = $('#js_sz_ot').offset().top;
            if($applyZone.hasClass('hide')){
                $applyZone.slideDown().removeClass('hide');
            }
            $('html,body').animate({ scrollTop: applyZoneOt }, 300);
        });

		$('#apply_jobPurpose li').on('click',function(){
			if(!$(this).hasClass('act')){
				$(this).siblings().removeClass('act');
				$(this).addClass('act');
			}
		})

    },
    senior:function(){
        dwLogin.checkUserLogin();
        initModules.dwNav();
        this.checkBox();
        dwIndex.enterCat();
        dwJudge.handleSwitch();
    },
    checkBox:function(){
        //chk_box
        $('.cat_item').on('click',function(){
            if($(this).hasClass('act')){
                $(this).removeClass('act');
                $(this).children('.chk_box').removeClass('act');
            }else{
                $(this).addClass('act');
                $(this).children('.chk_box').addClass('act');
            }
        });
    },
	checkSubmit:function(){
		var mob = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[5-6]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
		var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,8}$/;
		if ($("#apply_name").val() == '') {
			openCloseTips('璇峰～鍐欏鍚�', 'color_red', '280');
	    	return false;
	    }
		if ($("#apply_company").val() == '') {
			openCloseTips('璇峰～鍐欏叕鍙�', 'color_red', '280');
	    	return false;
	    }
		if ($("#apply_title").val() == '') {
			openCloseTips('璇峰～鍐欒亴浣�', 'color_red', '280');
	    	return false;
	    }
		if ($("#apply_jobPurpose .act").attr("data-value") == '') {
			openCloseTips('璇峰～鍐欒亴鑳界被鍨�', 'color_red', '280');
	    	return false;
	    }
		if (!myreg.test($("#apply_email").val())){
			openCloseTips('浼佷笟閭鏈夐敊璇�', 'color_red', '280');
	    	return false;
		}
		if (!mob.test($("#apply_mobile").val())){
			openCloseTips('鑱旂郴鎵嬫満鏈夐敊璇�', 'color_red', '280');
	    	return false;
		}
		if ($("#avatar_preview img").attr("src") == fileUrl+'/www/images/dawards/avatar_bg.jpg') {
			openCloseTips('璇蜂笂浼犺倴鍍忕収鐗�', 'color_red', '360');
	    	return false;
		}
        if($('#submit_apply_judge_btn').attr('disabled')){
            $('#submit_apply_judge_btn').removeAttr('disabled');
        }
		openPopup("400", "popup_apply_confirm");
	},
	apply:function (val) {
        $('#submit_apply_judge_btn').attr('disabled','true');
		var mob = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[5-6]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
		var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,8}$/;
		if ($("#apply_name").val() == '') {
			openCloseTips('璇峰～鍐欏鍚�', 'color_red', '280');
	    	return false;
	    }
		if ($("#apply_company").val() == '') {
			openCloseTips('璇峰～鍐欏叕鍙�', 'color_red', '280');
	    	return false;
	    }
		if ($("#apply_title").val() == '') {
			openCloseTips('璇峰～鍐欒亴浣�', 'color_red', '280');
	    	return false;
	    }
		if ($("#apply_jobPurpose .act").attr("data-value") == '') {
			openCloseTips('璇峰～鍐欒亴鑳界被鍨�', 'color_red', '280');
	    	return false;
	    }
		if (!myreg.test($("#apply_email").val())){
			openCloseTips('浼佷笟閭鏈夐敊璇�', 'color_red', '280');
	    	return false;
		}
		if (!mob.test($("#apply_mobile").val())){
			openCloseTips('鑱旂郴鎵嬫満鏈夐敊璇�', 'color_red', '280');
	    	return false;
		}
		if ($("#avatar_preview img").attr("src") == fileUrl+'/www/images/dawards/avatar_bg.jpg') {
			openCloseTips('璇蜂笂浼犺倴鍍忕収鐗�', 'color_red', '360');
	    	return false;
		}
	    var name                = $("#apply_name").val();
	    var company             = $("#apply_company").val();
		var title               = $("#apply_title").val();
		var functions           = $("#apply_jobPurpose .act").attr("data-value");
		var experience          = $("#apply_experience").val();
		var email               = $("#apply_email").val();
		var mobile              = $("#apply_mobile").val();
		var wechat              = $("#apply_wechat").val();
		var address             = $("#apply_address").val();
		var introduce           = $("#apply_introduce").val();
		var avatar              = $("#avatar_preview img").attr("src");
		var toSenior            = $('.chk_box.act').length;
		var data                = {datas:{name:name,company:company,title:title,functions:functions,experience:experience,email:email,mobile:mobile,wechat:wechat,address:address,avatar:avatar,introduce:introduce,toSenior:toSenior},val:val};
		$.post(domain+"/dawards_datas/dAwardsJudgeApply",data,function(data){
			switch(data.isSuccess){
			    case 0:
					$.closePopupLayer('popup_apply_confirm');
					openCloseTips('鎻愪氦澶辫触', 'color_red', '280');
				break;
			    case 1:
					$.closePopupLayer('popup_apply_confirm');
					openCloseTips('鎻愪氦鎴愬姛', 'color_green', '280');
                    setTimeout(function(){
                        location.reload();
                    },1000);
				break;
			}
		},"json");
    },
    //缁堝璇勫鐢宠
	checkSeniorSubmit:function(){
		var mob = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[5-6]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,8}$/;
        if ($("#apply_name").val() == '') {
			openCloseTips('璇峰～鍐欏鍚�', 'color_red', '280');
            return false;
        }
        if ($("#apply_company").val() == '') {
			openCloseTips('璇峰～鍐欏叕鍙�', 'color_red', '280');
            return false;
        }
        if ($("#apply_title").val() == '') {
			openCloseTips('璇峰～鍐欒亴浣�', 'color_red', '280');
            return false;
        }
		if ($("#apply_jobPurpose .act").attr("data-value") == '') {
			openCloseTips('璇峰～鍐欒亴鑳界被鍨�', 'color_red', '280');
	    	return false;
	    }
        if (!mob.test($("#apply_mobile").val())){
			openCloseTips('鑱旂郴鎵嬫満鏈夐敊璇�', 'color_red', '280');
            return false;
        }
        if (!myreg.test($("#apply_email").val())){
			openCloseTips('浼佷笟閭鏈夐敊璇�', 'color_red', '280');
            return false;
        }
        if ($("#avatar_preview img").attr("src") == fileUrl+'/www/images/dawards/avatar.jpg') {
			openCloseTips('璇蜂笂浼犺倴鍍忕収鐗�', 'color_red', '280');
            return false;
        }
        if ($("#js_entry_category li.act").length<1) {
			openCloseTips('璇峰嬀閫夌被鍒�', 'color_red', '280');
            return false;
        }
        if($('#submit_apply_judge_btn').attr('disabled')){
            $('#submit_apply_judge_btn').removeAttr('disabled');
        }
		openPopup("400", "popup_apply_confirm");
	},
	seniorApply: function (val) {
        $('#submit_apply_judge_btn').attr('disabled','true');
        var mob = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[5-6]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,8}$/;
        if ($("#apply_name").val() == '') {
			openCloseTips('璇峰～鍐欏鍚�', 'color_red', '280');
            return false;
        }
        if ($("#apply_company").val() == '') {
			openCloseTips('璇峰～鍐欏叕鍙�', 'color_red', '280');
            return false;
        }
        if ($("#apply_title").val() == '') {
			openCloseTips('璇峰～鍐欒亴浣�', 'color_red', '280');
            return false;
        }
		if ($("#apply_jobPurpose .act").attr("data-value") == '') {
			openCloseTips('璇峰～鍐欒亴鑳界被鍨�', 'color_red', '280');
	    	return false;
	    }
        if (!mob.test($("#apply_mobile").val())){
			openCloseTips('鑱旂郴鎵嬫満鏈夐敊璇�', 'color_red', '280');
            return false;
        }
        if (!myreg.test($("#apply_email").val())){
			openCloseTips('浼佷笟閭鏈夐敊璇�', 'color_red', '280');
            return false;
        }
        if ($("#avatar_preview img").attr("src") == fileUrl+'/www/images/dawards/avatar.jpg') {
			openCloseTips('璇蜂笂浼犺倴鍍忕収鐗�', 'color_red', '280');
            return false;
        }
		if ($("#js_entry_category li.act").length<1) {
			openCloseTips('璇峰嬀閫夌被鍒�', 'color_red', '280');
            return false;
        }
        var name                = $("#apply_name").val();
        var company             = $("#apply_company").val();
        var title               = $("#apply_title").val();
        var experience          = $("#apply_experience").val();
		var functions           = $("#apply_jobPurpose .act").attr("data-value");
        var email               = $("#apply_email").val();
        var mobile              = $("#apply_mobile").val();
        var address             = $("#apply_address").val();
        var introduce           = $("#apply_introduce").val();
        var avatar              = $("#avatar_preview img").attr("src");
        var wechat              = $("#apply_wechat").val();
        var aid_name            = $("#apply_aid_name").val();
        var aid_mobile          = $("#apply_aid_mobile").val();
        var aid_wechat          = $("#apply_aid_wechat").val();
        var category = "";
        var category_name = "";
        $("#js_entry_category li.act").each(function(){
            if($(this).children("a").attr("data-cat")>0){
                if(category){
                    category      += ','+$(this).children("a").attr("data-cat");
                    category_name += ','+$(this).children("p").text();
                }else{
                    category      = $(this).children("a").attr("data-cat");
                    category_name = $(this).children("p").text();
                }
            }
        });
        var toSenior            = 1;
        var data                = {datas:{name:name,company:company,title:title,functions:functions,experience:experience,email:email,mobile:mobile,address:address,avatar:avatar,introduce:introduce,wechat:wechat,aid_name:aid_name,aid_mobile:aid_mobile,aid_wechat:aid_wechat,category:category,category_name:category_name},val:val};
        $.post(domain+"/dawards_datas/dAwardsJudgeApply",data,function(data){
            switch(data.isSuccess){
                case 0:
                    openCloseTips('鎻愪氦澶辫触', 'color_red', '280');
                break;
                case 1:
                    openCloseTips('鎻愪氦鎴愬姛', 'color_green', '280');
                    setTimeout(function(){
                        location.reload();
                    },1000);
                break;
            }
        },"json");
    },
    getMoreJudges:function(type, page){
        var tp = type ? type : 1,
            p = page ? page: 2,
            $seniorList = $('#senior_judges_list'),
            $juniorList = $('#junior_judges_list'),
            $getSeniorBtn = $('#js_senior_btn'),
            $getJuniorBtn = $('#js_junior_btn');
        if(p > 1){
            var data = {type:tp, page:p};
            $.ajax({
                type: "POST",
                url: domain + "/api/getMoreJudge",
                data: data,
                dataType: "json",
                success: function(data){
                    if(data.isSuccess == 1){
                        if(data.content.length > 0){
                            var _list = '';
                            $.each(data.content,function(i,judges){
                                if(tp == 1){
                                    _list += '<li><a href="'+domain+'/dawards/judges/'+judges.userId+'" target="_blank" class="color_fff"><div class="thumb lh_0"><img class="load" src="'+judges.avatar+'" alt="'+judges.name+'" title="'+judges.name+'" /></div><div class="judge_item_bg"><h5 class="fz_16 pd_0_10 mg_b_12 substr_one" title="'+judges.name+'">'+judges.name+'</h5><p class="fz_14 color_fff substr_one mg_b_5" title="'+judges.company+'">'+judges.company+'</p><p class="fz_14 color_969 substr_one" title="'+judges.title+'">'+judges.title+'</p></div></a></li>';
                                }else{
                                    _list += '<li><a href="'+domain+'/dawards/judges/'+judges.userId+'" target="_blank" class="color_fff"><div class="thumb lh_0"><img class="load" src="'+judges.avatar+'" alt="'+judges.name+'" title="'+judges.name+'" /></div><div class="judge_item_bg"><h5 class="fz_16 mg_b_12 substr_one" title="'+judges.name+'">'+judges.name+'</h5><p class="fz_12 color_969 substr_one" title="'+judges.company+'">'+judges.company+'</p></div></a></li>';
                                }
                            });
                            p = p + 1;//涓嬩竴椤靛噯澶�
                            if(tp == 1){
                                $seniorList.append(_list);
                                $getSeniorBtn.attr('onclick', 'dwJudge.getMoreJudges(1, '+p+');');
                                if(p > data.totalpage){$getSeniorBtn.remove();}
                            }else{
								$(_list).appendTo('#junior_judges_list');
                                $getJuniorBtn.attr('onclick', 'dwJudge.getMoreJudges(2, '+p+');');
                                if(p > data.totalpage){ $getJuniorBtn.remove();}
                            }
                            
                        }
                    }else{
                        console.log('鍑洪敊浜嗭紵娌℃湁鏁版嵁锛�');
                    }
                },
                error:function(error){
                    console.log(error);
                }
            }); 
        }
        
    },
    renderShowStar:function(){
        if($('.dw_rate_show').length != 1){ return;}
        //娓叉煋鏄熸槦
        var nowSt = $(window).scrollTop(),
            $dwRateShow = $('.dw_rate_show').find('.star_precent'),
            targetHeight = $('.dw_rate_show').offset().top - 400;
        function checkPos(ast){
            //鍒ゆ柇鏄惁鍒板簳閮ㄤ笉瓒呰繃footer
            if(ast>=targetHeight) {
                $dwRateShow.animate({width:"100%"},1000);
            }
        }
        $(window).on('scroll', function () {			
            var scrollTop = $(this).scrollTop();
            checkPos(scrollTop);
        });
    },
    dawardsBarChart:function(uId){
        var $rateChart = $('#rate_chart'),
            userId = uId ? uId : $('#webuserId').val();
        $.get(domain+"/api/getDawardsJudgeScore/id/"+userId,function(data){
			switch(data.isSuccess){
			    case 0:
					$rateChart.parent().addClass('hide');
				break;
			    case 1:
                    // var totalRate = data.totalize,
                    var newArr = [data.content[0],data.content[1],data.content[2],data.content[3],data.content[4]];
                    var maxData = Math.max.apply(null,newArr),
                        totalRate = maxData ? maxData : 1,
                        maxLen = 180,
                        v1 = data.content[0] ? (data.content[0] / totalRate)*maxLen : 0,
                        v2 = data.content[1] ? (data.content[1] / totalRate)*maxLen : 0,
                        v3 = data.content[2] ? (data.content[2] / totalRate)*maxLen : 0,
                        v4 = data.content[3] ? (data.content[3] / totalRate)*maxLen : 0,
                        // v5 = totalRate > 0 ? 180 - (v1+v2+v3+v4) : 0,
                        v5 = data.content[4] ? (data.content[4] / totalRate)*maxLen : 0,
                        p1 = parseInt((data.content[0] / totalRate)*100),
                        p2 = parseInt((data.content[1] / totalRate)*100),
                        p3 = parseInt((data.content[2] / totalRate)*100),
                        p4 = parseInt((data.content[3] / totalRate)*100),
                        p5 = parseInt((data.content[4] / totalRate)*100);
                        // p5 = totalRate > 0 ? 100 - (p1+p2+p3+p4) : 0;

                    var barDatas =[
                        {'name': '9-10鍒�','precent': p1,'value': v1},
                        {'name': '7-8鍒�', 'precent': p2,'value': v2},
                        {'name': '5-6鍒�', 'precent': p3,'value': v3},
                        {'name': '3-4鍒�', 'precent': p4,'value': v4},
                        {'name': '1-2鍒�', 'precent': p5,'value': v5}
                    ];
                    renderHtml(barDatas);
				break;
			}
		},"json");

        function renderHtml(barDatas){
            var res = '';
            barDatas.forEach(function(item){
                var barValue = item.value ? parseInt(item.value) : 0;
                res += '<li class="flex l_center"><div class="w_64">'+item.name+'锛�</div><div class="rate_pitem"><div class="rate_value animated slideInsLeft" style="width:'+barValue+'px;"></div></div></li>';
                // res += '<li class="flex l_center"><div class="w_64">'+item.name+'锛�</div><div class="rate_pitem"><div class="rate_value animated slideInsLeft" title="'+item.precent+'%" style="width:'+barValue+'px;"></div></div></li>';
            });
            $rateChart.empty().append(res);
        }
    },
    // 鐢宠璇勫瑁佸壀澶村儚
    modifyAvatar:function(){
        var $modify_avatar_btn = $('#modify_avatar_btn'),
            $avatar_preview = $('#avatar_preview'),
            $previw_img = $avatar_preview.children('img'),
            $dialog_judge_avatar = $('#dialog_judge_avatar'),
            $upload_box = $dialog_judge_avatar.find('.upload_box'),
            $cancel_upload_btn = $upload_box.find('.cancel_upload_btn');//鍏抽棴鎴浘妗�

        var canvas = document.getElementById("dlg_logo_canvas"),
            ctx = canvas ? canvas.getContext("2d") : '';
        const canvasWH = 280,//鐢诲竷澶у皬
            MAX_SIZE = 5;//鏈€澶�5m 鍙笂浼犵殑鏈€澶у浘鐗囧昂瀵�
        var logoOptions = {
            width: 200,
            height: 200
        };//鏈€鍚庡鍑哄浘鐗囩殑灏哄
        var border = {
            width: 40, //澶村儚杈规鍘氬害
            color: "rgba(238, 236, 236, .8)" //澶村儚杈规棰滆壊
        }
        var minImgRect = {
            width: null,
            height: null
        }; //鍥惧儚鐨勬渶灏忛珮搴︿笌瀹藉害
        var currLoc = {
            x: null,
            y: null
        }; //淇濆瓨褰撳墠鍥剧墖鍦╟anvas閲岀殑浣嶇疆
        var imgRect = {
            width: null,
            height: null
        }; //淇濆瓨褰撳墠鍥惧儚鐨勫搴︿笌楂樺害锛堢缉鏀惧悗锛�
        var midpoint = null; //淇濆瓨褰撳墠鍥剧墖鐨勫眳涓瘮渚嬶紝鎷栧姩鏃舵竻绌猴紝缂╂斁鏃堕噸鏂拌绠�
        // 灞呬腑姣斾緥锛氫互canvas涓酱绾夸负鍩哄噯灏嗗浘鐗囧垏鎴愪袱閮ㄥ垎锛屽乏渚ч儴鍒嗗崰鎬诲搴︾殑姣斾緥锛寉鏂瑰悜鍚岀悊銆�

        var rangeInput = document.getElementById("dlg_logo_silder_range"); //婊戝潡瀵硅薄
        var modifyAvatarBtn = document.getElementById("modify_avatar_btn"); //鍥惧儚涓婁紶鎸夐挳瀵硅薄
        var fileInput = document.getElementById("dlg_avatar_file"); //鍥惧儚涓婁紶鎺т欢
        var confirmCropperBtn = document.getElementById("confirm_cropper_btn"); //纭瑁佸垏鍥剧墖
        var image = new Image(); //鍥惧儚鏂囦欢
        var upImgName ='';//涓婁紶鍥剧墖鍚嶅瓧

        function bindEvent(){
            $cancel_upload_btn.on('click', closeReset);//鍏抽棴閲嶇疆
        }
        //鍏抽棴鎵€鏈変笂浼犳
        function closeReset(){
            popupOC('dialog_judge_avatar','0');
            upImgName ='';//涓婁紶鍥剧墖鍚嶅瓧缃┖
        }
        function submitNewAvatar(avatarFile){
            var formData = new FormData();
            formData.append('imgFile', avatarFile);
            $.ajax({
                url:domain+'/dawards_datas/eupload?dir=davatar',
                type:'post',
                data: formData,
                contentType: false,
                processData: false,
                success:function(data){
                    var datas = eval('(' + data + ')');
                    if(datas.error === 0){
                        $previw_img.attr('src', datas.url);
                        closeReset();
                    }else{
			            openCloseTips('涓婁紶鏍煎紡鏈夎', 'color_red', '280');
                    }
                    $('#confirm_cropper_btn').removeAttr('disabled');
                },
                error:function(){
                    openCloseTips('涓婁紶澶辫触', 'color_red', '280');
                    $('#confirm_cropper_btn').removeAttr('disabled');
                }
            })

        }

        bindEvent();

        var preview_canvas = document.createElement('canvas'),//鍒板3鍊嶇殑鍥剧墖 320*320
            pctx = preview_canvas.getContext("2d");
            preview_canvas.width = logoOptions.width * 1.6;
            preview_canvas.height = logoOptions.height * 1.6;
        //鐐瑰嚮纭鎴浘
        confirmCropperBtn.onclick = function() {
            var img = new Image();
            var newFileUrl = preview_canvas.toDataURL("image/png");

            if(newFileUrl){
                var newDataFile = saveAsImg.dataURLtoFile(newFileUrl, upImgName+'.png');
                $('#confirm_cropper_btn').attr('disabled',true);
                submitNewAvatar(newDataFile);
            }
        }
        
        //鍏冪礌妯℃嫙鍥剧墖涓婁紶鎸夐挳
        modifyAvatarBtn.onclick = function(event) {
            return fileInput.click();
        }

        //鍥剧墖涓婁紶澶勭悊浠ｇ爜
        fileInput.addEventListener('change', function(event) {
            var imgFile = fileInput.files[0];
            var size = imgFile.size;
            var type = imgFile.type.substring(imgFile.type.lastIndexOf("/")+1);
            rangeInput.value = 1;
            // console.log(imgFile);
            if(size > (1024 * 1024 * MAX_SIZE)){
                alert('涓婁紶鏂囦欢杩囧ぇ锛�5M浠ュ唴');
            }else if( type !== "jpeg" && type !=="jpg" && type !== "png" && type !== "gif"){
                alert('鍥剧墖鏍煎紡涓嶆纭紒');
            }else{
                logoPreview(imgFile);
            }

            fileInput.value = "";//閲嶇疆
        }, false);
        //棰勮鍥剧墖logo
        function logoPreview(imgFile){
            upImgName = imgFile.name.substring(0,imgFile.name.lastIndexOf("."));//瀛樺偍鍥剧墖鍚嶅瓧
            if(!window.FileReader){
                image.src = URL.createObjectURL(imgFile);
                image.onload = function(event) {
                    //缂╂斁鍥剧墖鍒板垰濂藉～婊′腑妗�
                    loadCanvasImage(image);
                };
            }else{
                var reader = new FileReader();
                reader.onload = function(e){
                    image.src = e.target.result;
                    image.onload = function(event) {
                        //缂╂斁鍥剧墖鍒板垰濂藉～婊′腑妗�
                        loadCanvasImage(image);
                    };
                }
                reader.readAsDataURL(imgFile);
            }
        }
        //鍒濆鍖栫敾甯僫mage 瀵硅薄
        function loadCanvasImage(target){
            if (target.width < target.height) {
                minImgRect.width = canvas.width - border.width * 2;
                minImgRect.height = parseInt(minImgRect.width / target.width * target.height);
            } else {
                minImgRect.height = canvas.height - border.width * 2;
                minImgRect.width = parseInt(minImgRect.height / target.height * target.width);
            }
            //澶勭悊杈圭晫鏈€灏忓€�
            if(minImgRect.width < logoOptions.width){
                minImgRect.width = logoOptions.width;
                minImgRect.height = parseInt(minImgRect.width / target.width * target.height);
            }else if(minImgRect.height < logoOptions.height){
                minImgRect.height = logoOptions.height;
                minImgRect.width = parseInt(minImgRect.height / target.height * target.width);
            }
            //缁樺埗鍒濆鍥剧墖
            imgRect.width = minImgRect.width;
            imgRect.height = minImgRect.height;
            drawing(centerImg({
                x: 0.5,
                y: 0.5
            }));
            popupOC('dialog_judge_avatar','1');
        }
        //鏍规嵁灞呬腑姣斾緥鍙婂浘鍍忓ぇ灏忥紝璁＄畻鏀剧疆鍥剧墖鐨勫潗鏍�
        //鍙傛暟: {x: <0-1>, y: <0-1>}
        //缁撴灉: {x: <coordinate_X>, y: <coordinate_Y>}
        function centerImg(ratio) {
            return { // 灞呬腑鏃跺簲婊¤冻濡備笅鏉′欢锛屽€熸璁＄畻鍑哄亸绉婚噺 x 鍜� y
                x: canvas.width / 2 - imgRect.width * ratio.x, // 妯潗鏍囧亸绉�(x) + 鍥惧儚瀹藉害*妯悜灞呬腑姣斾緥 搴旂瓑浜� canvas 瀹藉害鐨勪竴鍗婏紙涓偣妯潗鏍囷級
                y: canvas.height / 2 - imgRect.height * ratio.y // 绾靛潗鏍囧亸绉�(y) + 鍥惧儚楂樺害*绾靛悜灞呬腑姣斾緥 搴旂瓑浜� canvas 楂樺害鐨勪竴鍗婏紙涓偣绾靛潗鏍囷級
            };
        }
        
        //缁樺埗鍥剧墖鍒癱anvas
        function drawing(loc) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, loc.x, loc.y, imgRect.width, imgRect.height); //鎸囧畾鍧愭爣杈撳嚭鍥惧儚
            ctx.strokeStyle = border.color; // \
            ctx.lineWidth = border.width; // | 缁樺埗鍗婇€忔槑杈规 
            ctx.strokeRect(border.width / 2, border.width / 2, canvas.width - border.width, canvas.height - border.width); // /
            currLoc = {
                x: loc.x,
                y: loc.y
            };
            //鍚屾缁樺埗瑕佸鍑虹殑3鍊嶉瑙堝浘 鐪熷疄鍥剧墖 320*320
            pctx.clearRect(0, 0, 320, 320);
            pctx.drawImage(image, loc.x*1.6 - border.width*1.6, loc.y*1.6 - border.width*1.6, imgRect.width*1.6, imgRect.height*1.6); //鎸囧畾鍧愭爣杈撳嚭鍥惧儚
        }

        //缂╂斁浜嬩欢
        rangeInput.oninput = scaleImage;
        
        //缂╂斁鐩稿叧浠ｇ爜
        function scaleImage() {
            //妫€鏌ョ缉鏀惧墠鏄惁鍙戠敓杩囨嫋鍔�(midpoint鏄惁琚竻闄�)锛屽鏋滄槸鍒欓噸鏂拌绠楀眳涓瘮渚�
            if (midpoint == null) {
                midpoint = {
                    x: (canvas.width * 0.5 - currLoc.x) / imgRect.width,
                    y: (canvas.height * 0.5 - currLoc.y) / imgRect.height
                }
            }
            imgRect.width = minImgRect.width * parseFloat(rangeInput.value);
            imgRect.height = minImgRect.height * parseFloat(rangeInput.value);
            loc = centerImg(midpoint);
            //妫€鏌ヨ绠楀嚭鐨勪綅缃槸鍚﹀瓨鍦ㄨ劚绂讳腑妗嗙殑鎯呭喌
            if (loc.x > 40) {
                midpoint = null; //鐢变簬鍙戠敓浣嶇Щ锛岄渶瑕佹儏鍐靛眳涓瘮渚嬶紝閲嶆柊璁＄畻
                loc.x = 40;
            }
            if (loc.x + imgRect.width < canvas.width - 40) {
                midpoint = null;
                loc.x = canvas.width - 40 - imgRect.width;
            }
            if (loc.y > 40) {
                midpoint = null;
                loc.y = 40;
            }
            if (loc.y + imgRect.height < canvas.height - 40) {
                midpoint = null;
                loc.y = canvas.height - 40 - imgRect.height;
            }
            drawing(loc);
        }

        //鎷栧姩鐩稿叧浠ｇ爜
        canvas.onmousedown = function(event) {
            var lastMouseLoc = {
                x: event.clientX,
                y: event.clientY
            };
            document.onmousemove = function dragging(event) {
                midpoint = null; //鐢变簬浣嶇疆鏀瑰彉锛屽眳涓瘮渚嬮渶瑕佹竻绌猴紝浠ヤ究鍦ㄧ缉鏀炬椂閲嶆柊璁＄畻銆�
                var mouseMove = {
                    x: event.clientX - lastMouseLoc.x,
                    y: event.clientY - lastMouseLoc.y
                };
                lastMouseLoc = {
                    x: lastMouseLoc.x + mouseMove.x,
                    y: lastMouseLoc.y + mouseMove.y
                };

                if (currLoc.x + mouseMove.x > 40) { //绂佹鍥惧儚鍚戝乏鎷栧嚭涓
                    mouseMove.x = 40 - currLoc.x;
                }
                if (currLoc.x + mouseMove.x + imgRect.width < canvas.width - 40) { //绂佹鍥惧儚鍚戝彸鎷栧嚭涓
                    mouseMove.x = canvas.width - 40 - currLoc.x - imgRect.width;
                }
                if (currLoc.y + mouseMove.y > 40) { //绂佹鍥惧儚鍚戜笅鎷栧嚭涓
                    mouseMove.y = 40 - currLoc.y;
                }
                if (currLoc.y + mouseMove.y + imgRect.height < canvas.height - 40) { //绂佹鍥惧儚鍚戜笂鎷栧嚭涓
                    mouseMove.y = canvas.height - 40 - currLoc.y - imgRect.height;
                }
                drawing({
                    x: currLoc.x + mouseMove.x,
                    y: currLoc.y + mouseMove.y
                });
            }
            document.onmouseup = function(event) {
                document.onmousemove = null;
            }
        };
        
        //榧犳爣婊氳疆浜嬩欢
        canvas.onmousewheel = scrollFunc;
        
        //婊氳疆鐩稿叧浠ｇ爜
        function scrollFunc(e) {
            e = e || window.event;
            var val = Number(rangeInput.value);
            if (e.wheelDelta) {  //鍒ゆ柇娴忚鍣↖E锛岃胺姝屾粦杞簨浠�
                if (e.wheelDelta > 0) { //褰撴粦杞悜涓婃粴鍔ㄦ椂
                    val += 0.06;
                    // alert("婊戣疆鍚戜笂婊氬姩");
                }
                if (e.wheelDelta < 0) { //褰撴粦杞悜涓嬫粴鍔ㄦ椂
                    val -= 0.06;
                    //alert("婊戣疆鍚戜笅婊氬姩");
                }
            } else if (e.detail) {  //Firefox婊戣疆浜嬩欢
                if (e.detail > 0) { //褰撴粦杞悜涓婃粴鍔ㄦ椂
                    val += 0.06;
                    //alert("婊戣疆鍚戜笂婊氬姩");
                }
                if (e.detail < 0) { //褰撴粦杞悜涓嬫粴鍔ㄦ椂
                    val -= 0.06;
                    //alert("婊戣疆鍚戜笅婊氬姩");
                }
            }
            rangeInput.value = val;
            
            // 瑙﹀彂缂╂斁浜嬩欢
            scaleImage();
        };
        
        //缁欓〉闈㈢粦瀹氭粦杞粴鍔ㄤ簨浠�
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        //婊氬姩婊戣疆瑙﹀彂scrollFunc鏂规硶
        window.onmousewheel = document.onmousewheel = scrollFunc;
    }
    
}

/*鍙傚姞浼佷笟*/
var dwEnter = {
    init:function(){
        initModules.dwNav();
    },
	checkBox:function(){
        $('.chk_box').on('click', function(){
            if($(this).hasClass('act')){
                $(this).removeClass('act');
            }else{
                $(this).addClass('act');
            }
        })
    },
	apply: function (val) {
		var mob   = /^((0\d{2,3}-?\d{6,8}-?\d{1,4})|(1[3465789]\d{9}))$/;
		var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,8}$/;
		var view  = $('.chk_box.act').length;
		if ($("#apply_name").val() == '') {
			openCloseTips('璇疯緭鍏ユ偍鐨勫鍚�', 'color_red', '280');
	    	return false;
	    }
		if ($("#apply_title").val() == '') {
			openCloseTips('璇疯緭鍏ユ偍鐨勮亴浣�', 'color_red', '280');
	    	return false;
	    }
		
        if($("#apply_mobile").val() == ''){
            openCloseTips('璇疯緭鍏ヨ仈绯荤數璇�', 'color_red', '280');
            return false;
        }else{
            if (!mob.test($("#apply_mobile").val())){
                openCloseTips('鑱旂郴鐢佃瘽鏈夎', 'color_red', '280');
                return false;
            }
        }
        if($("#apply_email").val() == ''){
            openCloseTips('璇疯緭鍏ユ偍鐨勫父鐢ㄧ數瀛愰偖绠�', 'color_red', '280');
            return false;
        }else{
            if (!myreg.test($("#apply_email").val())){
                openCloseTips('閭鏍煎紡鏈夎', 'color_red', '280');
                return false;
            }
        }
		if (view==0) {
			openCloseTips('闃呰骞跺悓鎰忋€婃暟鑻卞鍙傝禌鍗忚銆�', 'color_red', '280');
	    	return false;
	    }
		
	    var name                = $("#apply_name").val();
		var title               = $("#apply_title").val();
		var email               = $("#apply_email").val();
		var mobile              = $("#apply_mobile").val();
		var wechat              = $("#apply_wechat").val();
		
		var data                = {datas:{name:name,title:title,email:email,mobile:mobile,wechat:wechat},val:val};
		$.post(domain+"/dawards_datas/dAwardsCompanyApply",data,function(data){
			switch(data.isSuccess){
			    case 0:
					//$.closePopupLayer('popup_apply_confirm');
					openCloseTips('鎻愪氦澶辫触', 'color_red', '280');
				break;
			    case 1:
					//$.closePopupLayer('popup_apply_confirm');
					openCloseTips('鎻愪氦鎴愬姛', 'color_green', '280');
					location.href=domain+"/dawards/enter";
				break;
			}
		},"json");
	},
	getProject:function(){
		var linkUrl = $("#pro_link").val()
		var data                = {linkUrl:linkUrl};
		$("#show_project").addClass("hide");
		$.post(domain+"/dawards_datas/dAwardsGetProject",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('閾炬帴鏈夐敊璇�', 'color_red', '280');
					$("#show_project").slideUp(500);
				break;
			    case 1:
					$("#show_project li").html('<a href="'+linkUrl+'" target="_blank" class="show color_fff"><div class="item_cover"><div class="lh_0"><img id="con_cover" src="'+data.content.cover+'" width="100%"/></div><div class="item_title"><h4 class="fz_18 line_24 substr_2" id="con_title">'+data.content.title+'</h4><div class="item_mask"></div><input type="hidden" id="conId" value="'+data.content.proId+'"></div></div></a>')
					$("#show_project").slideDown(500);
				break;
				case 2:
					openCloseTips('鎮ㄥ凡涓鸿椤圭洰鍒涘缓浜嗘姤鍚�', 'color_red', '280');
				break;
				case 3:
					openCloseTips('璇ラ」鐩笉瀛樺湪', 'color_red', '280');
				break;
				case 4:
					openCloseTips('璇ラ」鐩凡鍙傚姞杩囧線灞婃暟鑻卞璇勯€夛紝涓嶈兘鍐嶆鍙傝禌', 'color_red', '360');
				break;
			}
		},"json");
	},
	addProject:function(val){
		if ($("#conId").val() == 0) {
			openCloseTips('璇峰～鍐欓」鐩摼鎺�', 'color_red', '280');
	    	return false;
	    }
		if ($("#awards_title").val() == '') {
			openCloseTips('璇疯緭鍏ラ」鐩爣棰�', 'color_red', '280');
	    	return false;
        }
		var awards_brand_name = "";
		$(".js_brand_list .ml_text").each(function(){
			if($(this).val()){
				if(awards_brand_name){
					awards_brand_name += ','+$(this).val();
				}else{
					awards_brand_name = $(this).val();
				}
			}
		});
		//category
		var awards_category = "";
		var awards_category_name = "";
		$("#js_multi_type .select_val").each(function(){
			if($(this).attr("data-option")>0){
				if(awards_category){
					awards_category      += ','+$(this).attr("data-option");
					awards_category_name += ','+$(this).text();
				}else{
					awards_category      = $(this).attr("data-option");
					awards_category_name = $(this).text();
				}}
		});
        //淇濆瓨鑽夌ǹ涓嶆牎楠�
        if(val != 1){
            if (awards_brand_name == '') {
                openCloseTips('璇峰～鍐欏搧鐗�/骞垮憡涓�', 'color_red', '280');
                return false;
            }
            if ($("#awards_role").attr("data-option") == 0) {
                openCloseTips('璇疯緭椤圭洰瑙掕壊', 'color_red', '280');
                return false;
            }
            if ($("#awards_online_year").attr("data-option") == 0) {
                openCloseTips('璇疯緭椤圭洰涓婄嚎骞翠唤', 'color_red', '280');
                return false;
            }
            if ($("#awards_online_month").attr("data-option") == 0) {
                openCloseTips('璇疯緭椤圭洰涓婄嚎鏈堜唤', 'color_red', '280');
                return false;
            }
            // if ($("#creation_company").val() == '') {
            // 	openCloseTips('璇疯緭鍏ラ」鐩垱浣滀紒涓氬悕鍗�', 'color_red', '280');
            // 	return false;
            // }
            // if ($("#creation_people").val() == '') {
            // 	openCloseTips('璇疯緭鍏ラ」鐩垱浣滀汉鍛樺悕鍗�', 'color_red', '280');
            // 	return false;
            // }
            if ($("#project_background").val() == '') {
                openCloseTips('璇疯緭鍏ラ」鐩儗鏅笌鐩爣', 'color_red', '280');
                return false;
            }
            if ($("#project_strategy").val() == '') {
                openCloseTips('璇疯緭鍏ラ」鐩礊瀵熶笌绛栫暐', 'color_red', '280');
                return false;
            }
            if ($("#creative_description").val() == '') {
                openCloseTips('璇疯緭鍏ラ」鐩垱鎰忛槓杩�', 'color_red', '280');
                return false;
            }
            
            if ($("#project_effect").val() == '') {
                openCloseTips('璇疯緭鍏ラ」鐩粨鏋滀笌褰卞搷', 'color_red', '280');
                return false;
            }
            if (awards_category=="") {
                openCloseTips('璇烽€夋嫨鍙傝禌绫诲埆', 'color_red', '280');
                return false;
            }
        }
		var picUrls  = new Array();
		var picNames = new Array();
		$("#pic_list .pic_iteam").each(function(i){
			var picUrl  = $(this).find("img").attr("src");
			var picName = $(this).find(".ntext").val()?$(this).find(".ntext").val():0;
			picUrls.push(picUrl);
			picNames.push(picName);
		});		
		var videos = new Array();
		$("#js_video_list .ml_text").each(function(i){
			if($(this).val()!=""){
				var video = $(this).val();
				videos.push(video);
			}
		});
	    var conId                      = $("#conId").val();
		var dacId                      = $("#dacId").val();
		var title                      = $("#con_title").text();
		var cover                      = $("#con_cover").attr("src");
		var awards_title               = $("#awards_title").val();
		var awards_role                = $("#awards_role").attr("data-option");
		if(awards_role>0){
			var awards_role_name       = $("#awards_role").text();
		}else{
			var awards_role_name       = "";
		}
		var awards_online_year         = $("#awards_online_year").attr("data-option");
		var awards_online_month        = $("#awards_online_month").attr("data-option");
		var creation_company           = $("#creation_company").val();
		var creation_people            = $("#creation_people").val();
		var project_background         = $("#project_background").val();
		var project_strategy           = $("#project_strategy").val();
		var creative_description       = $("#creative_description").val();
		var project_effect             = $("#project_effect").val();
		var data                       = {datas:{
				conId:conId,
				title:title,
				cover:cover,
				dacId:dacId,
				awards_title:awards_title,
				awards_brand_name:awards_brand_name,
				awards_role:awards_role,
				awards_role_name:awards_role_name,
				awards_online_year:awards_online_year,
				awards_online_month:awards_online_month,
				creation_company:creation_company,
				creation_people:creation_people,
				project_background:project_background,
				project_strategy:project_strategy,
				creative_description:creative_description,
				project_effect:project_effect,
				awards_category:awards_category,
				awards_category_name:awards_category_name,
				isDraft:val
			},material:{
				project_pic:{picUrls:picUrls,picNames:picNames},
				project_video:videos
			}
		};
		$.post(domain+"/dawards_datas/dAwardsAddProject",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('鎻愪氦澶辫触', 'color_red', '280');
				break;
			    case 1:
                    if(val==1){
                        openCloseTips('淇濆瓨鎴愬姛', 'color_green', '280');
                    }else{
                        openCloseTips('鎻愪氦鎴愬姛', 'color_green', '280');
                    }
					if($("#project_cost").val()>0&&val==0){
						location.href = domain+"/dawards/enter/unpaid";
					}else{
						location.href = domain+"/dawards/enter";
					}
				break;
				case 2:
					openCloseTips('鎮ㄥ凡涓鸿椤圭洰鍒涘缓浜嗘姤鍚�', 'color_red', '280');
				break;
			}
		},"json");
	},
	editProject:function(val){
		if ($("#awards_title").val() == '') {
			openCloseTips('璇疯緭鍏ラ」鐩爣棰�', 'color_red', '280');
	    	return false;
        }
		var awards_brand_name = "";
		$(".js_brand_list .ml_text").each(function(){
			if($(this).val()){
				if(awards_brand_name){
					awards_brand_name += ','+$(this).val();
				}else{
					awards_brand_name = $(this).val();
				}
			}
		});
		//category
		var awards_category = "";
		var awards_category_name = "";
		$("#js_multi_type .select_val").each(function(){
			if($(this).attr("data-option")>0){
				if(awards_category){
					awards_category      += ','+$(this).attr("data-option");
					awards_category_name += ','+$(this).text();
				}else{
					awards_category      = $(this).attr("data-option");
					awards_category_name = $(this).text();
				}}
		});
        //淇濆瓨鑽夌ǹ涓嶆牎楠�
        if( val != 1){
            
            if (awards_brand_name == '') {
                openCloseTips('璇峰～鍐欏搧鐗�/骞垮憡涓�', 'color_red', '280');
                return false;
            }
            if ($("#awards_role").attr("data-option") == 0) {
                openCloseTips('璇疯緭椤圭洰瑙掕壊', 'color_red', '280');
                return false;
            }
            if ($("#awards_online_year").attr("data-option") == 0) {
                openCloseTips('璇疯緭椤圭洰涓婄嚎骞翠唤', 'color_red', '280');
                return false;
            }
            if ($("#awards_online_month").attr("data-option") == 0) {
                openCloseTips('璇疯緭椤圭洰涓婄嚎鏈堜唤', 'color_red', '280');
                return false;
            }
            /*
			if ($("#creation_company").val() == '') {
                openCloseTips('璇疯緭鍏ラ」鐩垱浣滀紒涓氬悕鍗�', 'color_red', '280');
                return false;
            }
            if ($("#creation_people").val() == '') {
                openCloseTips('璇疯緭鍏ラ」鐩垱浣滀汉鍛樺悕鍗�', 'color_red', '280');
                return false;
            }
			*/
            if ($("#project_background").val() == '') {
                openCloseTips('璇疯緭鍏ラ」鐩儗鏅笌鐩爣', 'color_red', '280');
                return false;
            }
            if ($("#project_strategy").val() == '') {
                openCloseTips('璇疯緭鍏ラ」鐩礊瀵熶笌绛栫暐', 'color_red', '280');
                return false;
            }
            if ($("#creative_description").val() == '') {
                openCloseTips('璇疯緭鍏ラ」鐩垱鎰忛槓杩�', 'color_red', '280');
                return false;
            }
            
            if ($("#project_effect").val() == '') {
                openCloseTips('璇疯緭鍏ラ」鐩粨鏋滀笌褰卞搷', 'color_red', '280');
                return false;
            }
            if (awards_category=="") {
                openCloseTips('璇烽€夋嫨鍙傝禌绫诲埆', 'color_red', '280');
                return false;
            }
        }
		var picUrls  = new Array();
		var picNames = new Array();
		$("#pic_list .pic_iteam").each(function(i){
			var picUrl  = $(this).find("img").attr("src");
			var picName = $(this).find(".ntext").val()?$(this).find(".ntext").val():0;
			picUrls.push(picUrl);
			picNames.push(picName);
		});		
		var videos = new Array();
		$("#js_video_list .ml_text").each(function(i){
			if($(this).val()!=""){
				var video = $(this).val();
				videos.push(video);
			}
		});
	    var conId                      = $("#conId").val();
	    var dapId                      = $("#editid").val();
		var awards_title               = $("#awards_title").val();
		var awards_role                = $("#awards_role").attr("data-option");
		if(awards_role>0){
			var awards_role_name       = $("#awards_role").text();
		}else{
			var awards_role_name       = "";
		}
		var awards_online_year         = $("#awards_online_year").attr("data-option");
		var awards_online_month        = $("#awards_online_month").attr("data-option");
		var creation_company           = $("#creation_company").val();
		var creation_people            = $("#creation_people").val();
		var project_background         = $("#project_background").val();
		var project_strategy           = $("#project_strategy").val();
		var creative_description       = $("#creative_description").val();
		var project_effect             = $("#project_effect").val();
		var data                       = {datas:{
				awards_title:awards_title,
				awards_brand_name:awards_brand_name,
				awards_role:awards_role,
				awards_role_name:awards_role_name,
				awards_online_year:awards_online_year,
				awards_online_month:awards_online_month,
				creation_company:creation_company,
				creation_people:creation_people,
				project_background:project_background,
				project_strategy:project_strategy,
				creative_description:creative_description,
				project_effect:project_effect,
				awards_category:awards_category,
				awards_category_name:awards_category_name,
				isDraft:val
			},where:{
				conId:conId,
				dapId:dapId
			},material:{
				project_pic:{picUrls:picUrls,picNames:picNames},
				project_video:videos
			}
		};
		$.post(domain+"/dawards_datas/dAwardsEditProject",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('鎻愪氦澶辫触', 'color_red', '280');
				break;
			    case 1:
                    if(val==1){
                        openCloseTips('淇濆瓨鎴愬姛', 'color_green', '280');
                    }else{
                        openCloseTips('鎻愪氦鎴愬姛', 'color_green', '280');
                    }
					if($("#project_cost").val()>0&&isDraft==0){
						location.href = domain+"/dawards/enter/unpaid";
					}else{
						location.href = domain+"/dawards/enter";
					}
				break;
			}
		},"json");
	},
	delProject:function(val,id){
		if (val == '') {return false;}
		var data                = {datas:{dapId:val,conId:id}};
		$.post(domain+"/dawards_datas/dAwardsDelProject",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('鎻愪氦澶辫触', 'color_red', '280');
				break;
			    case 1:
					openCloseTips('鎻愪氦鎴愬姛', 'color_green', '280');
					$("#list_"+val).slideUp(500);
				break;
			}
		},"json");
    },
    checkDelPop:function(cid,conId){
        openPopup("400", "popup_apply_confirm");
        if(cid){
            $('#confirm_del_btn').on('click',function(){
                $.closePopupLayer('popup_apply_confirm');
                dwEnter.delProject(cid,conId);
            })
        }
    },
	payList:function(){
		var awards_id = "";
		$("#pay_list .chk_box.act").each(function(){
			if($(this).attr("data-value")!=""){
				if(awards_id){
					awards_id      += '_'+$(this).attr("data-value");
				}else{
					awards_id      = $(this).attr("data-value");
				}
			}
		});
		if (awards_id == '') {
			openCloseTips('璇峰嬀閫夎浠樿垂鐨勯」鐩�', 'color_red', '280');
	    	return false;
	    }
		window.open(domain+"/dawards/enter/pdf/"+awards_id,'_blank','width=1000,height=800,location=no,menubar=no,toolbar=no, status=no,scrollbars=yes');
	},
    add:function(){
        initModules.dwNav();
        initModules.vmSelect('.js_select');
        this.addNewBrand()
        this.delPicture()
        this.addVideo()
        this.settleBar();
        this.selecteDate();
    },
    addNewBrand:function(){
        var brandList = $('.js_brand_list'),
            addLine = brandList.children('li').children('.add_line'),
            newLineHtml = '<li class="flex lr_center mg_b_10"><input type="text" class="ml_text" /><a class="fw_b fz_12 color_b58 del_line_btn">鍒犻櫎</a></li>';
        //娣诲姞鍝佺墝/骞垮憡涓�
        addLine.on('click', function(){
			if(brandList.children('li').length<3){
            	brandList.append(newLineHtml);
				if(brandList.children('li').length==3){
					addLine.removeClass("color_b58").addClass("color_666");
				}
			}else{
				addLine.removeClass("color_b58").addClass("color_666");
			}
        });
        //鍒犻櫎鍝佺墝/骞垮憡涓�
        brandList.on('click', '.del_line_btn', function(){
            $(this).parent('li').remove();
			if(brandList.children('li').length!=3){
            	addLine.removeClass("color_666").addClass("color_b58");
			}else{
				addLine.removeClass("color_b58").addClass("color_666");
			}
        })
    },
	addVideo:function(){
        var videoList = $('.js_video_list'),
            addLine = videoList.children('li').children('.add_line'),
            newLineHtml = '<li class="flex lr_center mg_b_10"><input type="text" class="ml_text" /><a class="fw_b fz_12 color_b58 del_line_btn">鍒犻櫎</a></li>';
        //娣诲姞鍝佺墝/骞垮憡涓�
        addLine.on('click', function(){
			if(videoList.children('li').length<10){
            	videoList.append(newLineHtml);
				if(videoList.children('li').length==10){
					addLine.removeClass("color_b58").addClass("color_666");
				}
			}else{
				addLine.removeClass("color_b58").addClass("color_666");
			}
        });
        //鍒犻櫎鍝佺墝/骞垮憡涓�
        videoList.on('click', '.del_line_btn', function(){
            $(this).parent('li').remove();
			if(videoList.children('li').length!=10){
            	addLine.removeClass("color_666").addClass("color_b58");
			}else{
				addLine.removeClass("color_b58").addClass("color_666");
			}
        })
    },
	delPicture:function(){
		$('.pic_iteam .del_line_btn').live('click', function(){
            $(this).parents('.pic_iteam').remove();
        })
	},
    addNewType:function(tCount,epCount){
        var $multiType = $('#js_multi_type'),
            $addTypeBtn = $('#js_add_type_btn'),
            $settleBar = $('#js_settle_bar'),
            $countDw = $settleBar.find('.js_dw_count'),
            $countFee = $settleBar.find('.js_fee_count');
        //妯℃澘html
        var multiHtml = $('#js_multi_li').html(),
            optionHtml = $('#js_option_li').html();
        //鏁版嵁
        var typeOptions = $.parseJSON($('#js_type_options').html()),//鍚庡彴鏁版嵁 20涓� 鍙傝禌绫诲埆
            selectedArr = [],//宸查€夋嫨鐨勭被鍒� 鍋氬鍒�
            typeNum = parseInt(tCount) || 1;//宸叉湁澶氬皯琛屽彲濉啓 榛樿涓€琛�
        //浜嬩欢缁戝畾
        function bindEvent(){
            $addTypeBtn.on('click', addBtnClick);
            $multiType.on('click', '.del_type_btn', delBtnClick);
            $multiType.on('click', '.select_val', vmSelectClick);
            $multiType.on('click', '.select_options li', vmSelectOptionClick);
			getMyfinalOption();
        }
        //鐐瑰嚮鍒犻櫎
        function delBtnClick(){
            var delVal = parseInt($(this).parents('li').find('.select_val').attr('data-option'));
            cleanDelData(delVal);
            $(this).parents('li').remove();
            //鍐嶅幓缁熶竴html
            typeNum = typeNum -1; //鍒犻櫎鏈€鍚庝竴涓被鍨嬬储寮�
            getMyfinalOption();
            updateTypeNumber(typeNum); //鏇存柊鎵€鏈夌储寮�
        }
        //鐐瑰嚮娣诲姞
        function addBtnClick(){
            var mLen = $multiType.children('li').length,
                optionHtmlList = renderOption(typeOptions);
            var list = initTools.tplReplace(multiHtml,{
                typeNo: typeNum + 1,
                optionHtml:optionHtmlList
            });
            $multiType.append(list);
            typeNum = typeNum + 1;  //娣诲姞鏈€鏂颁竴涓被鍨嬬储寮�
            updateTypeNumber(typeNum); //鏇存柊鎵€鏈夌储寮�
            // getMyfinalOption();
        }
        //鏇存柊宸查€夐」鐘舵€�
        function getMyfinalOption(){
            //鍒ゆ柇閫変腑鍝竴涓�  鏀瑰彉鐘舵€�
            var myfinalOption = $multiType.find('.select_val');
            selectedArr = [];
            myfinalOption.each(function(){
                var tts = parseInt($(this).attr('data-option'));
                selectedArr.push(tts);
            })
            changeStatus(selectedArr);
            changeTotalCount();
            // console.log(selectedArr);
            //缁熶竴鎵€鏈夐€夐」
            var optionHtmlList = renderOption(typeOptions);
            $multiType.find('.select_options').html(optionHtmlList);
        }
        /*妯℃嫙select*/
        function vmSelectClick(e){
            e.stopPropagation();
            var $this = $(this),
                selectOptions = $('.select_options'),
                myTarOptions = $this.next('.select_options');
            if(myTarOptions.hasClass('hide')){
                selectOptions.addClass('hide');
                myTarOptions.removeClass('hide');
            }else{
                myTarOptions.addClass('hide');
            }
        }
        function vmSelectOptionClick(e){
            e.stopPropagation();
            var $this = $(this),
                myTarOptions = $this.parent('.select_options'),
                myTarVal = $this.parent('.select_options').prev('.select_val');
            if(!myTarOptions.hasClass('hide')){
                var ttext = $this.text(),
                    tval = $this.attr('value'),
                    myTarAttr = parseInt(myTarVal.attr('data-option'));
                if(myTarAttr != 0){
                    cleanDelData(myTarAttr);
                }
                myTarVal.attr('data-option',tval);
                myTarVal.children('span').text(ttext);
                myTarVal.removeClass('color_cac').addClass('color_fff');
                myTarOptions.addClass('hide');
                getMyfinalOption();
            }
        }
        //娓呴櫎涔嬪墠鎵€閫夐」鐘舵€�
        function cleanDelData(delVal){
            var delSelectedArr = [];
            delSelectedArr.push(delVal);
            changeStatus(delSelectedArr, 'delete');
        }
        //鏀瑰彉鏁版嵁鐘舵€�
        function changeStatus(arr,type){
            var itemArr = arr.filter(function(item){ return item != '0';});
            itemArr.forEach(function(item, index){
                if(item != 0){
                    var eleItem = _filterOption(item);
                    if(type === 'delete'){
                        eleItem[0].status = "0";
                    }else{
                        eleItem[0].status = "1";
                    }
                }
            })
            // console.log(typeOptions);
        }
        //绛涢€夋暟鎹畂ptions鍐呭
        function _filterOption(option){
            return typeOptions.filter(function(item){
                if(option == 0){
                    return true;
                }
                return item.value == option; //闅愬紡绫诲瀷瑁呮崲
            })
        }
        //娓叉煋閫夋嫨鍒楄〃
        function renderOption(data){
            var list = '';
            data.forEach(function(item, index) {
                var styleClass = item.status != 0 ? 'selected':'';
                list += initTools.tplReplace(optionHtml,{
                    styleClass:styleClass,
                    value: item.value,
                    typeName:item.typeName
                })
            });
            return list;
        }
        //鏇存柊绫诲瀷绱㈠紩鏁板瓧
        function updateTypeNumber(num){
            var $itemLabels = $multiType.find('.item_label');
            for (var i = 0; i < num+1; i++) {
                var itemNum = i + 1; 
                $itemLabels.eq(i).html('绫诲埆 ' + itemNum);
            }
        }
        //鏇存柊缁撶畻缁熻璐﹀崟 鍓嶄袱涓厤璐�  绗笁涓紑濮� 2000鍏�/閫掑
        function changeTotalCount(){
            var enterProCount = parseInt(epCount) || 0,//鍚庡彴鏁版嵁  宸茬粡鎶ュ悕浜嗗灏戜釜椤圭洰
                totolFee = 0,
                lineTypeLen = selectedArr.length,
                slectedTypeArr = typeOptions.filter(function(item) { return item.status != '0';}),
                slectedTypeCount = slectedTypeArr.length;
            for(var c = 0; c < slectedTypeCount; c++){
                if(enterProCount < 3){
                    if(c > 1){ totolFee += 2000;}
                }else{
                    totolFee += 2000;
                }
            }
            if(slectedTypeCount > 0){
                $countDw.html(lineTypeLen);
                $countFee.html(totolFee);
            }
        }
        //鎵ц
        bindEvent();
    },
    settleBar:function(){
        $(window).on('scroll', function () {			
            var scrollTop = $(this).scrollTop(),
                windowHeight = $(this).height(),
                scrollHeight = $(document).height(),
                $settleBar = $('#js_settle_bar'),
                footerHeight = parseInt($('.footer').height()); 
            //鍒ゆ柇鏄惁鍒板簳閮ㄤ笉瓒呰繃footer
            if(scrollHeight > windowHeight && (scrollTop + windowHeight + footerHeight) >= scrollHeight) {
                $settleBar.removeClass('fix_bar');
            }else{
                $settleBar.addClass('fix_bar');
            }
        });
    },
    selecteDate:function(){
        var $selectYear = $('#js_select_year li'),
            $selectMonth = $('#js_select_month'),
            mMin = 1,
            mMax = 12;
        $selectYear.on('click', function(){
            var _val = parseInt($(this).attr('value'));
            if(_val === 2023){
                mMin = 7;
                mMax = 12;
                renderMonthList(mMin, mMax);
            }else if(_val === 2024){
                mMin = 1;
                mMax = 9;
                renderMonthList(mMin, mMax);
            }
			
			$("#awards_online_month").attr("data-option",0).html('<span>鏈�</span><i class="triangle"></i>');
        })
        function renderMonthList(mMin,mMax){
            $selectMonth.children().addClass('hide');
            for(var i = mMin; i <= mMax; i++){
                $selectMonth.children().eq(i).removeClass('hide');
            }
        }
    }
}


var dwPay = {
    init:function(){
        initModules.dwNav();
        //this.settleBar();
        this.settle();
    },
    settleBar:function(){
        $(window).on('scroll', function () {			
            var scrollTop = $(this).scrollTop(),
                windowHeight = $(this).height(),
                scrollHeight = $(document).height(),
                $settleBar = $('#js_settle_bar'),
                paymentHeight = parseInt($('#js_payment').height()),
                footerHeight = parseInt($('.footer').height()); 
            //鍒ゆ柇鏄惁鍒板簳閮ㄤ笉瓒呰繃footer
            if(scrollHeight > windowHeight && (scrollTop + windowHeight + footerHeight + paymentHeight) >= scrollHeight) {
                $settleBar.removeClass('fix_bar');
            }else{
                $settleBar.addClass('fix_bar');
            }
        });
    },
    settle:function(){
        var $payList = $('#js_pay_list'),
            $settleBar = $('#js_settle_bar'),
            $countPro = $settleBar.find('.js_pro_count'),
            $countDw = $settleBar.find('.js_dw_count'),
            $countFee = $settleBar.find('.js_fee_count'),
            $billBtn = $('#js_bill_btn');
        var totalCount = 0;
        function bindEvent(){
            $payList.on('click', '.chk_box', checkboxClick);
        }
        function checkboxClick(e){
            var tar = initTools.getTarget(e),
                tarName = tar.tagName.toLowerCase(),
                $this = $(this);
            if(tarName === 'a'){
                var tarFee= parseInt($this.parents('tr').children('.fee_col').children('span').text());
                if($this.hasClass('act') && $this.parents('tr').hasClass('checked')){
                    $this.removeClass('act');
                    $this.parents('tr').removeClass('checked');
                    changeTotalCount(tarFee, 'minus'); //鍒犻櫎
                }else{
                    $this.addClass('act');
                    $this.parents('tr').addClass('checked');
                    changeTotalCount(tarFee, 'plus'); //娣诲姞
                }
            }
        }
        //鏇存柊鎬昏垂鐢�
        function changeTotalCount(tarFee, method){
            if(method === 'plus'){
                totalCount += tarFee;
            }else if(method === 'minus'){
                totalCount -= tarFee;
            }
            $countFee.html(totalCount);
            changeProCount();
            changeDwCount();
        }
        //鏇存敼椤圭洰鏁�
        function changeProCount(){
            var tarProNum = $payList.find('tr.checked').length;
            $countPro.html(tarProNum);
        }
        //鏇存敼鎶ュ鏁�
        function changeDwCount(){
            var tarDwNum = $payList.find('tr.checked .dw_type_col p').length;
            $countDw.html(tarDwNum);
        }
        //鎵ц
        bindEvent();
    }
}

var about = {
    init:function(){
        initModules.dwNav();
        this.navscroll();
    },
	navscroll:function(){
		$(window).on('scroll', function () {			
            var scrollTop = $(this).scrollTop(),
                windowHeight = $(this).height(),
                scrollHeight = $(document).height(),
                dawardsNav = $('#js_dawards_nav'),
                footerHeight=$('.footer').height(),
                vTop = parseInt($('#js_title').offset().top) - 60;
            /*椤堕儴婊氬姩*/
			if (scrollTop > vTop) {
                dawardsNav.addClass('nav_scroll');
                var _sht = scrollTop + windowHeight + footerHeight - 100;
                //鍒ゆ柇鏄惁鍒板簳閮�
                if(scrollHeight > windowHeight && _sht >= scrollHeight) {
                    dawardsNav.removeClass('nav_scroll').addClass('nav_stop');
                }else{
                    dawardsNav.addClass('nav_scroll').removeClass('nav_stop');
                }
			} else {
				dawardsNav.removeClass('nav_scroll').removeClass('nav_stop');
            }
            
        });
        //瀵艰埅璺熻釜
        $('#sub_nav_list').onePageNav({
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 500,
			scrollThreshold: 0.2,
        });
    },
    countDown:function(idx, y, m, d, type){
        var setTimer = null;
        var cha = (new Date(y, m-1, d, 23, 59, 59)) - (new Date()),
            cdTime = $(idx).find('.cd_time');
        countFunc(cha);
    聽   setTimer = setInterval(function() {
        聽   cha = cha - 1000;
        聽   countFunc(cha);
        聽}, 1000);
        function countFunc(leftTime){
            if(leftTime>=0){
                var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //璁＄畻鍓╀綑鐨勫ぉ鏁� 
                var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //璁＄畻鍓╀綑鐨勫皬鏃� 
                var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //璁＄畻鍓╀綑鐨勫垎閽� 
                var seconds = parseInt(leftTime / 1000 % 60, 10); //璁＄畻鍓╀綑鐨勭鏁� 
                if(type == 1){
                    days = checkTime(days);
                    hours = checkTime(hours);
                    minutes = checkTime(minutes);
                    seconds = checkTime(seconds);
                }
                cdTime.find('.r_day').text(days);
                cdTime.find('.r_hour').text(hours);
                cdTime.find('.r_minute').text(minutes);
                cdTime.find('.r_second').text(seconds);
            }else{
                clearInterval(setTimer);
            }
        }
        function checkTime(i) { 
            if(i < 10) {i = "0" + i;}
            return i;
        }
    },
    hoverWechat:function(){
        $('#js_hover_wechat').hover(function(){
            var $targetDiv = $(this).children('.bg_212');
            if($targetDiv.hasClass('hide')){
                $targetDiv.slideDown('fast').removeClass('hide');
            }
        },function(){
            var $targetDiv = $(this).children('.bg_212');
            if(!$targetDiv.hasClass('hide')){
                $targetDiv.slideUp('fast').addClass('hide');
            }

        })
    }
}
//鍩轰簬localStorage鏈湴瀛樺偍
var localStore = {
	/*鑾峰彇褰撳墠鏃ユ湡寮€濮嬫椂闂� 绮剧‘濂界鍑屾櫒 00锛�00锛�00*/
	getDateStartTimestamp:function(){
		return new Date().setHours(0,0,0,0) / 1000;
	},
	findObjKeyVal:function(obj, val) {
		var array = Object.keys(obj);
		for(var item in array){
			if(array[item].indexOf(val)!=-1&&obj[array[item]]!=""&&obj[array[item]]!=null&&obj[array[item]]!=0){
				return array[item];
			}
		}
	},
    addLocalStorage:function(){
        try{
			localStorage.setItem( storagePrefix + key, JSON.stringify( storeObj ));
			return true;
		}catch( e ){
            // localstorage瀹归噺涓嶅锛屾牴鎹繚瀛樼殑鏃堕棿鍒犻櫎宸茬紦瀛樺埌ls閲岀殑js浠ｇ爜
            if( e.name.toUpperCase().indexOf('QUOTA')>=0){
                var item;
                var tempScripts =[];
                // 鍏堟妸鎵€鏈夌殑缂撳瓨瀵硅薄鏉ュ嚭鏉ワ紝鏀惧埌 tempScripts閲�
                for( item in localStorage ){
                    if( item.indexOf( storagePrefix )===0){
                        tempScripts.push( JSON.parse( localStorage[ item ]));
                    }
                }
                // 濡傛灉鏈夌紦瀛樺璞�
                if( tempScripts.length ){
                // 鎸夌紦瀛樻椂闂村崌搴忔帓鍒楁暟缁�
                tempScripts.sort(function( a, b ){
                    return a.stamp - b.stamp;
                });
                    // 鍒犻櫎缂撳瓨鏃堕棿鏈€鏃╃殑js
                basket.remove( tempScripts[0].key );
                    // 鍒犻櫎鍚庡湪鍐嶆坊鍔狅紝鍒╃敤閫掑綊瀹屾垚
                    return addLocalStorage( key, storeObj );
                }else{
                    // no files to remove. Larger than available quota
                    // 宸茬粡娌℃湁鍙互鍒犻櫎鐨勭紦瀛樺璞′簡锛岃瘉鏄庤繖涓皢瑕佺紦瀛樼殑鐩爣澶ぇ浜嗐€傝繑鍥瀠ndefined銆�
                    return;
                }
            }else{
                // some other error
                // 鍏朵粬鐨勯敊璇紝渚嬪JSON鐨勮В鏋愰敊璇�
                return;
            }
        }
    },
    //localStore.set(awards_category, loginUserId, proId,medals,hideName,jcoment);
    set:function(awards_category, loginUserId, proId,medals,hideName,jcoment) { // 璁剧疆
        var awards_values = {
            medals: medals,
            hn: hideName,
            jcoment:jcoment
        }
        var judgeItemObj = {
            proId:proId,
            info:awards_values
        }
        var nowDate = localStore.getDateStartTimestamp(),
			judgeStr = 'judgment_'+awards_category+'_'+loginUserId,
			wls = window.localStorage,
			judgeData = wls.getItem(judgeStr),//鑾峰彇鏈湴
			judgeArr = JSON.parse(judgeData),
			historyJudgeKey = localStore.findObjKeyVal(wls, judgeStr);
        // console.log('judgeStr',judgeStr);
        // console.log('judgeData',judgeData);
        // console.log('judgeArr',judgeArr);
        // console.log('historyJudgeKey',historyJudgeKey);
		if(!judgeData&&loginUserId){wls.removeItem(historyJudgeKey);}//鍒犻櫎鍘嗗彶
        var isExist = false;
		if (!judgeData) {
			var newArr = [];
			newArr.push(judgeItemObj);
			var str = JSON.stringify(newArr);
			wls.setItem(judgeStr, str);
			// localStore.addLocalStorage(judgeStr,str);
			judgeArr = JSON.parse(wls.getItem(judgeStr));
            isExist = true;
		}else{
            // console.log(judgeData.indexOf(proId));
			if(judgeData.indexOf(proId) < 0){
                //涓嶅瓨鍦ㄨ繖涓」鐩� 鐩存帴push
				judgeArr.push(judgeItemObj);
			}else{
                //瀛樺湪杩欎釜椤圭洰 鍗曚釜鏇挎崲鍐嶅瓨鍌�
                judgeArr.forEach(function(item){
                    if(item.proId === proId){
                        item.info = awards_values;
                    }
                });
            }
            var str = JSON.stringify(judgeArr);
            wls.setItem(judgeStr, str);
            judgeArr = JSON.parse(wls.getItem(judgeStr));
            isExist = true;
		};
    }, 
    // 鑾峰彇
	get:function(awards_category, loginUserId, proId){
		var nowDate = localStore.getDateStartTimestamp(),
			judgeStr = 'judgment_'+awards_category+'_'+loginUserId,
			wls = window.localStorage,
			historyJudgeKey = localStore.findObjKeyVal(wls, judgeStr),
			nullKey = localStore.findObjKeyVal(wls, 'judgment_'+awards_category+'_undefined'),
			judgeData = wls.getItem(judgeStr);
		if(nullKey){wls.removeItem(nullKey);}//鍒犻櫎undefined
		if(!judgeData&&loginUserId){wls.removeItem(historyJudgeKey);}//鍒犻櫎鍘嗗彶
		return judgeData;
	},
    // 娓呯┖
    clear:function(name) {
        if (name) { // 鍒犻櫎閿负name鐨勭紦瀛�
            localStorage.removeItem(name);
        } else { // 娓呯┖鍏ㄩ儴
            localStorage.clear();
        }
    }
};
//缁堝
var judgment = {
    init:function(){
        dwEnter.settleBar();
        // this.cardBar();
        this.dwTabs();
    },
    dwTabs:function(){
        //閫夋嫨閲戦摱閾滃
        $('.judgment_list .jbtn').on('click',function(){
            if($(this).hasClass('act')){
                $(this).removeClass('act');
            }else{
                $(this).siblings().removeClass('act');
                $(this).addClass('act');
            }
            //鍒ゆ柇鏄惁閫変腑 鏀瑰彉杈撳叆妗嗙殑鐘舵€�
            var $jtt = $(this).parent().parent().next().children('.jtextarea');
            if(!$(this).parent().children('.jbtn_null').hasClass('act') && $(this).parent().children('.jbtn').hasClass('act')){
                if(!$jtt.hasClass('compulsory')){
                    $jtt.addClass('compulsory');
                    $jtt.attr('placeholder','锛堝繀濉級璇风粰鍑烘偍瀵硅椤圭洰鐨勮瘎璇紝浣滀负璇勪环璇存槑');
                }
            }else{
                if($jtt.hasClass('compulsory')){
                    $jtt.removeClass('compulsory');
                    $jtt.attr('placeholder','璇风粰鍑烘偍瀵硅椤圭洰鐨勮瘎璇紝浣滀负璇勪环璇存槑');
                }
            }
			var totalCount = $("#judgment li").length;
			// 鏇存柊濂栫墝鏁�
			var goldCount = $("#judgment li .jbtn_golden.act").length,silverCount = $("#judgment li .jbtn_silver.act").length,copperCount = $("#judgment li .jbtn_copper.act").length,noneCount = $("#judgment li .jbtn_null.act").length;
			var judgCount = totalCount-goldCount-silverCount-copperCount-noneCount;
			// $("#judgCount").html('<span class="color_969">鎮ㄥ凡璇勶細</span><span class="color_golden mg_l_40">閲戝 <b>'+goldCount+'</b></span><span class="color_silver mg_l_40">閾跺 <b>'+silverCount+'</b></span><span class="color_copper mg_l_40">閾滃 <b>'+copperCount+'</b></span><span class="color_666 mg_l_40">鏃犲 <b>'+noneCount+'</b></span><span class="color_969 mg_l_80">寰呰瘎 <span>'+judgCount+'</span></span>');
        	$("#judgCount").html('<span class="color_969 mg_r_30">寰呰瘎 <i>'+judgCount+'</i></span><span class="color_golden">閲戝 <i>'+goldCount+'</i></span><span class="color_silver mg_l_30">閾跺 <i>'+silverCount+'</i></span><span class="color_copper mg_l_30">閾滃 <i>'+copperCount+'</i></span><span class="color_666 mg_l_30">鏃犲 <i>'+noneCount+'</i></span>');
        
            //璁剧疆缂撳瓨
            var proId = $(this).parents('li').children('.conId').val();
            judgment.setJudgeItemsInfo(proId);
        
        });
        
        // 杈撳叆鏂囧瓧
        $('.judgment_list .jtextarea').on('focusin', function(){
            $(this).parents('li').siblings('li').removeClass('current');
            $(this).parents('li').addClass('current');
        });
        $('.judgment_list .jtextarea').on('keyup', debounce(textareaKeyup, 300));
        function textareaKeyup(){
            //璁剧疆缂撳瓨
            var proId = $('#judgment li.current').children('.conId').val();
            judgment.setJudgeItemsInfo(proId);
        }
    },
    // 鍕鹃€夊尶鍚�
	checkBox:function(){
        $('.judgment_list .chk_box').on('click', function(){
            if($(this).hasClass('act')){
                $(this).removeClass('act');
            }else{
                $(this).addClass('act');
            }
            //璁剧疆缂撳瓨
            var proId = $(this).parents('li').children('.conId').val();
            judgment.setJudgeItemsInfo(proId);
        })
    },
    //鑾峰彇褰撳墠鏁版嵁瀛樺偍鏈湴
    setJudgeItemsInfo:function(proId){
        if(!proId){return;}
        var awards_category =  $('#awards_category').val(),
            loginUserId = $('#loginUserId').val(),
            medals = "0",
            hideName = "0";
        
        var $itemLi = $('#item_'+proId);
        if($itemLi.find('.jbtn_golden').hasClass('act')){
            medals = "1";
        }else if($itemLi.find('.jbtn_silver').hasClass('act')){
            medals = "2";
        }else if($itemLi.find('.jbtn_copper').hasClass('act')){
            medals = "3";
        }else if($itemLi.find('.jbtn_null').hasClass('act')){
            medals = "4";
        }
        if($itemLi.find('.chk_box').hasClass('act')){
            hideName = "1";
        }        
        var jcoment = $itemLi.find(".comment").val();

        localStore.set(awards_category, loginUserId, proId, medals, hideName, jcoment);
    },
    //娓叉煋鏈湴鏁版嵁
    renderJudgeItemsInfo:function(){
        var awards_category =  $('#awards_category').val(),
            loginUserId = $('#loginUserId').val();
        var localJudgeData = localStore.get(awards_category, loginUserId);
        
        if(!localJudgeData){return;}
        var localJudgeArr = JSON.parse(localJudgeData);
        // console.log(localJudgeArr);
        var $judgment = $('#judgment');
        localJudgeArr.forEach(function(item){
            // console.log(item.info.jcoment);
            renderDomHtml(item);
        })

        function renderDomHtml(item){
            if(!item.proId){return;}
            var $itemLi = $('#item_'+item.proId),
                $medals = $itemLi.find('.medals button'),
                $chkBox = $itemLi.find('a.chk_box'),
                $comment = $itemLi.find('textarea.comment');
            // $chkBox.removeClass('act');
            // $comment.val('');
            $comment.removeClass('compulsory');
            //濂栭」
            $medals.removeClass('act');
            if(item.info.medals === '1'){
                $itemLi.find('.jbtn_golden').addClass('act');
                $comment.addClass('compulsory');
            }else if(item.info.medals === '2'){
                $itemLi.find('.jbtn_silver').addClass('act');
                $comment.addClass('compulsory');
            }else if(item.info.medals === '3'){
                $itemLi.find('.jbtn_copper').addClass('act');
                $comment.addClass('compulsory');
            }else if(item.info.medals === '4'){
                $itemLi.find('.jbtn_null').addClass('act');
            }else{
                $medals.removeClass('act');
            }
            //鍖垮悕
            if(item.info.hn === '1'){
                $chkBox.addClass('act');
            }else{
                $chkBox.removeClass('act');
            }
            //璇勮
            if(!item.info.jcoment){
                $comment.val('');
            }else{
                $comment.val(item.info.jcoment);
            }
        }

        setTimeout(function(){
            var totalCount = $("#judgment li").length;
			// 鏇存柊濂栫墝鏁�
			var goldCount = $("#judgment li .jbtn_golden.act").length,silverCount = $("#judgment li .jbtn_silver.act").length,copperCount = $("#judgment li .jbtn_copper.act").length,noneCount = $("#judgment li .jbtn_null.act").length;
			var judgCount = totalCount-goldCount-silverCount-copperCount-noneCount;
        	$("#judgCount").html('<span class="color_969 mg_r_30">寰呰瘎 <i>'+judgCount+'</i></span><span class="color_golden">閲戝 <i>'+goldCount+'</i></span><span class="color_silver mg_l_30">閾跺 <i>'+silverCount+'</i></span><span class="color_copper mg_l_30">閾滃 <i>'+copperCount+'</i></span><span class="color_666 mg_l_30">鏃犲 <i>'+noneCount+'</i></span>');
        
        },1000);
        
    },
    cardBar:function(){
        $(window).on('scroll', function () {
            var scrollTop = $(this).scrollTop(),
                $settleBar = $('#card_bar'),
                $tagBar = $('#js_settle_bar h2'),
                settleBarHeight = $settleBar.offset().top + $settleBar.height() / 2;
            //鍒ゆ柇鏄惁鍒板簳閮ㄤ笉瓒呰繃footer
            if(scrollTop > settleBarHeight) {
                $tagBar.fadeIn('fast').removeClass('hide');
            }else{
                $tagBar.fadeOut('fast').addClass('hide');
            }
        });
    }
}

//鍙傝禌浣滃搧
var dwPro = {
    init:function(){
        initModules.renderListRateStar('#dwp_list');//娓叉煋鏄熸槦
        this.shareMyJudge();
    },
    shareMyJudge:function(){
        var $shareMyJudge = $('#share_my_judge'),
            $smjQrsBox =$('#smj_qrs_box'),
            $smjQrsLoading = $smjQrsBox.find('.smj_qrs_loading'),
            $smjQrsInfobox = $smjQrsBox.find('.smj_qrs_infobox'),
            $smjQrsImg = $smjQrsInfobox.find('img'),
            $smjQmgurl = $smjQrsInfobox.find('.smj_imgurl');
        //浜岀淮鐮�
        $shareMyJudge.hover(function () {
            var imgurl = $smjQmgurl.val();
            if ($smjQrsImg.attr("src") == "") {
                $.get(domain + "/qr/image/" + imgurl, function (data) {
                    $smjQrsImg.attr("src", data.content);
                    $smjQrsLoading.addClass('hide');
                    $smjQrsInfobox.removeClass('hide');
                }, 'json');
            }
            $smjQrsBox.show();
        }, function () {
            $smjQrsBox.hide();
        });
    },
	getMoreProject:function(type,page){
		var data                = {page:page,type:type};
		$('#get_projects a').text("鍔犺浇涓�...");
		$.post(domain+"/api/getDawardsProject",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('鍔犺浇澶辫触', 'color_red', '280');
				break;
			    case 1:
					var li_html = '';
					$.each(data.content,function(i,projects){
						var category = new Array();
						category = projects.awards_category_name.split(",");
						if(category.length>1){ var moreCat = '<i class="tran_type_icon"></i>';}else{ var moreCat = '';}
						var coverUrl  = projects.realCover?projects.realCover:projects.cover;
						var conTitle  = projects.dawards_title?projects.dawards_title:projects.title;
						li_html+='<li class="item"><a href="'+domain+'/projects/'+projects.conId+'.html" target="_blank" class="show color_cac"><div class="item_cover"><div class="lh_0"><img src="'+coverUrl+'" width="100%"></div><div class="item_mask"></div></div><div class="item_title fz_12 fw_b"><h4 class="fz_18 line_24 substr_2">'+conTitle+'</h4><div class="flex l_center color_969"><span>鍙傝禌绫诲埆锛� '+category[0]+'</span>'+moreCat+'</div><div class="flex l_center color_969 mg_b_10"><div class="mg_r_5">鎴戠殑璇勫垎</div><div class="rate_star"><div class="star_precent" data-rate="'+projects.judger_score+'"></div></div></div></div></a></li>';
					});
					$("#dwp_list").append(li_html);
					initModules.renderListRateStar('#dwp_list');
					if(data.totalpage>=page){
						$('#get_projects a').text("鍔犺浇鏇村");
						var nextPage = parseInt(page)+1;
						if(data.totalpage>=nextPage){$("#get_projects a").attr('onClick','dwPro.getMoreProject('+type+','+nextPage+');');}else{$('#get_projects').addClass("hide");}
					}
				break;
			}
		},"json");
    },
	getMoreGrids:function(userid,page){
		var $grid = $('#dwp_list').masonry({itemSelector: '.item',columnWidth: 400});
        var LoginUserId = $('#loginUserId').val();//鐢ㄦ埛ID
        var pageType = $('#pageType').val();//鑷繁鐨勯〉闈㈣繕鏄湅鍒汉鐨�
		var data                = {page:page,userId:userid};
		if(page>1){ 
			$('#get_projects a').text("鍔犺浇涓�...");
		}
		$.post(domain+"/api/getDawardsShareProject",data,function(data){
			switch(data.isSuccess){
			    case 0:
					openCloseTips('鍔犺浇澶辫触', 'color_red', '280');
				break;
			    case 1:
					var li_html = '';
					$.each(data.content,function(i,projects){
						var category = new Array();
						category = projects.awards_category_name.split(",");
						if(category.length>1){ var moreCat = '<i class="tran_type_icon"></i>';}else{ var moreCat = '';}
						var coverUrl  = projects.realCover?projects.realCover:projects.cover;
						var conTitle  = projects.dawards_title?projects.dawards_title:projects.title;
                        var isZan = 0;
                        if(projects.zanMembers){
                            var zanMembers = JSON.parse(projects.zanMembers);
                            var slectedZan = zanMembers.filter(function(item) { return item.userId == LoginUserId;});
                            if(slectedZan.length>0){isZan = 1;}
                        }
                        var dwZanIcon = isZan ? '<i class="icon dwzan_fill_icon"></i>' : '<i class="icon dwzan_icon"></i>',
                            dwzanStr = isZan ? '宸茶禐' : '鐐硅禐',
                            dwZanCount = projects.zanCount!='0' ? projects.zanCount : "璧�",
                            dwZanHtml = '<a class="zan_dw_btn inline_bk color_b58" title="'+dwzanStr+'" onclick="dwZan.judgeComment('+projects.conId+','+projects.dasId+')">'+dwZanIcon+'<span class="inline_bk mg_l_5 v_m dwzanCount_'+projects.dasId+'">'+dwZanCount+'</span></a>';
                        var whoseRate = pageType == 'share' ? '鎴戠殑璇勫垎' : '浠栫殑璇勫垎';
                        li_html = $('<li class="item"><a href="'+domain+'/projects/'+projects.conId+'.html" target="_blank" class="show color_cac"><div class="item_cover"><div class="lh_0"><img src="'+coverUrl+'" width="100%"></div><div class="item_mask"></div></div><div class="item_title item_bg"><div class="pd_15 fw_b fz_12"><h4 class="fz_18 line_24 substr_2">'+conTitle+'</h4><div class="flex l_center color_cac pd_b_8"><span>鍙傝禌绫诲埆锛� '+category[0]+'</span>'+moreCat+'</div></div><div class="bg_212 fz_14">'+
                        '<div class="flex lr_center pd_12_15"><div class="flex_1 flex l_center fz_12 fw_b color_969"><div class="mg_r_5">'+whoseRate+'</div><div class="rate_star"><div class="star_precent" data-rate="'+projects.judger_score+'"></div></div></div><div>'+dwZanHtml+'</div></div>'
                        +'<div class="pd_15 line_24 a_j">'+projects.comment+'</div></div></div></a></li>');
					$grid.append(li_html).masonry('appended',li_html);
					});
					initModules.renderListRateStar('#dwp_list');
					if(data.totalpage>=page){
						$('#get_projects a').text("鍔犺浇鏇村");
                        var nextPage = parseInt(page)+1;
						if(data.totalpage>=nextPage){$("#get_projects a").attr('onClick','dwPro.getMoreGrids('+userid+','+nextPage+');');$('#get_projects').removeClass('hide')}else{$('#get_projects').empty();}
					}
				break;
			}
		},"json");
    },
    handleProBar:function(myscore,countPro){
        var $rateProgress = $('#rate_progress'),
            $ratePval = $rateProgress.children('.rate_pval'),
            $chkBox = $('#handle_probar .chk_box'),
            $ratePtext = $rateProgress.next('.rate_ptext'),
            $ratePtextOne = $ratePtext.children().eq(0),
            $ratePtextTwo = $ratePtextOne.next('div'),
            maxLen = 300,
            ratePreInfinity = myscore < countPro ? parseInt((myscore/countPro)*100) : 100,
            ratePre = myscore < maxLen ? parseInt((myscore/maxLen)*100) : 100,
            flag = $rateProgress.hasClass('infinity'),
            boxFlag = $chkBox.hasClass('act');
        if(flag&&boxFlag){
            //鍏抽棴鏃犲敖妯″紡
            $chkBox.removeClass('act');
            $rateProgress.removeClass('infinity').attr('title', ratePre+'%');
            $ratePval.css('width',ratePre+'%');
            $ratePtext.fadeIn('fast').removeClass('hide');
            
        }else{
            //鎵撳紑鏃犲敖妯″紡
            $chkBox.addClass('act');
            $rateProgress.addClass('infinity').attr('title', ratePreInfinity+'%');
            $ratePval.css('width',ratePreInfinity+'%');
            $ratePtext.fadeOut('fast').addClass('hide');
        }

    }
}

//zan judge comments
var dwZan = {
    judgeComment:function(conId, id){
        //楠岃瘉鐧诲綍//鏈櫥褰� 寮瑰嚭鐧诲綍
        var userType = $("#userType").val();
		if (!userType) { openPopup("420", "popup_login_user"); return false; }
        var conId        = conId ? conId : $("#conId").val();//鏂囩珷id
        var comId        = id ? id : '';//璇勮Id
        if(!comId){ return false;}
        var $zanComTxt = $('.dwzanCount_'+id),
            $zanComLink = $zanComTxt.parent('a'),
            $zanComIcon = $zanComLink.children('.icon'),
            flag = $zanComIcon.hasClass('dwzan_fill_icon');
        var pUrl = flag ? domain+"/dawards_datas/czanDAWComment" : domain+"/dawards_datas/zanDAWComment";
        var data = {datas:{conId:comId}}
        $.post(pUrl,data,function(data){
            switch(data.isSuccess){
                case 1:
                    var zanStr = data.zan==0 ? '璧�' : data.zan;
                    $zanComTxt.text(zanStr);
                    if(flag){
                        $zanComIcon.removeClass('dwzan_fill_icon').addClass('dwzan_icon');
                    }else{
                        $zanComIcon.removeClass('dwzan_icon').addClass('dwzan_fill_icon');
                    }
                    break;
                case 0:
                    $("#popup_zan .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_red mg_r_10">鏈嶅姟鍣ㄦ蹇欙紝绋嶅悗鍐嶈禐</b></span>');
                    openPopup("280", "popup_zan");
                    break;
                case 2:
                    break;
            }
        },"json");
    }
};

//鍑芥暟闃叉姈
function debounce(fn, tar){
    var timerID = null;
    return function(){
        var arg = arguments[0];
        if(timerID){
            clearTimeout(timerID);
        }
        timerID = setTimeout( function(){
            fn(arg);
        },300);
    }
}

//鍏ュ洿椤圭洰
var shortlist = {
    init:function(){
        this.jtips();
        this.loadImg();
        this.slSelectNav();
    },
    slSelectNav:function(){
        var $hoverItem = $('.js_sl_con .hover_item');
        //瀵艰埅璺熻釜
        $('.entry_category').onePageNav({
            currentClass: 'cur',
            changeHash: false,
            scrollSpeed: 500,
			scrollThreshold: 0.3
        });
        var _catTimer;
        var _mouseflag;
        $('.hover_item').hover(function(){
            var self = $(this);
            var $tagBox = $(this).children('.js_nav_title');
            if(!_mouseflag){
                if($tagBox.hasClass('hide')){
                    $tagBox.slideDown('fast');
                    $tagBox.removeClass('hide');
                }
                _mouseflag = true;
            }else{
                _catTimer = setTimeout(function(){
                    if($tagBox.hasClass('hide')){
                        $tagBox.slideDown('fast');
                        $tagBox.removeClass('hide');
                    }
                },300)
            }
        },function(){
            if(_catTimer){
                clearTimeout(_catTimer);
            }
        })
        $('.js_nav_title').on("mouseleave",function(){
            if(!$(this).hasClass('hide')){
                $(this).slideUp('fast');
                $(this).addClass('hide');
            }
    聽聽  })

        $('.entry_category li a').on('click',function(){
            var $tagBox = $(this).parents('.js_nav_title');
            if(!$tagBox.hasClass('hide')){
                $tagBox.slideUp('fast');
                $tagBox.addClass('hide');
            }
        });
        
    },
    jtips:function(){
        $('#jtips_icon').hover(function(){
            var jtBox = $('#jtips_icon').next('.jtips_box');
            if(jtBox.hasClass('hide')){
                jtBox.removeClass('hide');
            }else{
                jtBox.addClass('hide');
            }
        })
    },
	loadImg:function(){
		$("img.load").lazyload({placeholder:fileUrl+"/images/common/default_img.png"});
	},
	checkSubmit:function(){
		var totalCount = $("#judgment li").length;
		var judgCount  = $("#judgment li").find(".medals .act").length;
		if (totalCount>judgCount) {
			openCloseTips('鎮ㄨ繕鏈夋湭璇勭殑椤圭洰', 'color_red', '280');
			return false;
		}
		var goldCount = $("#judgment li .jbtn_golden.act").length,silverCount = $("#judgment li .jbtn_silver.act").length,copperCount = $("#judgment li .jbtn_copper.act").length,noneCount = $("#judgment li .jbtn_null.act").length;
		$("#judgResult").html('<span class="color_golden">閲戝 '+goldCount+'</span><span class="color_silver mg_l_20">閾跺 '+silverCount+'</span><span class="color_copper mg_l_20">閾滃 '+copperCount+'</span><span class="color_666 mg_l_20">鏃犲 '+noneCount+'</span>');
		var comCount=0;
		$("#judgment li").each(function(i){
			if($(this).find(".comment").val()!=""&&$(this).find(".medals .act").index()<3){comCount++;}
			if($(this).find(".comment").val()==""&&$(this).find(".medals .act").index()<3){$(this).find(".comment").focus();}
		});
		var medalCount = goldCount+silverCount+copperCount;
		if (comCount<medalCount) {
			openCloseTips('璇蜂负閲戝/閾跺/閾滃椤圭洰鎾板啓璇勮', 'color_red', '280');
			$("#judgment li").each(function(i){
				if($(this).find(".comment").val()==""&&$(this).find(".medals .act").index()<3){$(this).find(".comment").focus();}
			});
			return false;
		}
		openPopup("400", "popup_apply_confirm");
	},
	judgment:function(val){
		var category  = $("#awards_category").val();
        var loginUserId = $('#loginUserId').val();
		var isEdit    = $("#isEdit").val();
		var dacpIds   = new Array();
		var conIds    = new Array();
		var medals    = new Array();
		var comments  = new Array();
		var hideNames = new Array();
		var comCount  = 0;
		$("#judgment li").each(function(i){
			var dacpId  = $(this).find(".dacpId").val();
			var conId   = $(this).find(".conId").val();
			var medal   = $(this).find(".medals .act").index()>=0?$(this).find(".medals .act").index()+1:0;
			if($(this).find(".comment").val()!=""&&$(this).find(".medals .act").index()<3){comCount++;}
			if($(this).find(".comment").val()==""&&$(this).find(".medals .act").index()<3){$(this).find(".comment").focus();}
			var hideName   = $(this).find("a.act").length;
			var comment   = $(this).find(".comment").val();
			dacpIds.push(dacpId);
			conIds.push(conId);
			medals.push(medal);
			hideNames.push(hideName);
			comments.push(comment);
		});
		var data                       = {datas:{
				category:category,
				dacpId:dacpIds,
				conId:conIds,
				medals:medals,
				comment:comments,
				hideName:hideNames,
				isFinished:val
			},isEdit:isEdit
		};
		if(val==1){
			var totalCount = $("#judgment li").length;
			var judgCount  = $("#judgment li").find(".medals .act").length;
			if(totalCount>judgCount){
                openCloseTips('鎮ㄨ繕鏈夋湭璇勭殑椤圭洰', 'color_red', '280');
                return false;
            }
			var goldCount = $("#judgment li .jbtn_golden.act").length,silverCount = $("#judgment li .jbtn_silver.act").length,copperCount = $("#judgment li .jbtn_copper.act").length,noneCount = $("#judgment li .jbtn_null.act").length;
			var medalCount = goldCount+silverCount+copperCount;
			if(comCount<medalCount){
				openCloseTips('璇蜂负閲戝/閾跺/閾滃椤圭洰鎾板啓璇勮', 'color_red', '280');
				return false;
			}
			$("#submit_apply_judge_btn").attr("onclick","");
			$.closePopupLayer('popup_apply_confirm');
			openPopup("400", "popup_loading");
		}else{
			openPopup("400", "popup_loading");
		}
		$.post(domain+"/dawards_datas/dAwardsJudgment",data,function(data){
			switch(data.isSuccess){
			    case 0:
					$.closePopupLayer('popup_loading')
					$.closePopupLayer('popup_apply_confirm')
					openCloseTips('鎻愪氦澶辫触', 'color_red', '280');
				break;
			    case 1:
                    if(val==1){
						$.closePopupLayer('popup_loading')
						$.closePopupLayer('popup_apply_confirm');
						$("#submit_apply_judge_btn").attr("onclick","shortlist.judgment(1);");
                        openCloseTips('鎮ㄥ凡瀹屾垚璇ョ被鐩瘎瀹★紝璋㈣阿鎮�', 'color_green', '280');
                        // location.reload();
                        //鍒犻櫎localStore
                        localStore.clear('judgment_'+category+'_'+loginUserId);
                        setTimeout(function(){
                            location.href = domain + '/dawards/judgment';
                        },1100)
                    }else{
						$.closePopupLayer('popup_loading')
                        openCloseTips('淇濆瓨鎴愬姛', 'color_green', '280');
						$("#isEdit").val(1);
						//location.reload();
                    }
				break;
			}
		},"json");
	},
    scrollFixTab:function(){
        //娓叉煋鏄熸槦
        var nowSt = $(window).scrollTop(),
            $dwyTabCon = $('#dwy_tab_con'),
            targetHeight = $('#dwy_tab_con').offset().top;
        function checkTabPos(ast){
            //鍒ゆ柇鏄惁鍒板簳閮ㄤ笉瓒呰繃footer
            if(ast>targetHeight) {
                $dwyTabCon.addClass('fix_tab');
            }else{
                $dwyTabCon.removeClass('fix_tab');
            }
        }
        $(window).on('scroll', function () {			
            var scrollTop = $(this).scrollTop();
            checkTabPos(scrollTop);
        });
    }
}

/*鍏ㄥ満澶у*/
var grand = {
    init:function(){
        dwEnter.settleBar();
        this.nominate();
    },
    nominate:function(){
        var $list = $('#nominate_list'),
            $listItem = $list.find('.item_checkbox');
        $listItem.on('click', function(){
            var $this = $(this),
                $listChk = $this.find('.chk_box'),
                flag = $this.parent().hasClass('selected');

            var selectedLen = $list.children('li.selected').length;
            if(flag){
                $this.parent().removeClass('selected');
                $listChk.removeClass('act');
            }else{
                if(selectedLen < 3){
                    $this.parent().addClass('selected');
                    $listChk.addClass('act');
                }else{
                    openCloseTips('鎮ㄦ渶澶氬彧鑳介€夋嫨3椤�, 璇峰彇娑堥儴鍒嗗凡閫夋嫨鍐嶇户缁紒', 'color_red', '280');
                }
            }
        });
        //鐐瑰嚮鎻愪氦
        var $checkBtn = $('#check_grand_btn');
        $checkBtn.on('click', function(){
            var selectedLen = $list.children('li.selected').length;
            $('#submit_grand_btn').removeAttr('disabled');
            var $nominationZone = $('#popup_submit_confirm .nomination_zone'),
                $nominationList = $nominationZone.find('ul');
            $nominationList.empty();//娓呯┖
            if(selectedLen == 0){
                $nominationZone.addClass('empty');
                $('#popup_submit_confirm h4').html('鎮ㄦ湭鎻愬悕浠讳綍椤圭洰');
            }else{
                $nominationZone.removeClass('empty');
                $('#popup_submit_confirm h4').html('鎮ㄧ殑鎻愬悕');
                var liHtml = '';
                $list.children('li.selected').each(function(){
                    var _thisTxt = $(this).find('h4').text();
                    liHtml += '<li>'+_thisTxt+'</li>';
                });
                $nominationList.append(liHtml);
            }
            openPopup("520", "popup_submit_confirm");
        })      

    },
    //纭鎻愪氦澶у
    submits:function(){
        $('#submit_grand_btn').attr('disabled',true);
		var conIds    = new Array();
		var isChecks  = new Array();
		var comment   = $("#grand_comment").val();
		var ishide    = $("#hideName").find(".chk_box.act").length;
		$("#nominate_list li").each(function(i){
			var conId   = $(this).find(".conId").val();
			var isCheck   = $(this).find(".chk_box.act").length;
			conIds.push(conId);
			isChecks.push(isCheck);
		});
		var data  = {datas:{conId:conIds,isCheck:isChecks,hideName:ishide,comment:comment}};
		$.post(domain+"/dawards_datas/dAwardsGrand",data,function(data){
			switch(data.isSuccess){
			    case 0:
                    $('#submit_grand_btn').removeAttr('disabled');
					$.closePopupLayer('popup_submit_confirm');
					openCloseTips('鎻愪氦澶辫触', 'color_red', '280');
				break;
			    case 1:
                     $.closePopupLayer('popup_submit_confirm');
					$('#submit_grand_btn').attr('disabled',true);
					openCloseTips('鎻愪氦鎴愬姛', 'color_green', '280');
					location.href = domain + '/dawards/grand';
				break;
			}
		},"json");
    },
    //鍐抽€�
    elections:function(){
        var $list = $('#nominate_list'),
            $listItem = $list.find('.item_checkbox'),
            $grandTextarea = $('#grand_comment'),
			$hideName = $('#hideName'),
            $selectNone = $('#select_none'),
			$dates = new Date()
			$year = $dates.getFullYear();
        $listItem.on('click', function(){
            var $this = $(this),
                $listChk = $this.find('.chk_box'),
                flag = $this.parent().hasClass('selected');
            if(flag){
                $this.parent().removeClass('selected');
                $listChk.removeClass('act');
                $grandTextarea.prev('p').html('璇烽€夋嫨涓€涓」鐩负'+$year+'鏁拌嫳濂栧叏鍦哄ぇ濂�');
            }else{
                $this.parent().siblings('li').removeClass('selected');
                $this.parent().siblings('li').find('.chk_box').removeClass('act');
                $this.parent().addClass('selected');
                $listChk.addClass('act');
                var title = $list.children('li.selected').find('h4').text();
                $grandTextarea.prev('p').html('<span class="mg_nt_2">鎮ㄥ凡閫夋嫨銆�' + title + '銆嬩负'+$year+'鏁拌嫳濂栧叏鍦哄ぇ濂�</span><i class="chk_box mg_l_10"></i><span class="mg_nt_1 cur_p mg_l_5">鍖垮悕</span>');
				//$grandTextarea.prev('p').html('鎮ㄥ凡閫夋嫨銆�' + title + '銆嬩负2022鏁拌嫳濂栧叏鍦哄ぇ濂�');
                if($selectNone.hasClass('select_none')){
                    $selectNone.removeClass('select_none').addClass('bg_212');
                    $selectNone.find('.chk_box').removeClass('act');
                }
            }
        });
		//鍖垮悕
        $hideName.on('click',function(){
            var flag = $(this).find('.chk_box').hasClass('act');
            if(flag){
                $(this).find('.chk_box').removeClass('act');
            }else{
				$(this).find('.chk_box').addClass('act');
            }
        })
        //涓€閿彇娑堟墍鏈夐€夋嫨
        $selectNone.on('click',function(){
            var flag = $(this).hasClass('select_none');
            if(flag){
                $(this).removeClass('select_none').addClass('bg_212');
                $(this).find('.chk_box').removeClass('act');
            }else{
                $list.children('li').removeClass('selected');
                $list.children('li').find('.chk_box').removeClass('act');
                $grandTextarea.prev('p').html('璇烽€夋嫨涓€涓」鐩负'+$year+'鏁拌嫳濂栧叏鍦哄ぇ濂�');
                $(this).removeClass('bg_212').addClass('select_none');
                $(this).find('.chk_box').addClass('act');
            }
        })

        //鐐瑰嚮鎻愪氦
        var $checkBtn = $('#check_grand_btn');
        $checkBtn.on('click', function(){
            var selectedLen = $list.children('li.selected').length,
                grandComment = $grandTextarea.val(),
                flag = $selectNone.hasClass('select_none');
            var $nominationZone = $('#popup_submit_confirm .nomination_zone'),
                $nominationList = $nominationZone.find('ul');
            $('#submit_grand_btn').removeAttr('disabled');
            $nominationList.empty();//娓呯┖
            if(selectedLen == 0 || flag){
                $nominationZone.addClass('empty');
                $('#popup_submit_confirm h4').html('鎮ㄦ湭閫夋嫨浠讳綍椤圭洰');
            }else{
                if(grandComment == '' || grandComment == null){
                    openCloseTips('璇峰啓涓嬫偍閫夋嫨瀹冪殑鐞嗙敱锛堝繀濉級', 'color_red', '280');
                    setTimeout(function(){$grandTextarea.focus();},1500);
                    return false;
                }else{
                    $nominationZone.removeClass('empty');
                    $('#popup_submit_confirm h4').html('鎮ㄩ€夋嫨鐨勨€滃叏鍦哄ぇ濂栤€�');
                    var liHtml = '';
                    $list.children('li.selected').each(function(){
                        var _thisTxt = $(this).find('h4').text();
                        liHtml += '<li>'+_thisTxt+'</li>';
                    });
                    $nominationList.append(liHtml);
                }
            }
            openPopup("520", "popup_submit_confirm");
        })

    },
    //绔炵寽
    quiz:function(){
        var $btns = $('#quiz_grand').find('button'),
            $progress = $('#quiz_grand').find('.picked_progress');
        $btns.on('click',function(){
            var $this = $(this),
                flag = $this.hasClass('disabled'),
                pickId = $this.parents('li').attr('data-proid');
            //鏍￠獙鐧诲綍
            var userType = $("#userType").val() ? $("#userType").val() : "";
            if (userType != 1) {
                openPopup("420", "popup_login_user");
                return false;
            }
            //宸茬櫥褰�
            // console.log(pickId);
            if(!flag && $progress.parent('.picked_bg').hasClass('hide')){
				submitQuiz(pickId);
            }else{
                //console.log('鎮ㄥ凡鎻愪氦杩囦簡');
                $btns.attr('disabled',true).addClass('disabled');
            }
        });

        //鎻愪氦  submitQuiz
        function submitQuiz(pickId){
			var data  = {datas:{conId:pickId}};
			$.post(domain+"/dawards_datas/dAwardsGrandUser",data,function(data){
				switch(data.isSuccess){
					case 0:
						openCloseTips('鎻愪氦澶辫触', 'color_red', '280');
					break;
					case 1:
                        $btns.addClass('disabled');
						$btns.parent('p').remove();	
						var totalVotes = 0;
						$.each(data.content,function(i,votes){
                        	totalVotes += parseInt(votes.voteNums);
                        });
                        //console.log(totalVotes);
                        $('#quiz_grand').find('.pb_'+pickId).parent('.picked_bg').addClass('my_picked');
						// $.each(data.content,function(i,votes){
						// 	var voteNum = ((parseInt(votes.voteNums)/totalVotes).toFixed(3)*100).toFixed(1);
                        // 	changePrecent(votes.conId,voteNum);
                        // });
                        var voteNum1 = data.content[0].voteNums ? ((parseInt(data.content[0].voteNums)/totalVotes).toFixed(3)*100).toFixed(1) : 0;
                        var voteNum2 = data.content[1].voteNums ? ((parseInt(data.content[1].voteNums)/totalVotes).toFixed(3)*100).toFixed(1) : 0;
                        var voteNum3 = (data.content[0].voteNums || data.content[1].voteNums) ? (100 - voteNum1 - voteNum2).toFixed(1) : 0;
                        $.each(data.content,function(i,votes){
                            if(i==0){
                                changePrecent(votes.conId,voteNum1);
                            }else if(i==1){
                                changePrecent(votes.conId,voteNum2);
                            }else{
                                changePrecent(votes.conId,voteNum3);
                            }
                        });
						$progress.parent('.picked_bg').removeClass('hide');				 
					break;
				}
			},"json");
        }

        //changePrecent
        function changePrecent(pickId, precent){
            var $bar = $('#quiz_grand').find('.pb_'+pickId);
            $bar.animate({width:precent+"%"},100);
            $bar.attr('title',precent+'%');
            setTimeout(function(){
                $bar.children('span').text(precent+'%');
            },200);
        }
    },
    saveLetter:function(tagert){
        // $('html,body').animate({ scrollTop: 0,scrollLeft: 0 }, 1);//ios 12 bug
        window.scrollTo(0, 0);
        var $this = $(tagert);
        $this.removeAttr('onclick');

        var val_nickname = '鏁拌嫳濂栨劅璋俊';
        var val_poster = '鏁拌嫳濂栨劅璋俊';

        var poster = document.getElementById('ltb_cons');
        setTimeout(function(){
            html2canvas(poster, {
                scale: 2,
                useCORS: true,
                async: true
            }).then(function(e){
                /*鐢熸垚base64鍥剧墖鏁版嵁*/
                // $this.addClass('disabled');
                var dataUrl = e.toDataURL("image/jpeg");
                var loopImgFile = saveAsImg.dataURLtoFile(dataUrl, val_nickname);
                var fileUrlNew = URL.createObjectURL(loopImgFile);
                var base64 = {
                    dataURL: dataUrl,//鐢╱rl鏂瑰紡琛ㄧず鐨刡ase64鍥剧墖鏁版嵁
                    type: 'image/jpeg'//鏂囦欢绫诲瀷
                }
                var blobImg = saveAsImg.convertBase64UrlToBlob(base64);
                var blobImgURL = URL.createObjectURL(blobImg);
                // var newImg = document.createElement("img");
                // newImg.src = blobImgURL;
                // $pImageBox.html(newImg);
                // console.log(newImg);
                // openDialog('375','poster_popup');
                // $('#ScreenLocker').on('click',function(){
                //     closeDialog('poster_popup')
                // })
                saveAsImg.myDownLoad(blobImgURL,val_poster);
                // $pp_subject.empty();
                // $pp_desc.empty();
                // $pp_avatar.attr('src','');
                // $pp_nickname.empty();
                // $pp_title.empty();
            })
        },150);
    }
}

var saveAsImg = {
    // base64杞琤lob
    /**
     * 灏嗕互base64鐨勫浘鐗噓rl鏁版嵁杞崲涓築lob
     * 鐢╱rl鏂瑰紡琛ㄧず鐨刡ase64鍥剧墖鏁版嵁
     */
    convertBase64UrlToBlob:function (base64) {
        let urlData = base64.dataURL
        let type = base64.type
        let bytes=null
        if(urlData.split(',').length>1){//鏄惁甯﹀墠缂€
            bytes = window.atob(urlData.split(',')[1]) // 鍘绘帀url鐨勫ご锛屽苟杞崲涓篵yte
        }else{
            bytes = window.atob(urlData) 
        }
        // 澶勭悊寮傚父,灏哸scii鐮佸皬浜�0鐨勮浆鎹负澶т簬0
        let ab = new ArrayBuffer(bytes.length)
        let ia = new Uint8Array(ab)
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], { type: type })
    },
    // base64鐩存帴杞琭ile
    dataURLtoFile:function(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:"png"});
    },
    //浼犲叆url璺緞浠ュ強鏂囦欢鍚嶅嵆鍙�  涓嬭浇  
    myDownLoad:function(url,fileName){
        saveAsImg.getBolb(url).then((blob)=>{
            saveAsImg.saveAs(blob,fileName)
        })
    },    
    getBolb:function(url){
        return new Promise(resolve=>{
            const xhr = new XMLHttpRequest()
            xhr.open('GET',url,true)
            xhr.responseType = 'blob'
            xhr.onload =()=>{
            if(xhr.status === 200){
                resolve(xhr.response)
            }
            }
            xhr.send()
        })
    },
    saveAs:function(blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename)
        } else {
            const link = document.createElement('a')
            const body = document.querySelector('body')

            link.href = window.URL.createObjectURL(blob)
            link.download = filename

            // fix Firefox
            link.style.display = 'none'
            body.appendChild(link)

            link.click()
            body.removeChild(link)

            window.URL.revokeObjectURL(link.href)
        }
    }
}