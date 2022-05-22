export const AuthFormInput = ({field, register, error}) => {
    return (
        <div className={'field field-type-' + field.type + (error ? ' error' : '')} id={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                disabled={field.disabled}
                {...register(field.name, field.validation)}
                />
            {error && <span className="error-message">{error.message}</span>}
        </div>
    )
}