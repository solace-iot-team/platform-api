import OrganizationService from '../organizations.service';
import Organization = Components.Schemas.Organization;
import APIKeyAuthentication = Components.Schemas.APIKeyAuthentication;
import BasicAuthentication = Components.Schemas.BasicAuthentication;
import BearerTokenAuthentication = Components.Schemas.BearerTokenAuthentication;
import L from '../../../common/logger';
import { Request, Response } from 'express';
import { ns } from '../../middlewares/context.handler';
import { ContextConstants } from '../../../common/constants';
import fetch from 'fetch-with-proxy';
import https from 'https';
import { Headers, RequestInit } from 'node-fetch';


interface Envelope {
  header: {
    time: string;
    topic: string;
    org: string;
  };
  payload: any;
}

export class ConnectorEventRepublisher {
  public async republishEvent(organization: string, req: Request, res: Response) {
    if (!organization || res.statusCode > 299) {
      return;
    }
    ns.getStore().delete(ContextConstants.ORG_NAME);
    const org: Organization = await OrganizationService.byName(organization);

    if (!org.integrations || !org.integrations.notifications) {
      return;
    }

    let topic: string = `${req.method}${req.baseUrl}/${req.url}`;
    topic = topic.split('/').filter(v => v !== '').join('/');
    // extracting the payload depends on the 'express-request-logger' middleware
    const payload = res['_bodyJson'] ? res['_bodyJson'] : res['_bodyStr'];
    L.trace(payload);
    let url = `${org.integrations.notifications.baseUrl}/${topic}`;
    let agent = new https.Agent({
      rejectUnauthorized: false
    });
    const headers = new Headers({
      Accept: 'application/json',
    });

    if (org.integrations.notifications.authentication['userName']) {
      const b = org.integrations.notifications.authentication as BasicAuthentication;
      const credentials = Buffer.from(`${b.userName}:${b.password}`).toString('base64');
      headers.append('Authorization', `Basic ${credentials}`);
    } else if (org.integrations.notifications.authentication['token']) {
      const b = org.integrations.notifications.authentication as BearerTokenAuthentication;
      headers.append('Authorization', `Bearer ${b.token}`);
    } else if (org.integrations.notifications.authentication['location']) {
      const a = org.integrations.notifications.authentication as APIKeyAuthentication;
      if (a.location == 'header') {
        headers.append(a.name, a.key);
      } else {
        url = `${url}?${encodeURIComponent(a.name)}=${encodeURIComponent(a.key)}`;
      }
    }

    const event: Envelope = {
      header: {
        org: org.name,
        time: new Date().toISOString(),
        topic: topic,
      },
      payload: payload
    }
    L.trace(`topic: ${url}, event: ${JSON.stringify(event)} `);
    const request: RequestInit = {
      method: 'POST',
      agent: agent,
      body: JSON.stringify(event),
      headers: headers,

    };
    for (let i = 0; i < 3; i++) {
      try {
        const r = await fetch(url, request);
        i=5;
      } catch (e) {
        L.error(e);
      }
    }
  }
}

export default new ConnectorEventRepublisher();