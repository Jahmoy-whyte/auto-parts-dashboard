import Model from "../../../../components/model/Model";
import TextBox from "../../../../components/text-box/TextBox";
import { ACTIONS } from "../../helper/reducerHelper";
const SingleModel = ({ modelData = {}, dispatch, buttonFunc }) => {
  const modelState = modelData;

  return (
    <Model
      close={() =>
        dispatch({
          type: ACTIONS.set_model_data,
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
            type: ACTIONS.set_model_data,
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

export default SingleModel;
//   "This action cannot be undone. This will permanently delete your account and remove your modelState from our servers."
