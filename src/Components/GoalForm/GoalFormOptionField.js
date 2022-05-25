export const GoalFormOptionField = ({field, register}) => {
    return(
        <div className="goal-type__option">
            <input {...register(field.name, field.validation)} type="radio" id={field.id} value={field.title} />
            <label htmlFor={field.id}>
              <strong>{field.title}</strong> <span>{field.description}</span>
            </label>
        </div>
    );
}