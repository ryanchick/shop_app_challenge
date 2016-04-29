(function(){

  angular
    .module('shopApp')
    .service('productSrv',ProductService);

  function ProductService($state,api,toastr){
    var self = this;
    //public variables
    self.products = [];
    self.cart = [];
    self.orders = [];
    self.categories = CATEGORY_DATA;
    self.tax = 0.13;
    console.log(localStorage.cart)
    loadCart();
    loadProducts();
    loadOrders();

    //public functions
    self.getProduct = getProduct;
    self.getProducts = getProducts;
    self.addProduct = addProduct;
    self.updateProduct = updateProduct;
    self.updateProductList = updateProductList;
    self.removeProduct = removeProduct;
    self.deleteProduct = deleteProduct;

    self.addtoCart = addtoCart;
    self.removeCart = removeCart;
    self.saveCart = saveCart;
    self.loadCart = loadCart;

    self.processOrder = processOrder;
    self.updateFromCart = updateFromCart;
    self.saveOrders = saveOrders;
    self.loadOrders = loadOrders;
    self.deleteOrders = deleteOrders;

    self.deleteAllProducts = deleteAllProducts;
    self.loadProducts = loadProducts;

    function getProducts(){
      return api.request('/products',{},'GET')
      .then(function(res){
        //success callback
        console.log(res);
        self.products = res.data.products;
        return res.data.products;
      },function(res){
        //error callback
        console.log(res);
        return;
      })
    }

    function addProduct(product){
      console.log('addSrv')
      api.request('/products',product,'POST')
      .then(function(res){
        console.log(res);
        if(res.status === 200){
          //product was added successfully
          self.products.push(res.data.product);
          $state.go('admin.dash');
        }
      })
    }

    function updateProduct(product,productId){
      api.request('/products/'+productId,product,'PUT')
      .then(function(res){
        console.log(res);
        if(res.status === 200){
          //product was updated successfully
          self.updateProductList(product,productId);
          $state.go('admin.dash');
        }
      })
    }

    function deleteProduct(productId){
      api.request('/products/'+productId,{},'DEL')
      .then(function(res){
        console.log(res);
        if(res.status === 200){
          //product was deleted successfully
          self.removeProduct(productId);
          self.getProducts();
          $state.go('admin.dash');
        }
      })
    }

    function getProduct(productId){
      return api.request('/products/'+productId,{},'GET');
    }

    function updateProductList(product,productId){
      for(var i=0;i < self.products.length;i++){
        if(self.products[i].id == productId){
          self.products[i].name = product.name;
          self.products[i].image = product.image;
          self.products[i].description = product.description;
          self.products[i].category = product.category;
          self.products[i].price = product.price;
          self.products[i].quantity = product.quantity;
        }
      }
    }

    function removeProduct(productId){
      for(var i=0;i < self.products.length;i++){
        if(self.products[i].id == productId){
          delete self.products[i];
        }
      }
    }

    function addtoCart(product,quantity){
      console.log('SvcAdd')
      var newProduct = {
        product:product,
        quantity:quantity
      }
      var found = false;
      var added = false;
      var index = -1;
      for(var i = 0;i<self.cart.length;i++){
        if(product.id === self.cart[i].product.id)
        {
          if(self.cart[i].quantity + quantity > product.quantity){
            toastr.warning('You already have some of these items in your cart! Adding '+quantity+ ' more would exceed our stock quantity!','Over the limit!')
          }else{
            self.cart[i].quantity += quantity;
            added = true;
            index = i;
          }
          found = true;
        }
      }
      if(found === false){
        self.cart.push(newProduct)
        added = true;
        index = i;
      }
      console.log(self.cart)
      if(added == true){
        if(quantity > 1){
          toastr.success(quantity+ ' ' + product.name +'s was added to your cart!');
        }else{
          toastr.success('1 ' + product.name +' was added to your cart!');  
        }
      }
      self.saveCart();
      return index;
    }

    function removeCart(index)
    {
      console.log('srvremove' + index)
      self.cart.splice(index,1);
      self.saveCart();
    }

    function saveCart(){
      localStorage.cart = JSON.stringify(self.cart);
    }

    function loadCart()
    {
      if(localStorage.cart != undefined){
        self.cart = JSON.parse(localStorage.cart);
        console.log('selfcart')
        console.log(self.cart)    
      }
    }

    function processOrder(subtotal,customer,card)
    {
      console.log('name:' + customer)
      console.log(card)
      console.log('Process Order')
      console.log(self.cart)
      if(self.cart.length > 0){
        var newOrder = {
          id:self.orders.length+1 || 1,
          cart:JSON.parse(JSON.stringify(self.cart)),
          total:subtotal,
          tax:subtotal * self.tax,
          final_total:subtotal+(subtotal*self.tax),
          customer:customer,
          card:card
        }
        // var orderId;
        console.log(newOrder)
        console.log(self.cart)
        self.orders.push(newOrder)
        self.saveOrders();
        // api.request('/orders',newOrder,'POST')
          // .then(function(res){
            // console.log(res)

            //update inventory
        if(self.cart.length > 0){
          for(var i = 0;i<self.cart.length;i++){
            var newProduct = {
              name:self.cart[i].product.name,
              description:self.cart[i].product.description,
              image:self.cart[i].product.image,
              category:self.cart[i].product.category,
              price:self.cart[i].product.price,
              quantity:self.cart[i].product.quantity,
              status:1
            }
            newProduct.quantity = newProduct.quantity - self.cart[i].quantity;
            if(newProduct.quantity == 0)
            {
              newProduct.status = 0;
            }
            self.updateFromCart(newProduct,self.cart[i].product.id)
          }
        }
          // })
        self.cart = [];
        self.saveCart();
        $state.go('confirmation',{'orderId':newOrder.id})
      }
    }

    function updateFromCart(product,productId){
      api.request('/products/'+productId,product,'PUT')
      .then(function(res){
        console.log(res);
        if(res.status === 200){
          //product was updated successfully
          self.updateProductList(product,productId);
        }
      })
    }

    function saveOrders(){
      localStorage.orders = JSON.stringify(self.orders)
    }

    function loadOrders(){
      if(localStorage.orders != undefined){
        self.orders = JSON.parse(localStorage.orders)
      }
    }

    function deleteOrders(){
      console.log('delete orders')
      self.orders = [];
      localStorage.orders = JSON.stringify(self.orders);
    }

    function deleteAllProducts(){
      return getProducts()
      .then(function(products){
        console.log(products)
        for (var i = 0; i < products.length; i++) {
          self.deleteProduct(products[i].id)
        }
      })
    }

    function loadProducts(){
      console.log('load')
      return getProducts()
      .then(function(products){
        console.log(products)
        if(products.length == 0){
          console.log(PRODUCT_DATA.length)
          for(var i = 0;i < PRODUCT_DATA.length;i++){
            addProduct(PRODUCT_DATA[i]);
          }
        }
      })
    }
  }
})();

var CATEGORY_DATA = [{
  category:'accessories',
  description:'Tents - Sleeping Bags - Beds',
  image:'/assets/img/5.jpg',
},{
  category:'camping',
  description:'Tents - Sleeping Bags - Beds',
  image:'http://i2.cdn.turner.com/cnnnext/dam/assets/150724114946-5-super-43.jpg',
},{
  category:'clothing',
  description:'Tents - Sleeping Bags - Beds',
  image:'/assets/img/4.jpg'
},{
   category:'food',
  description:'Protein Bars - Pudding - Power Shakes',
  image:'/assets/img/bu3.jpg'
},{
  category:'pharmaceutical',
  description:'Tents - Sleeping Bags - Beds',
  image:'/assets/img/6.jpg'
},{
  category:'transportation',
  description:'Tents - Sleeping Bags - Beds',
  image:'/assets/img/bu1.jpg'
}]

var PRODUCT_DATA = [{
  "name": "Retreat 320 - 6 Person Tent",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/8/7/87155_retreat320_a_h43.jpg",
  "description": "The Retreat 320 6 PersonModule Tent delivers the perfect balance of durable construction, space and comfort. You’ll want to spend the entire summer in this tent: the living space isn’t just big, it’s HUGE, with three fully enclosed rooms and a back vestibule for storing gear. Spend the days hiking, biking and kayaking with the family, returning every night to sleep in comfort.",
  "category": "camping",
  "price": "1499.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Retreat 80 - 3 Person Tent",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/8/7/87152_retreat80_tent_a_h41_1.jpg",
  "description": "The Retreat 80 is the perfect weekend getaway tent for couples who want comfort and space to store their gear. Both front and rear vestibules offer storage for packs and other gear, while the unique top-arching pole maximizes interior living space and head-room. This tent is waterproof, durable and easy to pitch, with great air-flow, quick-zip windows and insect-proof mesh for extra comfort.",
  "category": "camping",
  "price": "239.99",
  "quantity": "5",
  "status": "1"
}, {
  "name": "Boreas - 3 Person Tent V2",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/5/0/50155_boreastent_v2_a_102.jpg",
  "description": "The Boreas is not your normal tent. The strong pole configuration uses a multitude of intersecting triangles to create a truly unique geodesic design - the more triangular elements in a pole structure, the sturdier and stronger the tent is for its weight. The Boreas' design is so unique we've registered it in New Zealand and Australia. Trust the Boreas to be your refuge when youre off exploring the back country, whether youre carrying it with you into the wilderness for ultimate four-season hiking freedom, or setting it up as a base while you explore the surrounding country. At just 3.98kg the Boreas won't slow you down on your adventures",
  "category": "camping",
  "price": "479.98",
  "quantity": "7",
  "status": "1"
}, {
  "name": "Emergency Shelter Red",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61214_EmergShel_403.png",
  "description": "Lightweight, waterproof emergency shelter. Ideal for hiking, water collection or signalling.",
  "category": "camping",
  "price": "9.99",
  "quantity": "1",
  "status": "1"
}, {
  "name": "Retreat Configure Wing Shelter - Warm Grey/Sunset",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/8/7/87158_retreatconfigurewing_h41_2.jpg",
  "description": "The Configure Wing is a lightweight, easy-to-pitch shelter that cleverly extends covered living space outside of our Retreat tents. Use it to join tents, create a communal outdoor living area, or storage space for bikes and other gear. The Configure Wing can also be used on its own as a stand-alone shelter.",
  "category": "camping",
  "price": " 99.98",
  "quantity": "1",
  "status": "1"
}, {
  "name": "Cabana Double Air Bed With Pump - Charcoal",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/8/2/82033_cabanaairbed_901.png",
  "description": "With minimum fuss, you can add a little luxury to your camping adventures with the Cabana Airbed. The easy-fit electric pump makes short work of inflation and deflation and the push button valve control allows you to find your perfect comfort level.",
  "category": "camping",
  "price": "271.98",
  "quantity": "2",
  "status": "1"
}, {
  "name": "Semi-Rectangular Down Sleeping Bag",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/5/1/51213_navigator_v7_b90.jpg",
  "description": "Natural duck down fill is an excellent insulator, and packs down small, making the Navigator Sleeping Bag lightweight and extremely compressible. An ideal bag for multi-day backpacking, camping and trips in colder climates.",
  "category": "camping",
  "price": "279.99",
  "quantity": "3",
  "status": "1"
}, {
  "name": "Rectangular Insulated Sleeping Bag V5",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/5/1/51209_pipsqueak_v5_a_h47.jpg",
  "description": "Ideal for warmer climates, the Pipsqueak is a rectangular sleeping bag for Kids'.",
  "category": "camping",
  "price": "111.98",
  "quantity": "4",
  "status": "1"
}, {
  "name": "Maison Folding Campbed V2",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/8/2/82047_maisoncampbedv2_b_997.jpg",
  "description": "After a busy day exploring you’ll have a great sleep on the Maison Folding Campbed v2. This sturdy, portable campbed is easy to set up, with a load capacity of 100kgs and it has a detachable pocket to hold your phone, torch and other essentials. Whether you’re looking to relax in camp, or need a spare bed at home for visitors, this campbed will give you a comfortable night’s sleep.",
  "category": "camping",
  "price": "80.00",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Retreat Hammock - Dark Navy",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/8/4/84197_retreathammock_632.jpg",
  "description": "Folding, portable hammock for home and camping. Side mesh book pocket for extra storage.",
  "category": "camping",
  "price": "119.99",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Mosquito Net",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/5/0/50156_mosquitonetsingle_000.jpg",
  "description": "Lightweight, transportable insect protection, easily suspended with ample coverage for single beds",
  "category": "camping",
  "price": "24.99",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Self Inflating Mat",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/5/1/51248_retreatsimat50_a_781.jpg",
  "description": "Comfort is king with our self-inflating Retreat 50mm mat. It's designed for three season campsite and car camping, with 50mm of thickness, a soft brushed polyester surface and a corrugated texture designed for anti-slip comfort. It also features snap domes that allow connection to another compatible mat, easily turning it from a single to a double.",
  "category": "camping",
  "price": "159.98",
  "quantity": "10",
  "status": "1"
}, {
                      //accessories
  "name": "Double Action Pump V2",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/8/2/82036_pumpv2_900.jpg",
  "description": "Ideal for use on all inflatables. Continuous stream pumps air on both up and down stroke.",
  "category": "accessories",
  "price": "19.99",
  "quantity": "1",
  "status": "1"
}, {
  "name": "Multi Tool - 14 in 1",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61221_multitool_14in1_925.jpg",
  "description": "Heavy duty, multi-function tool, with 14 unique tools to provide a wide range of form and function.",
  "category": "accessories",
  "price": "59.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Kids Telescope - Bright Green",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61023_kidstelescope_c42_1.jpg",
  "description": "Discover the world around you and explore the land, sea and sky up close!",
  "category": "accessories",
  "price": "79.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Talum Sunglasses",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61419_sg_talum_984.jpg",
  "description": "Men's Talum sunglasses comply with the mandatory requirements of the Australian and New Zealand standard AS/NZS 1067:2003.",
  "category": "accessories",
  "price": "89.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Waterproof Binoculars",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61216_binoculars_743.jpg",
  "description": "10x25 Waterproof binoculars with an easy-grip design.",
  "category": "accessories",
  "price": "99.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Backpacker Titanium Stove",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61004_StoveTitanium_911.png",
  "description": "Ultra-lightweight and compact the Titanium Backpacker Stove is invaluable when trekking. This robust, high output stove works with Gasmate screw type canisters to boil one litre of water in around three minutes at sea level, thanks to clever design features like its large stove head and straight fire design. This stove is easy to control, even while wearing winter gloves. Whether you’re a gourmet back-country cook or prefer instant noodles, the Titanium Backpacker Stove will have your meal ready to eat in no time.",
  "category": "accessories",
  "price": "139.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Head Torch Core 230 - Green/Black",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61522_torchcore230__653.jpg",
  "description": "Ideal for multi-day use on longer adventures. 3 x 1.5V AA Alkaline batteries included. Comfortable, bright, long lasting light. Cleverly balanced weight of the padded headlight & battery case, combined with a wide head-strap for more comfort over longer periods of wear.",
  "category": "accessories",
  "price": "179.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Cooler Box with Wheels - Grey",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/8/3/83158_coolerbox_900.jpg",
  "description": "For the ultimate in the cool convenience, take the Cooler Box with Wheels to your next picnic, party or outdoor event. It's durable, reliable and ultimately versatile and with multiple handles and wheels, super easy to lift from the car and get to your destination.",
  "category": "accessories",
  "price": "159.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Goal Zero Guide 10 Plus Kit - Black/Green",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61684_goalzeroguide10_a_c15.jpg",
  "description": "Power USB and battery devices from the sun. With the Guide 10 Plus Recharger and Nomad 7 Solar Panel, you have a portable, rugged charging kit as adventurous as you are. Charge AA or AAAs from the sun or any USB port, then power your phone, MP3, action cam or perk up your tablet in a pinch. Alternatively, remove the batteries to run battery-powered devices.",
  "category": "accessories",
  "price": "199.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Goal Zero Venture 30 Recharger - Black/Green",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61685_goalzeroventure30_a_c15.jpg",
  "description": "The Goal Zero Venture 30 Recharger is more than just a battery, it’s a lifeline to adventure, a conduit for exploration. Push the limits of your creativity and keep essentials charged and ready for what happens next – no matter the weather. The Venture 30’s advanced smart charging feature allows charging optimisation for specific devices and with pass-through charging you can refuel the Venture 30 and connected devices all at once. The Venture 30 Kit includes a Micro-USB Cable Tip.",
  "category": "accessories",
  "price": "189.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Bluetooth Travel Speaker - Azure",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61606_portablebttravelspeaker_015.jpg",
  "description": "Have music wherever you go with our Bluetooth Travel Speaker. Simply connect your audio device through Bluetooth to the speaker. It can also be used with micro SD cards, any audio device via the 3.5mm audio cable (included), or access the in-built FM radio for local music and news.",
  "category": "accessories",
  "price": "79.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Stainless Steel Drink Bottle",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61373_bottlessdblwallcurved_h31.jpg",
  "description": "Double wall stainless steel drink bottle keeps drinks cool for extended periods, perfect for juice and water",
  "category": "accessories",
  "price": "49.98",
  "quantity": "10",
  "status": "1"
}, {
                      //clothing
  "name": "Egyptian Kitty Mask",
  "image": "/assets/img/cat-mask.png",
  "description": "Handmade Materials: leather, acrylic painting, turquoise stone",
  "category": "clothing",
  "price": "260.38",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Purple Leather Swirly Mask",
  "image": "https://img0.etsystatic.com/000/0/5288709/il_570xN.203258642.jpg",
  "description": "Handmade Materials: leather, dye, elastic, sealant, paint",
  "category": "clothing",
  "price": "50.77",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Deer Antlers",
  "image": "https://img1.etsystatic.com/109/1/5961957/il_570xN.998285777_as39.jpg",
  "description": "Handmade Materials: resin, hair clip, acrylic paints, white ",
  "category": "clothing",
  "price": "110.20",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Tribal Belt",
  "image": "https://img1.etsystatic.com/076/1/8975597/il_570xN.812671583_13j7.jpg",
  "description": "Handmade feather coat",
  "category": "clothing",
  "price": "52.06",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Voodoo Priestess Headpiece",
  "image": "https://img1.etsystatic.com/102/1/7921682/il_570xN.839215227_7rnn.jpg",
  "description": "Handmade Materials: headband, dreadlocks and hair extensions classifieds, wooden beads and plastic rooster feathers, real bones, wool bags",
  "category": "clothing",
  "price": "345.01",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Fluffies Rave Warmers",
  "image": "/assets/img/fluff.png",
  "description": "Handmade Materials: synthetic leather, elastic",
  "category": "clothing",
  "price": "36.39",
  "quantity": "10",
  "status": "1"
}, {
                      //food
  "name": "QuestBar - Protein Bar",
  "image": "http://www.gnc.com/graphics/product_images/pGNC1-20829738t300x300.jpg",
  "description": "Chocolate Chip Cookie Dough Flavoured. Rice protein is extracted from rice and used in some protein supplements. Vegetarians may prefer it over protein supplements made from animal sources (such as whey or casein, which are milk proteins). Since rice is rarely involved in food allergies,1 rice protein may also be preferred by people with food allergies, and may be suitable to use in hypoallergenic infant formulas.2 Rice protein is not a complete protein, however, due to insufficient levels of the amino acids lysine and threonine.3, 4 Therefore, these amino acids are often added to rice protein products to correct this imbalance.",
  "category": "food",
  "price": "24.99",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Power Pak Pudding",
  "image": "http://www.gnc.com/graphics/product_images/pGNC1-10067049t300x300.jpg",
  "description": "Ready-to-eat Chocolate Power Pak Pudding will satisfy your sweet tooth and hunger while providing great nutrition. This delectable snack contains the highest quality protein from real milk protein isolate, as well as ultra-healthy soy protein isolate. It also is a great source of calcium, with a full 50% of Daily Value per single serving. Better yet, Power Pak Pudding is completely free from fattening high fructose corn syrup and unhealthy hydrogenated oils.",
  "category": "food",
  "price": "19.99",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Protein Power Shake",
  "image": "http://www.gnc.com/graphics/product_images/pGNC1-7033227t300x300.jpg",
  "description": "Cookies & Creme Flavoured. Protein is a great place to start, and focusing on getting the right types of protein, in the right amounts, and at the right times is key. Our protein supplement guide will help you meet your wellness goals, potentially improving your performance on the court, in the gym, or on the road.",
  "category": "food",
  "price": "56.99",
  "quantity": "10",
  "status": "1"
}, {
                      //pharmaceutical
  "name": "First Aid Kit - 2 Person - Red",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61262_aidkit2p_b_403.png",
  "description": "Two person first aid kit for emergencies",
  "category": "pharmaceutical",
  "price": "69.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Survival Kit Bottle - Orange",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/6/1/61231_SurvBottle_302.png",
  "description": "All-in-one survival kit bottle.",
  "category": "pharmaceutical",
  "price": "79.98",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Mosquito Head Net - Black",
  "image": "http://www.kathmandu.co.nz/media/catalog/product/cache/1/image/450x/9df78eab33525d08d6e5fb8d27136e95/5/0/50150_mosquitoheadnet_b_902.jpg",
  "description": "Ideal for camping, fishing or tramping. Lightweight and comfortable. Fine, untreated mesh provides safe, effective and easy protection against insects.",
  "category": "pharmaceutical",
  "price": "14.98",
  "quantity": "10",
  "status": "1"
}, {
                      //transportation
  "name": "Mixed Tape Bicycle (Unisex)",
  "image": "http://images.mec.ca/fluid/customers/c822/5039-273/generated/5039-273_SIL03_view1_720x720.jpg",
  "description": "A nice compilation of components and the bonus track is the Nexus 7-speed internal hub from Shimano®. The internal hub allows you to switch gears anytime (stopped or moving) and requires much less maintenance than a bike with an external drivetrain. The Nexus 7 gives you extra gears to drop into when you're going up hills or carrying a 5kg sack of apples. Revo shifters have a simple, fluid action and a large indicator to show you what gear you're currently in. The Mixed Tape will sound fine for anyone with a relatively flat 9 to 5 commute, who rides through cross town traffic, and mixes in the occasional rolling country road.<",
  "category": "transportation",
  "price": "695.00",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Ghost Powerkid 20 Bicycle - Youths",
  "image": "http://images.mec.ca/fluid/customers/c822/5043-749/generated/5043-749_CYN28_view1_720x720.jpg",
  "description": "The Ghost Powerkid 20 is a super-solid bike that will help young riders learn to stomp hills and float trails. Built with reliable components from trustworthy brands, the frame is light, the shifting is smooth, and the braking is precise and consistent. RST shocks smooth out bumps and roughness, making the ride feel more predictable and helping the rider feel in control. The Powerkid series is an excellent base for building confidence and honing cross-country riding skills.",
  "category": "transportation",
  "price": "425.00",
  "quantity": "10",
  "status": "1"
},{
  "name": "Viva Juliett Classic City Bike",
  "image": "http://images.mec.ca/fluid/customers/c822/5042-007/generated/5042-007_MLL07_view1_720x720.jpg",
  "description": "With a classic design and vintage esthetic, Viva Bikes does more than just offer up a good-looking ride. A stylish way to commute and arrive at any social engagement, the Juliett Classic is equipped with a 3-speed internally geared hub. It has no exposed derailleur nor all the grease and maintenance that goes with it. You can shift gears at a standstill, taking the work out of moving away from a light because you couldn't shift down from high gear. The low step-through cross bar makes it comfortable and practical. The long-lasting steel frame ensures the integrity of your bike, so you'll be riding it years from now.",
  "category": "transportation",
  "price": "550.00",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Runners Aluminum Push Bicycle - Children to Youths",
  "image": "http://images.mec.ca/fluid/customers/c822/5028-323/generated/5028-323_NOC02_view1_720x720.jpg",
  "description": "Since this bike has no pedals or training wheels, kids have to use their legs for balance and movement. This exercise encourages quicker learning and makes the transition to a bicycle with pedals much easier because they've already honed their balance and motor skills.",
  "category": "transportation",
  "price": "119.00",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Ridley Fenix SL 30",
  "image": "http://images.mec.ca/fluid/customers/c822/5044-399/generated/5044-399_BK493_view1_720x720.jpg",
  "description": "The Fenix is reborn. With a revamped frame that's 15% lighter and 8% stiffer than its predecessor, the SL blurs the lines between race bike and endurance bike like no other. A uniquely layered carbon fibre frame creates a responsive, comfortable ride. On high-spirited KOM attempts or finish line sprints, the tapered headtube and massive pressfit BB create a direct transfer between you and the road. Detour onto logging roads, and the Fenix's endurance roots come alive. When descending rough backroads, the flattened chainstays and tire clearance (up to 30mm) offer a compliant ride without sacrificing race-ready stiffness. Equipped with one of the best gruppos around, it gets a reliable, responsive and impossibly cool, 11-speed Shimano Ultegra Di2 shift setup that sets the standard for electronic shifting performance. When coming in hot to technical hairpins, the Ultegra brakes produce a confidence-inspiring balance catch-free power and nuanced modulation. Details make a bike special, so Ridley opted to adorn the Fenix with a host of proven 4ZA aluminum components to tie this sick ride together.",
  "category": "transportation",
  "price": "4850.00",
  "quantity": "10",
  "status": "1"
}, {
  "name": "Origami Bicycle",
  "image": "http://images.mec.ca/fluid/customers/c822/5047-033/generated/5047-033_GRY00_view1_720x720.jpg",
  "description": "A folding bike is superb for multi-modal commuting: it stores in your closet, packs up for your train ride and stashes under your desk at work. Cruise it to a party and when it's time to leave, tuck it under your arm and grab a taxi home. You can even toss it in the car when you're heading out camping. The Origami outrides ordinary folders with superior hinging and a stiff frame that neither flexes nor creaks. Internal hub gearing reduces grease transfer whether you’re riding it or carrying it. Built-in fenders ensure rain won’t slow you down.",
  "category": "transportation",
  "price": "700.00",
  "quantity": "10",
  "status": "1"
}]
