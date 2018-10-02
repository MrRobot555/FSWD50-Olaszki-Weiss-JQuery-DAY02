shop = objGrocery.Items;
cart = null;
console.log(shop);
$.each(shop, function (i){
	var item = "<div id='"+shop[i].ID+"'><img src='"+shop[i].img+"'><div class='item_name'>"+shop[i].name+"</div><div id='"+shop[i].ID+"' class='item_price'>&euro; "+shop[i].price+" buy</div></div>";
	$("#shop").append(item);
});

function Cart(id, name, img, price) {
	this.id = id;
	this.name = name;
	this.img = img;
	this.price = price;
	this.qty = 1;
}

function addCart(a) {
	var id = Number(a.id);
	var id1 = findObjectByKey(shop, "ID", id);
	var name = shop[id1].name;
	var img = shop[id1].img;
	var price = shop[id1].price;
	if (cart == null) {
		cart = [];
		cart.push(new Cart(id, name, img, price));
	} else if (findObjectByKey(cart, "id",id) == null) {
		cart.push(new Cart(id, name, img, price)); 
	} else {
		cart[findObjectByKey(cart, "id",id)].qty++; 
	}
	showcart();
	console.log(cart);
}

function addEventHandler() {
 $(".item_price").click(function(){addCart(this)});
}

function findObjectByKey(array, key, value) {
	for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return i;
     	}
	}
	return null;
}

function showcart(){
	var shoppingcart = "<h3>shopping cart</h3><table><tr><th>name</th><th>price</th><th>qty</th>";
	$.each(cart, function(i){
		shoppingcart += "<tr><td>"+cart[i].name+"</td><td>&euro; "+cart[i].price+"</td><td>"+cart[i]["qty"]+"</td><td><button id='btn_rem1_"+cart[i]["id"]+"'>-</button><button id='btn_add_"+cart[i]["id"]+"'>+</button> <button id='btn_rem_"+cart[i]["id"]+"'>remove</button></td></tr>";
	});
	shoppingcart += "<tr class='total'><td>total:</td><td>&euro; "+calc_cart()+"</td><td></td><td></td></tr>";
	shoppingcart += "</table>";
	$("#cart").html(shoppingcart);
/*	for (let i = 0; i < cart.length; i++) {
			document.getElementById("btn+"+cart[i]["id"]).addEventListener("click", function(){add_item(cart[i].id)});
			document.getElementById("btn-"+cart[i]["id"]).addEventListener("click", function(){remove1_item(cart[i].id)});
			document.getElementById("btnrem"+cart[i]["id"]).addEventListener("click", function(){remove_item(cart[i].id)});
	} */

	$.each(cart, function(i){
		$("#btn_add_"+cart[i].id).click(function(){add_item(cart[i].id)});
		$("#btn_rem1_"+cart[i].id).click(function(){remove1_item(cart[i].id)});
		$("#btn_rem_"+cart[i].id).click(function(){remove_item(cart[i].id)});
	})	
}

function calc_cart() {
	result = 0;
	$.each(cart, function(i) {
		result += cart[i].price * cart[i].qty;
	});
	return result.toFixed(2);
}

function add_item(id) {
	cart[findObjectByKey(cart,"id",id)].qty++;
	showcart();
}

function remove1_item(id) {
	var pos = findObjectByKey(cart, "id",id)
	if (cart[pos].qty == 1){
		cart.splice(pos,1);
	} else {
		cart[pos].qty--;
	}
	showcart();
}

function remove_item(id) {
	var pos = findObjectByKey(cart, "id",id)
		cart.splice(pos,1);
		showcart();
}

addEventHandler();
