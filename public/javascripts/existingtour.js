$(document).ready(function (){
    $('#et').click(function(){
        $("#book").css("display","none");
        $.get("/admins/getdata", function(data, status){
            //alert("Data: " + data + "\nStatus: " + status);

           var l="<h2>"+ data[0].id +" "+  data[0].place +" "+ data[0].cost +" "+ data[0].trans+ " " + data[0].best+"</h2>";
        $("#show").show().html(l);
        });
    });
    $("#nt").click(function(){
        $("#show").hide();
         $("#book").show();
    });

});

