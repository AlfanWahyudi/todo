import { Form, Link, redirect, useActionData } from "react-router";

export default function LoginPage() {
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
        <h2 className="title">Login</h2>
        <div className="input-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="input-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <p>Lakukan registrasi jika tidak belum memiliki akun, <Link to="/register">di sini</Link>.</p>
        <button type="submit">Login</button>
      </Form>
    </section>
  )
}


export async function action({ request }) {
  const data = await request.formData();
  const userData = {
    username: data.get('username'),
    password: data.get('password')
  }
  
  // validate client
  const isUsernameInvalid = userData.username === ''
  const isPasswordInvalid = userData.password === ''

  const errors = []

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

  const response = await fetch('http://94.74.86.174:8080/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  const resData = await response.json();
  
  // return error response
  if (response.status === 401) {
    errors.push(resData.errorMessage)
  }
  
  if (errors.length > 0) {
    return {  
      errors
    }
  }
    
  if (!response.ok) {
    throw new Response({ message: 'Could not login.' }, { status: 500 })
  }
  
  // manage token ...
  const token = resData.data.token;
  localStorage.setItem('token', token);

  return redirect('/dashboard');
}