$(document).ready(function (){
    $('#et').click(function(){
        $("#book").css("display","none");
        $.get("/admins/getdata", function(data, status){
            //alert("Data: " + data + "\nStatus: " + status);
           var l='';
            l+="<table class='table' border='1'><tr><td>booking id</td><td>place</td><td>package_cost</td><td>transportation</td><td>vehicle</td></tr> ";
            for(var i=0;i<data.length;i++) {
                l+="<tr>"+
                    "<td>" + data[i].id + "</td>" +
                    "<td>" + data[i].place + "</td>" +
                    "<td>" + data[i].cost + "</td>" +
                    "<td>" + data[i].trans + "</td>" +
                    "<td>" + data[i].best + "</td>" +


                    "</tr>";

            }
            l+="</table>";
            //$("#show").html(l);
        $("#show").show().html(l);
        });
    });
    $("#nt").click(function(){
        $("#show").hide();
         $("#book").show();
    });

});

