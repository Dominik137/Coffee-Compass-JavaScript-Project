





// function initMap() {

//     let position = { lat: 39.7535486, lng: -104.9973915};
//     let map = new google.maps.Map(
//         document.querySelector("#shopMap"), {zoom: 15, center: position}

//     )
//     let marker = new google.maps.Marker({position:position, map:map}) 

//     return map

//      }

     function initMap(variableShop) {

        let position = { lat: variableShop.latitude, lng: variableShop.longitude};
        let map = new google.maps.Map(
            document.querySelector("#shopMap"), {zoom: 15, center: position}
    
        )
        let marker = new google.maps.Marker({position:position, map:map}) 
    
        return map
    
         }