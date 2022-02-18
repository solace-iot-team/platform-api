import OrganizationService from '../organizations.service';
import Organization = Components.Schemas.Organization;
import L from '../../../common/logger';
import { Request, Response } from 'express';
import {ns} from '../../middlewares/context.handler';
import { ContextConstants } from '../../../common/constants';

export class ConnectorEventRepublisher{
  constructor(){
  }

  public async republishEvent(organization: string, req: Request, res: Response){
    if (!organization || res.statusCode>299){
      return;
    }
    ns.getStore().delete(ContextConstants.ORG_NAME);
    const org: Organization = await OrganizationService.byName(organization);
    // todo get endpoint from org
    let topic: string = `${req.method}${req.baseUrl}/${req.url}`;
    topic = topic.split('/').filter(v => v !== '').join('/');
    // extracting the payload depends on the 'express-request-logger' middleware
    const payload = res['_bodyJson']?res['_bodyJson']:res['_bodyStr'];
    L.error(`topic: ${topic}, event: ${JSON.stringify(payload)} `);
  }
}

export default new ConnectorEventRepublisher();