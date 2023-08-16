

const menuHamburger = document.getElementById('menu-hamburger');
const headerNavigation = document.querySelector('header.header .header-navigation');
const menuTimes = document.querySelector('header.header .header-navigation .times');


//Close Navbar

const closeNavbar = function () {
    if(document.body.classList.contains('menu-open')){
        document.body.classList.remove('menu-open')
    }
}


menuHamburger.addEventListener('click',(e) => {
    e.preventDefault()
    e.stopPropagation()
    document.body.classList.add('menu-open')
})

menuTimes.addEventListener('click',(e) => {
    e.preventDefault()
    e.stopPropagation()
    closeNavbar()
})

document.body.addEventListener('click',() => {
    if(document.body.classList.contains('menu-open')){
        closeNavbar()
    }
    
})

//Fetching;

console.log(window.location.pathname);
fetch('/',{
    method:'HEAD'
})
.then(res => {
    console.log('status',res.status)
})


    

headerNavigation.addEventListener('click',(e) => e.stopPropagation())

// Code javascript pour le carousel 

const carouselContainer = document.querySelector('.temoignages .carousel .carousel-items ul');
const carouselContainerChildrenLength = carouselContainer.children.length

carouselContainer.style.setProperty('--n',carouselContainerChildrenLength)

let x0;
let i = 0;


const unify = (e) =>{
    return e.changedTouches ? e.changedTouches[0] : e
} 

const lock = (e) =>{
    console.log(e.type)
    x0 = unify(e).clientX;
    console.log(x0)
}

const move = (e) =>{
    console.log(e.type);
    if(x0 || x0 === 0){
        let dx = Math.sign(unify(e).clientX - x0);
        if((i > 0 || dx < 0) && (i< carouselContainerChildrenLength -1 || dx>0)){
            carouselContainer.style.setProperty('--i', i-=dx);
        }
        if((i == carouselContainerChildrenLength - 1) && (dx<0)){
            i=0;
            carouselContainer.style.setProperty('--i', 0);
        }
        if(i == 0 && dx>0){
            i=carouselContainerChildrenLength - 1;
            carouselContainer.style.setProperty('--i', carouselContainerChildrenLength - 1);
        }
        x0=null;
        addActiveClassToDots(i)
        setBackgroundToContainer(i)
    }
}


carouselContainer.addEventListener('mousedown',lock)
carouselContainer.addEventListener('touchstart',lock)

carouselContainer.addEventListener('mouseup',move)
carouselContainer.addEventListener('touchend',move)

//Handle of carousel prev and next

const arrowLeft = document.querySelector('.temoignages .carousel .arrow-left');
const arrowRight = document.querySelector('.temoignages .carousel .arrow-right');

let arrowLeftIsClicked = false

arrowLeft.addEventListener('click',() => {
    console.log(i)
    if(i === 0){
        carouselContainer.style.setProperty('--i', i = carouselContainerChildrenLength - 1);
    } else{
        if(i>0 && i<=carouselContainerChildrenLength -1){
            carouselContainer.style.setProperty('--i', i-=1);
        }
    }
    addActiveClassToDots(i)
    setBackgroundToContainer(i)
    
})

arrowRight.addEventListener('click',() => {
    console.log(i)
    if(i === carouselContainerChildrenLength - 1){
        carouselContainer.style.setProperty('--i', i = 0);
    } else{
        if(i>=0 && i<carouselContainerChildrenLength){
            carouselContainer.style.setProperty('--i', i+=1);
        }
    }
    addActiveClassToDots(i)
    setBackgroundToContainer(i)
})

//Ajouter les points en bas du carousel selon le nombre d'enfants que contient la liste de carousel
console.log(carouselContainerChildrenLength)
const array = Array.from({length:carouselContainerChildrenLength},(i,index)=>index);
array.forEach(number => {
    const div = document.createElement('div')
    div.className='dot dot-'+number;
    div.addEventListener('click',(e) => {
        e.stopPropagation()
        const activeDots = document.querySelector('.temoignages .carousel .carousel-dots .dot.active');
        if(activeDots){
            activeDots.classList.remove('active')
        }
        e.currentTarget.classList.add('active')
        carouselContainer.style.setProperty('--i', number);
        setBackgroundToContainer(number)
    })
    const carouselDots = document.querySelector('.temoignages .carousel .carousel-dots');
    if(carouselDots){
        carouselDots.appendChild(div)
    }
})
console.log(i+' iiii')

const addActiveClassToDots = (index) =>{
    const allDots = document.querySelectorAll('.temoignages .carousel .carousel-dots .dot')
    const activeDots = document.querySelector('.temoignages .carousel .carousel-dots .dot.active');
    if(activeDots){
        activeDots.classList.remove('active')
    }
    for(const i of allDots){
        if(parseInt(i.className.split('-')[1],0) === index){
            i.classList.add('active')
        }
    }
}

addActiveClassToDots(i)

// Background images

const backgroundImages = ['./medias/images/home/testimonials/vicky-hladynets.jpg','./medias/images/home/testimonials/christopher-campbell.jpg',
                        './medias/images/home/testimonials/jake-nackos.jpg','./medias/images/home/testimonials/nicolas-horn.jpg'];

const temoignages = document.querySelector('.temoignages');
temoignages.style.backgroundImage = 'url('+backgroundImages[0]+')';

const setBackgroundToContainer = (i) => {
    temoignages.style.backgroundImage = 'url('+backgroundImages[i]+')';
}