export const STYLES = `
	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		padding: 36px;

		font-family: sans-serif;

		background-color: #FFFFFF;
		color: #000000;

		width: 100%;
	}

	a {
		color: #557528;
		font-weight: bold;
		text-decoration: none;
	}

	a:hover, a:active {
		text-decoration: underline;
	}

	body > h1, body > p {
		margin: 0;
		margin-bottom: 12px;
	}

	#visualizations {
		display: grid;
		grid-template-columns: repeat(3, 1fr);

		align-items: center;
		gap: 12px;
	}

	#visualizations > div {
		background-color: #EEEEEE;

		border-radius: 8px;
		padding: 12px;
	}

	#visualizations > div > h2 {
		margin: 0;
		margin-bottom: 0.4rem;
	}

	#visualizations > div > img {
		width: 100%;
		aspect-ratio: 1;

		border: 1px solid black;
		background-color: white;
	}

	@media (prefers-color-scheme: dark) {
		body {
			background-color: #121212;
			color: #FFFFFF;
		}

		a {
			color: #78AB32;
		}

		#visualizations > div {
			background-color: #1F1F1F;
		}
	}

	@media only screen and (max-width: 800px) {
		#visualizations {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media only screen and (max-width: 500px) {
		#visualizations {
			grid-template-columns: 1fr;
		}
	}
`;
