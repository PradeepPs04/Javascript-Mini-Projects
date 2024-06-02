const URL = "https://api.github.com/users/";

const page_theme_btn = document.querySelector("[data-page-theme]");
const page_theme_name = document.querySelector("[data-theme-name]");
const sun_icon = document.querySelector("[data-img-sun]");
const moon_icon = document.querySelector("[data-img-moon]");

const input_box = document.querySelector(".input-box");
const clear_btn = document.querySelector(".clear-icon");
const search_btn = document.querySelector("[data-searchUser]");
const no_result_text = document.querySelector(".no-result");

const user_img = document.querySelector("[data-user-img]");
const user_name = document.querySelector("[data-user-name]");
const profile_link = document.querySelector("[data-profile-link]");
const join_date = document.querySelector("[data-join-date]");
const user_bio = document.querySelector("[data-user-bio]");

const repo_count = document.querySelector("[data-repo-count]");
const followers_count = document.querySelector("[data-followers-count]");
const following_count = document.querySelector("[data-following-count]");

const user_location = document.querySelector("[data-user-location]");
const user_blog = document.querySelector("[data-user-blog-link]");
const user_twitter = document.querySelector("[data-user-twitter]");
const user_company = document.querySelector("[data-user-company]");

const wrapper = document.querySelector(".wrapper");
const main_heading = document.querySelector("[data-main-heading]");
const search_user_container = document.querySelector(".search-user-container");

const user_details_container_outer = document.querySelector(
  ".user-details-container-outer"
);
const links_container = document.querySelector(".links");
const profile_details_container = document.querySelector(".profile-details");
const profile_details_head = document.querySelectorAll(
  "[data-profile-details-heading]"
);
const profile_details_data = document.querySelectorAll(".stat-data");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let pageTheme = "light";

page_theme_name.textContent = pageTheme;
page_theme_btn.addEventListener("click", () => {
  if (pageTheme === "dark") {
    localStorage.setItem('theme', 'light');
    changeThemeToLight();
  } else {
    localStorage.setItem('theme', 'dark');
    changeThemeToDark();
  }
});

function changeThemeToLight() {
  page_theme_name.textContent = "Dark";
  page_theme_name.style.color = "#4b6a9b";
  pageTheme = "light";

  wrapper.classList.remove("wrapper-dark");
  wrapper.classList.add("wrapper-light");

  main_heading.classList.remove("text-dark");
  main_heading.classList.add("heading-light");

  sun_icon.classList.remove("active");
  moon_icon.classList.add("active");

  search_user_container.classList.remove("container-dark");
  search_user_container.classList.add("container-light");
  search_user_container.classList.remove("shadow-dark");
  search_user_container.classList.add("shadow-light");
  input_box.classList.remove("input-box-dark");

  clear_btn.classList.remove("text-dark");

  user_details_container_outer.classList.remove("container-dark");
  user_details_container_outer.classList.add("container-light");
  user_details_container_outer.classList.remove("shadow-dark");
  user_details_container_outer.classList.add("shadow-light");

  user_name.classList.remove("text-dark");
  user_name.classList.add("text-light");

  join_date.classList.remove("text-dark");
  join_date.classList.add("heading-light");

  user_bio.classList.remove("text-dark");
  user_bio.classList.add("heading-light");

  main_heading.classList.add("heading-light");
  links_container.classList.add("heading-light");
  user_name.classList.add("text-light");

  profile_details_container.classList.remove("extra-dark");
  profile_details_container.classList.add("wrapper-light");
  profile_details_head.forEach((para) => {
    para.classList.remove("text-dark");
    para.classList.add("heading-light");
  });

  profile_details_data.forEach((data) => {
    data.classList.remove("text-dark");
  });

  links_container.classList.remove("text-dark");
  links_container.classList.add("heading-light");
}

function changeThemeToDark() {
  page_theme_name.textContent = "Light";
  page_theme_name.style.color = "#fff";
  pageTheme = "dark";

  wrapper.classList.remove("wrapper-light");
  wrapper.classList.add("wrapper-dark");

  main_heading.classList.remove("heading-light");
  main_heading.classList.add("text-dark");

  moon_icon.classList.remove("active");
  sun_icon.classList.add("active");

  search_user_container.classList.remove("container-light");
  search_user_container.classList.add("container-dark");
  search_user_container.classList.remove("shadow-light");
  search_user_container.classList.add("shadow-dark");
  input_box.classList.add("input-box-dark");

  clear_btn.classList.add("text-dark");

  user_details_container_outer.classList.remove("container-light");
  user_details_container_outer.classList.add("container-dark");
  user_details_container_outer.classList.remove("shadow-light");
  user_details_container_outer.classList.add("shadow-dark");

  user_name.classList.remove("text-light");
  user_name.classList.add("text-dark");

  join_date.classList.remove("heading-light");
  join_date.classList.add("text-dark");

  user_bio.classList.remove("heading-light");
  user_bio.classList.add("text-dark");

  profile_details_container.classList.remove("wrapper-light");
  profile_details_container.classList.add("extra-dark");
  profile_details_head.forEach((para) => {
    para.classList.remove("heading-light");
    para.classList.add("text-dark");
  });

  profile_details_data.forEach((data) => {
    data.classList.add("text-dark");
  });

  links_container.classList.remove("heading-light");
  links_container.classList.add("text-dark");
}

search_btn.addEventListener("click", (e) => {
  e.preventDefault();
  let userName = input_box.value.trim();
  if (userName === "") return;
  fetchData(userName);
});

async function fetchData(userName) {
  let response;
  try {
    let userURL = URL + userName;
    response = await fetch(userURL);
  } catch (error) {
    console.log("There was an error", error);
  }

  if (response?.ok) {
    const data = await response.json();
    renderData(data);
  } else {
    no_result_text.classList.add("active");
  }
}

function renderData(data) {
  user_img.src = data?.avatar_url;
  user_name.textContent = data?.login;

  profile_link.href = data?.html_url;
  if (data?.name === null) profile_link.textContent = "@" + data?.login;
  else profile_link.textContent = "@" + data?.name;

  join_date.textContent = "Joined " + fetch_join_date(data?.created_at);

  if (data?.bio === null) user_bio.textContent = "This profile has no bio";
  else user_bio.textContent = data?.bio;

  repo_count.textContent = data?.public_repos;
  followers_count.textContent = data?.followers;
  following_count.textContent = data?.following;

  if (data?.location === null) user_location.textContent = "Not Available";
  else user_location.textContent = data?.location;

  if (data?.blog === "") user_blog.textContent = "Not Available";
  else {
    user_blog.textContent = data?.blog;
    user_blog.href = data?.blog;
  }

  if (data?.twitter_username === null)
    user_twitter.textContent = "Not Available";
  else {
    user_twitter.textContent = data?.twitter_username;
    user_twitter.href = `https://x.com/${data?.twitter_username}`;
  }

  if (data?.company === null) user_company.textContent = "Not Available";
  else user_company.textContent = data?.company;
}

function fetch_join_date(date) {
  let year = Number.parseInt(date.slice(0, 4));
  // console.log(year);

  let month = Number.parseInt(date.slice(5, 7));
  // console.log(month);

  let day = Number.parseInt(date.slice(8, 10));

  return `${day} ${months[month - 1]} ${year}`;
}

input_box.addEventListener("input", function () {
  no_result_text.classList.remove("active");
  let val = input_box.value;
  if (val.length == 0)
    document.querySelector(".clear-icon").classList.remove("active");
  else document.querySelector(".clear-icon").classList.add("active");

  clear_btn.addEventListener("click", (e) => {
    e.preventDefault();
    input_box.value = "";
    clear_btn.classList.remove("active");
  });
});

function changeTheme(theme) {
  if (theme === "dark") changeThemeToDark();
  else changeThemeToLight();
}


let theme = localStorage.getItem('theme');
if(theme)   changeTheme(theme);
else    changeTheme('light');

fetchData("PradeepPs04");
