function getMeals() {
  fetch("api/meals")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (i = 0; i < data.length; i++) {
        var bigContainer = document.createElement("div");
        bigContainer.setAttribute("class", "row mb-2");
        var innerContainer = document.createElement("div");
        innerContainer.setAttribute("id", `${data[i].day}-meal`);
        innerContainer.setAttribute("class", "col-md-8 rounded border border-primary");
        var elementHeader = document.createElement("h4");
        elementHeader.textContent = data[i].day;
        var mealLink = document.createElement("h2");
        mealLink.setAttribute("href", `/meal/${data[i].id}`);
        mealLink.textContent = data[i].name;
        var mealType = document.createElement('h6')
        mealType.setAttribute('class','col-md-6')
        mealType.textContent = data[i].type_of_meal


        innerContainer.appendChild(elementHeader)
        innerContainer.appendChild(mealLink)
        innerContainer.appendChild(mealType)

        var buttonContainer = document.createElement('div')
        buttonContainer.setAttribute('class','com-md-4')

        var delButton = document.createElement('button')
        delButton.setAttribute('class', 'btn btn-sm btn-danger m-2')
        delButton.setAttribute('data-id',data[i].id)
        delButton.setAttribute('id',`${data[i].day}-del-button`)
        delButton.textContent = 'DELETE'

        buttonContainer.appendChild(delButton)
        
        bigContainer.appendChild(innerContainer)
        bigContainer.appendChild(buttonContainer)

        document.querySelector('.meal-list').appendChild(bigContainer)

       
      }
    });
}

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#meal-name").value.trim();
  const day = document.querySelector("#meal-day").value.trim();
  const type_of_meal = document.querySelector('#meal-type').value.trim();
  // const description = document.querySelector('#project-desc').value.trim();

  if (name && day && type_of_meal) {
    const response = await fetch(`/api/meals`, {
      method: "POST",
      body: JSON.stringify({ name, day, type_of_meal }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create meal");
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();
  console.log(event.target.getAttribute("data-id"));
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/meals/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete meal");
    }
  }
};

document
  .querySelector(".new-meal-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".meal-list")
  .addEventListener("click", delButtonHandler);
