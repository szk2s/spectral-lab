import React from 'react';
import s2m from 'spectrum2mpe';

class FileInput extends React.Component {
	constructor(props) {
		super(props);
		this.fileInput = React.createRef();

		this.handleChange = async (event) => {
			event.preventDefault();
			const newPartials = await s2m.txtImport(this.fileInput.current.files[0].path);
			this.props.addPartials(newPartials);
		};
	}
	
	render() {
		return (
			<label>
			Choose text file:
				<input type="file" ref={this.fileInput} onChange={ this.handleChange }/>
			</label>
		);
	}
}

export default FileInput;