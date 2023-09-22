export const initialState = {
  isLoading: false,
  userId: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
  btnIsLoading: false,
  formActionType: "update",
  disableForm: true,

  userStatus: {
    text: "",
    value: "",
    dropDown: [
      { text: "User", value: "user" },
      { text: "Guest", value: "guest" },
    ],
  },
  emailVerified: {
    text: "",
    value: "",
    dropDown: [
      { text: "True", value: 1 },
      { text: "False", value: 0 },
    ],
  },
};

export const ACTIONS = {
  set_is_loading: "set_is_loading",
  set_user: "set_user",
  set_text_box: "set_text_box",
  set_dropdown: "set_dropdown",
  set_btn_loading: "set_btn_loading",
  set_from_action_type: "set_from_action_type",
  disable_form: "disable_form",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "set_is_loading":
      return { ...state, isLoading: action.payload };
    case "set_user": {
      const userData = action.payload;
      return {
        ...state,
        disableForm: false,
        formActionType: "update",
        userId: userData.id,
        email: userData.email,
        password: "",
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        userStatus: {
          ...state.userStatus,
          text: userData.userStatus,
          value: userData.userStatus,
        },
        emailVerified: {
          ...state.emailVerified,
          text: userData.emailVerified ? "true" : "false",
          value: userData.emailVerified,
        },
      };
    }
    case "set_text_box": {
      const key = action.payload.key;
      const value = action.payload.value;
      return { ...state, [key]: value };
    }
    case "set_dropdown": {
      const key = action.payload.key;
      const value = action.payload.value;
      const text = action.payload.text;
      return { ...state, [key]: { ...state[key], text: text, value: value } };
    }

    case "set_btn_loading": {
      return { ...state, btnIsLoading: action.payload };
    }

    case "set_from_action_type": {
      return { ...state, formActionType: action.payload, disableForm: false };
    }

    case "disable_form": {
      return { ...state, disableForm: action.payload };
    }
    default:
      return state;
  }
};

/*
  
Full texts
user_id	
user_status	
email	
emailverified	
password	
firstname	
lastname	
phone	
selected_address_id


{
    "id": "09f4d252-dc7c-4acd-8593-624f7eab6de6",
    "userStatus": "guest",
    "emailVerified": 0,
    "address_id": "",
    "email": "guest@email.com",
    "firstName": "wdwdwd",
    "lastName": "",
    "phone": "",
    "address": null,
    "additionalInfo": null,
    "placeType": null
}
  */
