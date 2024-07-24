import type { ErrorsProps } from "../types/props.js";
import { FaXmark } from "react-icons/fa6";
import style from '../styles/ErrorBox.module.css';

export default function ErrorBox({ errors, setErrors }: ErrorsProps) {
	return (
		<div className={style.error}>
			<div>
				<p>The following errors have been found:</p>
				<ul>
					{
						Object.entries(errors).map(([key, value]) => {
							return <li key={key}>{value}</li>
						})
					}
				</ul>
			</div>
			<button onClick={() => setErrors(null)}>
				<i className="fa-solid fa-xmark"></i>
				<FaXmark width={16} height={16} />
			</button>
		</div>
	);
}
