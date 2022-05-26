import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import annonceReducer from "../features/annonce/annonceSlice";
import recruterReducer from "../features/recruter/recruterSlice";
import PostulationReducer from "../features/Postulation/PostulationSlice";
import condidatReducer from "../features/condidat/condidatSlice";
import qesReducer from "../features/Postulation/qesSlice";
import cvReducer from "../features/condidat/cvSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        annonces: annonceReducer,
        recruters: recruterReducer,
        postulations: PostulationReducer,
        condidats: condidatReducer,
        qes: qesReducer,
        cv: cvReducer,
    },
});