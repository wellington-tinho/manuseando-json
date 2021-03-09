const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
const { products } = require('../src/data/products');

function getformatProducts(productsList) {
	// productsList = productsList.map(item =>({name: item.name, category: item.category }))
	// 	OR
	let productsNameCategory = []
	productsList.forEach((item) => {
		productsNameCategory.push({
			name: item.name,
			category: item.category
		})
	})
	return productsNameCategory
}

function getProducts(ids, productsList) {
	var productIds
	productIds = productsList.filter((product) => {
		return ids.includes(product.id)
	})
	productIds = getformatProducts(productIds)
	return productIds
}

function getTypePromotion(repeatsPerCategory){
	var promotion
	Object.keys(repeatsPerCategory).some((key)=> {  
		if (repeatsPerCategory[key]>=4){
			promotion = 'FULL LOOK'
			return(true);
		}
		else if (repeatsPerCategory[key]==3){
			promotion = 'TRIPLE LOOK'
			return(true);
		}
		else if ((Object.keys(repeatsPerCategory)[0]=!0) && (Object.keys(repeatsPerCategory)[1]=!0) ){
			promotion = 'DOUBLE LOOK'
			return(true);
		}
		else if ((Object.keys(repeatsPerCategory)[0]>=1)){
			promotion = 'SINGLE LOOK'
			return(true);
		}
	})
	return promotion
}

function getQuantityPerCategory(itens) {
	var repeatsPerCategory = {
		 'T-SHIRTS':0,
		 'PANTS':0,
		 'SHOES':0,
		 'BAGS':0
	}
	itens.forEach((category)=>{
		repeatsPerCategory[category]++
	})
	return repeatsPerCategory
	// console.log(getTypePromotion(repeatsPerCategory));
}

function getPromotion(productsList) {
	var itens = [];
	productsList = productsList.map(item => (
		itens.push(item.category)
	))
	
	return( getTypePromotion(getQuantityPerCategory(itens)));
}

function getTotalPrice(ids, productsList,promotion){

	var productIds
	productIds = productsList.filter((product) => {
		return ids.includes(product.id)
	})
	// console.log(productIds);
	productIds.forEach(product => {
		console.log(product.promotions[0].looks,'includes',promotion);
		console.log((product.promotions[0].looks).includes(promotion));
	
		// product.promotions[0].looks.forEach(promotions => {
		// 	console.log(promotions==promotion);
		// });
		
		});
			// array1.find(element => element == 10);

	console.log(promotion);

	return productIds
} 

function getShoppingCart(ids, productsList) {
	const products = getProducts(ids, productsList)
	const promotion = getPromotion(products)
	// console.log({products,promotion});
	
	const totalPrice = getTotalPrice(ids, productsList,promotion)
	// const discountValue = getDiscountValue
	// const discount =  getDiscount
	return {
		products,
		promotion
		// totalPrice,
		// discountValue,
		// discount,
	};
}

module.exports = {
	getShoppingCart
};
getShoppingCart([ 310, 240,260,110, 120,130,320,140], products)
