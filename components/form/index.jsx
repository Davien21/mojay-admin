import { Component } from "react";
import Joi from "joi-browser";
import { Input } from "../Input/index.jsx";
import TextArea from "../textArea/index";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const joiOptions = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, joiOptions);
    if (!error) return null;

    const errors = {};
    for (let errorDetail of error.details)
      errors[errorDetail.path[0]] = errorDetail.message;

    // console.log(errors)
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const objectToValidate = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(objectToValidate, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate() || {};
    this.setState({ errors });

    if (Object.keys(errors).length !== 0) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label, className) {
    let classes = "btn ml-auto col-12 pl-0 ";
    if (className) classes += className;
    return (
      <div className="d-flex">
        <button disabled={this.validate()} className={className}>
          {label}
        </button>
      </div>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={label}
      />
    );
  }

  renderTextArea(name, label, options) {
    const { data, errors } = this.state;

    return (
      <TextArea
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
