fetch('http://localhost:3000/shops')
.then((resp) =>resp.json())
.then((shops) => {
    shops.forEach(shop => {
        shopNavBar(shop)
    });


})

function shopNavBar(shop){
    const navImg = document.querySelector('#shopList')
    const img = document.createElement('img')
    navImg.append(img)
    img.src = shop.img
//creats the images for the different shops and displays them in our navbar!

    img.addEventListener('click', ()=>{
        shopInfo(shop)
    })
}

function shopInfo(shop){
    const title = document.querySelector('#shopTitle')
    const img = document.querySelector('#shopImage')
    const distance = document.querySelector('#shopDistance')
    const spaceRating = document.querySelector('#shopSpaceRating')
    const roastery = document.querySelector('#isShopRoastery')
    const wifi = document.querySelector('#shopWifi')
    const comments = document.querySelector('#shopComments')
    title.textContent = shop.name
    img.src = shop.img
    distance.textContent = `${shop.distance} Miles`
    spaceRating.textContent = `Space rating: ${shop.space_rating}`
    roastery.textContent = `Is Roastery: ${shop.roastery}`
    wifi.textContent = `Has Wifi: ${shop.wifi}`
    comments.textContent = shop.comments

}