import React from 'react';
function HelloWorld(){
    const name="Alice";
    const element=<h1>Hello ,{name}!</h1>;
    return(
        <div>
            {element}
            <p>Welcome to Reactjs</p>
        </div>
    );
    }
    export default HelloWorld;


