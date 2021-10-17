(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        // setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let noon = "EL";

            if (h > 11) {
                noon = "PL";
            }

            if (h > 12) {
                h -= 12;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + noon;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let eesnimi = document.getElementById("fname").value;
        let perenimi = document.getElementById("lname").value;
        let linn = document.getElementById("linn");
        let kingitus = document.getElementById("v1").checked;
        let kontaktivaba = document.getElementById("v2").checked;
        let hind = 0.0;
        let korrus = document.getElementsByName("korrus");
        let teine_korrus = document.getElementById("teine").checked;
        let kolmas_korrus = document.getElementById("kolmas").checked;
        let kõrgem_korrus = document.getElementById("muu").checked; 
        let korrus_valitud = false;
        let regex=/^[0-9]+$/; //siin kõik numbrid, kui eesnimi.match(regex) on true, siis sisaldab see numbreid... 

        function korrusevalik() {
            for (let i = 0; i < korrus.length; i++){
                if (korrus[i].checked) {
                    korrus_valitud = true;
                    return;
                }
            }
        }

        korrusevalik();

        if (eesnimi == "" || eesnimi.match(regex) || perenimi == "" || perenimi.match(regex)) {
           
            alert("Palun sisestage korrektselt oma nimi.");

            return;
        }
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } 
        if (korrus_valitud == false) {

            alert("Palun valige korrus, kuhu soovite tarnet.");

            return;
        }
        else {
            linn = document.getElementById("linn").value;
            if (kingitus == true) {
                hind += 5;
            }

            if (kontaktivaba == true) {
                hind += 1;
            }

            if (teine_korrus == true) {
                hind += 0.5;
            }

            if (kolmas_korrus == true) {
                hind += 1;
            }

            if (kõrgem_korrus == true) {
                hind += 2;
            }

            switch (linn) {
                case "tln": hind += 0; break;
                case "trt": hind += 2.5; break;
                case "nrv": hind += 2.5; break;
                case "prn": hind += 3; break;
               
            }


            e.innerHTML = hind + " &euro;";
            hind = 0;
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }

    
    
})();

// map

let mapAPIKey = "AmPE6rY2LYSgGFjFLcr97xmzBS1IEWb1l-u2_SWKqw5VqpY_SP6xE2OTnT7FGJ4y";

let map;
let infobox;

function GetMap() {
    
    "use strict";

    let point = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    let point2 = new Microsoft.Maps.Location(
            58.486046, 
            26.681205
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center:new Microsoft.Maps.Location( 58.43551, 26.68007),
        zoom: 11,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(point, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    pushpin.metadata = {
            title: 'Tartu Ülikool',
            description: 'Hea koht'
        };
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);

    let pushpin2 = new Microsoft.Maps.Pushpin(point2, {
            title: 'Kalapüük',

        });

    pushpin2.metadata = {
            title: 'Kalapüük',
            description: 'Hea koht kalastamiseks. Saab auto parkida ja sealsamas kala püüda'
        };
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

    map.entities.push(pushpin);
    map.entities.push(pushpin2);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

