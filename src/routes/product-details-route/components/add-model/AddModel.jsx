import Model from "../../../../components/model/Model";
import TextBox from "../../../../components/text-box/TextBox";
import { ACTIONS } from "../../helper/reducerHelper";

const AddModel = ({ modelData = {}, dispatch }) => {
  return (
    <Model
      close={() =>
        dispatch({
          type: ACTIONS.set_regularModelData_visibility,
          payload: false,
        })
      }
      show={modelData.visible}
      title={modelData.title}
      subtext={modelData.subText}
    >
      <TextBox />

      <button className="bg-secondary text-white rounded-md p-2 self-end">
        {modelData.actionType}
      </button>
    </Model>
  );
};

export default AddModel;
//   "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
