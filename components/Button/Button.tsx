import React from 'react'

type ButtonProps = {
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	isLoading?: boolean;
	children?: any;
	colorStroke?: string;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, className, isLoading, children, colorStroke, onClick }) => {
	return (
		<button onClick={onClick} type={type} className={className} disabled={isLoading}>
			{isLoading &&
				<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
				width="2em" height="2em" 
				viewBox="0 0 100 100" 
				preserveAspectRatio="xMidYMid">
				<circle cx={50} cy={50} fill="none" stroke={colorStroke} strokeWidth={13} r={32} strokeDasharray="150.79644737231007 52.26548245743669">
				  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.9615384615384615s" values="0 50 50;360 50 50" keyTimes="0;1" />
				</circle>
			  </svg>
			  
			}
			<span>{children}</span>
		</button>
	)
}

Button.defaultProps = {
	colorStroke: '#fff'
}

export default Button
