const countriesEl = document.getElementById("countries");
const toggleBtn = document.getElementById("toggle");
const filterBtn = document.getElementById("filter");
const regionBtn = filterBtn.querySelectorAll("li");
const searchEl = document.getElementById("search");

getCountries();

async function getCountries() {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();
  displayCountries(countries);
}

function displayCountries(countries) {
  countries.forEach((country) => {
    const countryEl = document.createElement("div");
    countryEl.classList.add("country");
    countryEl.innerHTML = `<div class="country-wrap">
                        <a href="countryDetail.html"></a>
                        <div class="country-image">
                            <img src="${country.flag}" alt="">
                        </div>
                        <div class="country-info">
                            <h2 class="country-name">${country.name}</h2>
                            <P><strong>Population :</strong> ${country.population}</P>
                            <P class="country-region"
                            ><strong>Region :</strong> ${country.region}</P>
                            <P><strong>Capital :</strong> ${country.capital}</P>
                        </div>
                    </div>`;

    countryEl.addEventListener("click", function() {
    //   showCountryDetail(country);
    // console.log(country.name.toLowerCase().replace(' ','-'))
       localStorage.setItem("countryName",country.name);
    });

    countriesEl.appendChild(countryEl);
  });
}


function showCountryDetail(country) {
  console.log(country.name);
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
filterBtn.addEventListener("click", () => {
  document.body.classList.toggle("open");
});

searchEl.addEventListener("input", (e) => {
  const { value } = e.target;
  const countryName = document.querySelectorAll(".country-name");
  countryName.forEach((name) => {
    console.log(name.innerText);
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
});

regionBtn.forEach((filter) => {
  filter.addEventListener("click", () => {
    const countryRegion = document.querySelectorAll(".country-region");
    countryRegion.forEach((region) => {
      console.log(region.innerText);
      if (
        region.innerText.toLowerCase().includes(filter.innerText.toLowerCase())
      ) {
        region.parentElement.parentElement.parentElement.style.display =
          "block";
      } else {
        region.parentElement.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

