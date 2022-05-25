export const FormInput = ({id, label, register, validation}) => {
    return(
        <div className="field">
            <label className="field__label" htmlFor="{id}">{label}</label>
            <input 
                className="field__text" 
                type="text" 
                placeholder={label}
                {...register(id, validation)} 
            />
        </div>
    );
}