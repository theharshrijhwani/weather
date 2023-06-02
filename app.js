window.addEventListener('load', () => {
    let long;
    let lat;

    let temperatureDescritpion = document.querySelector(".temperature-description")
    let temperatureDegree = document.querySelector('.temperature-degree')
    let temperatureCity = document.querySelector('.location-city')
    let icon = document.getElementById('icon')
    const temperatureSpan = document.querySelector('.temperature-section span')


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            console.log(lat)
            console.log(long)

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6fc719529e6f94806ff6fed3e02a7ae3`

            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    console.log(data['main']['feels_like'])
                    let temp = Number(data['main']['feels_like'])
                    let final = temp - 273
                    console.log(final)
                    temperatureDegree.textContent = final.toFixed(2)
                    temperatureDescritpion.textContent = data['weather']['0']['description']
                    temperatureCity.textContent = `${data['name']}/${data['sys']['country']}`
                    let imgCode = data['weather'][0]['icon']
                    let img = document.createElement('img')
                    const urlIMG = `https://openweathermap.org/img/wn/${imgCode}@2x.png`
                    img.src = urlIMG
                    icon.append(img)

                    let far = (final*9/5)+32

                    temperatureSpan.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent=='C'){
                            temperatureSpan.textContent='F'
                            temperatureDegree.textContent = far.toFixed(2)
                        }
                        else{
                            temperatureSpan.textContent='C'
                            temperatureDegree.textContent = final.toFixed(2)
                        }
                    })
                })
        })
    }
})