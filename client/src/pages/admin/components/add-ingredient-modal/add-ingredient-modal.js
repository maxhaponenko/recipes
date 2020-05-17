import React from 'react';
import { closeModal } from 'store/shared/modal/modals.actions'
import { onSelectionChange, addNewIngredient, disposeSelection } from 'store/admin/ingredients/ingredients.actions'
import { ADMIN_ADD_INGREDIENT_MODAL } from 'constants/modals'
import { connect } from 'react-redux'
import DropdownComponent from 'components/dropdown/dropdown-component'
import './add-ingredeint-modal.scss'

class AddIngredients extends React.Component {

    closeModal = () => {
        this.props.closeModal({ id: ADMIN_ADD_INGREDIENT_MODAL })
    }

    onChange = (changedValue) => {
        this.props.onSelectionChange(changedValue)
    }

    prepairForServer = (selection) => {
        return {
            name: selection.name,
            description: selection.description,
            type: selection.type.uid,
            unit: selection.unit.uid
        }
    }

    render() {
        
        const { types, units, selection } = this.props

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
                                    className="column input is-primary"
                                    value={selection.name}
                                    onChange={(e) => this.onChange({ name: e.target.value })}
                                    type="text"
                                    placeholder="Ingredient name" />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <DropdownComponent
                                    className="primary"
                                    placeholder="Type"
                                    options={types}
                                    value={selection.type}
                                    onChange={(item) => this.onChange({type: item})}
                                />
                            </div>
                            <div className="column is-6">
                                <DropdownComponent
                                    className="primary"
                                    placeholder="Unit"
                                    options={units}
                                    value={selection.unit}
                                    onChange={(item) => this.onChange({unit: item})}
                                />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-12">
                                <textarea
                                    style={{ height: 100, minHeight: 100, maxHeight: 200 }}
                                    className="column input is-primary"
                                    value={selection.description}
                                    onChange={(e) => this.onChange({ description: e.target.value })}
                                    type="text"
                                    placeholder="Ingredient description"
                                />
                            </div>
                        </div>

                        {/* UPLOAD FILE FUNCTIONALITY */}
                        {/* <div className="columns">
                            <div className="field column">
                                <div className="file is-primary">
                                    <label className="file-label">
                                        <input className="file-input" type="file" name="image" />
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <i className="fas fa-upload"></i>
                                            </span>
                                            <span className="file-label">
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
                    >CLOSE</button>
                    <button
                        className="button is-danger is-outlined"
                        onClick={this.props.disposeSelection}
                    >CLEAR</button>
                    <button 
                        className="button is-primary"
                        onClick={() => {
                            let body = this.prepairForServer(selection)
                            this.props.addNewIngredient(body)
                        }}
                    >SAVE</button>

                </footer>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    types: state.admin.ingredientsPage.ingredients.types,
    units: state.admin.ingredientsPage.ingredients.units,
    selection: state.admin.ingredientsPage.addIngredientFlow.selection
})
const mapDispatchToProps = {
    closeModal,
    onSelectionChange,
    addNewIngredient,
    disposeSelection
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIngredients)

