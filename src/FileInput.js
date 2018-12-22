import React from 'react';
import s2m from 'spectrum2mpe';

class FileInput extends React.Component {
	constructor(props) {
		super(props);
		this.fileInput = React.createRef();
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const partials = await s2m.txtImport(this.fileInput.current.files[0].path);
		console.log(partials);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
				Choose text file:
					<input type="file" ref={this.fileInput} />
				</label>
				<br />
				<button type="submit">Start</button>
			</form>
		);
	}
}

export default FileInput;