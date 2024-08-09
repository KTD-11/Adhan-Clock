
dictionary = {
    1 : 7,
    2 : 286,
    3 : 200,
    4 : 176,
    5 : 120,
    6 : 165,
    7 : 206,
    8 : 75,
    9 : 129,
    10 : 109,
    11 : 123,
    12 : 111,
    13 : 43,
    14 : 52,
    15 : 99,
    16 : 128,
    17 : 111,
    18 : 110,
    19 : 98,
    20 : 135,
    21 : 112,
    22 : 78,
    23 : 118,
    24 : 64,
    25 : 77,
    26 : 227,
    27 : 93,
    28 : 88,
    29 : 69,
    30 : 60,
    31 : 34,
    32 : 30,
    33 : 73,
    34 : 54,
    35 : 45,
    36 : 83,
    37 : 182,
    38 : 88,
    39 : 75,
    40 : 85,
    41 : 54,
    42 : 53,
    43 : 89,
    44 : 59,
    45 : 37,
    46 : 35,
    47 : 38,
    48 : 29,
    49 : 18,
    50 : 45,
    51 : 60,
    52 : 49,
    53 : 62,
    54 : 55,
    55 : 78,
    56 : 96,
    57 : 29,
    58 : 22,
    59 : 24,
    60 : 13,
    61 : 14,
    62 : 11,
    63 : 11,
    64 : 18,
    65 : 12,
    66 : 12,
    67 : 30,
    68 : 52,
    69 : 52,
    70 : 44,
    71 : 28,
    72 : 28,
    73 : 20,
    74 : 56,
    75 : 40,
    76 : 31,
    77 : 50,
    78 : 40,
    79 : 46,
    80 : 42,
    81 : 29,
    82 : 19,
    83 : 36,
    84 : 25,
    85 : 22,
    86 : 17,
    87 : 19,
    88 : 26,
    89 : 30,
    90 : 20,
    91 : 15,
    92 : 21,
    93 : 11,
    94 : 8,
    95 : 8,
    96 : 19,
    97 : 5,
    98 : 8,
    99 : 8,
    100 : 11, 
    101 : 11,
    102 : 8,
    103 : 3,
    104 : 9,
    105 : 5,
    106 : 4,
    107 : 7,
    108 : 3,
    109 : 6,
    110 : 3,
    111 : 5,
    112 : 4,
    113 : 5,
    114 : 6,
}

let clock = document.querySelector('.notAyah > h1'), fajr = document.getElementById('Fajr'), dhuhr = document.getElementById('Dhuhr'), asr = document.getElementById('Asr'), maghrib = document.getElementById('Maghrib'), isha = document.getElementById('Isha');
let PopUp = document.getElementById('toAyah');

function httpGetAyah(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    const textAyah = JSON.parse(xmlHttp.responseText).data.text;
    return textAyah;
}

function getAdhan()
{
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let date = new Date()

        console.log(String(lat) + ' ' + String(long))
    
        var xmlHttp2 = new XMLHttpRequest();
        xmlHttp2.open( "GET",  `http://api.aladhan.com/v1/calendar/${date.getFullYear()}/${date.getMonth()+1}?latitude=${lat}&longitude=${long}&method=5`, false );
        xmlHttp2.send( null );
        
        let Jsp = JSON.parse(xmlHttp2.responseText).data[date.getDay()+1].timings;
        fajr.innerText = Jsp.Fajr, dhuhr.innerText = Jsp.Dhuhr, asr.innerText = Jsp.Asr, maghrib.innerText = Jsp.Maghrib, isha.innerText = Jsp.Isha;
        

        function closer()
        {
            let hours = date.getHours(), minutes = date.getMinutes();
            if (minutes === 0)
            {
                minutes = `0${minutes}`;
            }

            let arr = [Jsp.Fajr, Jsp.Dhuhr, Jsp.Asr, Jsp.Maghrib, Jsp.Isha, `${hours}:${minutes}`], prayers = [fajr, dhuhr, asr, maghrib, isha]
        
            let closest = arr[arr.sort().indexOf(`${hours}:${minutes}`)+1]

            for (let x in prayers)
            {
                if (closest === prayers[x].innerText)
                {
                    prayers[x].parentElement.style.color = 'rgb(100, 76, 76)'
                }
           
            }
        }

        closer()
        setInterval(closer(), 6000)
    });  
}

function getTime()
{
    let date2 = new Date(), hours = date2.getHours(), minutes = date2.getMinutes();
    if (minutes === 0)
    {
        minutes = `0${minutes}`;
    }
    clock.innerText = `${hours}:${minutes}`;
}

getTime()

setInterval(()=>{
    let date2 = new Date(), hours = date2.getHours(), minutes = date2.getMinutes();
    if (minutes <= 10)
    {
        minutes = `0${minutes}`;
    }
    clock.innerText = `${hours}:${minutes}`;
}, 3000);

getAdhan()

PopUp.addEventListener('click', ()=>{

    let surah = Math.floor(Math.random() * Object.keys(dictionary).length);

    while (surah === 0)
    {
        surah = Math.floor(Math.random() * Object.keys(dictionary).length);
    }

    let ayah = Math.floor(Math.random() * dictionary[surah]);
    
    while (ayah === 0)
    {
        ayah = Math.floor(Math.random() * dictionary[surah]);
    }

    reference = `${surah}:${ayah}`
    
    Swal.fire({
        title: reference,
        text:httpGetAyah(`http://api.alquran.cloud/v1/ayah/${reference}/ar`),
        buttons : false,
        footer : 'Translation : ' + httpGetAyah(`http://api.alquran.cloud/v1/ayah/${reference}/en.asad`),
    });
});