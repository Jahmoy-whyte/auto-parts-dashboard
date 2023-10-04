import Button from "../../../../components/button/Button";
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
          payload: { visible: false, isDisabled: false },
        })
      }
      show={modelState.visible}
      title={modelState.title}
      subtext={modelState.subText}
    >
      <TextBox
        isDisabled={modelState.btnIsloading || modelState.isDisabled}
        value={modelState.textBoxValue}
        placeHolder={modelState.textBoxPlaceHolder}
        onChangeHandler={(name, value) =>
          dispatch({
            type: ACTIONS.set_model_data,
            payload: { textBoxValue: value },
          })
        }
      />

      <Button
        className=" px-2 self-end text-sm"
        onClick={buttonFunc}
        text={modelState.actionType}
        isLoading={modelState.btnIsloading}
      />
    </Model>
  );
};

export default SingleModel;
//   "This action cannot be undone. This will permanently delete your account and remove your modelState from our servers."
