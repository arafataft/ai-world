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
      showAiDetails(data.data);
});
}

const showAiDetails=(aiDetail)=>{
    const aiCardDetails=document.getElementById("aiCardDetails");
    aiCardDetails.innerHTML+=`
    <div class="modal-header">
    <button onclick="aiCardDetails.innerHTML=''" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>


<div class="modal-body">
    <div class="card-group">
        <div class="card  m-5 bg-light border rounded">
            <div class="card-body p-4">
                <h6 class="card-title p-3">${aiDetail.description}</h6>
                <div class="d-flex justify-content-around">
                    <div 
                        class="rounded d-block bg-white text-success w-25 h-100 text-center fw-semibold p-2">
                        <p>${aiDetail.pricing[0].price}</p>
                        <p>${aiDetail.pricing[0].plan}</p>
                    </div>
                    <div 
                        class="rounded d-block bg-white text-warning w-25 h-100 text-center fw-semibold p-2 ">
                        <p>${aiDetail.pricing[1].price}</p>
                        <p>${aiDetail.pricing[1].plan}</p>
                    </div>
                    <div 
                        class=" rounded d-block bg-white text-danger w-25 h-100 text-center fw-semibold p-2 lh-1">
                        <p>${aiDetail.pricing[2].price}</p>
                        <p>${aiDetail.pricing[2].plan}</p>
                    </div>

                </div>


                <div class="d-flex justify-content-around mt-4">
                    <div>
                        <h6>Features</h6>
                        <p class="card-text"><ul class="text-muted">
                            <li>${aiDetail.features[1].feature_name}</li>
                            <li>${aiDetail.features[2].feature_name}</li>
                            <li>${aiDetail.features[3].feature_name}</li>
                        </ul></p>
                    </div>
                    <div>
                        <h6>Integrations</h6>
                        <p class="card-text"><ul class="text-muted">
                            <li>${aiDetail.integrations[0]}</li>
                            <li>${aiDetail.integrations[1]}</li>
                            <li>${aiDetail.integrations[2]}</li>
                        </ul></p>
                    </div>
                </div>


            </div>
        </div>

        <div class="card my-5 me-5 p-4 border rounded">
            <div class="containerNew">
                <img src="${aiDetail.image_link[0]}" class="card-img-top" alt="...">
                <p class="top-right rounded p-2 bg-danger bg-opacity-75">${aiDetail.accuracy.score*100}% accuracy</p>
            </div>
            
            <div class="card-body ">
                
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <h5 class="card-title">${aiDetail.input_output_examples[0].input}</h5>
                    <p class="card-text">${aiDetail.input_output_examples[0].output}</p>
                </div>
                
            </div>
        </div>


    </div>
</div>


    `;
}

