import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${({ error }) => (error ? 'red' : '#ccc')};
`;

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <StyledInput {...field} {...props} error={meta.touched && !!meta.error} />
      {meta.touched && meta.error ? (
        <div style={{ color: 'red' }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomInput;
