
const folders = [
  '230119HealFanSign',
  '230916MusicMidtown',
  '230918SecretEvent',
  '230923LifeIsBeautiful',
  '231004DawntoDuskTourSanFrancisco',
  '231006DawntoDuskTourPortland',
  '231008DawntoDuskTourSeattle',
  '231010DawntoDuskTourVancouver',
  '231020DawntoDuskTourToronto',
  '231022DawntoDuskTourNewYork',
  '231024DawntoDuskTourFairfax',
  '231026DawntoDuskTourColumbus'
  ];
  
  const titles = [
  '230119 Heal Fan Sign in Seoul',
  '230916 Music Midtown in Atlanta',
  '230918 Secret Event in Los Angeles',
  '230923 Life Is Beautiful in Las Vegas',
  '231004 Dawn to Dusk Tour in San Francisco',
  '231006 Dawn to Dusk Tour in Portland',
  '231008 Dawn to Dusk Tour in Seattle',
  '231010 Dawn to Dusk Tour in Vancouver',
  '231020 Dawn to Dusk Tour in Toronto',
  '231022 Dawn to Dusk Tour in NewYork',
  '231024 Dawn to Dusk Tour in Fairfax',
  '231026 Dawn to Dusk Tour in Columbus'
  ];

  const queryString = window.location.search;


  const urlParams = new URLSearchParams(queryString);

  const album = urlParams.get('album');
  console.log(album);
  var selectedAlbum = 11;
  if(album>0 && album<12){
    selectedAlbum= album;
  }


  var galleryHtml = "";
  var images = [];
  //  const comingSoonHtml = "Coming Soon....";
  const comingSoonHtml = '<div class="col-sm-6 center"><img src="https://media.giphy.com/media/JJLc5PUVwnOT15Mq13/giphy.gif"></div>'; 
  $(document).ready(function () {
    getImages();
  })

  $("select").on("change", function() {
    selectedAlbum = $(this).val();
    getImages();
  });

function changeAlbum(){
  galleryHtml = "";
  var albumOptionsHtml =  '<option selected value="' + selectedAlbum + '" >' + titles[selectedAlbum] + '</option>';
  //Display Dropdown Menu
  for (var y = 0; folders.length > y; y++) {
    //dropdownMenuHtml += titles[y];
    albumOptionsHtml += '<option value="' + y + '">' + titles[y] + '</option>';
  }

  //document.getElementById('selectAlbum').innerHTML = albumOptionsHtml;
  $("#selectAlbum").html(albumOptionsHtml);

  //Display images
  for (var i = 0; images.length > i; i++) {
    var num=6;var image = folders[selectedAlbum] + '/' + images[i];
    if(i%3==0) num=12;
    galleryHtml += '<div class="col-sm-'+num+' col-md-4"><a class="lightbox" href="'+ image +'"><img src="'+ image +'" alt="img' + i + '"/></a></div>';
  }
  $("#galleryDiv").html(galleryHtml);
 // document.getElementById('galleryDiv').innerHTML = galleryHtml;
}


function getImages(){
  $.get(folders[selectedAlbum]+"/list.txt", function(data) {
    console.log(data);
    images = data.split("\r"); // split on every new line
    console.log(images.length);
    document.getElementById('galleryDiv').innerHTML = "";
    if(images.length <= 1){
      console.log("coming soon");
      changeAlbum()
      //document.getElementById('galleryDiv').innerHTML = "";
      $("#galleryDiv").html(comingSoonHtml);
    }else{
      console.log("album"+folders[selectedAlbum]);
      changeAlbum();
    }
    
  });
}
