//-----create shuffled cards-----//
var numbers = [1,2,3,4,5,6,7,8,9,10]
numbers = shuffleArray(numbers);
$.each(numbers, function (i){
	var card = "<div id='card"+numbers[i]+"'  class='card"+numbers[i]+"'><p>"+numbers[i]+"</p></div>"
	$("#your_cards").append(card);
});
//-----create fields-----//
var fields = ["one","two","three","four","five","six","seven","eight","nine","ten"]
$.each(fields, function (i) {
	var j = i + 1;
	var field = "<div class='drop"+j+"'><p>"+fields[i]+"</p></div>";
	$("#place_2_go").append(field);
})
//-----function for the whole drag and drop action-----//
$( function() {
	for (let i = 1; i < 11; i++) {
		$("#card"+i).draggable({ revert: "invalid"});
		$( ".drop"+i ).droppable({
			accept: ".card"+i , drop: function(){changecard($(this).attr("class"))}, hoverClass: "droppable" , tolerance: "fit"
		});
	}
})
//-----function to change the colors when the cards are dropping-----//
function changecard(x) {
	x = x.substr(4,2);
	$(".card"+x).addClass("dropped"+x);
	$(".drop"+x).addClass("dropped"+x);
	gamepart();
}


//-----this is to shuffle our array of numbers-----//
function shuffleArray(d) {
  for (var c = d.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1));
    var a = d[c];
    d[c] = d[b];
    d[b] = a;
  }
  return d
};

//-----time for a game-----//
var start = Date();
var end = 0;
var time = 0;
var count = 0;

function gamepart() {
	count++;
	if (count == 10) {
		end = Date();
		time = (Number(Date.parse(end)) - Number(Date.parse(start)))/1000;
		time2 = (Number(Date.parse(end)) - Number(Date.parse(start)))%1000;
		$("#result").html("<p>Congratulation!<br>You finished the game in "+time+"."+time2+" seconds</p>");
	}
	console.log(count);
}
