import React from 'react';
import { closeModal } from 'store/shared/modal/modals.actions'
import { ADMIN_ADD_INGREDIENT_MODAL } from 'constants/modals'
import { connect } from 'react-redux'
import DropdownComponent from 'components/dropdown/dropdown-component'
import './add-ingredeint-modal.scss'

class AddIngredients extends React.Component {

    state = {
        name: '',
        type: undefined,
        unit: undefined,
        description: ''
    }

    closeModal = () => {
        this.props.closeModal({ id: ADMIN_ADD_INGREDIENT_MODAL })
    }

    render() {
        
        const { types, units } = this.props
        debugger
        return (
            <div className="add-ingredient-modal">
                <header className="modal-card-head" style={{backgroundColor: 'white'}}>
                    <p className="modal-card-title">Add ingredeint</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={this.closeModal}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <div className="add-ingredient-modal__inputs">
                        <div className="columns">
                            <div className="column is-12">
                                <input
                                    class="column input is-primary"
                                    value={this.state.name}
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                    type="text"
                                    placeholder="Ingredient name" />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <DropdownComponent
                                    className="primary"
                                    options={types}
                                    placeholder="Type"
                                />
                            </div>
                            <div className="column is-6">
                                <DropdownComponent
                                    className="primary"
                                    options={units}
                                    placeholder="Unit"
                                />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-12">
                                <textarea
                                    style={{ height: 100, minHeight: 100, maxHeight: 200 }}
                                    class="column input is-primary"
                                    value={this.state.description}
                                    onChange={(e) => this.setState({ description: e.target.value })}
                                    type="text"
                                    placeholder="Ingredient description"
                                />
                            </div>
                        </div>

                        {/* UPLOAD FILE FUNCTIONALITY */}
                        {/* <div className="columns">
                            <div class="field column">
                                <div class="file is-primary">
                                    <label class="file-label">
                                        <input class="file-input" type="file" name="image" />
                                        <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                            <span class="file-label">
                                                Upload images
                                                </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
                <footer className="modal-card-foot" style={{ justifyContent: 'space-between', backgroundColor: 'white' }}>
                    <button
                        onClick={this.closeModal}
                        className="button is-danger is-outlined"
                    >CANCEL</button>
                    <button className="button is-primary">SAVE</button>

                </footer>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    types: state.admin.ingredients.types,
    units: state.admin.ingredients.units
})
const mapDispatchToProps = {
    closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIngredients)

