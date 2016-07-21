
(function() {
  'use strict';
  
// Apartment Json data
// "name"
// "image"
// "price"
// "popularity"
 // "description"
 
var apartmentList = data.apartments;

// Get total apartment length

var numApts = apartmentList.length;
var numPages = Math.ceil(apartmentList.length/5); // 5 apartments per page
var isPrice = true;


// Append number of apartments 
$('.apt-total').append(numApts);

// Adding HTML shell
for(var i=0;i<numApts;i++){
   var aptDiv = document.createElement('div');
       aptDiv.className = "apartment-result row hidden";
	   aptDiv.id= "apt"+i;
	   $('#search-results').append(aptDiv);
	   
}
var imgDiv = document.createElement('div');
    imgDiv.className = "apartment-img-holder col-md-4";
	$('.apartment-result').append(imgDiv);
	
var infoDiv = document.createElement('div');
    infoDiv.className = "apartment-info-holder col-md-8";
	$('.apartment-result').append(infoDiv);



//------------------Sorting 


//---------------------------------

var generateList = function(list, listLength){
	var animation = 0;
	//Clear 
	$('.apartment-img-holder').empty();
	$('.apartment-info-holder').empty();
	$('.apartment-result').removeClass('hidden').addClass('hidden');
	
	for(var i=listLength-5;i<listLength;i++){
		
		//----Add image
		var idString = "#apt" + i + " .apartment-img-holder";
		$(idString).append('<img class="apartment-img" src="images/' + list[i].image + '"/>');
		
		//----Add Info
		idString = "#apt" + i + " .apartment-info-holder";
		
		// Add name
		var collapseId = "collapse"+i;
		$(idString).append('<div class="apartment-name"><a data-toggle="collapse" href="#'+collapseId+'" aria-expanded="false" aria-controls="'+collapseId+'">'+ list[i].name +'</a></div><hr>');
		
		//Add description
		$(idString).append('<div class="apartment-description">'+ list[i].description +'</div>');
		$(idString).append('<div id="'+collapseId+'" class="collapse"><p>This apartment is rated a '+ list[i].popularity +' out of 10! </p></div>');
		
		//Add price
		$(idString).append('<div class="apartment-price"> $'+ list[i].price +'</div>');
		
		// Unhide divs with content + animate
		animation = 500+(i*10) +"ms";
		$('.apartment-result:has(".apartment-name")').removeClass('hidden').addClass('wow fadeIn').attr('data-wow-delay',animation);

	}

}


var sortPrice = function(numApts){

	apartmentList.sort(function(a, b) {
		return parseFloat(b.price) - parseFloat(a.price);
	});

	generateList(apartmentList, numApts);
}
sortPrice();

var sortPopularity = function(numApts){

	apartmentList.sort(function(a, b) {
		return parseFloat(b.popularity) - parseFloat(a.popularity);
	});
	generateList(apartmentList, numApts);
}



// Sort Buttons

var priceBtn = document.getElementById('price-btn');
var popBtn = document.getElementById('pop-btn');

priceBtn.addEventListener('click', function() {
	isPrice = true;
    sortPrice(5);
	$('li:has("#pop-btn")').removeClass('active');
	$('li:has("#price-btn")').addClass('active');
	console.log('This ran');
}, false);

popBtn.addEventListener('click', function() {
	isPrice = false;
    sortPopularity(5);
	$('li:has("#pop-btn")').addClass('active');
	$('li:has("#price-btn")').removeClass('active');
	console.log('That ran');
	
	
}, false);



// Initiate Pagination

$('#pagination').twbsPagination({
	totalPages: numPages,
	visiblePages: 3,
	startPage: 1,
	onPageClick: function (event, page) {
		sortPrice(5*page);
		if(isPrice){
			sortPrice(5*page); 
		}else{
			sortPopularity(5*page);
		}
	}
});


}());