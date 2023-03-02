fetch("https://openapi.programming-hero.com/api/ai/tools")
.then((res)=>res.json())
.then((data) => {
    displayCard(data.data.tools);
});

const displayCard=(data)=>{
    const cardContainer=document.getElementById('cardContainer');
    data.forEach(element => {
        cardContainer.innerHTML+=`<div class="col ">
        <div class="card h-100 p-3">
          <img src="${element.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h4 class="card-title">Features</h4>
            <p class="card-text text-muted">
            1. ${element.features[0]}</p>
            <p class="card-text text-muted">
            1. ${element.features[1]}</p>
            <p class="card-text muted">
            3. ${element.features[2]}</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <div>
                <h5 class="card-title">${element.name}</h5>
                <small class="text-muted"><i class="fa-solid fa-calendar-days"></i>  ${element.published_in}</small>
            </div>
            <div>
            <button class="btn btn-info" onclick="aiTools('${element.id}')" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>
      </div>
        `;
    });
}




const aiTools=id=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((data) => {
        console.log(data.data);
});
}

const showAiDetails=(aiDetail)=>{
    
}

