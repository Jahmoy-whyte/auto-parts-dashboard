import Model from "../../../../components/model/Model";
import TextBox from "../../../../components/text-box/TextBox";
import { ACTIONS } from "../../helper/reducerHelper";

const AddModel = ({ modelData = {}, dispatch, buttonFunc }) => {
  const modelState = modelData;

  return (
    <Model
      close={() =>
        dispatch({
          type: ACTIONS.set_regularModelData,
          payload: { visible: false },
        })
      }
      show={modelState.visible}
      title={modelState.title}
      subtext={modelState.subText}
    >
      <TextBox
        isDisabled={modelState.btnIsloading}
        value={modelState.textBoxValue}
        placeHolder={modelState.textBoxPlaceHolder}
        onChangeHandler={(name, value) =>
          dispatch({
            type: ACTIONS.set_regularModelData,
            payload: { textBoxValue: value },
          })
        }
      />

      <button
        disabled={modelState.btnIsloading}
        onClick={buttonFunc}
        className="bg-secondary text-white rounded-md p-2 self-end"
      >
        {modelState.btnIsloading ? "...Loading" : modelState.actionType}
      </button>
    </Model>
  );
};

export default AddModel;
//   "This action cannot be undone. This will permanently delete your account and remove your modelState from our servers."
