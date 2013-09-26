(
    function(){
        var img=document.createElement('img');
        //${img} is a variable to be replaced by the template data passed in from runWebviewJS
        img.src='${img}';
        img.style.display='block';
        document.querySelector('.card > h2').appendChild(img);
    }
)(); 
/* 
    run as a closure since this file does not require global scope.
    Files not requiring global scope would execute as plain JS as well,
    but lets keep it in a closure for cleanliness.
*/