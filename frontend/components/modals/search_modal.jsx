import React from "react";
import { connect } from 'react-redux';
import { displayModal, hideModal, displayFullModal } from "../../actions/modal_actions";

class SearchModal extends React.Component{
constructor(props) {
    super(props);
    this.modalOpen = this.modalOpen.bind(this)
  }


  componentDidMount()
  {
    this.props.searchServer(this.props.server_id, {content: this.props.modal.payload});
  }

  modalOpen(modalname) //no idea why i have this
  {
    this.props.displayModal(modalname);
  }

  render() {
   return(
    <div id="search-results" onClick={(e) => e.stopPropagation()}>
      <div id="bruh4941">
        No Results
      </div>
    </div>
   )
    }
}




const mapStateToProps = (state) => {
  return {
    modals: state.ui.modal,
    search: state.current.search, //bad code... non-inituitive state but search is currently occupied by something else and I'd rather not refactor atm
    server_id: state.current.server.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal()),
    displayModal: (modal) => dispatch(displayModal(modal)),
    displayFullModal: (modal) => dispatch(displayFullModal(modal)),
    searchServer: (server_id, query) => dispatch(searchServerMsgs(server_id, query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
