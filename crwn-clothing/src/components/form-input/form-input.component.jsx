import './form-input.component.scss'

const FormInput = ({label, ...otherProps}) => {
    return (
        <div className="group">
            <label className={(otherProps.value.length ? 'shrink':'') + ' form-input-label'}>
                {label}
            </label>
            <input {...otherProps}/>
        </div>
    )
}

export default FormInput;