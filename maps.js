

function initMap(variableShop) {

    let shopPosition = { lat: variableShop.latitude, lng: variableShop.longitude};
    console.log(variableShop)    

    let map = new google.maps.Map(
        document.querySelector("#shopMap"), {zoom: 15, center: shopPosition}
    
        )
    let marker = new google.maps.Marker({position:shopPosition, map:map}) 

    
         }

