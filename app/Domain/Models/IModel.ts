export interface IModel<TDTO> {  
  serializeDTO(): TDTO {
    return {...this};
  }
}
