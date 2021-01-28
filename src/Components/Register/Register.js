import React, { useState } from 'react';

const Register = ({ onRouteChange,loadUser }) => {

	const [input, setInput] = useState({});
	
	const onNameChange = (evt) => {
		setInput({...input,registerName:evt.target.value})
	}

	const onEmailChange = (evt) => {
		setInput({...input,registerEmail:evt.target.value})
	}
	const onPasswordChange = (evt) => {
		setInput({...input,registerPassword:evt.target.value})
	}
	const onSubmit = () => {
		fetch('https://limitless-river-01934.herokuapp.com/register', {
			method: 'post',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				name:input.registerName,
				email: input.registerEmail,
				password:input.registerPassword
			})
		})
		.then(res => res.json())
		.then(user => {
			if (user.id) {
				loadUser(user);
				onRouteChange('home');
			} else {
				alert("wrong format of submission!");
			}
		})
	}

	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
			<main className="pa4 black-80">
			  <div className="measure ">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="text" 
				        name="name"  
								id="name"
								onChange={onNameChange}
			        />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
								id="email-address"
								onChange={onEmailChange}
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
								id="password"
								onChange={onPasswordChange}
			        />
			      </div>		   
			     </fieldset>
			    <div className="center">
						<input
						onClick={onSubmit}
						style={{border:"1.6px solid black"}}
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
			      type="submit" 
			      value="Register"
			     />
					</div>
			  </div>
			</main>
		</article>
	);
}

export default Register; 