import {generalSliceActions} from "../../store/gs-manager-slice";
import PropTypes from "prop-types";

export default function openModal(children) {
    window.dispatch(generalSliceActions.openModal());
    window.setChildren(children)
}

openModal.prototype = {
    children: PropTypes.elementType.isRequired
}