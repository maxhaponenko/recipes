import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageWrapper from 'components/page-wrapper/page-wrapper'
import { openModal, closeModal } from 'store/shared/modal/modals.actions'
import { fetchIngredients } from 'store/admin/ingredients/ingredients.actions'
import { ADMIN_ADD_INGREDIENT_MODAL } from 'constants/modals'

class Ingredients extends Component {

    componentDidMount() {
        this.props.fetchIngredients()
        this.props.openModal({id: ADMIN_ADD_INGREDIENT_MODAL})
    }

    render() {

        const { items } = this.props

        return (
            <PageWrapper>
                <button 
                    style={{ marginBottom: 20 }} 
                    className="button is-primary" 
                    onClick={() => this.props.openModal({id: ADMIN_ADD_INGREDIENT_MODAL})}
                >
                    + ADD INGREDIENTS
                </button>
                {/* <button 
                    style={{ marginBottom: 20, marginLeft: 20 }} 
                    className="button is-warning" 
                    onClick={() => this.props.closeModal({id: ADMIN_ADD_INGREDIENT_MODAL})}
                >
                    - Close modal
                </button> */}
                <table className="table is-striped ">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Unit</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.uid}</td>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.unit}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </PageWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    items: state.admin.ingredientsPage.ingredients.items
})

const mapDispatchToProps = {
    fetchIngredients: fetchIngredients,
    openModal: openModal,
    closeModal: closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients)