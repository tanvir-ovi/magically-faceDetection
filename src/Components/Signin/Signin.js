import React, { useState } from 'react';

const Signin = ({ onRouteChange,loadUser }) => {
	const [input, setInput] = useState({});
	
	const onEmailChange = (evt) => {
		setInput({...input,signInEmail:evt.target.value})
	}
	const onPasswordChange = (evt) => {
		setInput({...input,signInPassword:evt.target.value})
	}
	const onSubmit = () => {
		fetch('https://limitless-river-01934.herokuapp.com/signin', {
			method: 'post',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				email: input.signInEmail,
				password:input.signInPassword
			})
		})
			.then(res => res.json())
			.then(user => {
				if (user.id) {
					loadUser(user);
					onRouteChange('home')
				} else {
					alert("sorry wrong credentials! try again!")
					onRouteChange('signIn')
				}
			})
	}
	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
				<main className="pa4 black-80">
				  <div className="measure ">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
							style={{border:"1.6px solid black"}}
							onClick={onSubmit}
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Sign in"
				     />
				    </div>
				    <div className="lh-copy mt3 center">
				      <p 
								onClick={() => onRouteChange('register')} 
								className="f6 link dim black db poinhtmlFer pointer"
							>
								Register
							</p>
				    </div>
				  </div>  
				</main>
			</article>
	);
}

export default Signin; 