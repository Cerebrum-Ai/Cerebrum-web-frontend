import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // <-- use semicolon
        setMessage('');
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) {
            setMessage(error.message)
        } else {
            setMessage('Account created successfully')
        }
        setEmail('');
        setPassword('');
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <br />
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="abc@gmail.com"
                    required
                />
                <input 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="*****"
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <span>Already have an account? </span>
            <Link to="/signin">Login</Link>
        </div>
    )
}

export default SignUp