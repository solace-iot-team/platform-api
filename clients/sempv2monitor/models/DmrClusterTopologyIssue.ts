/* eslint-disable */


export type DmrClusterTopologyIssue = {
    /**
     * The name of the Cluster.
     */
    dmrClusterName?: string;
    /**
     * The topology issue discovered in the Cluster. A topology issue indicates incorrect or inconsistent configuration within the DMR network. Such issues will cause messages to be misdelivered or lost.
     */
    topologyIssue?: string;
}

export namespace DmrClusterTopologyIssue {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterTopologyIssue';


}