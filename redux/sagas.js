//import { takeEvery } from 'redux-saga'
import { put, select, takeEvery } from "redux-saga/effects";
import * as lambdaPost from "../utils/lambdaPost";
import * as lambdaGet from "../utils/lambdaGet";

function* handleFormSubmitSuccess(action) {
  try {
    console.log(action);
    switch (action.meta.form) {
      case "addItemForm":
        let state = yield select();
        yield put({
          type: "POST_INVENTORY_ITEM",
          payload: lambdaPost.purchase(state.form.addItemForm.values)
        });
        break;
    }
  } catch (e) {
    yield console.log("ERROR: handleFormSubmitSuccess");
    yield console.log({ e });
  }
}
export function* sagaHandleFormSubmitSuccess() {
  yield takeEvery(
    ["@@redux-form/SET_SUBMIT_SUCCEEDED"],
    handleFormSubmitSuccess
  );
}

/****
 * showPendingDialog
 * 
 */
function* showPendingDialog(action) {
  try {
    console.log("showPendingDialog");
    let message = "";
    switch (action.type) {
      case "POST_INVENTORY_ITEM_PENDING":
        message = "Posting Item To Server";
        break;
      default:
        message = "please wait";
        break;
    }
    yield put({
      type: "SHOW_PENDING_DIALOG",
      message: message
    });
  } catch (e) {
    yield console.log("ERROR: showPendingDialog");
  }
}

export function* sagaShowPendingDialog() {
  yield takeEvery(["POST_INVENTORY_ITEM_PENDING"], showPendingDialog);
}

/****
 * show purchase modal
 * 
 */
function* showPurchaseModal(action) {
  try {
      debugger;
    yield put({
      type: "SHOW_PURCHASE_MODAL",
      item: action.item
    });
  } catch (e) {
    yield console.log('ERROR: showPurchaseModal %j', e);
  }
}

export function* sagaShowPurchaseModal() {
  yield* takeEvery(['GET_CLIENT_TOKEN_FULFILLED'
  ], showPurchaseModal);
}

/****
 * show error dialog
 * 
 */
function* showErrorDialog(action) {
  try {
    yield put({
      type: "CLOSE_PENDING_DIALOG",
      message:
        action.payload && action.payload.message
          ? action.payload.message
          : console.log(action),
      title: "Error"
    });
    yield put({
      type: "SHOW_ERROR_DIALOG",
      message:
        action.payload && action.payload.message
          ? action.payload.message
          : console.log(action),
      title: "Error"
    });
  } catch (e) {
    yield console.log("ERROR: showErrorDialog %j", e);
  }
}

export function* sagaShowErrorDialog() {
  yield takeEvery(["POST_INVENTORY_ITEM_REJECTED"], showErrorDialog);
}

/****
 * show success dialog
 * 
 */
function* showSuccessDialog(action) {
  try {
    yield put({
      type: "CLOSE_PENDING_DIALOG",
      message:
        action.payload && action.payload.message
          ? action.payload.message
          : console.log(action),
      title: "Error"
    });
    yield put({
      type: "SHOW_SUCCESS_DIALOG",
      message:
        action.payload && action.payload.message
          ? action.payload.message
          : console.log(action),
      title: "Success"
    });
  } catch (e) {
    yield console.log("ERROR: showSuccessDialog %j", e);
  }
}

export function* sagaShowSuccessDialog() {
  yield takeEvery(["POST_INVENTORY_ITEM_FULFILLED"], showSuccessDialog);
}
