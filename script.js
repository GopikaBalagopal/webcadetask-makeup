
let div = document.createElement("div")
div.setAttribute("class", "container");
let p = document.createElement("div");
p.setAttribute("class", "row");
p.classList.add("row", "m-3")
div.append(p);

// fetch("https://makeup-api.herokuapp.com/api/v1/products.json").then((data)=> data.json()).then((response)=>{
//     makeup(response)
// }).catch((error)=> console.log(error));

// let productData = [];

// const paginationSize = productData.length / 10;;

// const navItems = [];

// let navItemsToShown = navItems.slice(0, paginationSize);

// let fistIndex = 1;

// let lastIndex = paginationSize;

// const minFirst = navItems.length - paginationSize;

// const minLast = navItems.length - 1;

// let selected;

// const prev = document.querySelector(".previous_link");

// const next = document.querySelector(".next_link");

// const navigation = document.querySelector(".nvaigation_items");

let productData = [];
let page = 0;
const limit = 10;
const itemPerPage = 10;

async function getresponce() {
    console.log('getresponse');
    try {
        let data = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl")
        let response = await data.json();
        console.log('resp: ', response);
        productData = response;


        // for (let i = 0; i < productData.length; i++) {
        //     navItems.push(i + 1);
        // }
        // console.log(productData.length, navItems)
        page = 1
        makeup(productData.slice(0, itemPerPage))
    } catch (err) {
        console.log('er', err)
    }
}
getresponce();

function makeup(response) {
    console.log(response)
    p.innerHTML = '';
    response.forEach((value) => {
        p.innerHTML += `
        <div class="col-lg-4 col-sm-12">
            <div class="card text-white bg-dark mb-3" style="max-width: 25rem;">
            <h4 class="card-header">${value.name}</h4>
            <img src="${value.image_link}" class="card-img-top">
             <div class="card-body">
             <h6>Brand: ${value.brand}</h6>
             <h6>Price: ${value.price}</h6>
             <h6>Product_Link:${value.product_link}</h6>
             <p>description: ${value.description}</p>
             </div>
           </div>
              </div>`
        document.body.append(p);
    })

}

function onNext() {
    console.log('next')
    if (page == productData.length % itemPerPage) {
        page = page;
    } else {
        page = page + 1;
    }
    console.log(page * limit, itemPerPage)
    makeup(productData.slice(page * limit, page * limit + itemPerPage))
}

function onPrev() {
    console.log('next')
    if (page > 1) {
        page = page - 1;
    } else {
        page = 1
    }
    console.log(page * limit, itemPerPage)
    makeup(productData.slice(page * limit, page * limit + itemPerPage))
}

// console.log(productData)
// if(productData.length){
//     makeup(productData)
// }

// if (prev) {
//     prev.addEventListener("click", previousClick);
// }

// if (next) {
//     next.addEventListener("click", nextClick);
// }

// function nextClick() {
//     if (lastIndex <= minLast) {
//         lastIndex += 1;
//     }

//     if (lastIndex - paginationSize <= minFirst) {
//         fistIndex = lastIndex - paginationSize;
//     }

//     navItemsToShown = navItems.slice(fistIndex, lastIndex);
//     renderPaginationItems();
// }

// function previousClick() {
//     if (fistIndex - 1 >= 0) {
//         fistIndex -= 1;
//     }

//     lastIndex = fistIndex + paginationSize;

//     navItemsToShown = navItems.slice(fistIndex, lastIndex);
//     renderPaginationItems();
// }


// renderPaginationItems();

// function renderPaginationItems() {
// //   while (navigation.firstChild) {
// //     navigation.removeChild(navigation.firstChild);
// //   }

//   for (const item of navItemsToShown) {
//     const element = document.createElement("a");

//     element.classList = `page_link ${selected === item ? "active_page" : ""}`;
//     element.innerText = item;

//     element.addEventListener("click", navItemClick);

//     // navigation.appendChild(element);
//   }
// }
