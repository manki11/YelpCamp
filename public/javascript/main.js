"use strict";


// $('#edit-link').on('click', function(e){ //
//     window.alert("This is alert");
//     e.preventDefault();
//     var $parent = $(this).parent(); // or var $parent = $(this).parent();
//     $parent.find('p.message').hide(); // use slide methods fancy show/hide are required
//     $parent.find('form.editForm').show();
//     // Not sure but you'd want to hide <a href="#">Edit link </a> after clicking
//     // in that case use the below
//     // $(this).hide();
// });

$(document).ready(function() {

    $(".edit-link").on("click", function (e) {
        var $parent = $(this).parent(); // or var $parent = $(this).parent();
        $parent.find('p.message').hide(); // use slide methods fancy show/hide are required
        $parent.find('form.editForm').show();
        $(this).hide();
        $(".delete-form").hide();
        // Not sure but you'd want to hide <a href="#">Edit link </a> after clicking
        // in that case use the below
        // $(this).hide();
    });

});