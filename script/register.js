// 时间
function date() {
    var currYear = (new Date()).getFullYear();
    var month = (new Date().getMonth() + 1);
    $('.time').mobiscroll().date({
        theme: 'ios',
        lang: 'zh',
        display: 'bottom',
        dateFormat: 'yyyy-mm-dd',
        dateOrder: 'yy-mm-dd',
        showNow: true,
        nowText: "今天",
        showNow: true,
        height:30,
        monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        defaultValue: new Date(new Date().setFullYear(currYear-20)),
        max: new Date(new Date().setFullYear(currYear)),
        min: new Date(new Date().setFullYear(currYear - 120))
    });
    //设置显示时间默认值
    // $(".time").val(currYear + '-' + (month < 10 ? "0" + month : month)); 
}
//验证码倒计时
var getCode = $('.code');
var wait = 60;

function loop() {
    wait--;
    if (wait === 0) {
        $('.code').attr("href", "javascript:getcode()");
        $('.code').html("获取验证码");
        wait = 60;
    } else {
        $('.code').attr("href", "javascript:void(0)");
        $('.code').html("倒计时" + wait+"秒");
        setTimeout(function() {
            loop();
        }, 1000);
    }
}
//发送验证码
function getcode() {
    var code = 1;
    if (code == "1") {
        loop();
        // console.log("发送成功");
    } else {
        // console.log("发送失败");
    }
}
// 优惠券
function coupon() {
    $(".coupon").html("外卖寿司8拼会员优惠券");
    $(".time").click(function() {
        var tit = '<p class="tit">请选择出生日期</p>';
        $(".mbsc-fr-btn-cont").append(tit);
    });
}

//选择门店
function store() {
	//点击input输入法不弹出
	$(".register_box .store-input").attr("readonly","readonly");
	$(".register_box .store-input").on("click",function(){
		var nameVal = $(".register_box .name").val(),
			radioVal = $('.register_box input[type="radio"]:checked').index(),
			birthdayVal = $(".register_box .birthday").val(),
			phoneVal = $(".register_box .telephone").val(),
			checkCodeVal = $(".register_box .checkCode").val();
		window.location.href = "select-store.html";
		sessionStorage.setItem("name",nameVal);
		sessionStorage.setItem("radio",radioVal);
		sessionStorage.setItem("birthday",birthdayVal);
		sessionStorage.setItem("telephone",phoneVal);
		sessionStorage.setItem("checkCode",checkCodeVal);
	});
	var storeName = sessionStorage.getItem("storeVal"),
		nameVal = sessionStorage.getItem("name"),
		radioVal = sessionStorage.getItem("radio"),
		birthdayVal = sessionStorage.getItem("birthday"),
		phoneVal = sessionStorage.getItem("telephone"),
		checkCodeVal = sessionStorage.getItem("checkCode");
	if(storeName) {
		$(".register_box .store-input").val(storeName);
		$(".register_box .name").val(nameVal);
		$('.register_box input[type="radio"]').eq(radioVal-1).attr("checked","true");
		$(".register_box .birthday").val(birthdayVal);
		$(".register_box .telephone").val(phoneVal);
		$(".register_box .checkCode").val(checkCodeVal);
		sessionStorage.setItem("storeVal","");
		sessionStorage.setItem("name","");
		sessionStorage.setItem("radio","");
		sessionStorage.setItem("birthday","");
		sessionStorage.setItem("telephone","");
		sessionStorage.setItem("checkCode","");
	}
}

//注册页面数据验证
function validation() {
	var nameVal = $(".name").val(),
		birthdayVal = $(".birthday").val(),
		telephoneVal = $(".telephone").val(),
		checkCodeVal = $(".checkCode").val(),
		storeVal = $(".store-input").val(),
		myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
	
	if(nameVal.trim() == "" ) {
		alert("姓名不能为空！");
	} else if(birthdayVal.trim() == ""){
		alert("生日不能为空！");
	} else if(telephoneVal.trim() == ""){
		alert("手机号不能为空");
	} else if(telephoneVal.length!=11 || !myreg.test(telephoneVal)){
		alert("请输入有效的手机号！");
	}else if(checkCodeVal.trim() == ""){
		alert("验证码不能为空！");
	} else if(storeVal.trim() == ""){
		alert("门店不能为空！");
	} 
}

//提交验证
function submit() {
	$(".submit").on("click",function(){
		if($(".agreement input").attr("checked") == "checked"){
			validation();
		}else {
			alert("您还未选择同意协议！");
		}
	})
}
$(document).ready(function() {
    date();
    coupon();
    store();
    submit();
});
