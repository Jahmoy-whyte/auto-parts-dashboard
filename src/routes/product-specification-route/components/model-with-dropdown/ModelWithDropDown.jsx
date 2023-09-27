import CustomDropDown from "../../../../components/custom-drop-down/CustomDropDown";
import Model from "../../../../components/model/Model";
import TextBox from "../../../../components/text-box/TextBox";
import { ACTIONS } from "../../helper/reducerHelper";
const ModelWithDropDown = ({ modelData = {}, dispatch, buttonFunc }) => {
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
      <CustomDropDown
        options={modelState.dropDown.options}
        placeHolder="select"
        value={modelState.dropDown.text}
        onClick={(name, value, text) =>
          dispatch({
            type: ACTIONS.set_dropdown_on_select,
            payload: { text: text, value: value },
          })
        }
      />
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

export default ModelWithDropDown;
//   "This action cannot be undone. This will permanently delete your account and remove your modelState from our servers."
