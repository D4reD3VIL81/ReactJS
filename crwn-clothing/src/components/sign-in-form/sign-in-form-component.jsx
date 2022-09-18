import { useState } from 'react';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        console.log(user);
    };

    const handleSubmit = async(event, user) => {
        event.preventDefault();
    
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) { 
            switch(error.code) {
                case 'auth/wrong-password':
                    alert("Wrong Password!")
                    break
            }
            console.log(error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value});
    }

    return (
        <div className='sign-up-container'>
            <h2>Already Have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>

                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <div className='buttons-container'>
                  <Button buttonType='inverted' type='submit'>Sign In</Button>
                  <Button type='button' bottunType='google' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;