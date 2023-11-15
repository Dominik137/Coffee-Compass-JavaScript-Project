fetch('http://localhost:3000/shops')
.then((resp) =>resp.json())
.then((shops) => {

    shopMap.style.display = "none"
    

// fetch random coffee image from external API and display on main page
//     fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=coffee&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`) 
//     .then(r => r.json())
//     .then(gifs => {
        
//         const randomCoffee = gifs.data[Math.floor(Math.random() * 25)]
//         const randomCoffeeImg = randomCoffee.images.original.url
//         globalImg.src = randomCoffeeImg
                
// })

    shops.forEach(shop => {
        shopNavBar(shop)
})


    });
    const currentDate = new Date();
    const currentTimeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const time = parseFloat(currentTimeString)
    
    const globalName = document.querySelector('#shopTitle')
    const globalImg = document.querySelector('#shopImage')
    const globalSpaceRating = document.querySelector('#shopSpaceRating')
    const globalWifi = document.querySelector('#shopWifi')
    const globalTime = document.querySelector("#shopTime")
    const webLink = document.querySelector("#webLink")
    const globalHours = document.querySelector('#showHours')


    const shopMap = document.querySelector("#shopMap")    

    const mapLink = document.createElement("script")
    mapLink.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&callback=initMap`
    shopMap.append(mapLink)

function shopNavBar(shop){
    const navImg = document.querySelector('#shopList')
    const div = document.createElement('div')
    const img = document.createElement('img')
    div.append(img)
    navImg.append(div)
    img.src = shop.img
//creats the images for the different shops and displays them in our navbar!
    img.addEventListener('mouseover', ()=>{
        nameMouseOver(shop, div)
        displayHours(shop, div)
    }, 
    // { once: true }
    )
    img.addEventListener('click', ()=>{
        const openingTime = shop.opening
        const closingTime = shop.closing
        
        if (time >= openingTime && time <= closingTime) {
            globalHours.textContent = "Open"
        } else {
            globalHours.textContent = "Closed";
            
        }
        shopInfo(shop)
        shopMap.style.display = "block"
        

    })
 

}


function shopInfo(shop) {
    
    globalName.textContent = shop.name
    globalImg.src = shop.img
    globalSpaceRating.textContent = `Space rating: ${shop.space_rating}`


    webLink.href = shop.website
  

    if (shop.wifi === true) {
        globalWifi.textContent = "Wifi",
        globalWifi.style.color = "#549c30"
        globalWifi.style.backgroundColor = "#d1ffbd"
    } else {
        globalWifi.textContent = "No Wifi";
        globalWifi.style.color = "#cc3232";
        globalWifi.style.backgroundColor = "#ffc9bb"
    }
        
    //global variable for use everywhere
    currentShop = shop

    initMap(shop)

}


function nameMouseOver(shop, div){
    const h1 = document.createElement('h1')
    // document.querySelector("#shopList").append(h1)
    div.append(h1)
    h1.textContent = shop.name
    h1.className = "shopNameh1"

    div.addEventListener('mouseout', function () {
        // Set text content to an empty string when the mouse leaves
        h1.textContent = ''
    })
};

//event listener for 'add new coffee shop' form, updates in frontend and backend
const newCoffeeShopForm = document.querySelector("#coffeeStoreInput")
newCoffeeShopForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const newShop = {
        name: e.target["new-name-input"].value,
        img: e.target["new-img-input"].value,
        space_rating: e.target["new-space-rating-input"].value,
        opening: e.target["new-opening-input"].value,
        closing: e.target["new-closing-input"].value,
        website: e.target["new-website-input"].value,
        latitude: parseFloat(e.target["new-latitude-input"].value),
        longitude: parseFloat(e.target["new-longitude-input"].value),
        wifi: e.target["new-wifi-input"].checked,
        
    }

    initMap(newShop)
    shopInfo(newShop)
    shopNavBar(newShop)
    

    newCoffeeShopForm.reset()

    fetch(`http://localhost:3000/shops`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": newShop.name,
            "img": newShop.img,
            "latitude": newShop.latitude,
            "longitude": newShop.longitude,
            "space_rating": newShop.space_rating,
            "wifi": newShop.wifi,
            "opening": newShop.opening,
            "closing": newShop.closing,
            "website": newShop.website
        })
    })
})



function displayHours(shop, div){
    const h2 = document.createElement('h2')
    div.append(h2)
    h2.className = 'shopHoursh2'
    const openingTime = shop.opening
    const closingTime = shop.closing
    
    if (time >= openingTime && time <= closingTime) {
        h2.textContent = "Open";
        // globalHours.textContent = "Open"
    } else {
        h2.textContent = "Closed";
        // globalHours.textContent = "Closed";
        

    }
    div.addEventListener('mouseout', function () {
        // Set text content to an empty string when the mouse leaves
        h2.textContent = ''
    })
}

