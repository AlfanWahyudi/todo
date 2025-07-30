import { Form, Link, redirect, useActionData } from "react-router";

export default function RegisterPage() {
  const data = useActionData()

  return (
    <section>
      {
        data?.errors && (
          <article className="error-messages">
            <ul>
              {data.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </article>
        )
      }
      <Form method="post" >
        <h2 className="title">Register</h2>
        <div className="input-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="input-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="input-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <p>Login jika sudah punya akun, <Link to="/">di sini</Link>.</p>
        <button type="submit">Register</button>
      </Form>
    </section>
  )
}

export async function action({ request }) {
  const data = await request.formData();
  const userData = {
    email: data.get('email'),
    username: data.get('username'),
    password: data.get('password')
  }

  // validate client
  const isEmailInvalid = userData.email === ''
  const isUsernameInvalid = userData.username === ''
  const isPasswordInvalid = userData.password === ''

  const errors = []

  if (isEmailInvalid) {
    errors.push('Email is invalid')
  }

  if (isUsernameInvalid) {
    errors.push('Username is invalid')
  }

  if (isPasswordInvalid) {
    errors.push('Password is invalid')
  }

  if (errors.length > 0) {
    return {  
      errors
    }
  }

  const response = await fetch('http://94.74.86.174:8080/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    throw new Response({ message: 'Could not register.' }, { status: 500 })
  }

  return redirect('/');
}