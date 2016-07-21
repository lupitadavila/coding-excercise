

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



// Append number of apartments 
$('.apt-total').append(numApts);

// Adding HTML shell
for(var i=0;i<numApts;i++){
   var aptDiv = document.createElement('div');
       aptDiv.className = "apartment-result row";
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

//List by Price (default) Low to high
var aptListByPrice = apartmentList.sort(function(a, b) {
    return parseFloat(a.price) - parseFloat(b.price);
});
console.log(aptListByPrice);
//List by Price (default) High to low
var aptListByPop = apartmentList.sort(function(a, b) {
    return parseFloat(b.popularity) - parseFloat(a.popularity);
});
console.log(aptListByPrice);
console.log(aptListByPop);
//---------------------------------

var generateList = function(list, listLength, page){
	
	//Clear 
	$('.apartment-img-holder').empty();
	$('.apartment-info-holder').empty();
	
	
	for(var i=listLength-5;i<listLength;i++){
	
		//----Add image
		var idString = "#apt" + i + " .apartment-img-holder";
		$(idString).append('<img class="apartment-img" src="images/' + list[i].image + '"/>');
		
		//----Add Info
		idString = "#apt" + i + " .apartment-info-holder";
		
		// Add name
		$(idString).append('<div class="apartment-name">'+ list[i].name +'</div><hr>');
		
		//Add description
		$(idString).append('<div class="apartment-description">'+ list[i].description +'</div>');
		
		//Add price
		$(idString).append('<div class="apartment-price"> $'+ list[i].price +'</div>');

	}

}


var sortPrice = function(){

	apartmentList.sort(function(a, b) {
		return parseFloat(a.price) - parseFloat(b.price);
	});

	generateList(apartmentList, numApts);
}
sortPrice();

var sortPopularity = function(){

	apartmentList.sort(function(a, b) {
		return parseFloat(b.popularity) - parseFloat(a.popularity);
	});
	generateList(apartmentList, numApts);
}



// Sort Buttons

var priceBtn = document.getElementById('price-btn');

priceBtn.addEventListener('click', function() {
    sortPrice();
	console.log('This ran');
}, false);


var popBtn = document.getElementById('pop-btn');

popBtn.addEventListener('click', function() {
    sortPopularity();
	console.log('That ran');
}, false);










// Initiate Pagination

$('#pagination').twbsPagination({
	totalPages: numPages,
	visiblePages: 3,
	onPageClick: function (event, page) {
		$('#page-content').text('Page ' + page);
	}
});