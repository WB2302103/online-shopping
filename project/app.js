const searchPrducts=()=>{

    fetch("https://dummyjson.com/products")
    .then(res=>res.json())
    .then(data=>showDetails(data.products))

}
searchPrducts()
const showDetails=(products)=>{

    products.forEach(element => {
        console.log(element)
        const ratingStar=ratings(element.rating);
        const div=document.createElement("div")
        div.innerHTML=`
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
        <img class="rounded-t-lg h-40 w-50 mx-auto" src="${element.thumbnail}" alt="" />
          </a>
          <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${element.title.slice(0,18)}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${element.description.slice(0,100)}</p>
        <p> Price: $ ${element.price}</p>
        <p class="text-orange-300"> Rating: ${ratingStar}</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onclick="addToCard(${element.id},${element.price})">
            Add to cart 
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onclick="cancelFromCart(${element.id})">
            Cancel 
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
          </div>
      </div>`
       const details= document.getElementById("display-card")
       details.appendChild(div)
    });

}
let count = 0;
let totalQuantity = 0;
const cartItems = {};

const addToCard = (id, price) => {
  if (!cartItems[id]) {
    cartItems[id] = { quantity: 1, price: price };
    count += 1;
    totalQuantity += 1;
    document.getElementById('total-products').innerHTML = count;
    updatePrice(price);
    total();
  } else {
    alert("Item already in cart. You can cancel it if needed.");
  }
};

const cancelFromCart = (id) => {
  if (cartItems[id]) {
    const item = cartItems[id];
    count -= 1;
    totalQuantity -= item.quantity;
    document.getElementById('total-products').innerHTML = count;
    updatePrice(-item.price * item.quantity);
    delete cartItems[id];
    total();
  } else {
    alert("Item not in cart.");
  }
};

const updatePrice = (price) => {
  const oldPrice = document.getElementById('price').innerText;
  const oldPriceFloat = parseFloat(oldPrice);
  const floatPrice = parseFloat(price);
  const newPrice = floatPrice + oldPriceFloat;
  document.getElementById('price').innerText = newPrice.toFixed(2);
  DeliveryCharge(newPrice);
};

const DeliveryCharge = (newPrice) => {
  if (newPrice <= 500) {
    document.getElementById('delivery-charge').innerText = 0;
  } else if (newPrice > 500 && newPrice < 800) {
    document.getElementById('delivery-charge').innerText = 50;
  } else if (newPrice >= 800) {
    document.getElementById('delivery-charge').innerText = 100;
  }
};

const total = () => {
  const price = parseFloat(document.getElementById('price').innerText);
  const deliver = parseFloat(document.getElementById('delivery-charge').innerText);
  const total = price + deliver;
  document.getElementById('total').innerText = total.toFixed(2);
};

const ratings = (rate) => {
  if (rate >= 4) {
    return `<h3><i class="fas fa-star text-orange-500"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h3>`;
  } else if (rate >= 3 && rate < 4) {
    return `<h3><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h3>`;
  } else if (rate >= 2 && rate < 3) {
    return `<h3><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h3>`;
  } else {
    return `<h3><i class="fas fa-star"></i> ${rate}</h3>`;
  }
};

const orderProducts = () => {
  const details = document.getElementById('details');
  details.textContent = '';
  const totalPrice = document.getElementById('total').innerText;
  const div = document.createElement('div');
  div.classList.add('shopping');
  div.innerHTML = `<h4>Your total Shopping: $${totalPrice}</h4>
  <p>Total Quantity: ${totalQuantity}</p>
  <p>Thanks for Shopping With Us!!!!!</p>`;
  details.appendChild(div);
};