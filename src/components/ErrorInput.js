import React from 'react';
import {FormFeedback,} from 'reactstrap';

const ErrorInput = (props) => {
    const { errorMessage } = props;
    return <FormFeedback>
        {errorMessage}
    </FormFeedback>
}
export default ErrorInput;
