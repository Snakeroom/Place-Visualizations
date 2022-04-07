import { VISUALIZATION_TEMPLATE } from "./visualization";

export const INDEX_TEMPLATE = `
	<!DOCTYPE html>

	<html lang="en">
		<head>
			<meta charset="UTF-8">

			<title>
				Place Visualizations
			</title>

			<link rel="stylesheet" href="index.css" />
		</head>

		<body>
			<h1>
				Place Visualizations
			</h1>
			<p>
				There are <%= bindings.getSize() %> visualizations available.
				Visit the <a href="https://snakeroom.org">Snakeroom</a> to see other projects like this one.
			</p>
			<div id="visualizations">
				<% bindings.forEach(binding => { %>
					${VISUALIZATION_TEMPLATE}
				<% }) %>
			</div>
		</body>
	</html>
`;
