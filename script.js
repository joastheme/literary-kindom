import { logout } from "./js/func.js"
import supabase from "./js/db.js";

const nav_logout_button = document.querySelector("#logout");
nav_logout_button.addEventListener("click", logout);