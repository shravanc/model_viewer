
console.log("---HERE---")
function add_viewer(){
      console.log("--3--");
}


function get_metadata(){
      console.log("--2--");
      add_viewer();
}


function main(){
      console.log("--1--");
      get_metadata();
}