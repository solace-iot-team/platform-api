import MetaEntityStage = Components.Schemas.MetaEntityStage;
import EventPortalFacade from '../../../../src/eventportalfacade.2';
 
export class StatesMapper {
    public static async getMetaEntityStageByState(stateId: string): Promise<MetaEntityStage>{
      const state = await EventPortalFacade.getState(stateId);
      return state.name.toLowerCase() as MetaEntityStage;
    }
}