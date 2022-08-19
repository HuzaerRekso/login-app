import React, {useState} from 'react';
import {Alert} from 'reactstrap';

const AlertMessage = (props) => {
    const { status } = props;
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    return status.length > 0 && <Alert color="danger" isOpen={visible} toggle={onDismiss}>
        {status}
    </Alert>
}
export default AlertMessage;