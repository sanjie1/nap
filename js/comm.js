var url_api='https://oas.goldmedal.com.cn'
var url_zct='https://safety.goldmedal.com.cn'


// 将时间戳转换日期格式2020-10-06
function formatTime (time_stamp, format = 'YY-MM-DD') {
    const date = time_stamp ? new Date(Number(time_stamp)) : new Date();
    const formatObj = {
        YY: date.getFullYear(),
        MM: date.getMonth() + 1,
        DD: date.getDate(),
        hh: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
    };
    const time_str = format.replace(/(YY|MM|DD|hh|mm|ss)/g, (result, key) => {
        let value = formatObj[key];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
};

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

//GetQueryString('topen')

//code转钉钉id
function coded(coded){
	var hhhhh
	var url = url_api+'/api/ding/user-id/'+coded+''
	$.ajax({
		type: "get",
		async: false,
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		//data: JSON.stringify(data),
		url: url,
		success: function(res){
			var datas = res.data
			hhhhh = datas['userid']
		},
		error: function(res){
		},
		complete: function(res){
		}
	})
	return hhhhh
}

//列表-获取code
function code(){
	//$('.J_list_box').before('<input type="text"  id="J_hhss" value="'+11+'" />')
	dd.ready(function(){
	  dd.runtime.permission.requestAuthCode({
		 corpId: "dingf3a37a22a97041a935c2f4657eb6378f", // 企业id
		 onSuccess: function (info) {
			codet = info.code // 通过该免登授权码可以获取用户身份
			//console.log('codet---------------------------:'+codet)
			var udata=coded(codet)
			//$('#J_tab-content').before('<input type="text"  id="J_hh" value="'+codet+'" /><br />')
			//$('.J_list_box').before('<input type="text"  id="J_hhss" value="'+udata+'" readonly /><br />')

			$('#J_tab-content').before('<input type="text"  id="J_ding" value="'+udata+'" readonly hidden />')
			cgy_ys(udata)
			//var cookie_uid=$.fn.cookie('cookie_uid')
//			if(cookie_uid==null){
//				//var udata=coded(codet)
//				$.fn.cookie('cookie_uid',udata,{ expires :999, path:'/' });
//				console.log('第一次登录时----------'+udata)
//				$('#J_tab-content').before('<input type="text"  id="J_ding" value="'+udata+'" readonly  />')
//			}else{
//				console.log('第二次登录时----------'+cookie_uid)
//				$('#J_tab-content').before('<input type="text"  id="J_ding" value="'+cookie_uid+'" readonly  />')
//			}
		 }
	  })
	})
}


function DDsaoMa(){
	dd.ready(function() {
		dd.biz.util.scan({
			type: 'all' , // type 为 all、qrCode、barCode，默认是all。
			onSuccess: function(data) {


				//onSuccess将在扫码成功之后回调
				/* data结构
				 { 'text': String}
				 */
				return data
			},
			onFail : function(err) {
			}
		})
	});
}

$.fn.scrollTo =function(options){
	var defaults = {
		toT : 0,    //滚动目标位置
		durTime : 300,  //过渡动画时间
		delay : 30,     //定时器时间
		callback:null   //回调函数
	};
	var opts = $.extend(defaults,options),
		timer = null,
		_this = this,
		curTop = _this.scrollTop(),//滚动条当前的位置
		subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
		index = 0,
		dur = Math.round(opts.durTime / opts.delay),
		smoothScroll = function(t){
			index++;
			var per = Math.round(subTop/dur);
			if(index >= dur){
				_this.scrollTop(t);
				window.clearInterval(timer);
				if(opts.callback && typeof opts.callback == 'function'){
					opts.callback();
				}
				return;
			}else{
				_this.scrollTop(curTop + index*per);
			}
		};
	timer = window.setInterval(function(){
		smoothScroll(opts.toT);
	}, opts.delay);
	return _this;
};
