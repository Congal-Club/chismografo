import { types } from '../../types/types'

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.usuariosCargados:
      return {
        ...state,
        usuarios: [...action.payload]
      }

    case types.activarChat:
      if (state.chatActivo === action.payload) return state

      return {
        ...state,
        chatActivo: action.payload,
        mensajes: []
      }

    case types.nuevoMensaje:
      // eslint-disable-next-line no-case-declarations
      const mensajeExistente = state.mensajes.find(
        (mensaje) => mensaje._id === action.payload._id
      )
    
      if (!mensajeExistente) {
        if (
          state.chatActivo === action.payload.de ||
          state.chatActivo === action.payload.para
        ) {
          return {
            ...state,
            mensajes: [...state.mensajes, action.payload]
          }
        }
      }
    
      return state

    case types.cargarMensajes:
      return {
        ...state,
        mensajes: [...action.payload]
      }

    default:
      return state
  }
}
