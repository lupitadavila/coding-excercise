
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
	   $('#search-results').append(aptDiv);
	   
}
var imgDiv = document.createElement('div');
    imgDiv.className = "apartment-img-holder col-md-4";
	$('.apartment-result').append(imgDiv);
	
var infoDiv = document.createElement('div');
    infoDiv.className = "col-md-8";
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
console.log(aptListByPop);





// Initiate Pagination

$('#pagination').twbsPagination({
	totalPages: numPages,
	visiblePages: 3,
	onPageClick: function (event, page) {
		$('#page-content').text('Page ' + page);
	}
});