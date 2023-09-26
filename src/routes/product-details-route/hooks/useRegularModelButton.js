import toastMessage from "../../../helper/toast-message/toastMessage";
import useFetchInstance from "../../../hooks/useFetchInstance";
import { patchUrl, postUrl } from "../helper/urlHelper";
import { ACTIONS } from "../helper/reducerHelper";
import SPECIFICATIONS from "../constants/specification";
import { BUTTON_ACTION_TYPE } from "../constants/buttonActionType";
const useRegularModelButton = (state, dispatch, getData) => {
  const { tokenAwareFetch } = useFetchInstance();

  const regularModelBtnOnClickHander = async () => {
    const selected = state.selected;
    const text = state.regularModelData.textBoxValue;
    const id = state.regularModelData.updateId;

    if (text == "")
      return toastMessage("info", "Please enter " + selected + " name");
    dispatch({
      type: ACTIONS.set_regularModelData,
      payload: { btnIsloading: true },
    });
    if (state.regularModelData.actionType == BUTTON_ACTION_TYPE.Add) {
      const url = postUrl(selected);
      insertData(url, selected, text);
    } else {
      const url = patchUrl(selected);
      updateData(url, selected, text, id);
    }
  };

  const insertData = async (url, selected, text) => {
    try {
      let msg = "";
      if (selected == SPECIFICATIONS.make) {
        msg = await tokenAwareFetch(url, "POST", { make: text });
      } else if (selected == SPECIFICATIONS.categories) {
        msg = await tokenAwareFetch(url, "POST", { catigories: text });
      }
      getData();
      toastMessage("success", msg);
    } catch (error) {
      toastMessage("error", error.message);
    }
    dispatch({
      type: ACTIONS.set_regularModelData,
      payload: { btnIsloading: false },
    });
  };

  const updateData = async (url, selected, text, id) => {
    try {
      let msg = "";
      if (selected == SPECIFICATIONS.make) {
        msg = await tokenAwareFetch(url, "PATCH", { makeId: id, make: text });
      } else if (selected == SPECIFICATIONS.categories) {
        msg = await tokenAwareFetch(url, "PATCH", {
          catigoriesId: id,
          catigories: text,
        });
      }
      getData();
      toastMessage("success", msg);
    } catch (error) {
      toastMessage("error", error.message);
    }
    dispatch({
      type: ACTIONS.set_regularModelData,
      payload: { btnIsloading: false },
    });
  };

  const deleteData = async (url, selected, text, id) => {
    try {
      let msg = "";
      if (selected == SPECIFICATIONS.make) {
        msg = await tokenAwareFetch(url, "PATCH", { makeId: id, make: text });
      } else if (selected == SPECIFICATIONS.categories) {
        msg = await tokenAwareFetch(url, "PATCH", {
          catigoriesId: id,
          catigories: text,
        });
      }
      getData();
      toastMessage("success", msg);
    } catch (error) {
      toastMessage("error", error.message);
    }
    dispatch({
      type: ACTIONS.set_regularModelData,
      payload: { btnIsloading: false },
    });
  };

  return [regularModelBtnOnClickHander];
};
export default useRegularModelButton;
