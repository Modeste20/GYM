

let visitorIsMan = true;

const sexElement = document.getElementById('sexe');
const priceElement = document.querySelectorAll('.card-price > .price');

const priceForWomen = [
    {
        man:"1.5 $",
        woman:"1 $"
    },
    {
        man:"10 $",
        woman:"7 $"
    },
    {
        man:"150 $",
        woman:"90 $"
    }
]

const ChangePriceBySex = function (visitorIsMan){
    const key = visitorIsMan ? 'man' : 'woman'
    priceElement.forEach((element,index) => {
        element.innerHTML = priceForWomen[index][key]
    })
}

sexElement.addEventListener('click',(e) => {
    visitorIsMan = !visitorIsMan;

    const activeElement  = e.currentTarget.querySelector('.active');
    
    activeElement && activeElement.classList.remove('active')

    ChangePriceBySex(visitorIsMan);
    if(visitorIsMan){
        e.currentTarget.querySelector('#man').classList.add('active')
    }else{
        e.currentTarget.querySelector('#woman').classList.add('active')
    }
})



