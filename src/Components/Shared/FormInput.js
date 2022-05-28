export const FormInput = ({id, label, register, validation, type = "text"}) => {
    return(
        <div className="field">
            <label className="field__label" htmlFor="{id}">{label}</label>
            <input 
                className="field__text" 
                type={type} 
                placeholder={label}
                {...register(id, validation)} 
            />
        </div>
    );
}