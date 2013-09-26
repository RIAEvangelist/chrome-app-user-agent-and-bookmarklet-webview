(
    function(){
        console.log('hello from example 3');
    }
)(); 
/* 
    run as a closure since this file does not require global scope.
    Files not requiring global scope would execute as plain JS as well,
    but lets keep it in a closure for cleanliness.
*/