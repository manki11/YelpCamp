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

function getPath() {
    var path = "";
    var nodes = window.location.pathname.split('/');
    for (var index = 0; index < nodes.length - 3; index++) {
        path += "../";
    }
    return path;
}

$(document).ready(function () {

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

    $(".likeComment").on("click", function (e) {
        var $parent = $(this).parent();
        var $grandParent = $parent.parent();
        var noOfLikes = $grandParent.find('span.noOfLikes');

        var likeElement = $(this);
        var unlikeElement = $parent.find('a.unlikeComment');
        $(this).hide();
        $parent.find('a.unlikeComment').show();
        var commId = $(this).attr('data-commId');

        $.post(window.location.pathname + "/comments/" + commId + "/like", function (data) {
            if (data.success !== '1') {
                unlikeElement.hide();
                likeElement.show();
            } else {
                noOfLikes.html(data.likes);
            }
        });
    });

    $(".unlikeComment").on("click", function (e) {
        var $parent = $(this).parent();
        var $grandParent = $parent.parent();
        var noOfLikes = $grandParent.find('span.noOfLikes');

        var likeElement = $parent.find('a.likeComment');
        var unlikeElement = $(this);

        unlikeElement.hide();
        likeElement.show();

        var commId = $(this).attr('data-commId');

        $.post(window.location.pathname + "/comments/" + commId + "/unlike", function (data) {
            if (data.success !== '1') {
                unlikeElement.show();
                likeElement.hide();
            } else {
                noOfLikes.html(data.likes);
            }
        });
    });

    tinymce.init({
        selector: 'textarea.new-campground',
        height: 500,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor textcolor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code help wordcount'
        ],
        toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        content_css: [
            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
            '//www.tinymce.com/css/codepen.min.css']
    });

});