/******************************** IMPORTS ********************************/
// libraries
import React from 'react';
// local files
import { ErrorsList } from '../styled-components/text';


/******************************* COMPONENT *******************************/
function Errors({array}) {

    return (
        <ErrorsList>
            {array && array.map((item) => <li key={item.index}>{item}</li>)}
        </ErrorsList>
    );
};

/******************************** EXPORTS ********************************/
export default Errors;

