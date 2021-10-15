import React from "react";
import { Formik, Field } from "formik";

function MyCheckbox(props) {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <React.Fragment>
          

          <label className="ml-3" htmlFor={props.id}>
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  (value) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
           <span className="ml-2">{props.label}</span> </label>


        </React.Fragment>
      )}
    </Field>
  );
}
export default MyCheckbox;
