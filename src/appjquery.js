/* eslint-disable */
$(document).ready(function () {
    // $('h1').click(function () {
    //     alert("dwjkcwkjcvwjkvwjkvwjwvejk");
    // });

//   var datepicker=$("#datepicker").datepicker(
//                     {changeMonth:true,changeYear:true,maxDate:"-1M -1D -1Y",dateFormat:"yy-mm-dd"}
//                                               );
//     $("#datepicker").bind("keydown", function (event) {
//        event.preventDefault();
//      });

$('#txtDate').click(function () {
     var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;    
    $('#txtDate').attr('max', maxDate);
})


    // $("#datepicker").datepicker({
    //   changeMonth: true,//this option for allowing user to select month
    //   changeYear: true //this option for allowing user to select from year range
    // });



});