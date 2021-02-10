let allUrl = 'https://pokeapi.co/api/v2/pokemon/' 
let namePokemonBase = 'https://pokeapi.co/api/v2/pokemon/'

async function getallPokemon(url){
    return await new Promise((resolve, reject) => {
        $.ajax( {url}).done(resolve).catch(reject) 
    })
}

function getPokemen(url){
    return new Promise((resolve, reject) => {
        $.ajax({url}).done(resolve).catch(reject) 
    })
}
let next = ''
let prev = ''

getallPokemon(allUrl)
    .then((namePokemon) =>{
        next = namePokemon.next
        prev = namePokemon.previous

        namePokemon.results.forEach(element => {
            let card = $('<div>').addClass('card').text(element.name)
            $('.wrap_cards').append(card)
        });
        clickCard()
        clickNext()
    })

function clickCard(){
    $('.card').click(function (){
        let cardText = $(this)[0].innerText
        
        getPokemen(namePokemonBase + cardText)
            .then((pokemon) => {
                $('.pok').remove()

                let img = $(`<img src ='${pokemon.sprites.front_default}'>`)
                let name = $(`<span class='pok'>${pokemon.name}</span>`).css({float: 'right'})
                let type = $(`<span class='pok'>${pokemon.types[0].type.name}</span>`).css({float: 'right'})
                let size = $(`<span class='pok'>${pokemon.height}</span>`).css({float: 'right'})
                let weight = $(`<span class='pok'>${pokemon.weight}</span>`).css({float: 'right'})
                
                // console.log(pokemon);

                $('.img').html(img)
                $('.name').append(name)
                $('.type').append(type)
                $('.size').append(size)
                $('.weight').append(weight)

            })
    })
}

function clickNext(){
    $('.next').click(() => {
        getallPokemon(next)
            .then((namePokemon) =>{
                $('.card').remove()
                next = namePokemon.next
                prev = namePokemon.previous
                namePokemon.results.forEach(element => {
                    let card = $('<div>').addClass('card').text(element.name)
                    $('.wrap_cards').append(card)
                });
                clickCard()
                clickPrev()
            })

    })    
}


function clickPrev(){
    $('.prev').click(() => {
        getallPokemon(prev)
            .then((namePokemon) =>{
                $('.card').remove()
                next = namePokemon.next
                prev = namePokemon.previous
                namePokemon.results.forEach(element => {
                    let card = $('<div>').addClass('card').text(element.name)
                    $('.wrap_cards').append(card)
                });
                clickCard()
            })
    }) 
}


