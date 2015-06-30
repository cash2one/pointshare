function addTableLine() {
    $("#addCase").click(function(){
         if($("#caseEditTable tbody").find("tr").size()==0) {
             $("#caseEditTable tbody").html("<tr name='{{platformId}}'><td><a href='#deleteCase'><i class='icon-minus'></i></a>&nbsp;<a href='#copyCase'><i class='icon-repeat'></i></a></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td></tr>)");
         } else {
             $("#caseEditTable tbody").find("tr").eq(0).before("<tr name='0'><td><a href='#deleteCase'><i class='icon-minus'></i></a>&nbsp;<a href='#copyCase'><i class='icon-repeat'></i></a></td><td><input type='text'/></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td></tr>)");
         }  //end if-else
      }//end of function    
    );//end of click
    //$("[href='#deleteCase']").live("click",function(){
    $("[href='#deleteCase']").live("click",function(){
         $(this).parent().parent().remove()
      }// end of function
    )//end of live

    $("[href='#copyCase']").live("click",function(){
         html=$(this).parent().parent().html()
         html="<tr name='0'>"+html+"</tr>"
         $("#caseEditTable tbody").find("tr").eq(0).before(html)
      } //end of function
    )//end of click
}

function addFromFile() {
    $("#addFromFile").click(function(){
        var filePath = prompt("请输入文件地址路径: 如qt103:/disk1/casefile","")
        platformId = $("#platformId").val()
        $.get("../case_edit",
        {
            file:filePath,
            platformId:platformId
        },
        function(data) {
            if(data==1) {
              alert("请先添加测试源文件！")
            } else {
              alert("操作成功！")
            }
        }// end of get function
        )//end of get  
    }// end of click function

   
    );//end of click
}

function verify(row) {
   for(var i in row) {
      if(row[i]=="" && i !="expect")
          return false
   }
   return true
}

function saveCaseTable() {
    $("#save").click(function() {
         var datas=[];
         $("#caseEditTable tbody tr").each(function() {
             var row = {
                 id        : $(this).attr("name"),
                 name      : $(this).children().eq(1).children().val(),
                 suiteId   : $(this).children().eq(2).children().val(),
                 suiteName : $(this).children().eq(3).children().val(),
                 xml       : $(this).children().eq(4).children().val(),
                 command   : $(this).children().eq(5).children().val(),
                 param     : $(this).children().eq(6).children().val(),
                 matchType : $(this).children().eq(7).children().val(),
                 expect    : $(this).children().eq(8).children().val(),
                 log       : $(this).children().eq(9).children().val()
             }// end of row
             if(verify(row)) {
                 datas.push(row);
             }else {
                 alert("用例 "+row["name"]+" 未填写完整！不会保存");
             }
         }
         )// end of each
         if (datas.length==0){
             alert("没有可以保存的完整测试用例！");
             return;
         }
         var cases = JSON.stringify(datas)
         var platformId = $("#platformId").val()
         $.get("../case_edit",
                {
                    save:1,
                    platformId:platformId,
                    cases:cases
                },
                function(){
                    alert("操作成功！") 
                }//end of post function 
         ); //end of post
      }//endo of function

    )// end of click 

}


function CaseEditTab() { 
    $("[href='#caseEditTab']").click(function(){ 
      channel = $(this).attr("name") 
      $.get("../case_edit", 
      {  
        platformId:channel 
      }, 
      function(data){ 
        $("div#caseTable").html(data) 
        $("div#myTabContent").empty() 
      } 
    );//end of post 
    }) 
} 

function saveXmlFile(){
    $("#saveXmlFile").click(function(){
      platformId = $("#platformId").val()
      content = $("#xmlContent").val()
      name = $("#xmlName").val()
      type = $('input[name="xmlType"]:checked').attr("id")
      $.get("../case_edit",
      {
        xml:1,
        name:name,
        platformId: platformId,
        content:content,
        type:type
      },function(data){
        alert("上传成功！")
        $("#addXmlFile").hide()
      }
      ) // end of get
    } //end of function
    );//end of click

}

function importXmlFile() {
   $("#importXmlFile").click(function() {
      var filePath = prompt("请输入文件地址路径: 如qt103:/disk1/casefile。(多个用分号分隔)","")      
      platformId = $("#platformId").val()
      $.get("../case_edit",
      {
          importXml:1,
          platformId: platformId,
          filePath: filePath
      },
      function(data){
          alert("操作成功！")
      }// end of get function
      );//end of get
   }// end of click function
   );//end of click 

}

function editXmlFile() {
   $("[href='#editXmlFile']").live("click",function(){
        xmlName = $(this).parent().parent().find("td").eq(4).find("input").eq(0).attr("value")
        $("#editXmlName").html(xmlName)
        platformId = $("#platformId").val()
        $.get("../case_edit",
          {
             getXmlContent: 1,
             xmlName: xmlName,
             platformId: platformId
          },
          function(data){
             $("#editXmlContent").html(data); 
          });//end of get 
    }// end of click function

   )//end of live

   $("#editXmlSave").click(function() {
       xmlName = $("#editXmlName").html()
       content = $("#editXmlContent").val()
       platformId = $("#platformId").val()
       $.get("../case_edit",
        {
            saveXmlEdit:1,
            xmlName: xmlName,
            platformId: platformId,
            xmlContent: content
        },
        function(data) {
            alert("保存成功！")
        }// end of get function
       )//end of get
    }// end of clicl function
   )//end of click
}

//////////////////////////////////////
$(function(){
    addTableLine();
    saveCaseTable();
    CaseEditTab();
    addFromFile();
    saveXmlFile();
    importXmlFile();
    editXmlFile();
});
