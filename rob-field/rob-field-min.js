javascript:void function(global,date,fieldNum){var lockAutoField=false;var intervalTime=null;fieldNum=parseInt(fieldNum);global.query=function(){console.log("==========> 正在疯狂地刷新场地信息");var urlstr=baseURL+"/stadium/query.do?key="+Math.random();var postdata="stadiumResourceId=402881b4419d12090141a1a5cd64001c&stadiumCode=0020C000021&site=2&period=2&sportCode=002&subscribeDate="+date;$.ajax({url:urlstr,type:"POST",data:postdata,beforeSend:function(){$("#ccinfo").html('<div style="width:100%;text-align:center;padding-bottom:10px;padding-top:10px;" ><img src="'+baseURL+'/images/pagination_loading.gif"/>')},success:function(data){if(lockAutoField){console.log("===========> 禁止重复执行自动选择场地");return}else{$("#ccinfo").html(data);if($("#ccinfo").find("tr").length>1){console.log("==================> 刷到场地，尝试自动选择匹配的场地");lockAutoField=true;clearInterval(intervalTime);var $p11=$("#onLineStore > tbody > tr:nth-child(2) > td:nth-child(8)"),$p12=$("#onLineStore > tbody > tr:nth-child(2) > td:nth-child(9)"),$p21=$("#onLineStore > tbody > tr:nth-child(3) > td:nth-child(8)"),$p22=$("#onLineStore > tbody > tr:nth-child(3) > td:nth-child(9)"),$p31=$("#onLineStore > tbody > tr:nth-child(4) > td:nth-child(8)"),$p32=$("#onLineStore > tbody > tr:nth-child(4) > td:nth-child(9)");var fieldList=[[$p11,$p12],[$p21,$p22],[$p31,$p32]];var matchFields=[];fieldList.forEach(function(group,index){var field={};field.number=index+1;field.playerList=[];field.weight=0;group.forEach(function($item,index){if(!$item.hasClass("link_color_b")){field.playerList.push($item);field.weight+=index===0?1:2}});if(field.weight>0){matchFields.push(field)}});if(matchFields.length){var target=null;if(fieldNum>0){var appointField=matchFields.filter(function(item){return item.number===fieldNum});if(appointField.length===0){alert(fieldNum+"号场地已经被抢，请手动选择其它的免费场")}else{target=appointField[0]}}else{matchFields.sort(function(a,b){return a.weight<b.weight});target=matchFields[0]}if(target){if(target.playerList.length>1){target.playerList.shift()}target.playerList.forEach(function($item){$item.find(">div").trigger("click")});if($("#paymentOrder").find("tr").length>1){global.next()}}}else{alert("出手慢了，免费场已经被抢光了！")}}}}})};intervalTime=setInterval(function(){query()},100)}(window,prompt("请输入日期","2016-01-12"),prompt("请输入场地号","1"));