export const VISUALIZATION_TEMPLATE = `
	<div>
		<h2>
			<%= binding.getName() %>
		</h2>
		<img alt="<%= binding.getName() %> Visualization'" src="<%= binding.getRelativePath() %>" />
	</div>
`;
