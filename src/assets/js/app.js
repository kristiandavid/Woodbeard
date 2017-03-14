$(document).foundation();

$.ajax({
    url: "https://api.instagram.com/v1/users/4015668965/media/recent/?access_token=4015668965.aba803f.ed12ceaf54484162a1b4c30a28c52607",
    dataType: "jsonp",
    success: function( response ) {
        for(var i = 0; i <= 7; i++){
          var image = response.data[i].images.standard_resolution.url;
          var imageLarge = image.replace(/s[0-9]+x[0-9]+\/(sh[0-9]+.[0-9]+\/)*/,"");
          var imageURL = response.data[i].link;
          var imageText = response.data[i].caption.text;
          // console.log( "regular: ", image );
          // console.log( "resized: ",imageLarge );
          $('#instafeed').append('<div class="small-6 medium-3 columns instagramPhoto"><a href="'+imageURL+'" target="_blank" rel="noopener"><img src="'+imageLarge+'" alt="'+imageText+'" /></a></div>');
        }
    }
});

$(window).load(function(){
  $('#instafeed').masonry({
    itemSelector: '.instagramPhoto'
  });

});
