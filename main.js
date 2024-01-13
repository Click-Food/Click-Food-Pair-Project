$(document).ready(function() {
  // creating instances (products) 
  var products = [
    { name: 'Full Cheese Burger', category: 'burger', price: 6.99, imgURL: 'imgs/download (1).jpeg' },
    { name: 'Club Sandwich', category: 'sandwich', price: 7.49, imgURL: 'imgs/Club Sandwich.jpeg' },
    { name: 'Margherita Pizza', category: 'pizza', price: 8.99, imgURL: 'imgs/Margherita Pizza.jpeg' },
    { name: 'Taco Supreme', category: 'tacos', price: 4.99, imgURL: 'imgs/Taco Supreme.jpeg' },
    {name: 'Pizza Tuna', category: 'pizza', price:  7, imgURL: 'imgs/Pizza Tuna.jpeg' },
    {name: 'Pizza Pepperoni', category: 'pizza', price:  7, imgURL: 'imgs/Pizza Pepperoni.jpeg'},
    {name: 'Cheese Pizza', category: 'pizza', price:  7, imgURL: 'imgs/images.jpeg'},
    {name: '4 seasons Pizza', category: 'pizza', price:  7, imgURL: 'imgs/4 seasons Pizza.jpeg'},
    {name: 'Pizza Napolitaine', category: 'pizza', price:  7, imgURL: 'imgs/Pizza Napolitaine.jpeg'},
    { name: 'Reuben Sandwich', category: 'sandwich', price: 7.49, imgURL: 'imgs/Reuben Sandwich.jpeg' },
    { name: 'Chicken Sandwich', category: 'sandwich', price: 7.49, imgURL: 'imgs/Chicken Sandwich.jpeg' },
    { name: 'Roast Beef Sandwich', category: 'sandwich', price: 7.49, imgURL: 'imgs/Roast Beef Sandwich.jpeg' },
    { name: 'Tuna Sandwich', category: 'sandwich', price: 7.49, imgURL: 'imgs/Tuna Sandwich.jpeg' },
    { name: 'Tacos Barbacoa', category: 'tacos', price: 4.99, imgURL: 'imgs/Tacos Barbacoa.jpeg' },
    { name: 'Tacos Cabeza', category: 'tacos', price: 8, imgURL: 'imgs/tacos-ces-sandwichs-hypercaloriques-sont-il-pires-que-des-burgers.jpeg' },
    { name: 'Tacos Chorizo', category: 'tacos', price: 10, imgURL: 'imgs2/chorizi taco.jpeg' },
    { name: 'Tacos Pescado', category: 'tacos', price: 6.50, imgURL: 'imgs2/Tacos Pescado.jpeg' },
    { name: 'BossBurger', category: 'burger', price: 10.50, imgURL: 'imgs2/BossBurger.jpeg' },
    { name: 'Standard Burger', category: 'burger', price: 7, imgURL: 'imgs2/Standard Burger.jpeg' },
    { name: 'Turkey Burger', category: 'burger', price: 8, imgURL: 'imgs2/Turkey Burger.jpeg' },
    { name: 'Veggie Burger', category: 'burger', price: 5.99, imgURL: 'imgs2/Veggie Burger' },
    { name: 'Bean Burger', category: 'burger', price: 13, imgURL: 'imgs2/Bean Burger.jpeg' },
    { name: 'Wild Salamon Burger', category: 'burger', price: 13.20, imgURL: 'imgs2/Wild Salamon Burger.jpeg' },
    { name: 'Elk Burger', category: 'burger', price: 6.99, imgURL: 'imgs2/Elk Burger.jpeg' },
    { name: 'Kafteji Sandwich', category: 'sandwich', price: 2.50, imgURL: 'imgs2/Kafteji Sandwich.jpeg' },
    {name: 'SeaFood Pizza', category: 'pizza', price:  20.50, imgURL: 'imgs2/SeaFood Pizza.jpeg'},
    {name: 'Cola', category: 'drinks', price:  3, imgURL: 'imgs2/Cola.jpeg'},
    {name: 'Fanta', category: 'drinks', price:  3, imgURL: 'imgs2/Fanta.jpeg'},
    {name: 'Boga', category: 'drinks', price:  3, imgURL: 'imgs2/Boga.jpeg'},
    {name: 'Orange juice', category: 'drinks', price:  3.000, imgURL: 'imgs2/Orange juice.jpeg'},
    {name: 'Sprite', category: 'drinks', price:  3, imgURL: 'imgs2/Sprite.jpeg'},
    {name: 'Red Bull', category: 'drinks', price:  6, imgURL: 'imgs2/Red Bull.jpeg'},
    {name: 'Shark', category: 'drinks', price:  4.500, imgURL: 'imgs2/Shark.jpeg'},
    {name: 'Fruit Juice', category: 'drinks', price:  4.500, imgURL: 'imgs2/Fruit Juice.jpeg'},
    {name: 'Pack Double Burger ', category: 'packs', price:  27.500, imgURL: 'imgs2/double burgrr.jpeg'},
    {name: 'Pack Penta kill sandwich for 5 ', category: 'packs', price:  30.000, imgURL: 'imgs2/packsandwich5.jpeg'},
  ];

  //filter products by category ☺
  function renderProducts(category) {
    $('#products-container').empty();

    let filteredProducts;
$
    if (category === 'all') {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(function (product) {return product.category === category} );
    }

    filteredProducts.forEach(function(product) {
      const productHtml = `<div class="product">
                            <img id="imgg" src="${product.imgURL}" alt="${product.name}">
                             <h2>${product.name}</h2>
                            <h3>${product.price.toFixed(2)}TND</h3>
                            <button class="buy-button" data-name="${product.name}" data-price="${product.price}">Buy</button>
                          </div>`;
      $('#products-container').append(productHtml);
    });
  }

  // Initial render of products (ALL category)
  renderProducts('all');

  // Event action for category buttons
  $('.category-button').click(function() {
    const category = $(this).data('category');
    renderProducts(category);
  });

  
  // Event action for buy buttons
  $('#products-container').on('click', '.buy-button', function() {
    const productName = $(this).data('name');
    const productPrice = $(this).data('price');
    const listItemHtml = `<li>${productName} - ${productPrice.toFixed(1)}TND</li>`;
    $('#checkout-list').append(listItemHtml);
    $(this).parent().append('<h4>Added to list</h4>')

    // Update total price
    const totalPrice = calculateTotalPrice();
    $('#total-price').text(`Total: ${totalPrice.toFixed(3)}TND`);
  });

  // Event for checkout button
  $('#checkout-button').click(function() {
    $('#checkout').toggle();
  });

  // Function to calculate the total price ☻
  function calculateTotalPrice() {
    let totalPrice = 0;
    $('#checkout-list li').each(function() {
     const price = parseFloat($(this).text().split('-')[1].trim().slice(0));
      totalPrice += price;
    });
    return totalPrice;
  }
});
// eveent to the reset button ☺
$('#reset-button').on("click", function(){
  // Reset the total price to 0
  $('#total-price').text('Total: 00.000 TND');

  // Clear the checkout list
  $('#checkout-list').empty();

  // Reset the "Added to list" alert
  $('.product').find('h4').remove();
});





