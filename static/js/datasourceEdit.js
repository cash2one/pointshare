function datasource_update(){
	jQuery(':button[id="datasource_update"]').click(function(){
		//alert(window.location.pathname);
		//xmlName =update_form.XmlName.value;  获取input value值的另外两种写法
		//xmlName=document.getElementById("XmlName").value;
		pathname = window.location.pathname;
        document.getElementById('pathname_id').value = pathname;
		PointName = $("#Point_Id").val();
        PointInitiator = $("#PointInitiator_id").val();
        PointDetail = $("#PointDetail_id").val();
        PointRealize = $("#PointRealize_id").val();
        PointEndtime = $("#datepicker").val();
        upload_file = $("#upload_file").val();
		error_message =null;
        PointStatus =2;
		if (document.getElementById("Status_0").checked) {
			PointStatus = 0;
		}
		else
			PointStatus =1;

		if (!PointName) {
			//error_message = "XmlName不能为空！";
			alert("标题不能为空！");
		}
		else if(!PointInitiator){
			//error_message = "XmlContent不能为空！";
			alert("发起人不能为空！");
		}
		else if(PointRealize==2){
			//error_message = "选择一种XmlType！";
			alert("请选择当前状态！");
		}
        else if(PointStatus ==1 && PointEndtime==""){
            alert("请选择实现时间！");
        }
        else if(PointStatus ==0 && PointEndtime!=""){
            alert("请修改当前状态！");
        }
		else{
            document.point_add.submit();
//            //alert("123");
//			jQuery.ajax({
//				type:"get",
//                datatype:"json",
//                url:"/point_add/",
//                data:{'upload_file':upload_file,'pathname':pathname,'PointName':PointName,'PointInitiator':PointInitiator,'PointStatus':PointStatus,'PointDetail':PointDetail,'PointRealize':PointRealize,'PointEndtime':PointEndtime},
//                error:function(ex){alert(ex.status);alert("123")},
//                success:function(data){
//                           if (data.status=="success") {
//                           		alert("保存成功！");
//                           		 //history.go(-1);
//
//                           		window.location.href="http://127.0.0.1:8000/sharepoint";
//                           }
//                }
//
//			});
		}


	});
	
}

function datasource_delete_yes(){

	jQuery(':button[id="delete_yes"]').click(function(){
		pathname = window.location.pathname;
		//alert(pathname);
		//alert("123");
		jQuery.ajax({
				type:"post",
                datatype:"json",
                url:"/delete_yes/",
                data:{'pathname':pathname},
                error:function(ex){alert(ex.status);},
                success:function(data){
                	if (data.status=="success") {
                		alert("删除成功");
                		window.location.href="http://127.0.0.1:8000/datasource_info";
                		refreshInfo(data.platformId);
                	}
                }
            });
	});

}

/*
function checkbox_checked(){
	
	$("#toggle-all").click(function(){

		//alert($("#toggle-all").prop("checked"));
		//alert("123");
		if ($("#toggle-all").prop("checked")==true) {
			$('input[type="checkbox"]').prop('checked', true);
		}
		else
			$('input[type="checkbox"]').prop('checked', false);

	});

}
*/
function checkAll(obj){
	if ($(obj).prop("checked")==true) {
			$('input[type="checkbox"]').prop('checked', true);
		}
		else
			$('input[type="checkbox"]').prop('checked', false);

	var selectedIds =0;
	var n =1;
	$(":checkbox").each(function(i){
		if ($(this).prop("checked")==true) {
			selectedIds =selectedIds+","+$(this).prop("value") ;
			n++;
		}
	});

	alert(selectedIds);
}


function delete_selected(){
	var selectedIds =0;
	var n =1;
	$(":checkbox").each(function(i){
		if ($(this).prop("checked")==true) {
			selectedIds =selectedIds+","+$(this).prop("value") ;
			n++;
		}
	});

	alert(selectedIds);
	if (selectedIds!=0) {

		jQuery.ajax({
			type:"post",
            datatype:"json",
            url:"/delete_selected/",
            data:{'selectedIds':selectedIds},
            error:function(ex){alert(ex);},
            success:function(data){
              	if (data.status=="success") {
                	//alert(data.num);
                	//window.location.href="http://127.0.0.1:8000/datasource_info";
                	//refreshInfo();
                	refreshInfo(data.platformId);
                }
            }
        });
	}
	
	
}

function upload_xml(){
	
}

function refreshInfo(platformId){
	//alert("step2");
	$("[href='#dataSourceTab'][name='platformId']").click()
	//alert("step3");
	$.get("../datasource_info",
        {
           platformId:channel
        },
       function(data){
           $("div#dataTable").html(data)
           $("div#myTab").hide()
           
       }

        );
}

function sDataSource() {
    $("[href='#dataSourceTab']").click(function(){
        channel = $(this).attr("name")
        //alert(channel)
        $.get("../datasource_info",
        { 
           platformId:channel
        },
       function(data){
           $("div#dataTable").html(data)
           $("div#myTab").hide()
           
       }

        );//end of post

    })
}



$(document).ready(function(){

	datasource_update();
	//checkbox_checked();
	//datasource_delete_no();
	$('#file_upload').uploadify({
    'uploader'  : '/uploadify/uploadify.swf',
    'script'    : '/uploadify/uploadify.php',
    'cancelImg' : '/uploadify/cancel.png',
    'folder'    : '/uploads',
    'auto'      : true
  });




})