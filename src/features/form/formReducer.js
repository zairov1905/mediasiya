import {
  CREATE_MEDIATR,
  FETCH_DISTRICT,
  FETCH_INSTITUTION,
  FETCH_OFFICE,
  FETCH_PERSON,
  FETCH_PROFESSION,
  FETCH_SOCIAL_MEDIA,
} from "./formConstants";

const initialState = {
  professions: [],
  institutions: [],
  districts: [],
  socialMedias: [],
  offices: [],
  person: [],
  mediatrs:[],
  message:null
};

export default function formReducer(
  state = initialState,
  { type, payload, totalCount, message }
) {
  switch (type) {
    case CREATE_MEDIATR:
      return {
        ...state,
        mediatrs: payload,
        message:message,
        totalCount: totalCount,

      };

    case FETCH_PROFESSION:
      return {
        ...state,
        professions: payload,
        totalCount: totalCount,
      };

    case FETCH_INSTITUTION:
      return {
        ...state,
        institutions: payload,
        totalCount: totalCount,
      };
    case FETCH_DISTRICT:
      return {
        ...state,
        districts: payload,
        totalCount: totalCount,
      };
    case FETCH_SOCIAL_MEDIA:
      return {
        ...state,
        socialMedias: payload,
        totalCount: totalCount,
      };
    case FETCH_OFFICE:
      return {
        ...state,
        offices: payload,
        totalCount: totalCount,
      };
    case FETCH_PERSON:
      return {
        ...state,
        person: payload,
      };
    default:
      return state;
  }
}
