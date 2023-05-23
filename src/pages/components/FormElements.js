export const CheckBoxRadio = ({ id, labelText, register, type, errors, rules, value, name }) => {
  return (
    <>
      <div className="form-check">
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          className={`form-check ${errors[name] && 'is-valid'}`}
          {...register(name, rules)}
        />
      </div>
    </>
  );
};
