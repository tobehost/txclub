var domain = "https://" + location.host;
var fileUrl="https://file.tobe.host";
function openCloseTips(txt, txtColor, pWidth) {
    $('#popup_tips .popup_con').find('b').text(txt).removeClass().addClass(txtColor);
    openPopup(pWidth, 'popup_tips');
	setTimeout("$.closePopupLayer('popup_tips')", 1000);
}
function subString(str, len) {
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) { strlen += 2; } else { strlen++; }
        s += str.charAt(i);
        if (strlen >= len) { return s + '...'; }
    }
    return s;
}
function formatDate(now,sl) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();  
    //var second = now.getSeconds();
    if (month < 10) {month = "0" + month;}
    if (date < 10) {date = "0" + date;}
    if (hour < 10) { hour = "0" + hour; }
    if (minute < 10) { minute = "0" + minute; }
    sl = sl ? 0 : 1;
    if (sl == 0) {
        return year + "-" + month + "-" + date;
    } else {
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
}
function getLocalTime(nS,nb) {
    var d = new Date(parseInt(nS) * 1000);
    nb = nb ? 0 : 1;
    if (nb == 0) {
        return formatDate(d,0);
    } else{
        return formatDate(d,1);
    }
}
var common={
	init: function(){
		common.footerHover();
		common.headerHover();
		common.returnTop();
		// for header search
		$('.header #keywordshead').live('keydown', function (e) {
			if (e.which == 13) {$('.header .search_icon').click();}
		});
	},
	headerHover: function(){
		$('.header_nav_l li,.header_nav_r li').hover(function(){
			$(this).children('.menu').stop(true,true).slideDown(100);
			//淇敼浜岀淮鐮佸浘灞曠幇鏂瑰紡
			var _img=$(this).children('.menu').find('.menu_qrc'),app_qrcode=fileUrl+'/www/images/common/app_qrcode.png';
			if(_img.attr('src')==''){
				_img.attr('src',app_qrcode);
			}
		},function(){
			$(this).children('.menu').stop(true,true).slideUp(100);
		})
		$('.header_nav_l li .more_menu').hover(function(){
			$(this).children('.menu_three,.menu_feature').stop(true,true).slideDown(100);
		},function(){
			$(this).children('.menu_three,.menu_feature').stop(true,true).slideUp(100);
		})
		$('.header .search_all').hover(function(){
			$(this).children('.search_type').stop(true,true).slideDown(100);
		},function(){
			$(this).children('.search_type').stop(true,true).slideUp(100);
		})
		$('.search_type li').click(function(){
			$('.search_type li').removeClass("hide");
			$(this).addClass("hide");
			$('.search_all span').html($(this).html());
			$('#cathead').val($(this).attr("values"));
			$('.search_type').slideUp(100);
		});
		//header search
		var hsearch_input = $('.header #keywordshead');
		if (hsearch_input.val() == "") {
			hsearch_input.parent().children('label').show();
		} else {
			hsearch_input.parent().children('label').hide();
		}
		hsearch_input.live('keydown', function () {
			var vm_label = $(this).parent().children('label');
			var vm_input_val = $(this).val();
			vm_label.hide();
			if (vm_input_val == "") {
				vm_label.show();
			} else {
				vm_label.hide();
			}
		});
		hsearch_input.live('keyup', function () {
			var vm_label = $(this).parent().children('label');
			var vm_input_val = $(this).val();
			vm_label.hide();
			if (vm_input_val == "") {
				vm_label.show();
			} else {
				vm_label.hide();
			}
		});
	},
	footerHover:function(){		
		$('.footer .bsns_blk a').hover(function(){
			$('.footer_digital_code').children('[data-type='+$(this).attr('data-type')+']').removeClass('hide');
			//淇敼浜岀淮鐮佸浘灞曠幇鏂瑰紡
			var wxqrc_img=fileUrl+'/images/common/rwqrc_150.png',appqrc_img=fileUrl+'/images/common/rapp_150.png';
			var _img=$('.footer_digital_code').children('[data-type='+$(this).attr('data-type')+']').find('img');
			if($(this).attr('data-type')=='wechat'){
				if(_img.attr('src')==''){
					_img.attr('src',wxqrc_img);
				}
			}else if($(this).attr('data-type')=='andriod'||$(this).attr('data-type')=='apple'){
				if(_img.attr('src')==''){
					_img.attr('src',appqrc_img);
				}
			}
		},function(){
			$('.footer_digital_code').children('[data-type='+$(this).attr('data-type')+']').addClass('hide');
		})
		$('.digital_code').hover(function(){
			$(this).removeClass('hide');
		},function(){
			$(this).addClass('hide');
		})
	},
	returnTop:function(){
		cal()
		$(window).resize(cal);
		$(window).on('scroll', function () {
			var pos = 0;
			pos = parseInt(document.body.scrollTop || document.documentElement.scrollTop);
			if (pos > 50) {
				$('.return_top').fadeIn();
			} else {
				$('.return_top').fadeOut();
			}
		});
		//杩斿洖椤堕儴
		$('.return_arrow').click(function(){
			$('html,body').animate({
				scrollTop: 0
			}, 400);
		})
		//淇敼浜岀淮鐮佸浘灞曠幇鏂瑰紡
		$('.return_code').hover(function(){
			var wxqrc_img=fileUrl+'/www/images/common/returntop_wechat.png',appqrc_img=fileUrl+'/www/images/common/returntop_app.png';
			if($('.return_code .return_code_box li:eq(0) img').attr('src')==''){
				$('.return_code .return_code_box li:eq(0) img').attr('src',appqrc_img);
			}
			if($('.return_code .return_code_box li:eq(1) img').attr('src')==''){
				$('.return_code .return_code_box li:eq(1) img').attr('src',wxqrc_img);
			}
		})
		//浜岀淮鐮佸睍绀�
		var index = 0;
		$('.return_code .return_code_title span').click(function(){
			index = $(this).index();
			if(!$(this).hasClass('active')){
				$(this).addClass('active').siblings().removeClass('active');
				$('.return_code .return_code_box li:eq('+index+')').removeClass('hide').siblings().addClass('hide')
			}
		})
		//璁＄畻杩斿洖椤堕儴
		function cal(){
			var rightDis = parseInt(($(window).width()-1180)/2-60);
			//console.log($('html').width())
			rightDis = rightDis < 20 ? 20 : rightDis;
			$('.return_top').css('right',rightDis+'px');
		}
	}
}
var searchs = {
	global:function(head){
		if(head=='head'){
			var keywords   = encodeURIComponent($("#keywords"+head).val());
			if (keywords == "") {
				$("#keywords"+head).focus();
				$(".header_nav .search").addClass("bd_red");
				setTimeout('$(".header_nav .search").removeClass("bd_red")', 600);
				return false;
			}
			var cat = $("#cat"+head).val();
		}else if(head=='bom_bar'){
			var keywords   = encodeURIComponent($("#keywords"+head).val());
			if (keywords == "" || keywords == encodeURIComponent("杈撳叆鎼滅储鍏抽敭瀛�")) {
				setTimeout("openCloseTips('杈撳叆鎼滅储鍏抽敭瀛�', 'color_red', '280')", 600);
				return false;
			}
			var cat        = $("#cathead_bar").val();
		}else if(head=='head_bar'){
			var keywords   = encodeURIComponent($("#keywords"+head).val());
			$('html,body').animate({scrollTop: 0}, 400);			
			if (keywords == "" || keywords == encodeURIComponent("杈撳叆鎼滅储鍏抽敭瀛�")) {
				setTimeout("openCloseTips('杈撳叆鎼滅储鍏抽敭瀛�', 'color_red', '280')", 600);
				return false;
			}
			var cat        = $("#cat"+head).val();
		}else if(head=='basic_bar'){
			var keywords   = encodeURIComponent($("#basic_kw").val());
			if (keywords == "" || keywords == encodeURIComponent("璇疯緭鍏ヨ亴浣嶅悕绉版垨鍏徃鍚嶇О")) {
				setTimeout("openCloseTips('璇疯緭鍏ヨ亴浣嶅悕绉版垨鍏徃鍚嶇О', 'color_red', '280')", 600);
				return false;
			}
			var cat        = $("#cat"+head).val();
		}else if(head=='basic_bom_bar'){
			var keywords   = encodeURIComponent($("#basic_bom_kw").val());
			if (keywords == "" || keywords == encodeURIComponent("璇疯緭鍏ヨ亴浣嶅悕绉版垨鍏徃鍚嶇О")) {
				setTimeout("openCloseTips('璇疯緭鍏ヨ亴浣嶅悕绉版垨鍏徃鍚嶇О', 'color_red', '280')", 600);
				return false;
			}
			var cat        = $("#cat"+head).val();
		}else{
			var keywords   = encodeURIComponent($("#keywords").val());
			var cat        = $("#cat").val();
		}
		var province   = $("#province").val()?$("#province").val():0;
		var industry   = $("#industry").val()?$("#industry").val():0;
		var functions  = $("#functions").val()?$("#functions").val():0;
		if(cat=="all"){var searchUrl = domain+"/search?kw="+keywords;}
		if(cat=="articles"||cat=="projects"){var searchUrl = domain+"/search/"+cat+"?kw="+keywords;}
		if(cat=="people"){var searchUrl = domain+"/search/"+cat+"?pc="+province+"&func="+functions+"&kw="+keywords;}
		if(cat=="jobs"){var searchUrl = domain+"/search/"+cat+"?kw="+keywords;}
		if(cat=="company"){var searchUrl = domain+"/search/"+cat+"?pc="+province+"&in="+industry+"&kw="+keywords;}
		var data = {datas:{content:decodeURIComponent(keywords)}}
		$.post(domain+"/api/checkKeywords",data,function(data){
			if(data.isSuccess==1){
				location.href = searchUrl;
			}else{
				setTimeout("openCloseTips('鎮ㄨ緭鍏ョ殑鍏抽敭璇嶅睘浜庤繚绂佽瘝', 'color_red', '280')", 600);
				return false;
			}
		},"json");
	},
	suggest: function (head) {
		var cat  = $("#cat"+head).val();
		$("#keywords" + head).autocomplete({
			 'minLength':2,
             'source':domain + "/api/suggest?type="+cat,
             'select':function(ev,ui){
                 $("#keywords" + head).val(ui.item.label);
				 searchs.global(head);
             }
		});
    }
}
var awards = {
	init: function(){
		this.intro();
		this.wxqrc();
		this.chooseYear();
		this.chooseLevel();
		this.moreAwards();
		this.getMoreProjects();
		this.getMoreArticles();
		this.getMorePeople();
		this.getMoreCompany();		
	},
	all:function(){
		this.wxqrc();
		this.getTotalProjects(1);
		this.moreAwards();
		this.getMoreTotalProjects();
	},
	navscroll:function(){
		// //瀹氫箟鐨�60鏄粴鍔ㄥ悗璺濈椤堕儴鐨勫€�,涓巆ss鐩稿懠搴�
		// var itemTopArr =[], aboutAwardsTop = 60,pos = 0;
		// //灏嗗叧浜巇aoy闇€瑕佹粴鍔ㄧ殑鍊煎瓨鍏ユ暟缁勶紝绗竴涓€煎搴斿叧浜巇aoy锛屾棤婊氬姩锛屽€间负0
		// itemTopArr.push(0);
		// //閬嶅巻姣忎釜妯″潡闇€瑕佹粴鍔ㄧ殑鍊硷紝瀛樺叆鏁扮粍
		// $('.about_awards_info_item ').each(function(index,e){
		// 	//璇ユā鍧楄窛绂婚〉闈㈤《閮ㄧ殑鍊�-渚ц竟瀵艰埅璺濈椤堕儴鐨勫€�
		// 	itemTopArr.push($(e).children('.about_awards_info_title').offset().top-aboutAwardsTop)
		// })
		// $('.about_awards_nav li').click(function(){
		// 	$(this).addClass('active').siblings().removeClass('active');
		// 	$('html,body').animate({
		// 		scrollTop: itemTopArr[$(this).index()]
		// 	}, 400);
		// })
		
		$(window).on('scroll', function () {			
			var pos = parseInt(document.body.scrollTop || document.documentElement.scrollTop);			
			//鑾峰彇褰撳墠楂樹寒index,涓庝晶杈瑰鑸搴�
			//getActiveNav(itemTopArr,pos)
			// $('.about_awards_nav li').eq(getActiveNav(itemTopArr,pos)).addClass('active').siblings().removeClass('active');
			if (pos > 190) {
				$('.about_awards_nav').addClass('about_awards_nav_scroll')
			} else {
				$('.about_awards_nav').removeClass('about_awards_nav_scroll')
			}
		});
		// //鍦╝rr鏁扮粍涓幏鍙栧綋鍓嶅湪灞忓箷涓殑鏌愬厓绱犲厓绱犵殑scroll鍊兼墍鍦ㄧ殑绱㈠紩
		// function getActiveNav(arr,pos){
		// 	for (var i=0 ; i< arr.length; i++) {
		// 		if( i < arr.length-1){
		// 			if(pos >= arr[i] && pos < arr[i+1]){
		// 				return i;
		// 			}
		// 		}else{
		// 			return i;
		// 		}
		// 	}
		// }
		
        $('#sub_nav_list').onePageNav({
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 500,
			scrollThreshold: 0.2,
        });
	},
	wxqrc: function () {
	    function shareSnsIcon(bs,bt) {
	        //show hide sns
	        $('#add_' + bs + '_sns_con').hover(function () {
	            $('#add_' + bs + '_sns_con .add_sns_link').css('display', 'none');
	            $('#add_' + bs + '_sns_con .hide_sns_box').removeClass('hide');
	        }, function () {
	            $('#add_' + bs + '_sns_con .add_sns_link').css('display', 'inline-block');
	            $('#add_' + bs + '_sns_con .hide_sns_box').addClass('hide');
	        });
	        //浜岀淮鐮�
	        $('#share_' + bs + '_weixin').hover(function () {
	            var imgurl = $('#qrimgurl_' + bs ).val();
	            if ($('#qrcode_' + bs + '_infobox img').attr("src") == "") {
	                $.get(domain + "/qr/image/" + imgurl, function (data) {
	                    $('#qrcode_' + bs + '_infobox img').attr("src", data.content);
	                    $('#qrcode_' + bs + '_loading').addClass('hide');
	                    $('#qrcode_' + bs + '_infobox').removeClass('hide');
	                }, 'json');
	            }
	            $('#qrcode_' + bs + '_box').css('display', 'block');
	        }, function () {
	            $('#qrcode_' + bs + '_box').css('display', 'none');
	        });
	    }
	    shareSnsIcon('s',31);
		shareSnsIcon('bn',31);
	    function loadWxqrc(bs, bt) {
	        var imgurl = $('#qrimgurl_' + bs).val();
	        if ($('#qrcode_' + bs + '_infobox img').attr("src") == "") {
	            $.get(domain + "/qr/image/" + imgurl, function (data) {
	                $('#qrcode_' + bs + '_infobox img').attr("src", data.content);
	                $('#qrcode_' + bs + '_loading').addClass('hide');
	            }, 'json');
	        }
	    }
	    loadWxqrc('b', 36);
	},
	intro: function(){
		$('.award_intro_con_open,.award_intro_con_close').click(function(){
			$(this).parent().addClass('hide').siblings().removeClass('hide')
		})
	},
	chooseYear: function(){
		$(document).click(function(e){
			if(e.target.className != 'main_year' && e.target.className !='main_year_title'){
				if($('.prize_pro_years,.prize_company_years').hasClass('open')){				
					$('.prize_pro_years,.prize_company_years').removeClass('open');
					$('.prize_pro_all_years,.prize_company_all_years').slideUp(100);
					$('.prize_pro_years .awards_d_icon,.prize_company_years .awards_d_icon').removeClass('awards_d_icon_arrowup')
					return false;
				}
			}
		})
		$('.prize_pro_years .main_year_title').click(function(){
			if($(this).parent().hasClass('open')){
				$('.prize_pro_all_years').slideUp(100);
				$('.prize_pro_years').removeClass('open');
				$('.prize_pro_years .awards_d_icon').removeClass('awards_d_icon_arrowup')
			}else{
				$('.prize_pro_all_years').slideDown(100);
				$('.prize_pro_years').addClass('open');
				$('.prize_pro_years .awards_d_icon').addClass('awards_d_icon_arrowup')
			}
		})
		$('.prize_company_years .main_year_title').click(function(){
			if($(this).parent().hasClass('open')){
				$('.prize_company_all_years').slideUp(100);
				$('.prize_company_years').removeClass('open');
				$('.prize_company_years .awards_d_icon').removeClass('awards_d_icon_arrowup')
			}else{
				$('.prize_company_all_years').slideDown(100);
				$('.prize_company_years').addClass('open');
				$('.prize_company_years .awards_d_icon').addClass('awards_d_icon_arrowup')
			}
		})
		//鐐瑰嚮骞翠唤
		$('.prize_pro_years .prize_pro_all_years').on('click','span',function(){
			$('.prize_pro_years').removeClass('open');
			$('.prize_pro_years .main_year').html($(this).html());
			$('.prize_pro_years .prize_pro_all_years').slideUp(100);
			$('.prize_pro_years .awards_d_icon').removeClass('awards_d_icon_arrowup');
			$(this).addClass('active').siblings().removeClass('active')
			var year  = $(this).html();
			var level = $('#awards_levels li.active').attr("value");
			awards.getProjects(1,year,level);
		});
		$('.prize_company_years .prize_company_all_years').on('click','span',function(){
			$('.prize_company_years').removeClass('open');
			$('.prize_company_years .main_year').html($(this).html());
			$('.prize_company_years .prize_company_all_years').slideUp(100);
			$('.prize_company_years .awards_d_icon').removeClass('awards_d_icon_arrowup');
			$(this).addClass('active').siblings().removeClass('active');
			var year  = $(this).html();
			awards.getCompany(1,year);
		});
	},
	moreAwards: function(){
		$('.prize_pro_con_detail .more').live("click",function(){
			var conId  = $(this).find("input").val();
			if($(this).children("i").hasClass('awards_d_icon_arrowdown')){
				$(this).parent('.prize_pro_con_detail').find('.awards_d_icon').addClass('awards_d_icon_arrowup').removeClass('awards_d_icon_arrowdown');
				var level  = $('#awards_levels .active').attr('value');
				var year   = parseInt($('#awards_years .active').text());
				if($(".prize_pro_con_more.conId_"+conId).html()==""){
					console.log(conId,year,level)
					awards.getProjectsAwards(conId,year,level);
				}else{
					$(".prize_pro_con_more.conId_"+conId).removeClass('hide')
				}
			}else{
				$(this).parent('.prize_pro_con_detail').find('.awards_d_icon').removeClass('awards_d_icon_arrowup').addClass('awards_d_icon_arrowdown');
				$(".prize_pro_con_more.conId_"+conId).addClass('hide');
			}
		})
	},
	chooseLevel: function(){
		$('#awards_levels li').click(function(){
			$('#awards_levels li').removeClass("active");
			$(this).addClass("active");
			var level  = $(this).attr("value")
			var year   = $('#awards_years .active').text();
			awards.getProjects(1,year,level);
		});
	},
	getMoreProjects: function(){
		$('#get_projects').click(function(){
			var page   = $("#get_projects .more_link").attr('data-page');
			var level  = $('#awards_levels .active').attr('value');
			var year   = parseInt($('#awards_years .active').text());
			awards.getProjects(page,year,level);
		});
	},
	getMoreArticles: function(){
		$('#get_articles').click(function(){
			var page   = $("#get_articles .more_link").attr('data-page');
			var id     = $("#company_id").val();
			$('#get_articles .more_link').text("鍔犺浇涓�...");
			var data = {id:id,page:page};
			$.post(domain+"/api/getAwardsArticles",data,function(data){
				switch(data.isSuccess){
					case 1:
						$('#get_articles .more_link').text("鍔犺浇鏇村");
						$.each(data.content,function(i,articles){
							$('<li><a href="'+domain+'/articles/'+articles.articleId+'.html" target="_blank" title="'+articles.articleId+'"><img class="f_l" width="140" height="87" src="'+articles.cover+'"/><div class="award_news_detail"><p>'+articles.title+'</p></div></a></li>').appendTo($("#articles_list")).fadeIn("slow");
						});
						if(data.totalpage>1){
							$('#get_articles').removeClass("hide");
							var nextPage = parseInt(page)+1;
							if(data.totalpage>=nextPage){$("#get_articles .more_link").attr('data-page',nextPage);}else{$('#get_articles').addClass("hide");}
						}
					break;
				}
			},"json");
		});
	},
	getMoreCompany: function(){
		$('#get_companies').click(function(){
			var page   = $("#get_companies .more_link").attr('data-page');
			var year   = parseInt($('#awards_com_years .active').text());
			awards.getCompany(page,year);
		});
	},
	getCompany: function(page,year){
		id       = $('#awards_id').val();
		page     = page?parseInt(page):1;
		year     = year?parseInt(year):0;
		$('#get_companies').addClass("hide");
		$('.prize_company_con .no_datas').addClass("hide");
		$('.prize_company_con .loading').removeClass("hide");
		if(page == 1 ){$('#company_list').empty();}
		var data = {id:id,year:year,page:page};
		$.post(domain+"/api/getAwardscompany",data,function(data){
			switch(data.isSuccess){
				case 1:
					$.each(data.content,function(i,company){
						$('<li><a target="_blank" href="'+domain+'/company/'+company.userId+'"><img src="'+company.userAvatar+'" alt="'+company.userNickname+'" title="'+company.userNickname+'"/><div class="pd_t_25"><p class="fz_16 color_666 one_line ov_h" title="'+company.userNickname+'">'+company.userNickname+'</p><p class="fw_b color_999 pd_t_5 one_line ov_h" title="'+company.awardsLevel+'"><span class="mg_r_10">'+company.years+'</span>'+company.awardsLevel+'</p></div></a></li>').appendTo($("#company_list")).fadeIn("slow");
					});
					if(data.totalpage > 1){
						$('#get_companies').removeClass("hide");
						var nextPage = parseInt(page)+1;
						if(data.totalpage>=nextPage){$("#get_companies .more_link").attr('data-page',nextPage);}else{$('#get_companies').addClass("hide");}
					}
					$('.prize_company_con .loading').addClass("hide");
				break;
				case 0:
					$('.prize_company_con .loading').addClass("hide");
					$('.prize_company_con .no_datas').removeClass("hide");
				break;
			}
		},"json");
	},
	getMorePeople: function(){
		$('#get_people').click(function(){
			var page   = $("#get_people .more_link").attr('data-page');
			var id     = $("#awards_id").val();
			$('#get_people .more_link').text("鍔犺浇涓�...");
			var data = {id:id,page:page};
			$.post(domain+"/api/getAwardsPeople",data,function(data){
				switch(data.isSuccess){
					case 1:
						$('#get_people .more_link').text("鍔犺浇鏇村");
						$.each(data.content,function(i,people){
							$('<li><a target="_blank" href="'+domain+'/people/'+people.userId+'"><img src="'+people.userAvatar+'"/><p class="fw_b color_666 fz_16 pd_t_20">'+people.userNickname+'</p><p class="color_666 fz_12 pd_t_5 line_24"><span class="mg_r_5">'+people.years+'</span>'+people.awardsLevel+'</p></a></li>').appendTo($("#people_list")).fadeIn("slow");
						});
						if(data.totalpage>1){
							var nextPage = parseInt(page)+1;
							if(data.totalpage>=nextPage){$("#get_people .more_link").attr('data-page',nextPage);}else{$('#get_people').addClass("hide");}
						}
					break;
				}
			},"json");
		});
	},
	getMoreTotalProjects: function(){
		$('#get_projects').click(function(){
			var page   = $("#get_projects .more_link").attr('data-page');
			awards.getTotalProjects(page);
		});
	},
	getTotalProjects:function(page){
		page     = page?parseInt(page):1;
		$('#get_projects').addClass("hide");
		$('.no_datas').addClass("hide");
		$('.prize_pro_con .loading').removeClass("hide");
		if(page == 1 ){$('#projects_list').empty();}
		$.get(domain+"/api/getAwardsTotalProjects/p/"+page, function(data){
			console.log(data);
			switch(data.isSuccess){
				case 1:
					$.each(data.content,function(i,projects){
						if(projects.brandAvatar!=""){var brandHtml = '<a target="_blank" href="'+domain+'/company/'+projects.brand+'" title="'+projects.brandName+'"><img width="30" height="30" src="'+projects.brandAvatar+'"/></a>'; var more_left_a = 40;}else{var brandHtml = ""; var more_left_a = 0;}
						if(projects.agencyAvatar!=""){var agencyHtml = '<a target="_blank" href="'+domain+'/company/'+projects.agency+'" title="'+projects.agencyName+'"><img width="30" height="30" src="'+projects.agencyAvatar+'"/></a>'; var more_left_b = 40;}else{var agencyHtml = ""; var more_left_b = 0;}
						var more_left = 350-more_left_a-more_left_b;
						if(projects.awardsCounts>1){var moreAwards = '<span class="more w_'+more_left+' con_'+projects.conId+'"><i class="awards_d_icon awards_d_icon_arrowdown"><input type="hidden" value="'+projects.conId+'"></i></span>'; var moreAwardsHtml = '<input type="hidden" value="'+projects.anId+'" id="awards_id_'+projects.conId+'"><div class="prize_pro_con_more conId_'+projects.conId+' hide"></div>';}else{var moreAwards = ""; var moreAwardsHtml = '';}
						$('<li class="transition hide"><a target="_blank" href="'+domain+'/projects/'+projects.conId+'.html"><div class="p_r prize_pro_con_img"><img class="v_m" width="380" height="238" src="'+projects.cover+'"/><h6>'+projects.title+'</h6><span class="prize_pro_con_pop"></span></div></a><div class="prize_pro_con_detail">'+brandHtml+agencyHtml+'<a class="awards_icon"><img width="30" height="30" src="'+projects.icon+'" title="'+projects.awardsLevel+'"/></a><span class="color_666 fz_12" title="'+projects.category+'">'+projects.category+'</span>'+moreAwards+'</div>'+moreAwardsHtml+'</li>').appendTo($("#projects_list")).fadeIn("slow");
					});
					if(data.totalpage>1){
						$('#get_projects').removeClass("hide");
						var nextPage = parseInt(page)+1;
						if(data.totalpage>=nextPage){$("#get_projects .more_link").attr('data-page',nextPage);$('#no_more_datas').addClass("hide");}else{$('#get_projects').addClass("hide");$('#no_more_datas').removeClass("hide");}
					}
					$('.prize_pro_con .loading').addClass("hide");
				break;
				case 0:
					$('.prize_pro_con .loading').addClass("hide");
					$('prize_pro_con .no_datas').removeClass("hide");
				break;
			}
		},"json");
	},
	getProjects:function(page,year,level){
		id       = $('#awards_id').val();
		page     = page?parseInt(page):1;
		year     = year?parseInt(year):0;
		level    = level?parseInt(level):0;
		$('#get_projects').addClass("hide");
		$('.no_datas').addClass("hide");
		$('.prize_pro_con .loading').removeClass("hide");
		if(page == 1 ){$('#projects_list').empty();}
		var data = {id:id,page:page,year:year,level:level};
		$.post(domain+"/api/getAwardsProjects",data,function(data){
			console.log(data);
			switch(data.isSuccess){
				case 1:
					$.each(data.content,function(i,projects){
						if(projects.brandAvatar!=""){var brandHtml = '<a target="_blank" href="'+domain+'/company/'+projects.brand+'" title="'+projects.brandName+'"><img width="30" height="30" src="'+projects.brandAvatar+'"/></a>'; var more_left_a = 40;}else{var brandHtml = ""; var more_left_a = 0;}
						if(projects.agencyAvatar!=""){var agencyHtml = '<a target="_blank" href="'+domain+'/company/'+projects.agency+'" title="'+projects.agencyName+'"><img width="30" height="30" src="'+projects.agencyAvatar+'"/></a>'; var more_left_b = 40;}else{var agencyHtml = ""; var more_left_b = 0;}
						var more_left = 350-more_left_a-more_left_b;
						if(projects.awardsCounts>1){var moreAwards = '<span class="more w_'+more_left+' con_'+projects.conId+'"><i class="awards_d_icon awards_d_icon_arrowdown"><input type="hidden" value="'+projects.conId+'"></i></span>'; var moreAwardsHtml = '<div class="prize_pro_con_more conId_'+projects.conId+' hide"></div>';}else{var moreAwards = ""; var moreAwardsHtml = '';}
						$('<li class="transition hide"><a target="_blank" href="'+domain+'/projects/'+projects.conId+'.html"><div class="p_r prize_pro_con_img"><img class="v_m" width="380" height="238" src="'+projects.cover+'"/><h6>'+projects.title+'</h6><span class="prize_pro_con_pop"></span></div></a><div class="prize_pro_con_detail">'+brandHtml+agencyHtml+'<a class="awards_icon"><img width="30" height="30" src="'+projects.icon+'" title="'+projects.awardsLevel+'"/></a><span class="color_666 fz_12" title="'+projects.category+'">'+projects.category+'</span>'+moreAwards+'</div>'+moreAwardsHtml+'</li>').appendTo($("#projects_list")).fadeIn("slow");
					});
					if(data.totalpage>1){
						$('#get_projects').removeClass("hide");
						var nextPage = parseInt(page)+1;
						if(data.totalpage>=nextPage){$("#get_projects .more_link").attr('data-page',nextPage);$('#no_more_datas').addClass("hide");}else{$('#get_projects').addClass("hide");$('#no_more_datas').removeClass("hide");}
					}
					$('.prize_pro_con .loading').addClass("hide");
				break;
				case 0:
					$('.prize_pro_con .loading').addClass("hide");
					$('prize_pro_con .no_datas').removeClass("hide");
				break;
			}
		},"json");
	},
	getProjectsAwards:function(conId,year,level){
		id       = $('#awards_id').val()?$('#awards_id').val():$('#awards_id_'+conId).val();
		year     = year?parseInt(year):0;
		level    = level?parseInt(level):0;
		var data = {id:id,conId:conId,year:year,level:level};
		console.log(data);
		$.post(domain+"/api/getAwardsProjectsDetail",data,function(data){
			switch(data.isSuccess){
				case 1:
					$.each(data.content,function(i,projects){
						var exitCategory = $(".con_"+conId).prev(".color_666").text();
						var exitIcon = $(".con_"+conId).parent(".prize_pro_con_detail").children(".awards_icon").find("img").attr("src");;
						if(exitCategory!=projects.category||exitIcon!=projects.icon){
							if(projects.brandAvatar!=""){var brandHtml = '<a class="cur_d"><img class="hide" width="30" height="30" src="'+projects.brandAvatar+'"/></a>';}else{var brandHtml = "";}
							if(projects.agencyAvatar!=""){var agencyHtml = '<a class="cur_d"><img class="hide" width="30" height="30" src="'+projects.agencyAvatar+'"/></a>';}else{var agencyHtml = "";}
							$('<div class="prize_pro_con_mdetail">'+brandHtml+agencyHtml+'<a class="awards_icon "><img width="30" height="30" src="'+projects.icon+'" title="'+projects.awardsLevel+'"/></a><span class="color_666 fz_12" title="'+projects.category+'">'+projects.category+'</span></div>').appendTo($(".conId_"+conId));
						}
					});
					if($(".prize_pro_con_more.conId_"+conId).text()!=""){
						$(".prize_pro_con_more.conId_"+conId).removeClass('hide')
					}else{
						$(".prize_pro_con_detail .more.con_"+conId).addClass('hide')
					}
				break;
			}
		},"json");
	},
	faqQuestions:function(){
		//FAQ question
		$('.faq_questions h5').click(function(){
			if($(this).siblings('p').hasClass('hide')){
				//濡傛灉闇€瑕佸綋鍓嶉」灞曞紑鍏朵粬椤规姌鍙狅紝閭ｄ箞涓嬮潰杩欏彞銆傚鏋滀笉闇€瑕侊紝鍒犻櫎姝よ鍙ュ嵆鍙�
				//$('.faq_questions li p').addClass('hide');
				//$('.faq_questions li .faq_arrow_bottom').removeClass('faq_arrow_top');
				$(this).siblings('p').removeClass('hide');
				$(this).find('.faq_arrow_bottom').addClass('faq_arrow_top');
			}else{				
				$(this).siblings('p').addClass('hide');
				$(this).find('.faq_arrow_bottom').removeClass('faq_arrow_top');
			}
		})
	},
	timmer:function(){
		var time_end=$("#timmer input").val();
        var con=$("#timmer").find("span");
        countDown(con,{time_end:time_end})
	}
}
var login = {    
    inputPanelPopup: function () {
        popupError('.registe_box .register_panel');
        vmholderpopup();
    },
	switchPopTab: function() {
		var succHtml = '<p class="pd_t_55 mg_b_20"><i class="new_icon success_icon"></i></p><p>鎵爜鎴愬姛</p>',
			loadHtml = '<div class="pd_t_55 pd_l_55"><div class="loader"></div></div>',
			logHtml = '<div class="pd_t_55 pd_l_55"><div class="loader"></div></div><p class="pd_t_15">姝ｅ湪鐧婚檰涓�</p>',
			errHtml = '<p class="pd_t_55 mg_b_20"><i class="new_icon warn_icon"></i></p><p>鍑洪敊浜嗭紒閲嶆柊鎵弿</p>';
		$('#switch_tab').live('click',function() {
			var $mqrState = $('#popupLayer_popup_login_user .mqr_state'),
				$mqrInfo = $('#popupLayer_popup_login_user .mqr_state .mqr_info');
			if ($(this).hasClass('act')) {
				$(this).removeClass('act').attr('title','鏁拌嫳App鎵爜鐧诲綍');
				$(this).next('.login_main').children('.tab_main').eq(0).removeClass('hide');
				$(this).next('.login_main').children('.tab_main').eq(1).addClass('hide');
				$('.use_qr').fadeOut();
			} else {
				if ($('#qr_login_image').attr("src") == "") {
					var imgurl = $('#qrimgurl_s').val();
					$.get(domain + "/qr/login/" + imgurl,function(data) {
						$('#popupLayer_popup_login_user .mqr_image_box').removeClass('hide');
						$('#qr_login_image').attr("src", data.content);
						$mqrState.addClass('hide');
						var socket = io('https://chat.digitaling.com');
						var conect = false;
						socket.on('connect',function() {
							socket.emit('login', data.unionId)
						});
						socket.on('new_msg',function(msg) {
							msg = eval('(' + msg + ')');
							var mId = msg.mId;
							if (mId == 1) {
								if ($mqrState.hasClass('hide')) {$mqrState.removeClass('hide')}
								$mqrInfo.empty().html(succHtml);
							} else if (mId == 2) {
								if ($mqrState.hasClass('hide')) {$mqrState.removeClass('hide')}
								$mqrInfo.empty().html(errHtml);
							} else if (mId == 3) {
								data = {datas: {unionId: msg.content}};
								$.post(domain + "/api/socketQRLogin", data, function(data) {
									if (data.isSuccess == 1) {
										if ($mqrState.hasClass('hide')) {$mqrState.removeClass('hide')}
										$mqrInfo.empty().html(logHtml);
                                        setTimeout(function(){location.href = data.goUrl;},100);
									} else {
										if ($mqrState.hasClass('hide')) {$mqrState.removeClass('hide')}
										$mqrInfo.empty().html(errHtml);
									}
								},'json')
							} else if (mId == 4) {
								if ($mqrState.hasClass('hide')) {$mqrState.removeClass('hide')}
								$mqrInfo.empty().html(errHtml);
							} else {
								location.href = reload();
							}
						})
					},'json')
				}
				$(this).addClass('act').attr('title','璐︽埛瀵嗙爜鐧诲綍');
				$(this).next('.login_main').children('.tab_main').eq(0).addClass('hide');
				$(this).next('.login_main').children('.tab_main').eq(1).removeClass('hide');
				$('#popupLayer_popup_login_user .use_qr').fadeIn();
				setTimeout(function() {
					$('#popupLayer_popup_login_user .use_qr').fadeOut();
				},4000)
			}
		});
		$('#sw_front').live('click',function () {
            if($('#switch_tab').hasClass('act')){
                $('#switch_tab').removeClass('act');
                $(this).parents('.tab_main').addClass('hide');
                $(this).parents('.tab_main').prev('.tab_main').removeClass('hide');
            }
        })
	}
};
function vmholderpopup() {
	var vm_input = $('.vm_placeholder input');
	if (vm_input.val() == "") {
	    vm_input.parent().children('label').show();
	} else {
	    vm_input.parent().children('label').hide();
	}
	vm_input.live('focus', function () {
	    $(this).addClass('keypress');
	});
	vm_input.live('blur', function () {
	    $(this).removeClass('keypress');
	});
	vm_input.live('keydown', function () {
	    var vm_label = $(this).parent().children('label');
	    var vm_input_val = $(this).val();
	    $(this).addClass('keypress');
	    vm_label.hide();
	    if (vm_input_val == "") {
	        vm_label.show();
	    } else {
	        vm_label.hide();
	    }
	});
	vm_input.live('keyup', function () {
	    var vm_label = $(this).parent().children('label');
	    var vm_input_val = $(this).val();
	    //$(this).removeClass('keypress');
	    vm_label.hide();
	    if (vm_input_val == "") {
            vm_label.show();
        } else {
            vm_label.hide();
        }
    });
};
function popupError(panel, bools) {
    $(panel).live('each', function () {
	    var _this = $(this);
	    if (_this.hasClass('error_panel')) {
	        _this.find('.yellow_popup_box').show();
	    }
	    _this.find('input').live('focus', function () {
	        $(this).parents(panel).find('.yellow_popup_box').hide();
	    });
	});
	$('.yellow_popup_box a.del_artli_btn').live('click', function () {
	    var _this = $(this);
	    _this.parents('.yellow_popup_box').hide();
	});
};
//鐧诲綍
var sign = {
    popupLogin: function () {
        this.popupUser();
        $("#personal_login_user input").live('keypress', function (e) {
            e = e || window.event;
            var keyCode = e.which || e.keyCode;
            if (keyCode == 13) {
                if ($('#login_mail_phone').val()&&$('#login_password_user').val()) {
                    userLogin(1);
                }
            }
        });
    },
	popupUser: function () {
	    $("#login_mail_phone").live('focusout', function () {
	        if($(this).val() == ''){
				$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
				$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("鎵嬫満/閭涓嶈兘涓虹┖");
			}else{
				var myreg      = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,8}$/;
				var myregPhone = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[5-6]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
				if(myreg.test($(this).val())){
					var data = {email:$(this).val()};
					if(!$("#login_mail_phone").parents(".register_panel").hasClass("right_panel")){//濡傛灉楠岃瘉姝ｇ‘鐨勯偖绠卞垯涓嶄細鍐嶆璇锋眰鎺ュ彛
						$.post(domain+"/api/checkEmail/userType/user",data,function(data){
							if(data.isSuccess == 0){
								$("#login_mail_phone").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
								$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").hide();
								if (data.userBlock == 0) {
									$("#login_mail_phone").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
									$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").hide();
								}else{
									$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
									$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("璇ヨ处鎴峰凡琚喕缁撲簡");
								}
							}else{
								$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
								$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("璇ヨ处鎴蜂笉瀛樺湪");
							}
						},'json');
					}
				}else if(myregPhone.test($(this).val())){
					var data = {usermobile:$(this).val()};
					if(!$(this).parents(".register_panel").hasClass("right_panel")){
						$.post(domain+"/api/checkPhone/userType/user",data,function(data){
							if(data.isSuccess == 0){
								$("#login_mail_phone").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
								$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").hide();
								if (data.userBlock == "0") {
									if (data.mobAct == "1") {
										$("#login_mail_phone").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
										$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").hide();
									}else{
										$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
										$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("鏈粦瀹氭墜鏈虹櫥褰�");
									}
								}else{
									$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
									$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("璇ヨ处鎴峰凡琚喕缁撲簡");
								}
							}else{
								$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
								$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("璇ヨ处鎴蜂笉瀛樺湪");
							}
						},'json');
					}
				}else{
					$(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
					$(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("鎵嬫満/閭鏍煎紡涓嶆纭�");
				}
			}
	    });
	    $("#login_password_user").live('focusout', function () {
	        if ($(this).val() == '') {
	            $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	            $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("瀵嗙爜涓嶈兘涓虹┖");
	        } else {
	            if ($(this).val().length >= 21 || $(this).val().length <= 5) {
	                $(this).parents(".register_panel").removeClass("right_panel").addClass("error_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("瀵嗙爜闀垮害涓嶇鍚堣姹�");
	            } else {
	                $(this).parents(".register_panel").removeClass("error_panel").addClass("right_panel");
	                $(this).parents(".register_panel").find(".yellow_popup_box").hide();
	            }
	        }
	    });
	    //click login
	    $("#user_login_user .login_btn").live('click', function () {
	        userLogin(1);
	    });
	}//end personal login

}
//涓汉鐢ㄦ埛涓撶敤
function userLogin(index) {
	if($("#login_mail_phone").val() == ''){
		$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
		$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("鎵嬫満/閭涓嶈兘涓虹┖");
	}else{
		var myreg      = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,8}$/;
		var myregPhone = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[5-6]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
		if(myreg.test($("#login_mail_phone").val())){
			var data = {email:$("#login_mail_phone").val()};
			var usernameType = 1;
			if(!$("#login_mail_phone").parents(".register_panel").hasClass("right_panel")){//濡傛灉楠岃瘉姝ｇ‘鐨勯偖绠卞垯涓嶄細鍐嶆璇锋眰鎺ュ彛
				$.post(domain+"/api/checkEmail/userType/user",data,function(data){
					if(data.isSuccess == 0){
						$("#login_mail_phone").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
						$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").hide();
						if (data.userBlock == 0) {
							$("#login_mail_phone").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
							$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").hide();
						}else{
							$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
							$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("璇ヨ处鎴峰凡琚喕缁撲簡");
						}
					}else{
						$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
						$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("璇ヨ处鎴蜂笉瀛樺湪");
					}
				},'json');
			}
		}else if(myregPhone.test($("#login_mail_phone").val())){
			var data = {usermobile:$("#login_mail_phone").val()};
			var usernameType = 2;
			if(!$("#login_mail_phone").parents(".register_panel").hasClass("right_panel")){
				$.post(domain+"/api/checkPhone/userType/user",data,function(data){
					if(data.isSuccess == 0){
						$("#login_mail_phone").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
						$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").hide();
						if (data.userBlock == "0") {
							if (data.mobAct == "1") {
								$("#login_mail_phone").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
								$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").hide();
							}else{
								$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
								$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("鏈粦瀹氭墜鏈虹櫥褰�");
							}
						}else{
							$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
							$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("璇ヨ处鎴峰凡琚喕缁撲簡");
						}
					}else{
						$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
						$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("璇ヨ处鎴蜂笉瀛樺湪");
					}
				},'json');
			}
		}else{
			$("#login_mail_phone").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
			$("#login_mail_phone").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("鎵嬫満/閭鏍煎紡涓嶆纭�");
		}
	}
	//check phone and username
    if ($("#login_password_user").val() == '') {
        $("#login_password_user").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
        $("#login_password_user").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("瀵嗙爜涓嶈兘涓虹┖");
        return false;
    } else {
        if ($("#login_password_user").val().length >= 21 || $("#login_password_user").val().length <= 5) {
            $("#login_password_user").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
            $("#login_password_user").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("瀵嗙爜闀垮害涓嶇鍚堣姹傦紙6-16涓瓧绗︼級");
            return false;
        } else {
            $("#login_password_user").parents(".register_panel").removeClass("error_panel").addClass("right_panel");
            $("#login_password_user").parents(".register_panel").find(".yellow_popup_box").hide();
        }
    }//end check password

    if ($("#personal_login_user .right_panel").length == 2) {
        //change login btn
        $("#user_login_user").find(".login_btn").removeClass("login_btn").text("姝ｅ湪鐧诲綍...").addClass("login_grey_btn");
		var password = $("#login_password_user").val();
		if(usernameType == 1){
			var username     = $("#login_mail_phone").val();
			var data = {datas:{username:username,password:password},userType:"user",remmber:"true"};
		}else if(usernameType == 2){
			var mobile       = $("#login_mail_phone").val();
			var data = {datas:{usermobile:mobile,password:password},userType:"user",remmber:"true"};
		}
        $.post(domain + "/api/login", data, function (data) {
            switch (data.isSuccess) {
                case 0:
                    $("#login_password_user").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
                    $("#login_password_user").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text("瀵嗙爜閿欒锛岃閲嶆柊杈撳叆");
                    $("#user_login_user").find(".login_grey_btn").removeClass("login_grey_btn").text("鐧诲綍").addClass("login_btn");
				break;
                case 1:
                    if (index == 0) {
                        location.href = domain;
                    } else if (index == 1) {
						location.reload();
                    }
				break;
                case 2:
                    $("#login_password_user").parents(".register_panel").removeClass("right_panel").addClass("error_panel");
                    $("#login_password_user").parents(".register_panel").find(".yellow_popup_box").show().find(".red_text").text(data.content);
                    $("#user_login_user").find(".login_grey_btn").removeClass("login_grey_btn").text("鐧诲綍").addClass("login_btn");
				break;
            }
        }, "json");
    }
}

var feature = {
	init : function(){
		awards.wxqrc();
		feature.wxqrc();
		feature.change();
		feature.chooseYear();
		feature.getMoreFeatures();
	},
	wxqrc : function(){
		$('.contact_wechat').hover(function () {
	        if ($(this).next('.contact_wx').hasClass('hide')) {
	            $(this).next('.contact_wx').removeClass('hide');
	        }
	    }, function () {
	        $(this).next('.contact_wx').addClass('hide');
	    });
	    $('.contact_wx').hover(function () {
	        $(this).removeClass('hide');
	    }, function () {
	        $(this).addClass('hide');
	    });
	},
	change : function(){
		$('#change_feature,.feature_change .menu_feature').hover(function(){
			$('.feature_change .menu_feature').removeClass("hide");
		},function(){
			$('.feature_change .menu_feature').addClass("hide");
		})
	},
	chooseYear: function(){
		$('#feature_years li').click(function(){
			$('#feature_years li').removeClass("active");
			$(this).addClass("active");
			var year  = $(this).attr("value")
			feature.getFeatures(1,year);
		});
	},
	getFeatures:function(page,year){
		fid      = $('#feature_id').val();
		page     = page?parseInt(page):1;
		year     = year?parseInt(year):0;
		$('#get_features').addClass("hide");
		$('.no_datas').addClass("hide");
		$('.feature_lists .loading').removeClass("hide");
		if(page == 1 ){$('#feature_list').empty();}
		var data = {cid:fid,page:page,year:year};
		$.post(domain+"/api/getFeatures",data,function(data){
			switch(data.isSuccess){
				case 1:
					$.each(data.content,function(i,contents){
						if(contents.userType == 1){var userUrl = domain+'/people/'+contents.publisher;}else{var userUrl = domain+'/company/'+contents.publisher;}
						if(contents.pubAvatar !=""){var userHtml = '<a target="_blank" href="'+userUrl+'" class="mg_r_10"><img src="'+contents.pubAvatar+'" width="25" class="round v_m bd_e0" title="'+contents.pubName+'"></a>'}else{var userHtml = '';}
						if(contents.zan == 0){contents.zan = "";}
						if(contents.collectCount > 0){contents.collectCount = '<span class="color_666 inline_bk mg_r_20"><i class="icon gbs_coll mg_r_5" title="鏀惰棌"></i><em class="v_m">'+contents.collectCount+'</em></span>';}else{contents.collectCount = "";}
						if(contents.commentCount > 0){contents.commentCount = '<span class="color_666 inline_bk"><i class="icon gbs_com mg_r_5" title="璇勮"></i><em class="v_m">'+contents.commentCount+'</em></span>';}else{contents.commentCount = "";}
						if((i+1)%3!=0){var mg_r = "mg_r_20";}else{var mg_r = "";}
						$('<li class="transition feature_iteam '+mg_r+'"><div class="feature_pic"><a href="'+domain+'/articles/'+ contents.articleId+'.html" target="_blank"><img src="'+contents.cover+'" width="380" height="238"></a></div><div class="feature_bd"><h3 class="feature_title" title="'+contents.title+'"><a href="'+domain+'/articles/'+ contents.articleId+'.html" target="_blank">'+subString(contents.title, 150)+'</a></h3><div class="clearfix feature_counts"><span class="f_l">'+userHtml+'<label class="v_m color_999">'+getLocalTime(contents.publishTime,0)+'</label></span><span class="f_r"><span class="color_666 inline_bk mg_r_20"><i class="icon gbs_fav mg_r_5" title="璧�"></i><em class="v_m">'+contents.zan+'</em></span>'+contents.collectCount+contents.commentCount+'</span></div></div></li>').appendTo($("#feature_list")).fadeIn("slow");
					});
					if(data.totalpage>1){
						$('#get_features').removeClass("hide");
						var nextPage = parseInt(page)+1;
						if(data.totalpage>=nextPage){$("#get_features .more_link").attr('data-page',nextPage);}else{$('#get_features').addClass("hide");}
					}
					$('.feature_lists .loading').addClass("hide");
				break;
				case 0:
					$('.feature_lists .loading').addClass("hide");
					$('.feature_lists .no_datas').removeClass("hide");
				break;
			}
		},"json");
	},
	getMoreFeatures: function(){
		$('#get_features').click(function(){
			var page   = $("#get_features .more_link").attr('data-page');
			var year  = parseInt($('#feature_years .active').attr('value'));
			feature.getFeatures(page,year);
		});
	}
}


var dindex = {
	dataModal : {
		classifyH : $('.classify').height(),//宸﹁竟鍒嗙被鐨勫疄闄呴珮搴�
	},
	init : function(){
		this.bindEvent();
		awards.wxqrc();
		datas.moreDindex();
		datas.searchDindex();
	},
	bindEvent : function(){
		var _this = this;
		var id_top=$('#indexDatas').offset().top-110;
		//闅旇鍙樿壊
		$('.table dl dd:odd').css('background','#faf8f8');
		//浼佷笟绫诲埆閫夋嫨銆乭over鏁堟灉
		$('.classify ul li').on('click',function(){
			if(!$(this).hasClass('current')){
				if($(window).scrollTop()>id_top){
					$('html,body').animate({ scrollTop: id_top+1 }, 100);
				}
				$('.classify ul li.current').removeClass('current');
				$('.classify ul li .current_bg').length == 0 ?"":$('.classify ul li .current_bg').remove();
				$(this).addClass('current');
				$(this).append('<i class="current_bg"></i>');
				$(this).children('.current_bg').stop().animate({"top":0},260);
				$('.classify .all').removeClass('act');
				$("#keywords").val('');
				vmholderpopup();
				var dataUri = $(this).attr('data-uri');
				datas.getDindex(dataUri);
			}
		})
		$('.classify .all').on('click',function(){
			$('.classify ul li.current').removeClass('current');
			$('.classify ul li .current_bg').length == 0 ?"":$('.classify ul li .current_bg').remove();
			$('.classify .all').addClass('act');
			$("#keywords").val('');
			vmholderpopup();
			var dataUri = $(this).attr('data-uri');
			datas.getDindex(dataUri);
		})
		$('.classify ul li').hover(function(){
			//鍦ㄦ病鏈夎閫変腑鐨勫厓绱犱笂鎵嶄細鍑虹幇Hover鏁堟灉
			if(!$(this).hasClass('current')){
				$(this).append('<i class="hoverbg"></i>');
				$(this).children('.hoverbg').stop().animate({"left":0},260);
			}				
		},function(){
			if($(this).children('.hoverbg')){
				$(this).children('.hoverbg').remove();
			}
		})
		//婊氬姩鎮诞鏁堟灉
		$(window).scroll(function(){
			var classfiyHeight = $(window).height()-50;
			if($(window).scrollTop()>id_top){
				$('.search').addClass('fixed');
				$('.search .bg').removeClass('alpha_80');
				if($(window).width()<1200){
					$('.table dl dt').addClass('fixed').css("left",160-$(window).scrollLeft());
				}else{
					$('.table dl dt').addClass('fixed');
				}
				$('.classify').addClass('fixed').height(classfiyHeight);
				$('.classify_in').height(classfiyHeight);
			}else{
				$('.search').removeClass('fixed');
				$('.search .bg').addClass('alpha_80');
				$('.table dl dt').removeClass('fixed');
				$('.classify').removeClass('fixed').height('auto');
				$('.classify_in').height('auto');
			}
			var less=$(".footer").offset().top-$(window).scrollTop();
			if(less<$(window).height()){
				var classifyH = $('.content').height()> _this.dataModal.classifyH ? $('.content').height():_this.dataModal.classifyH;
				$('.classify').removeClass('fixed').height(classifyH-50);
				$('.classify_in').height(classifyH);
			}
		})
		
	}
}
//joe add get datas information
/*鑾峰彇瀵硅薄閿€�*/
function findObjKeyVal(obj, val) {
	var array = Object.keys(obj);
	for(var item in array){
		if(array[item].indexOf(val)!=-1&&obj[array[item]]!=""&&obj[array[item]]!=null&&obj[array[item]]!=0){
			return array[item];
		}
	}
}
/*鑾峰彇褰撳墠鏃ユ湡寮€濮嬫椂闂� 绮剧‘濂界鍑屾櫒 00锛�00锛�00*/
function getDateStartTimestamp(){
	return new Date().setHours(0,0,0,0) / 1000;
}
var datas = {
	getDindex:function(uri,page){
		var kw = $('#keywords').val(),
			userType = $("#userType").val(),
			loginUserId = $("#loginUserId").val(),
			dindexType = parseInt($("#dindexType").val())?parseInt($("#dindexType").val()):1;
		page = page?parseInt(page):1;
		if(dindexType==1){var dType = 'getDindex';}else{var dType = 'getBrandsDindex';}
		if(kw==""){
			var getUrl = domain+'/api/'+dType+uri+'/p/'+page;
		}else{
			if(uri==""){
				var getUrl = domain+'/api/'+dType+uri+'/p/'+page+'?kw='+kw;
			}else{
				var getUrl = domain+'/api/'+dType+uri+'/p/'+page;
			}
		}
		if(page==1){
			$("#indexDatas .indexCons").empty();
			$("#indexDatas .loading").removeClass('hide');
			$("#load_more .no_datas").addClass('hide');
			$("#load_more .grey_btn").css('display','none');
		}else{
			$("#load_more .grey_btn").css('display','none');
			$("#load_more .loading").removeClass('hide');
		}
		//鑾峰彇鏈湴
		var zanData = datas.getStoreItem(loginUserId),
			zanArr = JSON.parse(zanData);

		$.get(getUrl,function(data){
			if(data.isSuccess==1){
				$.each(data.content,function(i,dindex){
					var companyLogo = eval('('+dindex.logo +')');
					if(kw==""||uri!=""){var rank = (page-1)*100+i+1;}else{var rank = dindex.rownum;}
					var proQualityIndex = Math.round(dindex.proQualityIndex*10)/10;
					var proviewCountIndex = Math.round(dindex.proviewCountIndex*10)/10;
					var artVolumeIndex = Math.round(dindex.artVolumeIndex*10)/10;
					if(proQualityIndex>100){proQualityIndex=100;}
					if(proviewCountIndex>100){proviewCountIndex=100;}
					if(artVolumeIndex>100){artVolumeIndex=100;}
					if(rank<4){ var rankHtml = 'top';}else{ var rankHtml = '';}
					if(i%2==0){var bgHtml = '';}else{var bgHtml = ' class="bg_f8"';}					
					var zanHtml = '',
						zanCountHtml = dindex.zanCount;
					if(zanData){
						if(zanArr.indexOf(parseInt(dindex.companyId)) != -1){
							zanHtml = ' zan_red';
							zanCountHtml = parseInt(dindex.zanCount) + 1;
						}
					}
					var changeRank = dindex.prank-rank;
					if(changeRank>0){ var changeHtml = '<span class="change up"><em></em> '+Math.abs(changeRank)+'</span>';}
					if(changeRank==0){ var changeHtml = '<span class="change right"><em></em></span>';}
					if(changeRank<0){ var changeHtml = '<span class="change down"><em></em> '+Math.abs(changeRank)+'</span>';}
					$('<dd id="company_'+dindex.companyId+'" '+bgHtml+'><div class="daoy_company"><span class="rank '+rankHtml+'">'+rank+'</span><a href="'+domain+'/company/'+dindex.companyId+'" target="_blank"><img src="'+companyLogo.avatar_156+'" width="30px"/><span class="name">'+dindex.companyName+'</span></a></div><span class="project">'+dindex.proCount+'</span><span>'+dindex.countAwards+'</span><span class="quality">'+proQualityIndex+'</span><span class="collect">'+artVolumeIndex+'</span><span class="attention">'+ proviewCountIndex+'</span><span class="zan'+zanHtml+'" onClick="datas.zan('+dindex.companyId+');"><span class="zan_num">'+zanCountHtml+'</span><em></em></span><span class="dm_count">'+dindex.dIndex+'</span>'+changeHtml+'</dd>').appendTo("#indexDatas .indexCons");	
				});
			}
			if(page==1){$("#indexDatas .loading").addClass('hide');}
			$("#load_more .grey_btn").attr('total-page',data.totalpage)
			$("#load_more .grey_btn").attr('data-uri',uri)
			$("#load_more .loading").addClass('hide');
			if(data.totalpage>1){
				var nextPage = page+1;
				if(data.totalpage>=nextPage){
					$("#load_more .grey_btn").css('display','block');
					$("#load_more .grey_btn").attr('data-page',nextPage);
				}else{
					$("#load_more .grey_btn").css('display','none');
					$("#load_more .no_datas").removeClass('hide');
				}
			}else{
				$("#load_more .grey_btn").css('display','none');
				$("#load_more .no_datas").removeClass('hide');
			}
		},'json');
	},
	moreDindex:function(){
		datas.getDindex('',1,'');//鑾峰彇绗竴椤�
		$("#load_more a.grey_btn").click(function(){
			var nextPage  = $(this).attr('data-page');
			var keywords  = $(this).attr('data-kw');
			var dataUri   = $(this).attr('data-uri');
			datas.getDindex(dataUri,nextPage,keywords);
		});
	},
	searchDindex:function(){
		$("#keywords").keydown(function (e) {
			if (e.which == 13&&keywords!='') {
				$(".classify li").removeClass('current');
				$('.classify ul li .current_bg').remove()
				$(".classify .all li:first").addClass('current');
				var nextPage  = $("#load_more a.grey_btn").attr('data-page',2);
				$("#login_password_user").val("");
				datas.getDindex('',1);
			}
		});
	},
	zan:function(id){
		if(id==''){return false;}
		var userType = $("#userType").val();
		if(userType==''){
			openPopup("400", "popup_login_user");
			return false;
		}
		if(userType=='2'){
			openCloseTips('浼佷笟涓嶈兘鐐硅禐', 'color_red', '280');
			return false;
		}
		//寮瑰嚭淇℃伅
		var renderInfo = function(tp, txt){
			if(tp){
				openCloseTips(txt, 'color_green', '280');
			}else{
				openCloseTips(txt, 'color_red', '280');
			}
			if ($.browser.msie&&$.browser.version >= "9.0") {
				$('#popupLayer_popup_tips').css("z-index",10002);
				$('#popupLayerScreenLocker').css("z-index",10001);
			}
			var zanNum = $('#company_'+id+' .zan_num').text() ? parseInt($('#company_'+id+' .zan_num').text()) : 0;
			$('#company_'+id+' .zan_num').text(zanNum+1);
			$('#company_'+id+' .zan').addClass('zan_red');
		}
		//鎻愪氦鏁版嵁
		var postDataFn = function(){
			var data = {datas:{comId:id}};
			$.post(domain+"/datas/zanCompany",data,function(data){
				switch(data.isSuccess){
					case 1:
						renderInfo(1, '鐐硅禐鎴愬姛');
					break;
					case 0:
						openCloseTips('鐐硅禐澶辫触', 'color_red', '280');
					break;
					case 2:
						renderInfo(0, '鏄庡ぉ鍐嶆潵璧�');
					break;
				}
			},"json");
		}
		var isZan = $('#company_'+id+' .zan').hasClass('zan_red'),
			loginUserId = $("#loginUserId").val(),
			nowDate = getDateStartTimestamp(),
			zanStr = 'zan_'+loginUserId+'_'+nowDate,
			wls = window.localStorage,
			zanData = wls.getItem(zanStr),//鑾峰彇鏈湴
			zanArr = JSON.parse(zanData),
			historyZanKey = findObjKeyVal(wls, 'zan_'+loginUserId);
		if(!zanData&&loginUserId){wls.removeItem(historyZanKey);}//鍒犻櫎鍘嗗彶
		if(!isZan){
			if (zanData) {
				if(zanArr.indexOf(id) < 0){
					zanArr.push(id);
					var str = JSON.stringify(zanArr);
					wls.setItem(zanStr, str);
					zanArr = JSON.parse(wls.getItem(zanStr));
					postDataFn();
				}
			}else{
				var newArr = [];
				newArr.push(id);				
				var str = JSON.stringify(newArr);
				wls.setItem(zanStr, str);
				zanArr = JSON.parse(wls.getItem(zanStr));
				postDataFn();
			};
		}else{
			openCloseTips('鏄庡ぉ鍐嶆潵璧�', 'color_red', '280');
		}
	},
	getStoreItem:function(loginUserId){
		var nowDate = getDateStartTimestamp(),
			zanStr = 'zan_'+loginUserId+'_'+nowDate,
			wls = window.localStorage,
			historyZanKey = findObjKeyVal(wls, 'zan_'+loginUserId),
			nullKey = findObjKeyVal(wls, 'zan_undefined'),
			zanData = wls.getItem(zanStr);
		if(nullKey){wls.removeItem(nullKey);}//鍒犻櫎undefined
		if(!zanData&&loginUserId){wls.removeItem(historyZanKey);}//鍒犻櫎鍘嗗彶
		return zanData;
	}
}
//end get datas