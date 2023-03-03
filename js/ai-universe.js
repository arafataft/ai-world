const btnSeeMore = document.getElementById("btnSeeMore");
const btnSeeLess = document.getElementById("btnSeeLess");
const btnSortaByDate = document.getElementById("btnSortaByDate");




// fetch url 

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const a = data.data.tools;

    seeMoreSeeLess(a);

    btnSortaByDate.addEventListener("click", () => {
      sortByDate(a);
    })
  } catch (error) {

    console.error(error);
  }
}

getData('https://openapi.programming-hero.com/api/ai/tools');



// Sort by date Function 

const sortByDate = data => {
  document.getElementById('cardContainer').innerHTML = '';
  spinner(true);
  data.sort(function (a, b) {
    return Number(new Date(a.published_in)) - Number(new Date(b.published_in));
  });
  seeMoreSeeLess(data);
}



// see more less function 
const seeMoreSeeLess = data => {
  if ((data.length) > 6) {
    displayCard(data.slice(0, 6));
    btnSeeMore.classList.remove("d-none");
    btnSeeLess.classList.add("d-none");

    btnSeeMore.addEventListener("click", () => {
      document.getElementById('cardContainer').innerHTML = '';
      spinner(true);
      displayCard(data);
      btnSeeMore.classList.add("d-none");
      btnSeeLess.classList.remove("d-none");
    })

    btnSeeLess.addEventListener("click", () => {
      document.getElementById('cardContainer').innerHTML = '';
      spinner(true);
      displayCard(data.slice(0, 6));
      btnSeeMore.classList.remove("d-none");
      btnSeeLess.classList.add("d-none");
    })

  }
  else {
    displayCard(data.data.tools);
    btnSeeMore.classList.add("d-none");
    btnSeeLess.classList.add("d-none");
  }
}



// displayCard in main body 

const displayCard = (data) => {
  const cardContainer = document.getElementById('cardContainer');
  spinner(false);
  data.forEach(element => {
    cardContainer.innerHTML += `<div class="col ">
        <div class="card h-100 p-3">
          <img src="${element.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h4 class="card-title">Features</h4>
            <ol class="card-text text-muted">
            ${element.features === null ? "no info found" : element.features.map(a => (`<li>${a}</li>`)).join("")}</ol>
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



// loading button function
const spinner = isLoading => {
  const spinnerLoading = document.getElementById("spinner");
  if (isLoading) {
    spinnerLoading.classList.remove('d-none');
  }
  else {
    spinnerLoading.classList.add('d-none');
  }
}



// fetch by the id 
// id get from 1st fetch data 
const aiTools = id => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showAiDetails(data.data);
    });
}



// show single detail in modal here 
const showAiDetails = (aiDetail) => {
  const aiCardDetails = document.getElementById("aiCardDetails");
  const accuracy = document.getElementById("accuracy");

  [pricing1, pricing2, pricing3] = aiDetail.pricing ?? '';
  [input_output_example1, input_output_example2, input_output_example3] = aiDetail.input_output_examples ?? '';

  aiCardDetails.innerHTML += `
    <div class="modal-header">
    <button onclick="aiCardDetails.innerHTML=''" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>


<div class="modal-body">
    <div class="card-group">
        <div class="card  m-5 bg-light border rounded">
            <div class="card-body p-4">
                <h6 class="card-title p-3">${aiDetail.description ? aiDetail.description : 'No Description'}</h6>
                <div class="d-flex justify-content-around">
                    <div 
                        class="rounded d-block bg-white text-success w-25 h-100 text-center fw-semibold p-2">
                        <p>${pricing1?.price || "Free"}</p>
                        <p>${pricing1?.plan || 'Basic'}</p>
                    </div>
                    <div 
                        class="rounded d-block bg-white text-warning w-25 h-100 text-center fw-semibold p-2 ">
                        <p>${pricing2?.price || 'Free'}</p>
                        <p>${pricing2?.plan || 'Pro'}</p>
                    </div>
                    <div 
                        class=" rounded d-block bg-white text-danger w-25 h-100 text-center fw-semibold p-2 lh-1">
                        <p>${pricing3?.price || 'NO INFO FOUND'}</p>
                        <p>${pricing3?.plan || ''}</p>
                    </div>

                </div>


                <div class="d-flex justify-content-around mt-4">
                    <div>
                        <h6>Features</h6>
                        <p class="card-text"><ul class="text-muted">
                        ${Object.values(aiDetail.features).map(a => (`<li>${a.feature_name}</li>`)).join("") || "no info"}
                        </ul></p>
                    </div>
                    <div>
                        <h6>Integrations</h6>
                        <p class="card-text"><ul class="text-muted">
                          ${aiDetail.integrations === null ? "no info found" : aiDetail.integrations.map(a => (`<li>${a}</li>`)).join("")}
                            
                        </ul></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card my-5 me-5 p-4 border rounded">
            <div class="containerNew">
                <img src="${aiDetail.image_link[0] ?? 'https://picsum.photos/200/300'}" class=" card-img-top" alt="...">
                <p id="accuracy" class="top-right rounded p-2 bg-danger bg-opacity-75">${aiDetail.accuracy.score ? aiDetail.accuracy.score * 100 + '% accuracy' : ''} </p>
            </div>
            
            <div class="card-body ">
                
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <h5 class="card-title">
                    ${input_output_example1 ? input_output_example1.input : "Can you give any example?"}
                    </h5>
                    <p class="card-text">
                    ${input_output_example1 ? input_output_example1.output : "No! Not Yet! Take a break!!!"}
                    
                    </p>
                </div>
                
            </div>
        </div>


    </div>
</div>


    `;


}

