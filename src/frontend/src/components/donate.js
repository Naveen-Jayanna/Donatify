import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Spinner } from 'reactstrap';

/**
 * React component for capturing donations
 * @extends React.Component
 */
class Donate extends React.Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
	constructor(props) {
		super(props);
		this.state = {
			itemName: '',
			itemQuantity: 1,
			itemDescription: '',
			itemZipCode: '',
			itemCity: {},
			itemDonorId: props.props && props.props.userId,
			itemCategory: {},
			loading: false,
			selectedFile: null,
			imgName: ''
		};
	}

	// On file select (from the pop up)
	onFileChange = event => {

		// Update the state
		this.setState({ selectedFile: event.target.files[0] });

	};

	onFileUpload = async () => {
		// e.preventDefault();
		const file = this.state.selectedFile;
		console.log(file);
		if (file != null) {
			const data = new FormData();
			data.append('image', file);

			let response = await fetch('http://localhost:5001/uploadimage', {
				method: 'post',
				body: data,
			}
			);
			let res = await response.json();
			console.log(res);
			if (res.status !== 200){
				alert('Error uploading file');
			}
			return res;
		}
	};

	/**
	 * Update state with user entered values
	 * @param {Object} event Event sent for onChange event
	 */
	handleInput = (event) => {
		if (event.type === 'change') {
			if (event.target) {
				this.setState({
					[event.target.id]: event.target.value
				});
			}
		} else {
			this.setState({
				[event.name]: event.values
			});
		}
	};

	/**
	 * Validate input values and call onAddItem API to submit item to database
	 * @param {Object} event Button click event
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	handleSubmit = async (event) => {
		// Validate if input values are empty
		const keys = ['itemName', 'itemDescription', 'itemZipCode'];
		for (let i = 0; i < keys.length; i++) {
			if (this.state[keys[i]] === '') return false;
		}
		event.preventDefault();
		if (Object.keys(this.state.itemCity).length === 0) {
			alert('Missing value for city. Enter city for the item.');
			return false;
		}
		if (Object.keys(this.state.itemCategory).length === 0) {
			alert('Missing value for category. Enter category for the item.');
			return false;
		}
		if (this.state[keys['itemQuantity']] === '') {
			this.setState({itemQuantity: 1});
		}
		if (this.state.selectedFile === null) {
			alert('Missing value for image. Please upload an image.');
			return false;
		}
		if (this.state.selectedFile != 'test') {
			const res = await this.onFileUpload();
			this.setState({
				imgName: res.data['imgName']
			});
		}
		if (this.props.props) {
			const apiInput = {
				itemName: this.state.itemName,
				itemQuantity: this.state.itemQuantity,
				itemDescription: this.state.itemDescription,
				itemZipCode: this.state.itemZipCode,
				itemCity: this.state.itemCity.value,
				itemDonorId: this.state.itemDonorId,
				itemCategory: this.state.itemCategory.value,
				imgName: this.state.imgName
			};
			this.setState({
				loading: true
			});
			await this.props.props.onAddItem(apiInput);
			if (this.props.props.apiStatus) {
				this.redirectToPath('/home/history');
				return true;
			} else {
				alert(this.props.props.apiMessage || 'Item addition could not complete. Please try again.');
				this.setState({
					loading: false
				});
				return false;
			}
		}
		return false;
	};

	/**
	 * Redirect to specified path
	 * @param {String} path Path to redirect
	 */
	redirectToPath = (path) => {
		const url = new URL(document.location.href);
		document.location.href = `${url.origin}${path}`;
	};

	/**
	 * Render Donate component
	 * @returns {React.Component} Form with donation related HTML tags
	 */
	render() {
		const cities = [
			{
				label: 'Raleigh',
				value: 'raleigh'
			},
			{
				label: 'Cary',
				value: 'cary'
			},
			{
				label: 'Durham',
				value: 'durham'
			}
		];
		const interestItems = [
			{
				label: 'Fruits',
				value: 'fruits'
			},
			{
				label: 'Vegetables',
				value: 'vegetables'
			},
			{
				label: 'Table',
				value: 'table'
			},
			{
				label: 'Chair',
				value: 'chair'
			},
			{
				label: 'Chair1',
				value: 'chair1'
			},
			{
				label: 'Chair2',
				value: 'chair2'
			}
		];
		const animatedComponents = makeAnimated();
		return (
			<section>
				<div className='container'>
					<div className='signup-content'>
						<div className='signup-form'>
							<h2 className='form-title'>Donate</h2>
							<form className='register-form' id='donate-form'>
								<div className='form-group'>
									<img src='../signup-name.png' alt='item name' />
									<input autoFocus type='text' name='name' id='itemName' placeholder='Item name' value={this.state.itemName} onChange={this.handleInput} required />
								</div>
								<div className='form-group'>
									<img src='../item-description.png' alt='item description' />
									<textarea name='description' id='itemDescription' placeholder='Item description' value={this.state.itemDescription} onChange={this.handleInput} required />
								</div>
								<div className='form-group'>
									<img src='../signup-zip.png' alt='item quantity' />
									<input type='text' name='quantity' id='itemQuantity' placeholder='Item quantity' value={this.state.itemQuantity} onChange={this.handleInput} />
								</div>
								<div className='form-group'>
									<img src='../signup-zip.png' alt='item zipcode' />
									<input type='text' name='zipcode' id='itemZipCode' placeholder='Item zipcode' value={this.state.itemZipCode} onChange={this.handleInput} required />
								</div>
								<div className='form-group' style={{overflow: 'unset'}}>
									<img src='../signup-city.png' alt='item city'/>
									<Select
										closeMenuOnSelect={true}
										components={animatedComponents}
										options={cities}
										placeholder={'City'}
										maxMenuHeight={200}
										menuPlacement='top'
										name='itemCity'
										onChange={(event) => this.handleInput({values: event, name: 'itemCity'})}
									/>
								</div>
								<div className='form-group' style={{overflow: 'unset'}}>
									<img src='../signup-groceries.png' alt='signup items'/>
									<Select
										closeMenuOnSelect={true}
										components={animatedComponents}
										options={interestItems}
										placeholder={'Category'}
										maxMenuHeight={200}
										menuPlacement='top'
										name='itemCategory'
										onChange={(event) => this.handleInput({values: event, name: 'itemCategory'})}
									/>
								</div>
								<div>
									<input type="file" onChange={this.onFileChange} />
								</div>
								<div className='form-group form-button'>
									{this.state.loading ? <Spinner/> : <input type='submit' name='donate' id='donate' className='form-submit' value='Donate' onClick={this.handleSubmit} />}
								</div>
							</form>
						</div>
						<div className='signup-image'>
							<figure><img src='../donate-image.jpg' alt='donate' /></figure>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Donate;
