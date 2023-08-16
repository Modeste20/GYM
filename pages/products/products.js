

const productsContainer = document.getElementById('products');

//Get products from backend

let products = [];
let loading=  false;

const getProducts = async function (){

    try{
        
        loading = true;

        const res = await fetch('./products.data.json');
        const data =await res.json();

        loading = false;
        products = data;

        createProductCard(loading,products)

    } catch(err){
        loading = false;
        products = [];
    }

}

getProducts();

//Modal : open and close

const modal = document.querySelector('main .modal');


const openModal = (product) => {
    modal.querySelector('.modal-container .content').innerHTML = `

        <div class="image">
            <img src="./../../medias/images/products/${product.image}" alt="${product.name}">
        </div>
        <div class="product-description">
            <h3>${product.name}</h3>
            <div class="review"><b>${product.rate}</b> | <span>${product.nbreOfRating} Avis</span></div>
            <div class="price">
                <ins>${product.price}</ins>
                <del>${product.priceBeforeReduction}</del>
            </div>
            <p class="description">
                ${product.description}
            </p>
            <button class='cta-button'>Order Now</button>
        </div>
    
    `

    modal.classList.remove('hidden');
    
}

const closeModal = () => {
    if(modal && !modal.classList.contains('hidden')){
        modal.classList.add('hidden')
    }
}

modal.querySelector('.modal-container').addEventListener('click',(e) => e.stopPropagation());
modal.querySelector('.modal-container .times').addEventListener('click',() => closeModal())

//Create product cards inside productsContainer

const createProductCard = function (loading,products){

    if(loading){
        productsContainer.style.display='block';
        productsContainer.innerHTML = "<div class='no-result' style='text-align:center;width:100%;margin-top:70px'><b>Loading of products !</b></div>"
    } else{
        if(products.length){
            products.forEach((product) => {

                const {name,price,rate,image,nbreOfRating,brand,priceBeforeReduction} = product

                const article = document.createElement('article');
                article.className='card';
                article.innerHTML=`
                        <div class="card-image">
                            <img src="./../../medias/images/products/${image}" alt="${name}">
                        </div>
                        <div class="card-header">
                            <h3>${name}</h3>
                            <div class="review"><b>${rate}</b> (${nbreOfRating})</div>
                        </div>
                        <div class="card-body">
                            <span>${brand}</span>
                            <div class="price">
                                <ins>${price}</ins>
                                <del>${priceBeforeReduction}</del>
                            </div>
                            <button class='cta-button'>Read More</button>
                        </div>

                `;

                productsContainer.appendChild(article)

                // handle click on product button

                article.querySelector('button').addEventListener('click',() => {
                    openModal(product)
                })
            })
        }else{
            productsContainer.style.display='block';
            productsContainer.innerHTML = "<div class='no-result' style='text-align:center;width:100%;margin-top:70px'><b>Aucun produit trouvé !</b></div>"
        
        }
    }

}


//Show and hide filter element on the sidebar

const buttons = document.querySelectorAll('main > .container form .filter-header button:not(main > .container form > .filter-header button)')

buttons.forEach(buttonElement => {
    buttonElement.addEventListener('click',function(e){
        e.preventDefault();
        const parent = e.currentTarget.parentNode.parentNode;
        if(parent){
            parent.classList.toggle('active')
        }
    })
})

//Open filter sidebar on mobile;

const filterButton = document.querySelector('.products > div:first-child button');
const filterForm = document.querySelector('main > .container form.filters')

filterButton.addEventListener('click',(e) => {
    e.stopPropagation();
    filterForm.classList.add('open');
    document.body.classList.add('open');
})

filterForm.querySelector('.times').addEventListener('click',(e) => {
    e.stopPropagation();
    filterForm.classList.remove('open');
    document.body.classList.remove('open');
})

/* Input range */


const priceInput = document.getElementById('price');

priceInput.onchange = function (e){
    console.log(e.currentTarget.value)
    const {parentNode,value} = e.currentTarget;
    parentNode.querySelector('.price span').innerText = '$ ' + value;
}