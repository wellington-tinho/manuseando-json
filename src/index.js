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
	var promotion = 'FULL LOOK'
	
		var notIsFullLook = false
		Object.keys(repeatsPerCategory).some((key)=> {  
			if (repeatsPerCategory[key] < 1){
				notIsFullLook = true
				}
			})
		if (notIsFullLook){
		
		Object.keys(repeatsPerCategory).some((key)=> {  
		
		if (repeatsPerCategory[key]==3){
			promotion = 'TRIPLE LOOK'
			return(true);
		}
		else if ((repeatsPerCategory[Object.keys(repeatsPerCategory)[1]])>=1  ){
			promotion = 'DOUBLE LOOK'
			return(true);
		}
		else {
			promotion = 'SINGLE LOOK'
			return(true);
		}
	})
}
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
}

function getPromotion(productsList) {
	var itens = [];
	productsList = productsList.map(item => (
		itens.push(item.category)
	))
	
	return( getTypePromotion(getQuantityPerCategory(itens)));
}

function getProductsIncludeIds(ids,productsList){
	var productIds = productsList.filter((product) => {
		return ids.includes(product.id)
	})
return productIds
} 

function getTotalPrice(ids, productsList,promotion){
	var productIds = getProductsIncludeIds(ids,productsList)
	var somatorio = 0
	var aux = 0
	productIds.forEach(product => {
		aux = 0
		for(var count=0; count<product.promotions.length; count++){
			if ((product.promotions[count].looks).includes(promotion)){
				aux = product.promotions[count].price
			}
		}
		if (aux === 0) {
			aux = product.regularPrice
		}
		somatorio=somatorio+aux

		});

	
		return somatorio
} 

function getDiscountValue(ids,productsList,totalPrice) {
	var productIds = getProductsIncludeIds(ids,productsList)
	var somatorio = 0
	productIds.forEach(product => {
		somatorio += product.regularPrice;
		
	});
	return somatorio - totalPrice
}

function getShoppingCart(ids, productsList) {
	const products = getProducts(ids, productsList)

	const promotion = getPromotion(products)
	
	const totalPrice = getTotalPrice(ids, productsList,promotion)

	const discountValue = getDiscountValue(ids,productsList,totalPrice)
	
	const discount = ((discountValue*100)/(totalPrice+discountValue)).toFixed(2)


	// console.log({products,promotion,totalPrice,discountValue,discount});
	return {
		products,
		promotion,
		totalPrice:`${totalPrice.toFixed(2)}`,
		discountValue:`${discountValue.toFixed(2)}`,
		discount:`${discount}%`,
	};
}

module.exports = {
	getShoppingCart
};

