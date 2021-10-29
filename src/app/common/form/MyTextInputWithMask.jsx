import React from 'react'
import { useField } from 'formik';
import ReactInputMask from 'react-input-mask';

export default function MyTextInputWithMask({label, ...props}) {
    const [field, meta] = useField(props);
    return (
        <React.Fragment>
        <label>
          {label}
        </label>
        <ReactInputMask {...field} {...props} />

        {meta.touched && meta.error ? (
          <div className="invalid-feedback">{meta.error}</div>
        ) : null}
      </React.Fragment>
    )
}
