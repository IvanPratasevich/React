import { Form } from '../../ui/form/Form';
import React from 'react';
import Main from '../../../structure/main/Main';

class FormPage extends React.Component {
  render = () => {
    return <Main components={[Form]} />;
  };
}

export default FormPage;
