import { UserInterface } from "../../models/user/user-interface";
import { ActionEx, AuthAction } from "../../actions/auth/auth.actions";
import { AuthService } from 'src/app/services/auth/auth-service.service';

export const authInitialState = {}
export function AuthReducer(
     state:UserInterface = authInitialState , 
     action: ActionEx) {
        switch(action.type) {
            case AuthAction.Login:
                state = action.payload
                
                return state
            case AuthAction.Register:
                state = action.payload
                return state
            default:
                return state
        }
}