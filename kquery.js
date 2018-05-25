let ready = function(callback){
  document.addEventListener("DOMContentLoaded", function(event) {
    callback();
  });
}
let $ = function(element){
  let el = {};
  el["self"] = document.querySelectorAll(element);
  el["onClick"] = function(func){
        for(let i = 0; i < el["self"].length; i++){
          el["self"][i].addEventListener("click",func);
        }
  };
  return el;
}
