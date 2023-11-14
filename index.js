fetch('http://localhost:3000/shops')
.then((resp) =>resp.json())
.then((shops) => {


// fetch random coffee image from external API and display on main page
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=coffee&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`) 
    .then(r => r.json())
    .then(gifs => {
        
        const randomCoffee = gifs.data[Math.floor(Math.random() * 25)]
        const randomCoffeeImg = randomCoffee.images.original.url
        globalImg.src = randomCoffeeImg
                
})

    shops.forEach(shop => {
        shopNavBar(shop)
})

    });

    

    const globalName = document.querySelector('#shopTitle')
    const globalImg = document.querySelector('#shopImage')
    const globalDistance = document.querySelector('#shopDistance')
    const globalSpaceRating = document.querySelector('#shopSpaceRating')
    const globalWifi = document.querySelector('#shopWifi')
    const globalComments = document.querySelector('#shopComments')

    const welcomeText = document.createElement("p")
    globalImg.append(welcomeText)


function shopNavBar(shop){
    const navImg = document.querySelector('#shopList')
    const img = document.createElement('img')
    navImg.append(img)
    img.src = shop.img
//creates the images for the different shops and displays them in our navbar!
    img.addEventListener('mouseover', ()=>{
        nameMouseOver(shop)
    }, { once: true })
    img.addEventListener('click', ()=>{
        shopInfo(shop)
    })
}

function shopInfo(shop){
    
    globalName.textContent = shop.name
    globalImg.src = shop.img
    globalDistance.textContent = `${shop.distance} Miles`
    globalSpaceRating.textContent = `Space rating: ${shop.space_rating}`
    globalWifi.textContent = `Has Wifi: ${shop.wifi}`
    globalComments.textContent = shop.comments

    //global variable for use everywhere
    currentShop = shop

}

function nameMouseOver(shop){
    const navImg = document.querySelector('#shopList')
    const h1 = document.createElement('h1')
    navImg.append(h1)
    h1.textContent = shop.name
}

//event listener for 'add new coffee shop' form, updates in frontend and backend
const newCoffeeShopForm = document.querySelector("#coffeeStoreInput")
newCoffeeShopForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const newShop = {
        name: e.target["new-name-input"].value,
        img: e.target["new-img-input"].value,
        distance: e.target["new-distance-input"].value,
        space_rating: e.target["new-space-rating-input"].value,
        wifi: e.target["new-wifi-input"].value,
    }

    shopInfo(newShop)

    newCoffeeShopForm.reset()

    const navImg = document.querySelector('#shopList')
    const img = document.createElement('img')
    navImg.append(img)
    img.src = newShop.img

    fetch(`http://localhost:3000/shops`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": newShop.name,
            "img": newShop.img,
            "distance": newShop.distance,
            "space_rating": newShop.space_rating,
            "wifi": newShop.wifi
        })
    })
})
